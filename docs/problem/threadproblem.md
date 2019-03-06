# 多线程问题

::: tip
本文为笔者在学习过程中遇到的未解决的问题，请各位大牛帮忙在评论区或联系笔者解答
:::

代码如下，问题见注释

```java
	/**
     * 全程没有LockSupport.unpark()代码，但是控制台打印出了over字段
     * LockSupport.park()在线程中并且之前有线程被中断时无法加锁
     *
     * 环境：jdk1.8，windows8
     */
    private void testPermitBug() {
        Thread thread1 = new Thread(()->{
            try {
                Thread.sleep(5000);
            } catch (InterruptedException e) {
                System.out.println("睡眠被中断");
            }
        });
        thread1.start();
        waitAMoment();
        thread1.interrupt();

        Thread thread2 = new Thread(()->{
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            LockSupport.park();
            System.out.println("over");
        });
        thread2.start();
        waitAMoment();
        printThreadState(thread2);
    }
```

运行结果

![1549957493809](./pic/result.png)

**个人见解**

在jdk源码LockSupport.java的第160行发现了这一句

```java
<li>The call spuriously (that is, for no reason) returns.
```

这是park()方法的注释，说这个方法可能会无条件结束。。。不是吧