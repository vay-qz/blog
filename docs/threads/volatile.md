# volatile详解
[TOC]
#### java内存模型

![img](./pic/JMM.jpg)

##### Java独立线程的特性

1. 每个java线程都有独立的工作内存，每个线程只能读写自己线程所在的工作内存
2. 线程的工作内存中保存了被该线程用到的变量的主内存副本拷贝
3. 线程的对变量的读取、赋值都必须在工作内存中进行，不能直接读写主内存的变量

##### 两个操作

- 改变变量：操作引擎对工作内存中的变量进行修改，而后将新值同步回主内存

- 获取变量：从主内存读取变量到工作内存，而后被操作引擎获取

#### volatile的两个性质

- 可见性：新值能立即同步到主内存，使用前立即从主内存刷新
- 有序性：



[测试代码](https://github.com/VAS-QZ/Learning/tree/master/NIO)
