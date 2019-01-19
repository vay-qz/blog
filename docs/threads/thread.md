# Java多线程----Thread类学习

[TOC]

#### 线程的域

| 域名                            | 备注               | 发布情况 |
| :------------------------------ | ------------------ | -------- |
| name                            | 名字               | √        |
| priority                        | 优先级             | √        |
| daemon                          | 守护状态           | √        |
| stillborn                       | JVM状态            |          |
| target                          | 将要运行           |          |
| group                           | 当前线程的线程组   | get      |
| contextClassLoader              | 当前线程的类加载器 | √        |
| threadInitNumber                | 未命名的线程数量   |          |
| stackSize                       | 栈帧大小           |          |
| tid                             | 线程id             | get      |
| threadSeqNumber                 | 所有的线程数量     |          |
| threadStatus                    | java线程状态       |          |
| uncaughtExceptionHandler        | 未捕获异常句柄     | √        |
| defaultUncaughtExceptionHandler | 默认未捕获异常句柄 | √        |

#### 常用方法


- init--`private`

  >- 设置线程名
  >
  >  - 有传入名称则为传入名称
  >  - 无传入名称则为threadInitNumber++
  >- 检查权限
  >- 线程组操作
  >- 设置线程组、守护线程状态、线程优先级、类加载器继承当前线程
  >- 设置栈桢大小（未指定则为0，0代表受VM自行调配）
  >- 设置线程id为threadSeqNumber++

- yield--`public static`

  > 让出当前时间片
  >
  > 很少有实际的业务场景
  >
  > 可能被用于debug或设计并发控制构造器

- sleep--`public static`

    > 让出cpu，不释放锁
    >
    > 可被中断抛出InterruptedException
    >

- join--`puublic final`

  > 插队执行

- start--`public`

  > - 程序
  >   - 检查线程状态
  >   - 线程组操作
  >   - start0
  > - 注释
  >   - 调用start的线程返回，JVM调用run方法
  >   - 两个现场并发执行
  >   - 每个线程只能start一次，否则会抛出异常
  >

- ~~弃用方法~~

  - ~~stop~~--`public final`

    > 作用：强制线程立即停止执行
    >
    > 原因：该方法会释放所有的锁，不安全
    >

  - ~~destroy~~--`public`

    > 作用：销毁线程
    >
    > 原因：
    >
    > - 资源不释放
    >
    > - 不释放任何锁

  - ~~suspend/resume~~--`public final`

    > 作用：挂起线程
    >
    > 同destroy

- interrupt--`public`

  **<u>抛出InterruptedExecption后状态重置</u>**

  | 中断状态（interrupt status） | 表现                                                       | 情况                                                         |
  | ---------------------------- | ---------------------------------------------------------- | ------------------------------------------------------------ |
  | cleared                      | InterruptedException                                       | Object.wait()<br />Object.join() <br />Thread.sleep()<br />阻塞队列被中断 |
  | be set                       | the channel will be closed<br />ClosedByInterruptException | 同一个通道多个线程，通道关闭，其余线程抛出异常               |
  | be set                       | return immediately from the selection operation            | 被Selector阻塞                                               |

- interrupted--`public static`

  > 测试当前线程是否现在已经被interrupted
  >
  > 清空中断状态

- isInterrupted--`public`

  > 测试是否线程已经被interrupted
  >
  > 不影响中断状态

- isAlive--`public final`

  > 判断线程是否存活：开始并且未结束

- getState--`public`

  > 得到当前线程状态

- 线程状态

  | 状态          | 备注                                                         |
  | ------------- | ------------------------------------------------------------ |
  | NEW           | Thread state for a thread which has not yet started          |
  | RUNNABLE      | Thread state for a runnable thread                           |
  | BLOCKED       | Thread state for a thread blocked waiting for a monitor lock |
  | WAITING       | Thread state for a waiting thread                            |
  | TIMED_WAITING | Thread state for a waiting thread with a specified waiting time |
  | TERMINATED    | Thread state for a terminated thread                         |

- dumpStack--`public static`

  > 打印当前栈帧
  >
  > 只用于debug

- toString--`public`

  > 线程名+优先级+线程组名

- holdsLock--`public static`

  > 查看是否持有锁

#### 未捕获异常

defaultUncaughtExceptionHandler--`static volatile`

uncaughtExceptionHandler--`volatile`

#### 相关类

##### Object

- wait

  > 等待被唤醒
  >
  > 释放持有锁
  >
  > 唤醒时需要唤醒者持有相同锁

- notify

  > 唤醒

- notifyAll

  > 随机唤醒一个在等待的线程

##### NIO

- Selector.select

  > 从准备好的通道中获取数据

- fileChannel.close

  > 关闭文件通道

##### LockSupport

- park
- unpark

[测试代码](https://github.com/VAS-QZ/Learning/tree/master/Thread)