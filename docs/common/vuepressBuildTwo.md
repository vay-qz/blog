---
next: false
---

# VuePress搭建（二）
上一章讲到最简单的vuepress搭建，本章将介绍如何配置自己的vuepress

-----

1. 首先选择一个目录作为自己博客的根目录，在根目录下创建docs文件夹防治自己的文章

2. 同样在根目录下创建一个package.json，并在其中添加如下代码

   ```javascript
   {
     "scripts": {
       "dev": "vuepress dev",
       "build": "vuepress build"
     }
   }
   // 添加过后可以使用npm run dev启动vuepress
   ```

3. 在dosc文件夹下执行如下命令

   ```bash
   mkdir .vuepress
   echo '# Hello VuePress' > README.md
   ```

4. - 接下来进入.vuepress文件夹，创建config.js，之后就可以在这个文件中配置自己的vuepress页面了，config.js详细配置见[vuepress官网](https://vuepress.vuejs.org/config/#basic-config)

   - 此时你的电脑的目录结构应该是这样的

     ```
     .
     ├─ docs
     │  ├─ README.md
     │  └─ .vuepress
     │     └─ config.js
     └─ package.json
     ```
     ::: danger
     上述目录就是最基础的了，缺少任意文件都可以会启动报错或者发生404错误
     :::

   - 接下来是一个初级的配置完成的config.js的举例

     ```js
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
     		      '/common/vuepressBuild'
     			]
     		},
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
     ```

     

