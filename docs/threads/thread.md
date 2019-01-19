# Java多线程



- threadInitNumber与threadSeqNumber的区别

  > threadInitNumber：未命名的线程数量
  >
  > threadSeqNumber：所以的线程数量

- yield()

  >让出当前时间片
  >
  >很少有实际的业务场景
  >
  >可能被用于debug或设计并发控制构造器
  >
  >**？**是否会释放锁

- sleep()

  > 让出cpu，不释放锁
  >
  > 可被中断抛出InterruptedException

- init()

  >- 设置线程名
  >
  >  - 有传入名称则为传入名称
  >  - 无传入名称则为threadInitNumber++
  >
  >- 当前线程为父线程
  >
  >- 检查权限
  >
  >- 父线程所在线程组未启动线程++（nUnstartedThreads++;）**线程组操作**
  >
  >- 设置线程组
  >
  >- 设置守护线程状态、线程优先级、类构造器继承父线程
  >
  >- **？**inheritedAccessControlContex
  >
  >- 设置栈桢大小（未指定则为0，0代表受VM自行调配）
  >
  >- 设置线程id为threadSeqNumber++

- start()

  > **线程组操作**
  >
  > start0
  >
  > 调用start的线程返回，JVM调用run方法

- 弃用方法

  - stop()

    > 作用：强制线程立即停止执行
    >
    > 原因：该方法无法释放所有的锁
    >

  - destroy

    > 原因：
    >
    > - 资源不释放
    >
    > - 死锁
    >

  - suspend

    > 同destroy

- interrupt（抛出InterruptedExecption后状态重置）

  | 中断状态（interrupt status） | 表现                                                       | 情况                                                  |
  | ---------------------------- | ---------------------------------------------------------- | ----------------------------------------------------- |
  | cleared                      | InterruptedException                                       | Object.wait()<br />Object.join() <br />Thread.sleep() |
  | be set                       | the channel will be closed<br />ClosedByInterruptException | 被io操作阻塞                                          |
  | be set                       | return immediately from the selection operation            | 被Selector阻塞                                        |
  | be set                       |                                                            |                                                       |

- static interrupted

  > 测试当前线程是否现在已经被interrupted
  >
  > 清空中断状态

- isInterrupted

  > 测试是否线程已经被interrupted
  >
  > 不影响中断状态

- isAlive

  > 判断线程是否存活：开始并且未结束

- setPriority()
- getPriority()

- setName()

  > ```
  > if (threadStatus != 0) {
  >     setNativeName(name);
  > }
  > ```

- getName()

- getThreadGroup()

- activeCount()

- enumerate()**?**

- join()

  > 插队执行

- dumpStack()

  > 打印当前栈帧

- setDaemon()

- isDaemon()

- checkAccess()

  > 判断当前线程是否有权限更改这个线程

- toString()

  > 线程名+优先级+线程组名

- getContextClassLoader()

- setContextClassLoader()

- holdsLock()

  > 查看是否持有锁

- getStackTrace()

- getAllStackTraces()

- getId()

- 线程状态

  | 状态          | 备注                                                         |
  | ------------- | ------------------------------------------------------------ |
  | NEW           | Thread state for a thread which has not yet started          |
  | RUNNABLE      | Thread state for a runnable thread                           |
  | BLOCKED       | Thread state for a thread blocked waiting for a monitor lock |
  | WAITING       | Thread state for a waiting thread                            |
  | TIMED_WAITING | Thread state for a waiting thread with a specified waiting time |
  | TERMINATED    | Thread state for a terminated thread                         |

- getState()

- UncaughtExceptionHandler