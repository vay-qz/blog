# AQS框架简介

AbstractQueueSynchronizer抽象类就是AQS框架，这个类提供了用于实现依赖于先进先出（FIFO）等待队列的阻塞锁和相关同步器（信号量，事件等）的框架。要理解AQS框架，最重要的是理解其中的Sync Queue，这个队列的数据结构为双向链表，链表上每个节点的值只有固定的5个，分别代表不同的涵义，接下来我们就从Sync Queue为切入点了解AQS

既然Sync Queue是一个双向链表，那么AbstractQueueSynchronizer类就一定符合双向链表的两个特征

- 在AbstractQueueSynchronizer类中一定保存了其首节点和尾节点
- 每个节点一定保存了其前序节点、后序节点以及自己的值

于是乎，我们在AbstractQueueSynchronizer类中找到了如下私有域

| 域名  | 类型 | 备注   |
| ----- | ---- | ------ |
| first | Node | 首节点 |
| last  | Node | 尾节点 |

而内部类Node的域也果然如我们所料

| 域名       | 类型         | 备注     |
| ---------- | ------------ | -------- |
| prev       | Node         | 前序节点 |
| next       | Node         | 后续节点 |
| waitStatus | voletite int | 状态     |

上文中提到，Node节点的值有且只有5个，每个值都有特殊的含义，那么接下来我们就来看看这些值具体有什么意义呢？

```java
/** waitStatus值表明当前线程已取消 */
static final int CANCELLED =  1;
/** waitStatus值表明后继线程应该被释放 */
static final int SIGNAL    = -1;
/** waitStatus值表明当前线程在condition中等待 */
static final int CONDITION = -2;
/** waitStatus值表明被释放状态应该被无条件传播 */
static final int PROPAGATE = -3;
```

上边那四个再加上一个无意义的0值，就是waitStatus所可以取到的值

开头我们说到，AQS框架为实现依赖于先进先出（FIFO）等待队列的阻塞锁和相关同步器提供了框架，那么它到底是如何规范的呢？首先我们抛出三个问题：

1. 如何实现上锁？
2. 如何实现A获取到锁之后其余线程获取失败并等待？
3. 在A释放锁后如何通知等待线程可以获取锁了？

我们通过看几个方法来理解这三个问题，首先说第一个问题，既然是上锁，那么方法名一定是和lock相关的，全局搜索发现并没有方法名是和lock相关的，难道AQS没有上锁机制？肯定是不可能的，我们在acquire的注释中找到了lock字眼，那么就来看一下acquire方法吧

```java
public final void acquire(int arg) {
    //尝试获取锁
    if (!tryAcquire(arg) &&
        //没获取到，排队去了
        acquireQueued(addWaiter(Node.EXCLUSIVE), arg))
        selfInterrupt();
}
```

ok，那说明咱们第一个问题的答案在tryAcquire方法中，再看一段

```java
protected boolean tryAcquire(int arg) {
	throw new UnsupportedOperationException();
}
```

很尴尬，AQS框架中并不负责上锁方法的实现，而是把这个方法的实现交给了子类去完成，并且在AbstractQueueSynchronizer类中如下5个方法都是子类来负责实现的

```java
 * <li> {@link #tryAcquire}
 * <li> {@link #tryRelease}
 * <li> {@link #tryAcquireShared}
 * <li> {@link #tryReleaseShared}
 * <li> {@link #isHeldExclusively}
```

::: tip

这种将实现下沉的子类实现的代码行为称为模板方法模式，是各种优秀框架源码中常用的设计模式之一

:::

那么第二个问题，emmm...貌似有点大，分解一下

- A线程获取锁其余线程如何获取失败？
- 如何实现获取锁失败后等待？

很明显，分解后的第一个问题也在tryAcuqire里，手动笑哭，AQS好懒。。。接下来我们贴第二个问题的一段代码

```java
final boolean acquireQueued(final Node node, int arg) {
    boolean failed = true;
    try {
        boolean interrupted = false;
        for (;;) {
            final Node p = node.predecessor();
            //前序节点是头结点吗？是的话我就要尝试获取锁了
            if (p == head && tryAcquire(arg)) {
                setHead(node);
                p.next = null; // help GC
                failed = false;
                return interrupted;
            }
            //获取锁失败后应该暂停吗？应该的话就暂停吧
            if (shouldParkAfterFailedAcquire(p, node) &&
                parkAndCheckInterrupt())
                interrupted = true;
        }
    } finally {
        //只有获取到锁才会将这个标志改成false，非正常退出都会把这个节点取消掉
        if (failed)
            cancelAcquire(node);
    }
} 
//将当前线程做成一个Node节点，排队到CLH Queue，下边代码是添加到双向链表的代码，没啥说的
private Node addWaiter(Node mode) {
    Node node = new Node(Thread.currentThread(), mode);
    // Try the fast path of enq; backup to full enq on failure
    Node pred = tail;
    if (pred != null) {
        node.prev = pred;
        if (compareAndSetTail(pred, node)) {
            pred.next = node;
            return node;
        }
    }
    //这个方法里也是把Node节点排队到CLH Queue
    enq(node);
    return node;
}
```

可以看到，在acquireQueued()方法中有一个死循环，只有前序节点是头结点并且尝试获取锁成功才会返回，否则就会一直死循环自旋下去，那如果某一个线程一直不释放锁，难道CPU资源就这样被浪费了吗？大牛的底层代码一定不会这么蠢，否则也太浪费CPU了，于是增加了shouldParkAfterFailedAcquire()和parkAndCheckInterrupt()方法来将线程暂停掉。那么当前序节点的状态是什么时我们需要对其进行暂停呢？

- CANCELLED：前序节点都被取消了肯定不应该暂停啊，赶紧去抢锁才对
- SIGNAL：当前节点的后继节点应该被释放，那后继节点肯定要先被暂停才能被释放啊
- Condition：Condition队列专用，不作考虑
- PROPAGATE：无条件传播，也应该释放

```java
private static boolean shouldParkAfterFailedAcquire(Node pred, Node node) {
    int ws = pred.waitStatus;
    //SIGNAL
    if (ws == Node.SIGNAL)
        return true;
    //CANCELLED
    if (ws > 0) {
        do {
            node.prev = pred = pred.prev;
        } while (pred.waitStatus > 0);
        pred.next = node;
    //将前序节点的状态设置为SIGNAL
    } else {
        compareAndSetWaitStatus(pred, ws, Node.SIGNAL);
    }
    return false;
}
```

ok，接下来我们来了解第三个问题，释放后序节点，既然是释放，那我们就来看一下release方法吧

```java
public final boolean release(int arg) {
    //尝试释放
    if (tryRelease(arg)) {
        Node h = head;
        if (h != null && h.waitStatus != 0)
            //就是这一句，释放后序节点
            unparkSuccessor(h);
        return true;
    }
    return false;
}
```

没错，在release方法中会让后继节点继续运行

笔者认为如果想要彻底理解AQS框架，就需要从其内部类的waitStatus的5个状态和抽象方法的实现入手，这里推荐通过三个类的实现源码：ReentrantLock和ReentrantReadWirteLock，ConditionObject