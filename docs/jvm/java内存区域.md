# Java内存区域

[[toc]]

## jdk8内存区域图

![](./pic/jvm_memory_area.jpg)


## 各区域功能

| 内存名称     | 作用                                             | 是否线程独立 | 抛出异常                                |
| ------------ | ------------------------------------------------ | ------------ | --------------------------------------- |
| 程序计数器   | 记录程序执行的位置                               | 是           | 无                                      |
| 虚拟机栈     | java方法栈帧                                     | 是           | OutofMemoryError<br />StackOutflowError |
| 本地方法栈   | native方法栈帧                                   | 是           | OutofMemoryError<br />StackOutflowError |
| 堆           | 对象和数组创建时内存位置                         | 否           | OutofMemoryError                        |
| 元数据区     | 存储已被虚拟机加载的类、常量、静态变量等数据     | 否           | OutofMemoryError                        |
| 直接内存     | NIO直接开辟出的内存区域，独立于堆栈之外          | 否           | OutofMemoryError                        |
| 运行时常量池 | 堆的一部分，存放编译期生成的各种字面量和符合引用 | 否           |                                         |

:::danger
直接内存溢出时，IDE也会退出
:::


## 控制参数

| 参数名                  | 备注             | 备注               |
| ----------------------- | ---------------- | ------------------ |
| -Xms                    | 最小堆内存       |                    |
| -Xmx                    | 最大堆内存       |                    |
| -Xss                    | 栈容量           |                    |
| -XX:MetaspaceSize       | 元数据区大小     |                    |
| -XX:MaxMetaspaceSize    | 元数据区最大内存 |                    |
| -XX:MaxDirectMemorySize | 直接内存最大值   | 默认于堆最大值相等 |



[测试代码](https://github.com/VAS-QZ/Learning/tree/master/Jvm)