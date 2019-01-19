module.exports = {
  base: '/blog/',
  title: '纸人的博客',
  description: 'Just playing around',
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
		/*
		{
			title:'虚拟机',
			children:[
		      '/virtual/'
			]
		},*/
		{
			title:'多线程',
			children:[
		      '/threads/thread.md'
			]
		}
	  ],
      
	sidebarDepth: 2,
    lastUpdated: 'Last Updated', 
  }
}