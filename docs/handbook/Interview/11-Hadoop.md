# Hadoop

## 入门

### 1.集群的最主要瓶颈

- 磁盘IO

### 2.Hadoop运行模式✔

- 本地模式/单机模式（Local Mode）
  - 在本地模式下，**所有的 Hadoop 组件都在单个 Java 虚拟机（JVM）中运行**，不需要启动 Hadoop 集群。这种模式适用于开发和测试，并且通常用于小规模数据处理。
  - 只是用来演示一下官方案例。生产环境不用
- 伪分布式模式（Pseudo-Distributed Mode）
  - 在伪分布式模式下，**Hadoop 安装在单个节点上，但每个组件（如 HDFS、YARN 和 MapReduce）都在不同的 JVM 中独立运行**。这样使得用户可以模拟一个真实的分布式环境，用于测试和调试。
  - 也是单机运行，**但是具备Hadoop集群的所有功能，一台服务器模拟一个分布式的环境**。个别缺钱的公司用来测试，生产环境不用。
- 完全分布式模式（Fully-Distributed Mode）
  - 完全分布式模式是 Hadoop 在真实分布式环境中的运行模式。在这种模式下，**Hadoop 集群由多个节点组成，每个节点都有自己的角色**（如 NameNode、DataNode、ResourceManager、NodeManager 等）。数据和计算任务在整个集群中进行分布和处理。
  - **多台服务器组成分布式环境**。生产环境使用。

在完全分布式模式下，Hadoop 集群的架构通常包括一个主节点（Master Node）和多个从节点（Slave Node）。**主节点负责管理整个集群，从节点负责存储和处理数据**。

通过选择适合你的需求的运行模式，你可以在不同规模和场景下使用 Hadoop 进行大数据处理和分析。

### 3.Hadoop生态圈的组件并做简要描述

1. Zookeeper：**是一个开源的分布式应用程序协调服务**,基于zookeeper可以实现同步服务，配置维护，命名服务。
2. Flume：**一个高可用的，高可靠的，分布式的海量日志采集、聚合和传输的系统。**
3. Hbase：**是一个分布式的、面向列的开源数据库**, 利用Hadoop HDFS作为其存储系统。
4. Hive：**基于Hadoop的一个数据仓库工具**，可以将结构化的数据档映射为一张数据库表，并提供简单的sql 查询功能，可以将sql语句转换为MapReduce任务进行运行。
5. Sqoop：**将一个关系型数据库中的数据导进到Hadoop的 HDFS中，也可以将HDFS的数据导进到关系型数据库中。**

### 4.解释Hadoop和Hadoop生态系统两个概念

- Hadoop是指Hadoop框架本身；
- hadoop生态系统，不仅包含hadoop，还包括保证hadoop框架正常高效运行其他框架，比如zookeeper、Flume、Hbase、Hive、Sqoop等辅助框架。

### 5.请列出正常工作的Hadoop集群中需要启动那些进程，它们的作用分别是什么✔

- NameNode
  - 管理DataNode、维护所有文件和目录，以Fsimage+Editlog文件的形式永久保存在磁盘上
  - 记录每个文件所在的节点信息，不保存，启动时会进行重建

- DataNode
  - 存储数据块，受client或NameNode调度
  - 定期向NameNode发送数据块的信息

- SecondAryNameNode`定期合并Editlog和FSimage文件，减少NameNode启动时间`
- Resourcemanager`调度DataNode`
  - 管理集群上资源的使用

- NodeManager`执行任务`
  - 运行在集群中所有节点上的节点管理器

- ZKFC`监控NameNode的状态，写入ZooKeeper中`、
- JournalNode`NameNode的EditLog文件`

### 6.Hadoop常用端口号✔

|      | HDFS WEB端口 | YARN WEB端口 | 历史服务器 | HDFS客户端端口(fs.defaultFS) |
| ---- | ------------ | ------------ | ---------- | ---------------------------- |
| 2.x  | 50070        | 8088         | 19888      | 8020(9000)                   |
| 3.x  | 9870         | 8088         | 19888      | 8020                         |

### 核心配置文件✔

| 版本号 |               |               |               |                 |         |                        |
| ------ | ------------- | ------------- | ------------- | --------------- | ------- | ---------------------- |
| 2.x    | core-site.xml | hdfs-site.xml | yarn-site.xml | mapred-site.xml | slaves  | capacity-scheduler.xml |
| 3.x    | core-site.xml | hdfs-site.xml | yarn-site.xml | mapred-site.xml | workers | capacity-scheduler.xml |

查看yarn应用的日志？

- 8088页面点进去
- `yarn logs -applicationId appid`

HA

1. HDFS HA 会多出那些进程？

   ZKFC(与ZooKeeper通信)、JournalNode(同步元数据)

2. YARN HA



### Hadoop宕机

- MR：控制Yarn同时运行的任务数
- 写入文件快：控制传输到HDFS的速度



## HDFS

### 7.hdfs数据读写流程✔

**写流程**

![image-20230910093621054](https://gitee.com/tjlxy/img/raw/master/image-20230910093621054.png)

1. Client 客户端发送上传请求，**通过 RPC(远程过程调用)与 NameNode 建立通信**，NameNode 检查该用户是否有上传权限，以及上传的文件是否在 HDFS 对应的目录下重名，如果这两者有任意一个不满足，则直接报错，如果两者都满足，则 **返回给客户端**一个可以上传的信息；
2. Client 根据文件的大小进行切分，默认 128M 一块，切分完成之后给 NameNode 发送请求第一个 block 块上传到哪些服务器上
3. NameNode 收到请求之后，根据网络拓扑和机架感知以及副本机制进行文件分配，返回可用的 DataNode 的地址；`Hadoop 在设计时考虑到数据的安全与高效, **数据文件默认在 HDFS 上存放三份, 存储策略为本地一份，同机架内其它某一节点上一份, 不同机架的某一节点上一份。**`
4. 客户端收到地址之后与服务器地址列表中的一个节点如 A 进行通信，本质上就是 RPC 调用，建立 pipeline(通信管道)，A 收到请求后会继续调用 B，B 在调用 C，将整个 pipeline 建立完成，逐级返回 Client；
5. Client 开始向 A 上发送第一个 block**（先从磁盘读取数据然后放到本地内存缓存），以 packet（数据包，64kb）为单位，A 收到一个 packet 就会发送给 B，然后B发送给C，A每传完一个packet就会放入一个应答队列等待应答**
6. 数据被分割成一个个的 packet 数据包在 pipeline 上依次传输，**在pipeline 反向传输中，逐个发送 ack（命令正确应答）**，最终由 pipeline 中第一个 DataNode节点A将pipelineack 发送给 Client
7. **当一个block传输完成之后, Client再次请求NameNode上传第二个block， NameNode重新选择三台DataNode给Client。**

**读流程**

![image-20230910093445328](https://gitee.com/tjlxy/img/raw/master/image-20230910093445328.png)

1. Client向NameNode发送RPC请求请求文件block的位置
2. NameNode 收到请求之后会检查用户权限以及是否有这个文件，如果都符合，则会视情况返回部分或全部的 block 列表，对于每个 block，NameNode 都会返回含有该 block 副本的 DataNode 地址；这些返回的 DataNode 地址， 会按照集群拓扑结构得出 DataNode 与客户端的距离，然后进行排序，排序两个规则：网络拓扑结构中距离 Client 近的排靠前；心跳机制中超时 汇报的 DataNode 状态为 STALE，这样的排靠后；
3. Client 选取排序靠前的DataNode来读取block，如果客户端本身就是 DataNode,那么将从本地直接获取数据(**短路读取特性**)
4. 底层上本质是建立SocketStrea（FSDataInputStream），重复的调用父类 DataInputStream的read方法，直到这个块上的数据读取完毕；
5. 当读完列表的block后，若文件读取还没有结束，客户端会继续向 NameNode 获取下一批的block列表；
6. **读取完一个block都会进行 checksum 验证**，如果读取DataNode时出现错误，客户端会通知NameNode，然后再从**下一个拥有该 block 副本的 DataNode 继续读；**
7. **read方法是并行的读取block信息，不是一块一块的读取**；NameNode只是返回 Client请求包含块的DataNode地址，并不是返回请求块的数据
8. **最终读取来所有的 block 会合并成一个完整的最终文件**

### 8.HDFS在读取文件的时候，如果其中一个块突然损坏了怎么办

- 客户端读取完DataNode上的块之后会进行checksum验证，也就是把客户端读取到本地的块与HDFS上的原始快进行校验，如果发现校验结果不一致，客户端会通知NameNode，然后在从下一个拥有该block副本的DataNode继续读

### 9.HDFS在上传文件的时候，如果其中一个DataNode突然挂掉了怎么办

- 在文件上传时，会进行反方向ack验证，如果DataNode挂掉，客户端就接收不到这个DataNode发送的ack确认，客户端就会通知NameNode，NameNode检查该块的副本与规定的不符，NameNode会通知DataNode去复制副本，并将挂掉的DataNode下线处理，不在让他参与文件的上传与下载。

### 10.NameNode在启动的时候会做哪些操作✔

- 格式化文件系统，生成FSimage文件
- 启动NameNode
  - 读取Fsimage文件，将文件内容加载到内存
  - 等待DataNode发起注册与发送blockreport

- 启动DataNode
  - 向NameNode注册
  - 发送blockreport
  - 检查Fsimage中记录的块的数量与block中块的数量是否一致

- 进行操作（创建、删除文件）
- 第二次启动
  - 读取Fsimage和Editlog文件
  - 将Fsimage和Editlog文件合并成新的Fsimage文件
  - 创建新的Editlog文件，内容开始为空
  - 启动DataNode


### 11.SecondaryNameNode了解吗，它的工作机制是怎样的(数据持久化)✔

- 合并NameNode的Editlog到Fsimage文件中

![image-20230910095119496](https://gitee.com/tjlxy/img/raw/master/image-20230910095119496.png)

Secondary NameNode 是合并 NameNode 的 edit logs 到 fsimage 文件中； 它的具体工作机制：

1. SecondaryNameNode询问NameNode是否需要checkpoint(检查点)，直接带回NameNode是否检查结果
2. SecondaryNameNode请求执行checkpoint
3. NameNode滚动正在写的edits日志
4. 将滚动前的编辑日志(editlog)和镜像文件（Fsimage）拷贝到secondaryNameNode
5. secondaryNameNode加载编辑日志和镜像文件到内存，并合并
6. 生成新的镜像文件Fsimage.chkpoint
7. 拷贝Fsimage.chkpoint到NameNode
8. NameNode将Fsimage.chcpoint重新命名成fsimage

所以如果 NameNode 中的元数据丢失，是可以从 Secondary NameNode 恢复一部分元数据信息的，但不是全部，因为 NameNode正在写的edits日志还没有拷贝到 Secondary NameNode，这部分恢复不了

### 12.SecondaryNameNode不能恢复NameNode的全部数据，那如何保证NameNode数据存储安全(Ha高可用)

这个问题就要说 NameNode 的高可用了，即 NameNode HA

一个NameNode有单点故障的问题，那就配置双NameNode，配置有两个关键点，**一是必须要保证这两个 NameNode的元数据信息必须要同步的，二是一个NameNode挂掉之后另一个要立马补上**

1. **元数据信息同步在 HA 方案中采用的是“共享存储”**。每次写文件时，需要将日志同步写入共享存储，这个步骤成功才能认定写文件成功。然后备份节点定期从共享存储同步日志，以便进行主备切换
2. **监控NameNode状态采用zookeeper，两个NameNode节点的状态存放在zookeeper中，**另外两个NameNode节点分别有一个进程监控程序，实施读取 zookeeper中有NameNode的状态，来判断当前的NameNode是不是已经宕机。如果Standby的 NameNode节点的ZKFC发现主节点已经挂掉，那么就会强制给原本的 Active NameNode节点发送强制关闭请求，之后将备用的 NameNode设置为 Active

### 13.在NameNodeHa中，会出现脑裂问题吗？怎么解决脑裂

> **假设 NameNode1当前为Active状态，NameNode2当前为Standby状态。如果某一时刻 NameNode1对应的ZKFailoverController进程发生了“假死”现象，那么Zookeeper服务端会认为NameNode1挂掉了，根据前面的主备切换逻辑，NameNode2会替代NameNode1 进入 Active状态。但是此时NameNode1可能仍然处于Active状态正常运行，这样 NameNode1和NameNode2都处于 Active状态，都可以对外提供服务。这种情况称为脑裂。**

- 调用旧ActivateNameNode的HAServiceProtocolRPC接口的`transitionToStandby`方法
- ssh登录到目标机器上，执行命令fuser将对应的进程杀死，或者执行一个用户自定义的shell脚本来将对应的进程隔离

### 14.小文件过多会有什么危害，如何避免✔

1. 危害：

   1. 影响NameNode内存（1个文件块，占用namenode多大内存150字节b）

      Hadoop上大量HDFS元数据信息存储在NameNode内存中,因此过多的小文件必定会压垮 NameNode的内存。

   2. 影响MapTask的数量（浪费资源）

      每个小文件都会起到一个MapTask，1个MapTask默认内存1G。浪费资源

2. 处理

   1. har归档，将小文件归档

   2. JVM重用：不解决，只是提高效率，一般设置重用10次

      1. MapTask、ReduceTask都是进程级别，运行在JVM上，因此都要经历：启动JVM，销毁JVM，

         有小文件场景开启JVM重用；如果没有小文件，不要开启JVM重用，因为会一直占用使用到的task卡槽，直到任务完成才释放。

         JVM重用可以使得JVM实例在同一个job中重新使用N次，N的值可以在Hadoop的mapred-site.xml文件中进行配置。通常在10-20之间

         ```xml
         <property>
         
             <name>mapreduce.job.jvm.numtasks</name>
         
             <value>10</value>
         
             <description>How many tasks to run per jvm,if set to -1 ,there is no limit</description>
         
         </property>  
         ```

         从切片的角度：

   3. `CombineTextInputFormat`将多个小文件读到一个MapTask中（避免MapTask的数量过多，浪费资源）

   4. **启动一个合并任务（reduce的数量）** 

### 15.请说下HDFS的组织架构✔

- client
  - 切分文件
  - 与NameNode交互，获取文件位置信息
  - 与DataNode交互，读取或写入数据
  - 管理HDFS

- NameNode
  - 管理HDFS命名空间
  - 管理数据块映射信息
  - 管理副本配置策略
  - 处理客户端读写请求

- DataNode
  - 存储实际的数据块
  - 执行数据块的读写操作

- SecondaryNameNode
  - 辅助NamNode，分担其工作量
  - 定期合并Fsimage和Editlog文件，减少NameNode启动时间
  - 辅助恢复NameNode一部分数据




### 16.HDFS中的block默认保存几份✔

- 3、

### 17.HSDS默认BlockSize是多大✔

【64M--Hadoop2.72】【Hadoop2.73--128M】

1. `2.73`之前：64M
2. `2.74`及之后：128M
3. `hive`：256M
4. 企业怎么选
   1. 一般企业，128M
   2. 大厂，256M

### HDFS的NameNode内存

1）Hadoop2.x系列，配置NameNode默认2000m

2）Hadoop3.x系列，配置NameNode内存是动态分配的

​    NameNode内存最小值1G，每增加100万个block，增加1G内存。



### 纠删码（CPU资源换取存储空间）计算 换 空间

1. 提高存储利用率
   1. 存100M的文件，3个副本，需要多少存储空间？=》300M的存储空间
   2. 300M的存储空间，能存多少数据？=》100/300 = 33%（利用率）

2. 企业怎么选
   1. 一般企业，不开纠删码功能：磁盘 比 CPU便宜
   2. 大厂，开启纠删码功能：不差钱、提高存储利用率

### 异构存储（不同盘存不同数据，根据实际数据情况）

1. 热数据：频繁访问
2. 冷数据：很少访问
3. HDFS可以

### HDFS能不能并发写入

1. 不能，并发写入：对于同一个文件来讲只能有一个在写入



扩容、缩容

白名单、黑名单

### HDFS的数据压缩算法

- snappy。。。

## MapReduce

### 请说下MR中shuffle阶段✔

- `MapTask`

- - `read`
  - `map`
  - **`collect`**
  - **`spill`**
  - **`combine`**

- `ReduceTask`

- - **`copy`**
  - **`Merge`**
  - **`Sort`**
  - `Reduce`

![image-20230911111523509](https://gitee.com/tjlxy/img/raw/master/image-20230911111523509.png)

![image-20230911111606386](https://gitee.com/tjlxy/img/raw/master/image-20230911111606386.png)

shuffle 是 Mapreduce 的核心，它分布在 Mapreduce 的 map 阶段和 reduce 阶段。一般把从 Map 产生输出开始到 Reduce 取得数据作为输入之前的过程称作 shuffle

1. **Collect阶段**：将MapTask的结果输出到默认大小为 100M 的环形缓冲区， 保存的是 key/value，Partition 分区信息等
2. **Spill 阶段**：当内存中的数据量达到一定的阀值的时候，就会将数据写入本地磁盘，在将数据写入磁盘之前需要对数据进行一次排序的操作，如果配置了 combiner，还会将有相同分区号和 key 的数据进行排序。
3. **MapTask阶段的Merge**：把所有溢出的临时文件进行一次合并操作，以确保一个 MapTask 最终只产生一个中间数据
4. **Copy阶段**：ReduceTask 启动 Fetcher 线程到已经完成 MapTask 的节点上复制一份属于自己的数据，**这些数据默认会保存在内存的缓冲区中，当内存的缓冲区达到一定的阀值的时候，就会将数据写到磁盘之上。**
5. **ReduceTask阶段的Merge**：在ReduceTask 远程复制数据的同时，会在后台开启两个线程对内存到本地的数据文件进行合并操作。
6. **Sort阶段**：在对数据进行合并的同时，会进行排序操作，由于 MapTask 阶段已经对数据进行了局部的排序，ReduceTask 只需保证 Copy 的数据的最终整体有效性即可。

### shuffle阶段是数据压缩机制了解吗✔

- GZip
- LZO
- Zippy/**Snappy**（常用）

### 21.在写MR时，什么情况下可以使用规约

规约（combiner）是不能够影响任务的运行结果的局部汇总，适用于求和类，不适用于求平均值，

如果reduce的输入参数类型和输出参数类型是一样的，则规约的类可以使用reduce类

### 22.谈谈Hadoop序列化和反序列化及自定义bean对象实现序列化

- 序列化就是把内存中的对象，转换成字节序列
- 反序列化就是将字节序列或硬盘持久化的数据转换成内存中的对象
- Java的序列化是一个重量级序列化框架（Serializable），一个对象被序列化后，会附带很多额外的信息（各种校验信息，header，继承体系等），不便于在网络中高效传输。所以，hadoop自己开发了一套序列化机制（Writable），精简、高效。

### 23.FileInputFormat切片机制

- 按照文件的内容长度进行切片
- 切片大小默认就是block大小（本地模式32，yarn128，老版本64）
- 不考虑数据集整体，针对每个文件单独切片

> ​    比如待处理数据有两个文件：
>
> ​    file1.txt    330M
>
> ​    file2.txt    10M
>
> ​    经过FileInputFormat的切片机制运算后，形成的切片信息如下：  
>
> ​    file1.txt.split1--  0~128
>
> ​    file1.txt.split2--  128~256
>
> ​    file1.txt.split3--  256~330
>
> ​    file2.txt.split1--  0~10M

### 24.如何判定一个job的map和reduce的数量

1）map数量

  splitSize=max{minSize,min{maxSize,blockSize}}

  map数量由处理的数据分成的block数量决定default_num = total_size / split_size;

2）reduce数量

  reduce的数量job.setNumReduceTasks(x);x 为reduce的数量。不设置的话默认为 1。

### 25.Maptask的个数由什么决定

  一个job的map阶段MapTask并行度（个数），由客户端提交job时的切片个数决定。

### 26.MapTask和ReduceTask工作机制（也可回答MapReduce工作原理）✔

- `MapTask`
  - `read`
  - `map`
  - `collect`（快排）
  - `spill`
  - `combine`（归并）


（1）**Read阶段**：Map Task通过用户编写的RecordReader，从输入InputSplit中解析出一个个key/value。

（2）**Map阶段**：该节点主要是将解析出的key/value交给用户编写map()函数处理，并产生一系列新的key/value。

（3）**Collect收集阶段**：在用户编写map()函数中，当数据处理完成后，一般会调用OutputCollector.collect()输出结果。在该函数内部，它会将生成的key/value分区（调用Partitioner），并写入一个环形内存缓冲区中。

（4）**Spill阶段**：即“溢写”，当环形缓冲区满后，MapReduce会将数据写到本地磁盘上，生成一个临时文件。需要注意的是，将数据写入本地磁盘之前，先要对数据进行一次本地排序，并在必要时对数据进行合并、压缩等操作。

（5）**Combine阶段**：当所有数据处理完成后，MapTask对所有临时文件进行一次合并，以确保最终只会生成一个数据文件。

- `ReduceTask`
  - `copy`
  - `Merge`
  - `Sort`（归并）
  - `Reduce`


（1）**Copy阶段**：ReduceTask从各个MapTask上远程拷贝一片数据，并针对某一片数据，如果其大小超过一定阈值，则写到磁盘上，否则直接放到内存中。

（2）**Merge阶段**：在远程拷贝数据的同时，ReduceTask启动了两个后台线程对内存和磁盘上的文件进行合并，以防止内存使用过多或磁盘上文件过多。

（3）**Sort阶段**：按照MapReduce语义，用户编写reduce()函数输入数据是按key进行聚集的一组数据。为了将key相同的数据聚在一起，Hadoop采用了基于排序的策略。 由于各个MapTask已经实现对自己的处理结果进行了局部排序，因此，ReduceTask只需对所有数据进行一次归并排序即可。

（4）**Reduce阶段**：reduce()函数将计算结果写到HDFS上。

### 27.描述mapReduce有几种排序及排序发生的阶段

- 阶段
  - map发生后在spill后partition前
  - reduce发生在copy后reduce前


### 28.描述mapReduce中combiner的作用是什么，一般使用情景，哪些情况不需要，及和reduce的区别

- 对每一个MapTask的输出进行局部汇总，减小网络传输量
- 适用场景：combiner的输出kv应该跟reduce的输入kv类型对应
- 区别：位置不同

### 29.如果没有定义partitioner，那数据在被送达reducer前是如何被分

- 默认partition算法，根据每一条数据的key的hashCode值模运算（%）reduce的数量，得到的数字就是“分区号”

### 30.MapReduce出现单点负载多大，怎么负载平衡

- 通过partitioner实现

### 31.Hadoop的缓存机制（Distributedcache）

- 分布式缓存
  - eg：一个大表一个小表，将小表进行广播处理，每个计算节点上都存一份，然后进行map端的连接操作（效率大于reduce端join）


### 32.如何使用mapReduce实现两个表的join

- `reduce side join`map阶段同时读取两个文件
- `map side join`小表直接放入内存，在每个maptask都存一份

>     1）reduce side join : 在map阶段，map函数同时读取两个文件File1和File2，为了区分两种来源的key/value数据对，对每条数据打一个标签（tag）,比如：tag=0 表示来自文件File1，tag=2 表示来自文件File2。
>
>     2）map side join : Map side join 是针对以下场景进行的优化：两个待连接表中，有一个表非常大，而另一个表非常小，以至于小表可以直接存放到内存中。这样，我们可以将小表复制多份，让每个map task 内存中存在一份（比如存放到hash table 中），然后只扫描大表：对于大表中的每一条记录key/value，在hash table 中查找是否有相同的key 的记录，如果有，则连接后输出即可。

### 33.什么样的计算不能用mr来提速

- 数据量很小
- 繁杂的小文件
- 索引是更好的存取机制的时候
- 事务处理
- 只有一台机器的时候

### 34.ETL是哪三个单词的缩写

  Extraction-Transformation-Loading的缩写，中文名称为数据提取、转换和加载。

### MapReduce2.0容错性

- MRApplicationMaster	<--	RM
- MapTask、ReduceTask	<--	AM

### MapReduce跑得慢的原因

- 计算机性能	
  - CPU、磁盘、网络、内存

- IO操作优化
  - 数据倾斜
  - map、reduce数不合理
  - 小文件
  - 。。。


### MapReduce优化方法(图)✔

- 数据输入
  - 合并小文件
  - 不影响实际业务的前提下使用combinFileInputFormat，减少map端数据

- Map阶段
  - 提高环形缓冲区的大小
  - 提高环形缓冲区溢出阈值,可以有效减少磁盘IO
  - 增加Merge次数，默认10，从而缩短mr处理时间
  - 增大mapTask内存、堆内存、CPU核数、重试次数

- Reduce阶段
  - 合理设置map和reduce数量
  - 设置map、reduce共存，减少reduce等待时间
  - 提高从map端拉取数据的并行数，默认5
  - 提高数据写入磁盘的比例
  - 提高reduceTask内存、堆内存、CPU、重试次数

- **数据倾斜问题**
- IO传输

## Yarn

### 35.Yarn集群的架构和工作原理知道多少✔

- `ResourceManager`
  - 负责整个系统的资源管理和分配，由调度器和应用程序管理器组成

- `ApplicationMaster`
  - 与RM调度器协商以获得资源
  - 将得到的任务进一步分配给内部的任务
  - 与NodeManager通信以启动/停止任务
  - 监控所有的内部任务状态，并在任务运行失败的时候重新为任务申请资源以重启任务

- `NodeManager`
  - 定期向RM汇报本节点上的资源使用情况和各个Container的运行状态
  - 接收来自AM的Container启动和停止请求

- `Container`
  - 一个应用程序会分配一个Container


### 36.YARN的任务提交流程是怎样的✔

![image-20230912120745956](https://gitee.com/tjlxy/img/raw/master/image-20230912120745956.png)

1. 用户向YARN提交一个应用程序，并指定ApplicationMaster程序、启动ApplicationMaster的命令、用户程序。

1.  RM为这个应用程序分配第一个Container，并与之对应的NM通讯，要求它在这个Container中启动应用程序ApplicationMaster 
2.  ApplicationMaster向RM注册，然后拆分为内部各个子任务，为各个内部任务申请资源，并监控这些任务的运行，直到结束。 
3.  AM采用轮询的方式向RM申请和领取资源 
4.  RM为AM分配资源，以Container形式返回 
5.  AM申请到资源后，便与之对应的NM通讯，要求NM启动任务。 
6.  NodeManager为任务设置好运行环境，将任务启动命令写到一个脚本中，并通过运行这个脚本启动任务。 
7.  各个任务向AM汇报自己的状态和进度，以便当任务失败时可以重启任务。 
8.  应用程序完成后，ApplicationMaster向ResourceManager注销并关闭自己 

### 37.YARN的资源调度三种模型了解吗✔

1. FIFO调度器：先进先出，先提交的先分配资源执行
2. 容量调度器：多队列，每个队列都是FIFO，可以借用空闲队列的资源
3. 公平调度器：多队列，每个队列公平享有资源，按照缺额和权重分配，并发最高

### 38.简述hadoop1与hadoop2的架构异同

- 加入了`yarn`解决了资源调度的问题
- 加入了对`ZooKeeper`的支持实现比较可靠的高可用

### 39.为什么会产生yarn,它解决了什么问题，有什么优势

- 解决运行的用户程序与`yarn`框架完全解耦
- 可以运行各种类型的分布式运算程序

### Yarn调优参数✔

- NodeManager的资源：内存、CPU
- 容器的资源：最小、最大的 内存、CPU
