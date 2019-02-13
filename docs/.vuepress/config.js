module.exports = {
  base: '/blog/',
  title: '纸人的博客',
  port: '8081',
  themeConfig:{
	  nav:[
	    {text:'主页', link:'/'},
	    {text:'Github', link:'https://github.com/VAS-QZ'},
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
			title:'虚拟机',
			children:[
		      '/jvm/java内存区域'
			]
		},
		{
			title:'多线程',
			children:[
		      '/threads/thread.md',
		      '/threads/ThreadPoolExecutor.md',
		      '/threads/volatile.md'
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