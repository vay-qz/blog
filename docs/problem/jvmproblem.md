---
prev: false
---
# JVM问题

::: tip
本文为笔者在学习过程中遇到的未解决的问题，请各位大牛帮忙在评论区或联系笔者解答
:::

- ##### 为什么接近极限时会产生full gc

```java
/**
     * 测试分代分配
     * 参数：
     * -Xms20M
     * -Xmx20M
     * -Xmn10M
     * -XX:+PrintGCDetails
     * -XX:SurvivorRatio=8
     */
    private void testAllocation() {
        byte[] allocation1,allocation2,allocation3,allocation4,allocation5;

        allocation1 = new byte[4 * 1024*1024];
        //eden区有8M，只用了4M为什么就要进行minor gc
//        allocation3 = new byte[2 * 1024*1024];


        allocation3 = new byte[3*512*1024];
        //为什么接近极限时会产生full gc
        allocation4 = new byte[512*1024];
    }
```

![1549956801670](./pic/full.png)