# AQS框架之ConditionObject内部类

至此为止，对于AQS中Node的waitStatus变量，我们只用到了 CANCELED、0、SIGNAL，而对于CONDITION和PROPAGATE却都还没有用到。Condition接口用于实现Object的锁相关方法，在AbstractQueueSynchronizer中，内部类ConditionObject对这个接口进行了实现。

在ConditionObject中同样维护这一个由Node构成的双向链表，这个链表称为Condition Queue，那么ConditionObject中自然就要维护起首尾节点

| 域名      | 备注   |
| --------- | ------ |
| FirstNode | 首节点 |
| LastNode  | 尾节点 |

我们先来回忆一下Object#wait的表现

- 调用Object#wait的区域一定是在Synchronized块儿内？
- 当调用Object#wait方法后，锁被释放？
- 当另一个线程对其进行notify唤醒时，一定要先获取起锁

那么当锁是AQS框架时，如何实现这三个特性呢？我们带着这三个问题一起来看一段源码

```java
public final void await() throws InterruptedException {
    if (Thread.interrupted())
        throw new InterruptedException();
    //将当前线程做成Node添加到Condition Queue
    Node node = addConditionWaiter();
    //完成释放锁，不管重入了几次
    int savedState = fullyRelease(node);
    while (!isOnSyncQueue(node)) {
        LockSupport.park(this);
        if ((interruptMode = checkInterruptWhileWaiting(node)) != 0)
            break;
    }
    ...
}
final int fullyRelease(Node node) {
    boolean failed = true;
    try {
        int savedState = getState();
        //就是这里，release方法是要释放锁的，释放锁的前提是拥有锁
        if (release(savedState)) {
            failed = false;
            return savedState;
        } else {
            throw new IllegalMonitorStateException();
        }
    } finally {
        if (failed)
            node.waitStatus = Node.CANCELLED;
    }
}
```

如上述代码所示，前两个问题的答案就在fullyRelease中，在线程暂停之前要先将锁彻底释放掉，而在release中，如果想要释放掉，那首先这个线程要持有锁。

在回答第三个问题之前我们先来看一下addConditionWaiter()方法

```java
private Node addConditionWaiter() {
    Node t = lastWaiter;
    // If lastWaiter is cancelled, clean out.
    if (t != null && t.waitStatus != Node.CONDITION) {
        unlinkCancelledWaiters();
        t = lastWaiter;
    }
    //look,这里用到了常量Node.CONDITION
    Node node = new Node(Thread.currentThread(), Node.CONDITION);
    if (t == null)
        firstWaiter = node;
    else
        t.nextWaiter = node;
    lastWaiter = node;
    return node;
}
```

嗯，每错，看这个方法的目的有两个

1. 了解CONDITION就是在这里设置的，
2. 节点从结果上来看是把Sync Queue上的节点卸下来安到了Condition Queue，但是实际上是先新建一个节点按到Condition Queue上，然后才从Sync Queue上卸下来，这两者并不是同一个对象

第三个问题的答案当然要在ConditionObject#signal中获得了

```java
public final void signal() {
    //就是这里了，通过判断当前线程是否是独占线程来确认当前线程是否持有锁
    if (!isHeldExclusively())
        throw new IllegalMonitorStateException();
    Node first = firstWaiter;
    if (first != null)
        doSignal(first);
}
```

ok，这三个问题清楚了之后Condition基本上就理解了