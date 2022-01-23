(window.webpackJsonp=window.webpackJsonp||[]).push([[39],{239:function(t,r,_){"use strict";_.r(r);var v=_(0),e=Object(v.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var t=this,r=t.$createElement,_=t._self._c||r;return _("div",{staticClass:"content"},[_("h2",{attrs:{id:"简介"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#简介","aria-hidden":"true"}},[t._v("#")]),t._v(" 简介")]),t._v(" "),_("p",[t._v("redis集群的三种形式")]),t._v(" "),_("ol",[_("li",[t._v("主从")])]),t._v(" "),_("blockquote",[_("p",[t._v("一主多从，主从节点数据一致，从节点可以处理读请求，分担主节点的压力")])]),t._v(" "),_("ol",{attrs:{start:"2"}},[_("li",[t._v("哨兵")])]),t._v(" "),_("blockquote",[_("p",[t._v("在主从的基础上加入了哨兵机制，当主节点crash时，哨兵选举出新的主节点，并自动切换")])]),t._v(" "),_("ol",{attrs:{start:"3"}},[_("li",[t._v("分片cluster")])]),t._v(" "),_("blockquote",[_("p",[t._v("cluster中的节点都提供读写服务，但是每个节点只保存部分数据")])]),t._v(" "),_("h2",{attrs:{id:"主从"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#主从","aria-hidden":"true"}},[t._v("#")]),t._v(" 主从")]),t._v(" "),_("p",[t._v("当业务的qps过高，且业务的读请求占比较大时，可以使用主从的集群方式。将读流量打到从节点，分担主节点的压力。那么主节点和从节点之间的数据时怎么同步的呢？")]),t._v(" "),_("ol",[_("li",[t._v("刚开始连上主节点时")])]),t._v(" "),_("p",[t._v("主节点将自己的数据生成rdb，而后将rdb同步给从节点\n从节点接收到主节点的rdb数据，写入自己的内存中")]),t._v(" "),_("ol",{attrs:{start:"2"}},[_("li",[t._v("保持同步之后")])]),t._v(" "),_("p",[t._v("主节点采用aof日志的方式将增量更新数据同步给从节点")]),t._v(" "),_("ol",{attrs:{start:"3"}},[_("li",[t._v("从节点发生crash并从crash中恢复后")])]),t._v(" "),_("p",[t._v("主节点中会使用buffer环来保存需要同步的数据，在这个环上，主节点会记录当前的指针以及从节点同步的指针。当从节点恢复后，将自己的同步指针告知主节点，主节点将该节点之后的数据同步给从节点。若落后数据过多，则进行全量同步\n在第一步中有一个问题：主节点在生成rdb的过程中，产生的写请求如何处理？\nCOW/copy-on-write/写时复制技术\n被修改的数据页单独成为一个buffer，在同步完成后，将这些buffer同步给从节点")]),t._v(" "),_("h2",{attrs:{id:"哨兵"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#哨兵","aria-hidden":"true"}},[t._v("#")]),t._v(" 哨兵")]),t._v(" "),_("blockquote",[_("p",[_("strong",[t._v("背景")]),t._v("\n在主从模式下，所有的发起方都是主节点，那么该如何解决主节点的单点问题呢？\n当主节点crash时")]),t._v(" "),_("ol",[_("li",[t._v("运维同学马上就发现了")]),t._v(" "),_("li",[t._v("立马选中一个存活的从节点")]),t._v(" "),_("li",[t._v("在其余所有的从节点上执行命令，使其余的从节点都跟随选中的丛节点。")])])]),t._v(" "),_("p",[t._v("以上三步最大的问题就是慢，整个过程由人完成，耗费的时间必然是分钟级别的。而且选中的从节点并不一定就是最合适的。于是哨兵模式诞生了")]),t._v(" "),_("p",[t._v("哨兵进程其实就是一个在特殊状态下的redis进程。\n所做的工作就是以上背景运维同学做的工作")]),t._v(" "),_("ol",[_("li",[t._v("发现主节点down了，标记主观下线，询问其他哨兵")]),t._v(" "),_("li",[t._v("超过半数哨兵回答主节点down了，标记主节点客观下线，开启主节点选举，目的是选出最适合的节点当主节点，投票规则如下\n"),_("ol",[_("li",[t._v("网络好的")]),t._v(" "),_("li",[t._v("用户推荐的")]),t._v(" "),_("li",[t._v("id大的")])])]),t._v(" "),_("li",[t._v("选出主节点后，通知其他从节点跟随新的主节点")])]),t._v(" "),_("p",[t._v("哨兵如何选出leader呢？redis采用的是raft协议来进行，但是开头结尾不大一样\n触发\nraft：从节点超时\nsentinel：主节点客观下线\n过程同raft，增加任期，先到先得选票\n结束\nraft：leader主动通知follower\nsentinel：检测到新的主节点被选出")]),t._v(" "),_("h2",{attrs:{id:"分片cluster"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#分片cluster","aria-hidden":"true"}},[t._v("#")]),t._v(" 分片cluster")]),t._v(" "),_("blockquote",[_("p",[_("strong",[t._v("背景")]),t._v("\n解决了读的问题，单点问题。那如果单纯是缓存的数据量过大，redis性能下降该如何处理呢\n当然是将不同的数据放在不同的redis中了")])]),t._v(" "),_("ol",[_("li",[t._v("redis会首先分为16384个哈希槽")]),t._v(" "),_("li",[t._v("根据集群中的redis实例数来进行分槽，每个redis分到一部分哈希槽")])]),t._v(" "),_("p",[t._v("而后每次读写都会对每个key进行CRC算法来计算key所属的槽位。\n当收到不属于本实例的请求时，要返回起应该去的实例的地址。那么如何每个实例如何直到其他实例的情况呢？\n分片集群中采用Gossip协议实现")])])}],!1,null,null,null);e.options.__file="集群.md";r.default=e.exports}}]);