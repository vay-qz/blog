(window.webpackJsonp=window.webpackJsonp||[]).push([[41],{236:function(_,v,a){"use strict";a.r(v);var i=a(0),t=Object(i.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var _=this,v=_.$createElement,a=_._self._c||v;return a("div",{staticClass:"content"},[a("h2",{attrs:{id:"名词解释"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#名词解释","aria-hidden":"true"}},[_._v("#")]),_._v(" 名词解释")]),_._v(" "),a("p",[_._v("TC——transaction coordinator——事务协调者\nTM——transaction manager——事务管理者\nRM——resource manager——资源管理者")]),_._v(" "),a("h2",{attrs:{id:"常见模式介绍"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#常见模式介绍","aria-hidden":"true"}},[_._v("#")]),_._v(" 常见模式介绍")]),_._v(" "),a("h3",{attrs:{id:"_2pc"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2pc","aria-hidden":"true"}},[_._v("#")]),_._v(" 2PC")]),_._v(" "),a("p",[_._v("定义：两阶段提交，p——prepare，c——confirm\n角色：TC、RM\n过程：")]),_._v(" "),a("blockquote",[a("ol",[a("li",[_._v("某个RM通知TC发起事务，TC通知所有RM开始第一阶段的事务准备工作，所有RM在准备完成后回答TC成功或者失败")]),_._v(" "),a("li",[_._v("TC对所有RM的回答进行处理\n"),a("ol",[a("li",[_._v("回答都是成功，则通知所有RM执行confirm")]),_._v(" "),a("li",[_._v("回答中某个RM回复失败，则通知所有RM执行cancel")])])])])]),_._v(" "),a("p",[_._v("问题")]),_._v(" "),a("ol",[a("li",[_._v("单点问题，TC向所有RM发送指令，如果TC挂了那么整个事务就挂了")]),_._v(" "),a("li",[_._v("性能问题\n"),a("ol",[a("li",[_._v("某个事务的结束取决于RM中执行最慢的那个，其他RM执行完之后都要等着最慢的那个完成")]),_._v(" "),a("li",[_._v("无事务时有RM自己通知别的RM，只需要一次IO。在2pc阶段，多出了回答和确认两次IO")])])]),_._v(" "),a("li",[_._v("一致性问题，由于网络的不稳定性，在第二阶段通知失败时，若某个RM并没有收到cancel时，则会产生数据的不一致问题")])]),_._v(" "),a("h3",{attrs:{id:"_3pc"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3pc","aria-hidden":"true"}},[_._v("#")]),_._v(" 3PC")]),_._v(" "),a("p",[_._v("定义：三阶段提交，ask，prepare，confirm\n角色：TC、RM\n过程：")]),_._v(" "),a("blockquote",[a("ol",[a("li",[_._v("TC询问每个RM是否可以提交，每个RM收到询问后查看自身资源，而后回答是否可以")]),_._v(" "),a("li",[_._v("TC对回复结果做处理\n"),a("ol",[a("li",[_._v("若回答结果全都是可以，则通知所有RM预提交\n"),a("ol",[a("li",[_._v("所有RM收到消息后，做预提交操作，完成后通知TC")]),_._v(" "),a("li",[_._v("TC对回复结果做处理\n"),a("ol",[a("li",[_._v("若所有RM都完成了预提交，则通知所有RM确认")]),_._v(" "),a("li",[_._v("若某个RM预提交失败，则通知所有RM取消")])])])])]),_._v(" "),a("li",[_._v("若回答结果中有回答不可以的，则通知所有RM事务结束")])])])])]),_._v(" "),a("p",[_._v("ps")]),_._v(" "),a("blockquote",[a("ul",[a("li",[_._v("在ask阶段，若超时未收到某个RM的消息，则默认放弃本次事务")]),_._v(" "),a("li",[_._v("在prepare阶段，若超时未收到TC的消息，则默认提交本次事务")])])]),_._v(" "),a("p",[_._v("相对于2pc的问题")]),_._v(" "),a("ol",[a("li",[_._v("单点问题：由于加入了超时机制，即使在TC宕机的情况下事务依然能够完成")]),_._v(" "),a("li",[_._v("性能问题\n"),a("ol",[a("li",[_._v("木桶原理的理由同2pc")]),_._v(" "),a("li",[_._v("由于IO更多，故性能比2pc还差")])])]),_._v(" "),a("li",[_._v("一致性问题，这里在2.a.ii.2的情况下，若出现网络异常，某些RM未收到取消的信息，那么这些RM就会由于超时自动提交事务，最终造成和收到消息的RM的数据不一致问题")])]),_._v(" "),a("h3",{attrs:{id:"at"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#at","aria-hidden":"true"}},[_._v("#")]),_._v(" AT")]),_._v(" "),a("p",[_._v("定义：Automatic Transaction\n角色：TC、TM、RM\n协议：基于XA协议，AT模式针对2pc中存在的问题进行了针对化的改进\n过程")]),_._v(" "),a("blockquote",[a("ol",[a("li",[_._v("服务发起方触发全局事务，由TM生成全局事务ID并通知TC")]),_._v(" "),a("li",[_._v("事务中的每个RM向TC注册分支，而后开启本地事务，记录before image和undolog，然后开启本地事务执行事务，执行完后生成after image，而后尝试尝试获取全局锁")]),_._v(" "),a("li",[_._v("若步骤一获取到全局锁，则提交事务，并向TC汇报结果")]),_._v(" "),a("li",[_._v("若所有TC分支本地事务都执行成功，则该分布式事务执行成功，TC通知TM提交全局事务")]),_._v(" "),a("li",[_._v("若步骤一最终未获取到全局锁，则根据before image和undolog回滚数据，并向TC汇报结果")]),_._v(" "),a("li",[_._v("TC在收到失败结果或等待超时后，向每个RM发送回滚指令，并通知TM回滚全局事务")]),_._v(" "),a("li",[_._v("收到TC指令的服务先将数据与after image比较，若不同则说明发生脏写，相同则根据before image和undolog进行回滚")])])]),_._v(" "),a("p",[_._v("由过程可以看出，AT模式的操作步骤都是在db层面进行操作的，对业务无影响。在AT模式中，默认的数据库隔离基本是RU，那么AT是如何避免脏读呢？没错，全局锁。当需要读取时，首先获取对应业务的全局锁\n假设在过程的步骤2和步骤6中，有另一个事务对相同行的数据进行了更改，发生了脏写，这种情况除了人工介入还有没有别的手段避免呢？没错，还是使用全局锁。在A2上也加上全局锁，这样A2在更新之前就需要先获取到全局锁才能进行更新了。\n当然，锁加的越多，隔离性越高，性能也就越差")]),_._v(" "),a("h3",{attrs:{id:"tcc"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#tcc","aria-hidden":"true"}},[_._v("#")]),_._v(" TCC")]),_._v(" "),a("h4",{attrs:{id:"本地tcc"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#本地tcc","aria-hidden":"true"}},[_._v("#")]),_._v(" 本地tcc")]),_._v(" "),a("p",[_._v("定义：t——try，c——confirm，c——cancel\n角色：RM\n过程：")]),_._v(" "),a("blockquote",[a("ol",[a("li",[_._v("创建事务id，记录在事务日志表中，向每个RM尝试try，即锁定资源阶段")]),_._v(" "),a("li",[_._v("对RM返回的结果进行处理\n"),a("ol",[a("li",[_._v("都返回成功，则将事务日志表对应行的阶段更新为confirm，而后对所有RM发送confirm操作")]),_._v(" "),a("li",[_._v("某个返回的失败或没有返回，则将事务日志表中对应行的阶段更新为cancel，而后对所有RM发送cancel操作")])])])])]),_._v(" "),a("p",[_._v("ps:若步骤2因为网络问题，某些RM未收到confirm或cancel指令，则事务发起者需要不断重试，直到通知到产生网络问题的RM，即最大努力交付")]),_._v(" "),a("p",[_._v("这里由于网络的不确定性，有可能产生如下问题")]),_._v(" "),a("ol",[a("li",[_._v("在2.b阶段，由于网络阻塞，事务发起者等待超时，向所有RM发送cancel指令，这时某个RM就会在并没有收到try指令的情况下收到了cancel指令。这种情况成为空回滚")]),_._v(" "),a("li",[_._v("在情况1中，没有收到try指令的RM在接收到cancel指令后，try指令到达了。这种情况成为悬挂")]),_._v(" "),a("li",[_._v("在2.b阶段，由于网络阻塞，事务发起者不断的发送cancel指令。此时TP接到了多个cancel，假设cancel的具体业务含义是账户金额-1，那么在实际情况中，就可能会被-2、-3而导致数据不一致的问题。")])]),_._v(" "),a("p",[_._v("上述三个问题对应的解决方法如下")]),_._v(" "),a("ol",[a("li",[_._v("空回滚：在没有接受的try指令的情况下，cancel方法直接返回true，即取消成功。这里需要RM记录事务id")]),_._v(" "),a("li",[_._v("悬挂：同样，被空回滚记录的事务id，在发生悬挂时不进行处理")]),_._v(" "),a("li",[_._v("数据不一致：要求cancel方法在设计时需要保证是幂等的")])]),_._v(" "),a("p",[_._v("tcc协议本身的问题")]),_._v(" "),a("ol",[a("li",[_._v("业务侵入性比较强，需要将一段业务拆分成两端逻辑")])]),_._v(" "),a("h4",{attrs:{id:"远端tcc"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#远端tcc","aria-hidden":"true"}},[_._v("#")]),_._v(" 远端tcc")]),_._v(" "),a("p",[_._v("角色：RM，TC\n过程：")]),_._v(" "),a("blockquote",[a("ol",[a("li",[_._v("事务发起RM发起分布式事务，通知TC生成全局id")]),_._v(" "),a("li",[_._v("事务发起RM向每个RM尝试try，即锁定资源阶段")]),_._v(" "),a("li",[_._v("每个RM先向TC注册分支事务，而后执行try操作，并回复事务发起RM")]),_._v(" "),a("li",[_._v("事务发起RM对RM返回的结果进行处理\n"),a("ol",[a("li",[_._v("都返回成功，则通知TC该分布式事务confirm")]),_._v(" "),a("li",[_._v("某个返回的失败或没有返回，则通知TC该分布式事务cancel")])])]),_._v(" "),a("li",[_._v("TC收到事务发起者的指令，开始通知所有RMconfirm或者cancel")])])]),_._v(" "),a("p",[_._v("远端tcc并没有解决本地tcc协议的问题\n只是将问题的解决从事务发起RM放到了TC中。\n远端tcc模式下\n业务依然需要将一段逻辑拆分成两段，拆分后的两段逻辑依然需要保证幂等\n但是事务发起RM不再负责分布式事务的整个阶段，在对所有参与RM完成try后，即可功成身退，后续的事情由TC完成。")]),_._v(" "),a("h3",{attrs:{id:"saga"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#saga","aria-hidden":"true"}},[_._v("#")]),_._v(" SAGA")]),_._v(" "),a("p",[_._v("定义：出自论文《sagas》，全称是Long Lived Transaction，即长活事务\nsaga的核心思想是将一个分布式事务分成多个本地事务来完成。这些子事务全部执行完毕的结果应该和分布式事务的执行结果相一致。每个子事务都要有对应的补偿手段。")]),_._v(" "),a("blockquote",[a("ol",[a("li",[_._v("按照子事务的执行顺序a1->a2->a3...an依次执行")]),_._v(" "),a("li",[_._v("若步骤1全部执行成功则该分布式事务成功")]),_._v(" "),a("li",[_._v("若步骤1执行到ai发送故障，则根据业务进行如下选择\n"),a("ol",[a("li",[_._v("重试ai，在ai成功后继续执行ai->ai+1...an")]),_._v(" "),a("li",[_._v("执行ai->ai-1...an的补偿操作")]),_._v(" "),a("li",[_._v("重试ai一定次数，若成功则继续执行ai->ai+1...an，否则执行ai->ai-2...an的补偿操作")])])])])]),_._v(" "),a("p",[_._v("那么在tcc中存在的空回滚、悬挂、幂等这三个问题在这里依然存在。")]),_._v(" "),a("ul",[a("li",[_._v("空回滚：在步骤3.b中，发送ai执行的包丢失了，在超时后，负责执行ai的服务收到了执行ai补偿操作的指令，这是就会出现空回滚")]),_._v(" "),a("li",[_._v("悬挂：在步骤3.b中，发送ai执行的包阻塞了，在超时后，负责执行ai的服务收到了执行ai补偿操作的指令，在执行完补偿后，发送ai执行的包到达了")]),_._v(" "),a("li",[_._v("数据不一致：在步骤3.c和3.a中，可能网络包会阻塞，负责执行的服务可能会收到多次")])]),_._v(" "),a("p",[_._v("上述三个问题的解决方案同tcc\n除了上述三个问题之外，正向补偿an和补偿事务An还需要满足以下条件")]),_._v(" "),a("ul",[a("li",[_._v("补偿事务An默认成功不会失败")]),_._v(" "),a("li",[_._v("正向补偿an和补偿事务An应该满足交换律")])]),_._v(" "),a("p",[_._v("saga由于存在补偿的操作，故其隔离性是很差的，在极限情况下，有可能出现脏写现象，一旦出现这种现象，就只能人工接入了。而为了解决隔离性的问题，一般有如下两种思路")]),_._v(" "),a("ul",[a("li",[_._v("业务上不要回滚，在步骤3中选择a选项")]),_._v(" "),a("li",[_._v("流程设计时存下“宁可长款，不可短款”原则")])]),_._v(" "),a("h3",{attrs:{id:"可靠消息模式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#可靠消息模式","aria-hidden":"true"}},[_._v("#")]),_._v(" 可靠消息模式")]),_._v(" "),a("h4",{attrs:{id:"使用事务mq实现"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#使用事务mq实现","aria-hidden":"true"}},[_._v("#")]),_._v(" 使用事务MQ实现")]),_._v(" "),a("p",[_._v("定义：利用支持事务的MQ的事务消息机制来保证多个事务正常完成\n过程")]),_._v(" "),a("blockquote",[a("ol",[a("li",[_._v("TC1开启事务，发送事务消息，而后执行本地事务")]),_._v(" "),a("li",[_._v("若本地事务执行成功，则标志事务消息为完成，否则则撤销事务消息")]),_._v(" "),a("li",[_._v("消息的订阅者收到完整消息后开始执行自己的本地事务，重复1、2步骤，直至分布式事务全部完成")])])]),_._v(" "),a("p",[_._v("问题：")]),_._v(" "),a("ol",[a("li",[_._v("需要引入支持事务消息的MQ")]),_._v(" "),a("li",[_._v("对流程要求过于严格")])]),_._v(" "),a("p",[_._v("由于上述两个问题，可靠消息模式有以下变形")]),_._v(" "),a("h4",{attrs:{id:"本地消息表"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#本地消息表","aria-hidden":"true"}},[_._v("#")]),_._v(" 本地消息表")]),_._v(" "),a("p",[_._v("定义：利用本地db事务机制来保证多个事务正常完成\n过程")]),_._v(" "),a("blockquote",[a("ol",[a("li",[_._v("TC1开启事务，执行业务逻辑，并向本地消息表中插入一条数据，本地事务完成。而后通知下一个TC，并在收到回复后将完成状态更新到本地消息表中")]),_._v(" "),a("li",[_._v("下一个TC在收到通知后要回复收到，而后重复步骤1，直到分布式事务完成")])])]),_._v(" "),a("p",[_._v("ps：开启轮询线程轮询本地db分布式事务表。对表中未完成的数据进行重试操作")]),_._v(" "),a("p",[_._v("这个模式和可靠消息模式的区别在于，由于网络的不稳定性，通知操作应该保证幂等性")]),_._v(" "),a("h3",{attrs:{id:"最大努力交付"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#最大努力交付","aria-hidden":"true"}},[_._v("#")]),_._v(" 最大努力交付")]),_._v(" "),a("p",[_._v("可以简单理解为SAGA模式只允许正向补偿的一种类型")]),_._v(" "),a("h2",{attrs:{id:"ha"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#ha","aria-hidden":"true"}},[_._v("#")]),_._v(" HA")]),_._v(" "),a("p",[_._v("TC、TM和RM都是逻辑角色，有可能最终的实现都是应用程序自己来完成，也有可能这三个角色都是独立的服务。\n将TC独立出去成为单独的集群，可以解决单点问题。\n假设我在分布式执行的过程中，当前负责处理的节点发送了broken，那么该如何走下去呢？")]),_._v(" "),a("ol",[a("li",[_._v("每个本地事务执行的开始应该在本地有所记录，即本地事务表\n"),a("ol",[a("li",[_._v("由TC集群来监控，将未完成的任务交给其他节点")]),_._v(" "),a("li",[_._v("起定时任务，定时轮询任务状态")])])])]),_._v(" "),a("p",[_._v("​")]),_._v(" "),a("p",[_._v("​")])])}],!1,null,null,null);t.options.__file="分布式事务.md";v.default=t.exports}}]);