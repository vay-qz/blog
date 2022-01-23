(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{245:function(a,t,e){"use strict";e.r(t);var i=e(0),r=Object(i.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var a=this,t=a.$createElement,e=a._self._c||t;return e("div",{staticClass:"content"},[e("h2",{attrs:{id:"数据结构"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#数据结构","aria-hidden":"true"}},[a._v("#")]),a._v(" 数据结构")]),a._v(" "),e("h3",{attrs:{id:"b树"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#b树","aria-hidden":"true"}},[a._v("#")]),a._v(" B树")]),a._v(" "),e("ol",[e("li",[a._v("每个节点可以拥有若干个子节点\n"),e("ol",[e("li",[a._v("根节点可以拥有[2, m]个子节点")]),a._v(" "),e("li",[a._v("非叶子结点可以拥有[m/2, m]个子节点")])])]),a._v(" "),e("li",[a._v("每个节点可以拥有(0, m]个关键字和指针")]),a._v(" "),e("li",[a._v("每个节点的关键字k[1],k[2]...k[m - 1]满足以下规律\n"),e("ol",[e("li",[a._v("k[1] < k[2] <...<k[m - 1]")])])]),a._v(" "),e("li",[a._v("每个节点的指针p[1],p[2]...p[m]满足如下规律\n"),e("ol",[e("li",[a._v("p[1]指向的子节点的关键字k' < k[1]")]),a._v(" "),e("li",[a._v("p[i]指向的子节点的关键字k[i - 1] < k'[i] < k[i + 1]")]),a._v(" "),e("li",[a._v("p[m]指向的子节点的关键字k'[m] > k[m - 1]")])])]),a._v(" "),e("li",[a._v("节点都在一层")])]),a._v(" "),e("h3",{attrs:{id:"b-树"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#b-树","aria-hidden":"true"}},[a._v("#")]),a._v(" B+树")]),a._v(" "),e("p",[a._v("相对于B树，增加了如下规律")]),a._v(" "),e("ol",[e("li",[a._v("关键字只存在于叶子节点")]),a._v(" "),e("li",[a._v("叶子结点上存在指向下一个叶子节点的指针")])]),a._v(" "),e("h3",{attrs:{id:"b-树-2"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#b-树-2","aria-hidden":"true"}},[a._v("#")]),a._v(" B*树")]),a._v(" "),e("p",[a._v("相对于B+树，增加了如下规律")]),a._v(" "),e("ol",[e("li",[a._v("每个非叶子节点可以拥有[2/3m, m]个节点")]),a._v(" "),e("li",[a._v("每个非叶子结点还存储了其兄弟节点的指针")]),a._v(" "),e("li",[a._v("分裂时，先看兄弟节点是否有空闲，\n"),e("ol",[e("li",[a._v("有的话放入兄弟节点")]),a._v(" "),e("li",[a._v("没空的话与兄弟节点分别拿出1/3组成新节点")])])])]),a._v(" "),e("h2",{attrs:{id:"innodb索引"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#innodb索引","aria-hidden":"true"}},[a._v("#")]),a._v(" innodb索引")]),a._v(" "),e("h3",{attrs:{id:"索引分类"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#索引分类","aria-hidden":"true"}},[a._v("#")]),a._v(" 索引分类")]),a._v(" "),e("h4",{attrs:{id:"聚簇索引"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#聚簇索引","aria-hidden":"true"}},[a._v("#")]),a._v(" 聚簇索引")]),a._v(" "),e("p",[a._v("创建条件：一般是主键索引，当指定主键时，会根据主键建立聚簇索引\n当未指定主键时，寻找unique列建立聚簇索引\n若没有unique列，则在隐藏列建立聚簇索引\n特点：叶子结点上存储整条数据")]),a._v(" "),e("h4",{attrs:{id:"二级索引"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#二级索引","aria-hidden":"true"}},[a._v("#")]),a._v(" 二级索引")]),a._v(" "),e("p",[a._v("特点：叶子结点上存储关键字数据和聚簇索引指针")]),a._v(" "),e("h3",{attrs:{id:"索引匹配过程"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#索引匹配过程","aria-hidden":"true"}},[a._v("#")]),a._v(" 索引匹配过程")]),a._v(" "),e("p",[a._v("select * from user\nwhere a >= 0 and a <= 1 and b = 2 and c > 1 and c < 10 and d != 4 and e = 1\ni_index1(a, b, c)\ni_index2(e)\n数据的匹配一般有如下步骤")]),a._v(" "),e("ol",[e("li",[a._v("index key\n"),e("ol",[e("li",[a._v("index first key")])])])]),a._v(" "),e("p",[a._v("找到where中=、>=、in操作符，以>、!=截止\n我们可以找到a>=0，b=2，c > 1")]),a._v(" "),e("ol",{attrs:{start:"2"}},[e("li",[a._v("index last key")])]),a._v(" "),e("p",[a._v("找到where条件中=、<=、in操作符，以<、!=截止\n我们可以找到a<=1，b=2，c<10")]),a._v(" "),e("ol",{attrs:{start:"2"}},[e("li",[a._v("index filter")])]),a._v(" "),e("p",[a._v("在步骤一中找到的数据，逐条跟i_index2比较，即判断是否e=1\n5.6之前不支持，5.6之后有了ICP就支持了")]),a._v(" "),e("ol",{attrs:{start:"3"}},[e("li",[a._v("table filter")])]),a._v(" "),e("p",[a._v("mysql server层中进行，将筛选出的数据跟最后作比较，及判断是否满足d!=4")]),a._v(" "),e("h3",{attrs:{id:"常见问题"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#常见问题","aria-hidden":"true"}},[a._v("#")]),a._v(" 常见问题")]),a._v(" "),e("h4",{attrs:{id:"为什么是最左匹配？"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#为什么是最左匹配？","aria-hidden":"true"}},[a._v("#")]),a._v(" 为什么是最左匹配？")]),a._v(" "),e("p",[a._v("a like 'asdf%'则可以走a相关的索引，a like '%asdf'则走不到，字符串在创建索引时是根据字典序创建的")]),a._v(" "),e("h4",{attrs:{id:"回表是什么？"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#回表是什么？","aria-hidden":"true"}},[a._v("#")]),a._v(" 回表是什么？")]),a._v(" "),e("p",[a._v("根据二级索引进行筛选数据时，需要根据索引上存储的聚簇索引指针回到聚簇索引中去取数据")]),a._v(" "),e("h4",{attrs:{id:"一颗b-树能存多少数据？"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#一颗b-树能存多少数据？","aria-hidden":"true"}},[a._v("#")]),a._v(" 一颗B+树能存多少数据？")]),a._v(" "),e("p",[a._v("每棵树能存的最大数据量和其层数以及阶树有关\n设主键的存储类型所占空间为x，整行数据所占空间为y\ninnodb的最小存储单元为页，每页16k\nB+树的非叶子结点所占空间为x + 指针所占空间，即（x + 6），那么每页可以存储16k/(x+6)个指针，即这颗B+树最多16k/(x+6)阶\n每个指针指向一个数据页，每个数据页能存的数据就是16k/y\n故每棵树能存的最大数据量为[(16k/(x + 6))的(层数-1)次方] * 16k/y\n接下来我们代入数据\n假设主键存储类型为bigint，即x=8，每行数据为1k，B+树的高度为2\n(16k/(8 + 6)) * 16 = 1174 "),e("em",[a._v("16= 18724\n当B+树的高度为3\n[(16k/(8 + 6))的平方 ]")]),a._v(" 16 = 1174 "),e("em",[a._v("16= 21902400\n当B+树的高度为4\n[(16k/(8 + 6))的三次方 ]")]),a._v(" 16 = 1174 *16= 200多亿")])])}],!1,null,null,null);r.options.__file="索引.md";t.default=r.exports}}]);