module.exports = {
  title: 'HOME',
  port: '8081',
  themeConfig:{
	  logo: '/img/logo.jpg',	
	  nav:[
	    {text:'Github', link:'https://github.com/vay-qz'},
		{text:'CSDN', link:'https://blog.csdn.net/qz_zhiren'},
	  ],
	  sidebar: [
		{
			title:'VuePress',
			children:[
		      '/common/vuepressBuildOne',
		      '/common/vuepressBuildTwo'
			]
		},
		{
			title:'JVM',
			children:[
		      '/jvm/java内存区域',
			  '/jvm/垃圾收集器',
			  '/jvm/内存分配与回收策略',
			  '/jvm/IDEA调优实战',
			  '/jvm/垃圾收集算法',
			  '/jvm/类加载机制'
			]
		},
		{
			title:'多线程',
			children:[
		      '/threads/thread.md',
		      '/threads/线程池的使用.md',
		      '/threads/阻塞队列.md',
		      '/threads/ThreadPoolExecutor源码解读.md',
		      '/threads/volatile.md',
		      '/threads/AQS框架简介.md',
		      '/threads/AQS框架之ReentrantLock实现类.md',
		      '/threads/AQS框架之ReentrantReadWriteLock实现类.md',
		      '/threads/AQS框架之ConditionObject内部类.md'
			]
		},
		{
			title:'设计模式',
			children:[
		      '/designpattern/设计模式（前篇）.md',
		      '/designpattern/设计模式——单例模式.md',
		      '/designpattern/设计模式——工厂模式.md',
		      '/designpattern/设计模式——建造者模式.md',
		      '/designpattern/设计模式——享元模式.md',
		      '/designpattern/设计模式——组合模式.md',
		      '/designpattern/设计模式——备忘录模式.md',
		      '/designpattern/设计模式——命令模式.md',
		      '/designpattern/设计模式——模板方法模式.md',
		      '/designpattern/设计模式——适配器模式.md'
			]
		},
		{
			title:'算法',
			children:[
		      '/algorithm/排序.md'
			]
		},
		{
			title:'问题',
			children:[
		      '/problem/threadproblem.md'
			]
		}
	  ],
      
	sidebarDepth: 2,
    lastUpdated: 'Last Updated', 
  },
  markdown: {
	lineNumbers: true,
	toc: { includeLevel: [2, 3, 4, 5, 6] }
  },
}