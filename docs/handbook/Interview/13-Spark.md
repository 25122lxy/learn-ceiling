# Spark

## Spark入门

### 1.Spark的运行流程✔

![image.png](https://cdn.nlark.com/yuque/0/2023/png/29617954/1673686098022-0ad1a544-3cc9-468a-a73b-35d659359eab.png#averageHue=%23f6eadc&clientId=u3b80b119-e69c-4&from=paste&height=365&id=u2ea949d8&originHeight=456&originWidth=713&originalType=binary&ratio=1&rotation=0&showTitle=false&size=66950&status=done&style=none&taskId=ub037ff62-02d1-4702-84f8-a512c6da568&title=&width=570.4)

1. SparkContext向资源管理器注册并向资源管理器申请运行Executor 
2. 资源管理器分配Executor，然后资源管理器启动Executor 
3. Executor发送心跳至资源管理器 
4. SparkContext构建DAG有向无环图 
5. 将DAG分解成Stage（TaskSet） 
6. 把Stage发送给TaskScheduler
7. Executor向SparkContext申请Task 
8. TaskScheduler将Task发送给Executor运行 
9. 同时SparkContext将应用程序代码发放给Executor 
10. Task在Executor上运行，运行完毕释放所有资源

### 2.Spark有哪些组件

- master：管理集群和节点，不参与计算。
- worker：计算节点，进程本身不参与计算，和master汇报。 
- driver：运行程序的main方法，创建sparkcontext对象。 
- sparkcontext：控制整个application的生命周期，包括dagsheduler和taskscheduler等组件。 
- clinet：用户提交程序的入口。

### Spark的使用场景✔

- hive on spark

  只把它当作引擎，写的还是hivesql，编译器、解析器、都是hive，只由优化器、执行器是spark

- spark on hive

  sparksql 去读写 hive 表，只用到了 hive 的元数据，其他编译、解析、优化、执行都是spark自己的

### 33.spark的有几种部署模式，每种模式特点✔

- local，测试
  - 将 Spark 应用以多线程的方式之间运行在本地（local:启动一个executor。local[k]:启动k歌executor。local[*]：启动跟CPU数目相同的executor）

- standalone，自己管资源
  - 分布式部署集群，自带完整服务，资源管理和任务监控是Spark自己监控

- **yarn**，yarn管资源
  - client，driver在提交节点启动，适合生产
  - cluster，driver由yarn决定在哪启动，适合调试
- mesos，国外用
- k8s，未来趋势

### 104.Spark 常用端口号✔

**1）4040 spark-shell任务端口**
2）7077 内部通讯端口。类比Hadoop的8020
3）8080 查看任务执行情况端口。类比Hadoop的8088
**4）18080 历史服务器。类比Hadoop的19888**
注意：由于Spark只负责计算，所有并没有Hadoop中存储数据的端口50070

## SparkCore

### 3.Spark中RDD机制理解吗✔

- 数据结构、hdfs文件、集合
- 分布式弹性数据集

**rdd分布式弹性数据集，简单的理解成一种数据结构**，是spark框架上的通用货币。所有算子都是基于rdd来执行的，不同的场景会有不同的rdd实现类，但是都可以进行互相转换。rdd执行过程中会形成dag图，然后形成lineage保证容错性等。 从物理的角度来看rdd存储的是block和node之间的映射。**RDD是spark提供的核心抽象，全称为弹性分布式数据集**。 

**RDD在逻辑上是一个hdfs文件，在抽象上是一种元素集合，包含了数据。它是被分区的，分为多个分区，每个分区分 布在集群中的不同结点上，从而让RDD中的数据可以被并行操作（分布式数据集）** 

比如有个RDD有90W数据，3个partition，则每个分区上有30W数据。RDD通常通过Hadoop上的文件，即HDFS或 者HIVE表来创建，还可以通过应用程序中的集合来创建；**RDD最重要的特性就是容错性，可以自动从节点失败中恢复过来**。即如果某个结点上的RDDpartition因为节点故障，导致数据丢失，那么RDD可以通过自己的数据来源重新计算该 partition。这一切对使用者都是透明的。 

**RDD的数据默认存放在内存中，但是当内存资源不足时，spark会自动将RDD数据写入磁盘**。比如某结点内存只能处理20W数据，那么这20W数据就会放入内存中计算，剩下10W放到磁盘中。**RDD的弹性体现在于RDD上自动进行内存和磁盘之间权衡和切换的机制**。

### 4.RDD中reduceByKey与groupByKey那个性能好，为什么✔

- **reduceByKey**发生在Map阶段，具有预聚合操作，既对数据重分区，也根据reduce 逻辑聚合，会shuffle
- groupByKey发生在Reduce阶段，具有预聚合操作，只对数据重分区，不计算，会shuffle

**reduceByKey**：reduceByKey会在结果发送至reducer之前会对每个mapper在本地进行merge，有点类似于在 MapReduce中的combiner。这样做的好处在于，在map端进行一次reduce之后，数据量会大幅度减小，从而减小传输， 保证reduce端能够更快的进行结果计算。 

**groupByKey**：groupByKey会对每一个RDD中的value值进行聚合形成一个序列(Iterator)，此操作发生在reduce端，所以 势必会将所有的数据通过网络进行传输，造成不必要的浪费。同时如果数据量十分大，可能还会造成 OutOfMemoryError。所以在进行大量数据的reduce操作时候建议使用reduceByKey。不仅可以提高速度，还可以防止使 用groupByKey造成的内存溢出问题。

### 5.介绍一下cogroupRdd实现原理，你再什么场景下用过这个rdd

- cogroupRdd（合并RDD）
  - 对多个（2~4）RDD中的KV元素，每个RDD中相同key中的元素分别聚合成一个集合。
  - 与reduceByKey不同的是：reduceByKey针对一个RDD中相同的key进行合并。而**cogroup针对多个RDD中相同的key的 元素进行合并。**

- 使用场景：表关联查询或处理重复的key

### 6.如何区分RDD的宽窄依赖✔

窄依赖：父RDD的一个分区只会被子RDD的一个分区依赖； 

宽依赖：父RDD的一个分区会被子RDD的多个分区依赖(**涉及到shuffle**)。

### 7.为什么要设计宽窄依赖

对于窄依赖： 窄依赖的多个分区可以并行计算； 窄依赖的一个分区的数据如果丢失只需要重新计算对应的分区的数据就可以了。 

对于宽依赖： 划分Stage(阶段)的依据:对于宽依赖,必须等到上一阶段计算完成才能计算下一阶段

### 8.DAG是什么（localhost:4040）✔

DAG(DirectedAcyclicGraph有向无环图)指的是数据转换执行的过程，有方向，无闭环(**其实就是RDD执行的流程**)； 

**原始的RDD通过一系列的转换操作就形成了DAG有向无环图**，任务执行时，可以按照DAG的描述，执行真正的计算 (数据被操作的一个过程)。

### 9.DAG中为什么要划分Stage

**并行计算** 

一个复杂的业务逻辑如果有shuffle，那么就意味着前面阶段产生结果后，才能执行下一个阶段，即下一个阶段的计算要依 赖上一个阶段的数据。那么我们按照shuffle进行划分(也就是按照宽依赖进行划分)，就可以将一个DAG划分成多个Stage/ 1. 2. 1. 阶段，在同一个Stage中，会有多个算子操作，可以形成一个pipeline流水线，流水线内的多个平行的分区可以并行执行。

### 10.如何划分DAG的stage	

**对于窄依赖**，partition的转换处理在stage中完成计算，不划分(将窄依赖尽量放在在同一个stage中，可以实现流水线计算)。 

**对于宽依赖**，由于有shuffle的存在，只能在父RDD处理完成后，才能开始接下来的计算，也就是说需要要划分stage。

### 11.Spark中的OOM的问题

- Map类型算子
  - 增加堆内内存
  - 减少每个task处理的数量
- Shuffle后
  - 修改实际代码
- Driver
  - 将大对象转换成Executor端加载，增加driver端内存

### 12.Spark中数据的位置被谁管理的

- `blockManger`

每个数据分片都对于具体物理位置，**数据的位置是被blockManager管理**，无论数据是在磁盘，内存还是tacyan，都是由blockManager管理。

### 13.Spark程序执行，有时候默认为什么会产生很多task，怎么修改默认task执行个数

- `SPARK_HOME/conf/spark-default.conf`
  - `spark.sql.shuffle.partitions=50`
  - `spark.default.paralleism=10`

### 14.Spark与MapReduce的Shuffle的区别

- MapReduce默认排序，Spark不排序，可以使用sortByKey
- MapReduce只有Map和Reduce两个阶段，比较局限，Spark更灵活
- MapReduce落盘，spark不落盘

### 17.通常来说，Spark与MapReduce相比，Spark运行效率更高。请说明效率更高来源于Spark内置的哪些机制

- DAG
- Linage
- 基于内存

### 18.Hadoop和Spark的相同点和不同点

- Hadoop
  - 基于MapReduce架构的计算框架
  - 只有map和reduce两种操作，表达能力比较欠缺
  - 适合高延迟环境下批处理计算
- Spark
  - 基于内存的分布式计算框架
  - 有丰富的算子，比较灵活
  - 适合低延迟环境下的计算

### 19.Hadoop和Spark使用场景

- 离线计算
  - Hadoop：单次数据量特别大
  - Spark：单次数据量不是特别大

### 20.Spark如何保证宕机迅速恢复

- 增加master备节点
- 编写shell脚本，时刻检测存活状态，定期**重启**

### 21.RDD持久化（缓存）原理✔

- 将数据持久化到内存上
- `cache（） -> persist()`
- `un cache（）`

### 22.Checkpoint检查点机制

- 把应用数据存储到HDFS等可靠文件系统中（三个步骤）
  - `setCheckPointDIR()`
  - `CheckPoint()`
  - 写入

### 缓存和检查点区别✔

1）**Cache缓存只是将数据保存起来，不切断血缘依赖。Checkpoint检查点切断血缘依赖**。

2）Cache缓存的数据通常存储在磁盘、内存等地方，可靠性低。Checkpoint的数据通常存储在HDFS等容错、高可用的文件系统，可靠性高。

3）建议对checkpoint()的RDD使用Cache缓存，这样checkpoint的job只需从Cache缓存中读取数据即可，否则需要再从头计算一次RDD。

### 23.Checkpoint和持久化机制的区别

- RDD
- 安全性
- 建议对checkpoint()的RDD使用Cache缓存，这样checkpoint的job只需从Cache缓存中读取数据即可，否则需要再从头计算一次RDD。

### 32.RDD有哪些缺陷？

- 不支持细粒度的写和更新操作
- 不支持迭代计算

### 34.Spark为什么比mapreduce快

- 内存
- DAG
- Lineage（血缘）

### 35.数据本地性是在哪个环节确定的

- DAG划分stage时

### 36.RDD的弹性表现在哪几点

- 内存磁盘，task、stage失败重试，checkpoint、persis缓存。。

### 37. Spark的数据本地性有哪几种

- 读取本地节点的数据
- 读取本地硬盘的数据
- 读取非本地节点的数据（一般不用）	

### 38.Spark为什么要持久化，一般什么场景下要进行persist操作

- Spark默认存放在内存中，分布式系统中出现错误，如果没有rdd依赖关系，需要从头计算
- 计算非常耗时
- 计算链条非常长，重新恢复要算很多步骤
- checkpoint前需要进行持久化，下次就不需要重新计算
- shuffle之前要进行持久化persist，将数据持久化到磁盘

### 39.描述Yarn执行一个任务的过程？（☆☆☆☆☆）【hadoop

### 40.Spark on Yarn 模式有哪些优点？（☆☆☆☆☆）√

- 与其他计算框架共享集群资源
- Yarn的资源分配更加细致
- Application部署简化
- 资源弹性管理

### 41.谈谈你对container的理解？（☆☆☆☆☆）	

- 资源分配和调度的基本单位
- 由谁申请
- 由谁执行

### 42.Spark使用parquet文件存储格式能带来哪些好处？（☆☆☆☆☆）

- 速度更快
- 压缩计算非常稳定出色
- 极大的减少磁盘I/O
- 可以极大的优化spark的调度和执行

### 43.介绍parition和block有什么关联关系？（☆☆☆☆☆）

- Spark，partition是rdd的最小单位，大小不固定，位于计算空间
- HDFS，block是分布式存储的最小单位，大小固定，位于存储空间

### 44.不需要排序的hash shuffle是否一定比需要排序的sort shuffle速度快？

- 数据规模大时，sort shuffle 速度快于hash shuffle

### 45.Sort-based shuffle的缺陷? （☆☆☆☆☆）

- 数量过大，会产生很多小文件

### 46.spark.storage.memoryFraction参数的含义,实际生产中如何调优？

（☆☆☆☆☆）

- RDD持久化在Executor内存中的占比（默认0.6）

### 47.介绍一下你对Unified Memory Management内存管理模型的理解？（☆☆☆☆☆）

### 48.Spark有哪两种算子✔

- **action算子**

（1）reduce
（2）collect
（3）count
（4）first
（5）take
（6）takeOrdered
（7）aggregate
（8）fold
（9）countByKey
（10）save
（11）foreach

- **Transformation**

1）单Value
（1）map
（2）mapPartitions
（3）mapPartitionsWithIndex
	（4）flatMap
	（5）glom
	（6）groupBy
	（7）filter
	（8）sample
	（9）distinct
	（10）coalesce
	（11）repartition
	（12）sortBy
	（13）pipe
2）双vlaue
	（1）intersection
	（2）union
	（3）subtract
	（4）zip
3）Key-Value
	（1）partitionBy
	（2）reduceByKey
	（3）groupByKey
	（4）aggregateByKey
	（5）foldByKey
	（6）combineByKey
	（7）sortByKey
	（8）mapValues
	（9）join
	（10）cogroup

### 49.Spark有哪些聚合类的算子,我们应该尽量避免什么类型的算子？

- reduceByKey，join，distinct，reparation
- **避免有shuffle的算子·：reduceBykey，groupByKey，ByKey:**

### 50.RDD创建有哪几种方式？

- 基于本地、集合、hdfs、数据库、非关系型数据库。。。



### 51.Spark并行度怎么设置比较合适？

- **partition**=（**2~4**）x **core**

### 52.Spark如何处理不能被序列化的对象？

- 封装成object对象

### 53.collect功能是什么，其底层是怎么实现的？

- **把各个节点的数据收集过来	Array->Tuple(k,v)**

### 54.为什么Spark Application在没有获得足够的资源，job就开始执行了，可能会导致什么问题发生？

- **导致job结束也没有分配足够的资源**
- **task的调度线程和Executor资源申请是异步的**

### 55.map与flatMap的区别？

- map
  - 将一行数据转换成一个数组对象
- flatMap
  - 将所有对象合并成一个对象

### 56.Spark on Mesos中，什么是的粗粒度分配，什么是细粒度分配，各自的优点和缺点是什么？

- 粗粒度
  - 启动时就分配好资源
  - 优点：复用率高
  - 缺点：资源浪费
- 细粒度
  - 用资源的时候分配
  - 优点：用完就回收，不浪费
  - 缺点：启动一次分配一次，比较麻烦

### 57.driver的功能是什么？

### 58.Spark技术栈有哪些组件，每个组件都有什么功能，适合什么应用场景？

### 59.Spark中Worker的主要工作是什么？	

### 60.cache和pesist的区别✔

- cache调用pesist

cache和persist都是用于将一个RDD进行缓存的，这样在之后使用的过程中就不需要重新计算了，可以大大节省程序运 行时间 

1） cache只有一个默认的缓存级别MEMORY_ONLY ，cache调用了persist，而persist可以根据情况设置其它的缓存级别； 

2）executor执行的时候，默认60%做cache，40%做task操作，persist是最根本的函数，最底层的函数。

### 61.cache后面能不能接其他算子,它是不是action操作

- 可以，但是起不到缓存的效果
- 不是

### 62.reduceByKey是不是action？

- 不是，reduce是

### 63.RDD通过Linage（记录数据更新）的方式为何很高效？

- lazy记录了数据的来源
- 记录原数据
- 简化复杂度

### 64.为什么要进行序列化？

- 减少存储空间，存储体积，高效存储和传输
- 缺点：非常耗费CPU，需要进行反序列化

### Kryo序列化

Kryo序列化比Java序列化更快更紧凑，但Spark默认的序列化是Java序列化并不是Spark序列化，因为Spark并不支持所有序列化类型，而且每次使用都必须进行注册。注册只针对于RDD。在DataFrames和DataSet当中自动实现了Kryo序列化。

### 65. Yarn中的container是由谁负责销毁的，在Hadoop Mapreduce中container可以复用么？

- `ApplicationMaster`
- mr中不可复用，spark on yarn 中可以复用

### 66.提交任务时，如何指定Spark Application的运行模式？ 

- `./spark-submit --class xx.xx.xx --master yarn --deploy-mode **cluster** xx.jar`
- `./spark-submit --class xx.xx.xx --master yarn --deploy-mode **client** xx.jar`

### 67.不启动Spark集群Master和work服务，可不可以运行Spark程序？ 

- 可以，只有资源管理器由第三方管理就可以，如Yarn。resourceManager相当于master，NodeManager相当于Worker，做计算的是Executor，所以只要安装JVM就可以。

### 68.spark on yarn Cluster 模式下，ApplicationMaster和driver是在同一个进程么？ 

- 是

### 69.运行在yarn中Application有几种类型的container？

- 运行ApplicationMaster的Container
- 运行各类任务的Container

### 70.Executor启动时，资源通过哪几个参数指定？ 

- Executor
  - `num-executors`是executor的数量，默认2
  - `executor-memory`是每个executor使用的内存，默认1G
  - `executor-cores`是每个executor分配的CPU，默认1，官方建议2
- Driver
  - `driver-cores` driver使用内核数，默认为1
  - `diver-memory ` driver内存大小，默认512M

### 71.导致Executor产生FULL gc 的原因，可能导致什么问题？ 

- 导致`executor`僵死问题

### 72.Spark累加器有哪些特点？ 

- 全局唯一，自增不减
- executor端修改，driver端读取
- executor级别共享

### 73.spark hashParitioner的弊端是什么？ 

- 数据倾斜

### 74.RangePartitioner分区的原理？ 

- 尽量保证每个分区中数据量的均匀，分区与分区之间有序，分区内无序

### 75.rangePartioner分区器特点？ 

### 76.如何理解Standalone模式下，Spark资源分配是粗粒度的？ 

- 在提交时就分配好资源

### 77.union操作是产生宽依赖还是窄依赖？ 

- 窄依赖

### 78.窄依赖父RDD的partition和子RDD的parition是不是都是一对一的关系？ 

- 不一定

### 79.Hadoop中，Mapreduce操作的mapper和reducer阶段相当于spark中的哪几个算子？ 

- map
- reduceByKey

### 80.什么是shuffle，以及为什么需要shuffle？ 

- 将具有共同特征是数据聚合到同一个计算节点上进行计算

### 81.Spark中的HashShufle的有哪些不足？

- 产生大量小文件在磁盘上
- 内存不够用
- 数据倾斜

### 82.conslidate是如何优化Hash shuffle时在map端产生的小文件？

- `conslidate`是根据CPU的个数决定每个task shuffle map 端产生多少个文件
- `Hash shuffle`是根据reduce数量决定每个task shuffle map 端产生多少个文件

### 83.spark.default.parallelism这个参数有什么意义，实际生产中如何设置？

- stage是默认task个数

### 84.spark.shuffle.memoryFraction参数的含义，以及优化经验？

-  shuffle从上一个task拉取数据过来，要在Executor进行聚 合操作，聚合操作时使用Executor内存的比例由该参数决定

### 85.Spark中standalone模式特点，有哪些优点和缺点？

- 特点
  - 主从架构
  - FIFO调度
  - 无需依赖其他资源管理系统
- 优点
  - 无需依赖其他资源管理系统
  - 部署简单
- 缺点
  - 一个应用程序会占用所有可用节点的资源
  - 容易出现单点故障，需要配置HA

### 86.常见的数压缩方式，你们生产集群采用了什么压缩方式，提升了多少效率？

- GZ	压缩率最高，压缩和解压速度最慢
- LZO
- snappy

### 87.使用scala代码实现WordCount？

- `new SparkContext( new Sparkconf() )`
- `.textFlie("XX.txt")`
- `.flatMap(.split(" "))`
- `.map( (,1) )`
- `.reduceByKey(_+_)`
- `.collect()`
- `.foreach(println)`	

### 89.RDD的数据结构是怎么样的✔

![image.png](https://cdn.nlark.com/yuque/0/2023/png/29617954/1677899267708-a79d4ddd-95b4-4f7f-85ef-b53e62fec7d0.png#averageHue=%23f5f2f1&clientId=uaa6c32e4-fb4e-4&from=paste&height=784&id=uf1c59f94&originHeight=980&originWidth=1823&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=362133&status=done&style=none&taskId=ua529e298-06cc-486d-b09b-5545c70b3cf&title=&width=1458.4)

### 90.RDD算子里操作一个外部map，比如往里面put数据，然后算子外再遍历map，会有什么问题吗？

### 91.说说你对Hadoop生态的认识。

- 分布式文件系统
- 分布式计算引擎
- 周边工具

### 92.hbase region多大会分区，spark读取hbase数据是如何划分partition的？

- 参数默认1G。HBASE有多少个region，spark就会划分几个partition

### 93.Spark数据倾斜

- 随机取样
  - 相同key的值进行统计个数，将倾斜的过滤掉
- 两两聚合
  - 给key加随机数，直接聚合，取消随机数，再次聚合
- 大表和小表
  - reduce join->map join，将小表广播出去，然后大表操作
- 大表和大表
  - 一个大表扩容，一个大表key随机加前缀，将key均匀分布到不同的分区中，并行处理

### 94.Spark中TaskSchedule的作用是啥

- taskSchedule将task发送给executor

### 95.Spark的内存分布

- 堆内内存
  - 会发生OOM
- 堆外内存
  - 物理内存

### 96.Spark处理小文件

- 减少分区
  - `coalesce`
  - `reparation`

### 97.spark如何实现报警功能

- 写代码获取yarn类的spark状态
- 写代码获取executor、CPU、内存等信息，来判断存活状态

### 98.Spark的shuffle✔

- hashShuffle
- sortShuffle

### 哪些算子会引起shuffle✔

一般 xxbykey 会shuffle，因为涉及到数据重分区

repartition：底层调用的就是coalesce，一定会shuffle，一般用于增大分区

coalesce：不一定会shuffle，一般用于缩小分区

合并小文件：启动一个Spark任务，读取，使用coalesce



### 99.Spark中OOM

### 100.Reparation和Coalesce关系与区别✔

- 调整分区（涉及shuffle）
- 减少分区

关系: 

- 两者都是用来改变RDD的partition数量的，repartition底层调用的就是coalesce方法:coalesce(numPartitions, shuffle = true) 

区别: 

- repartition一定会发生shuffle，coalesce根据传入的参数来判断是否发生shuffle 
- 一般情况下增大rdd的partition数量使用repartition，减少partition数量时使用coalesce

### 101.Yarn-client的提交流程

- Driver在任务提交的本地运行

### 102.Yarn-cluster的提交流程

- Driver在ApplicationMaster上运行

### 103.Spark调优原则✔

- 避免使用重复RDD
- 尽量使用同一个RDD
- 避免使用有shuffle的算子
- 对多次使用的RDD进行持久化
- mapSide预聚合
- 使用高性能是算子
- 广播大变量



### 105.map和mapPartitions区别✔

1）map：每次处理一条数据
2）mapPartitions：每次处理一个分区数据

### 106. reduceByKey、foldByKey、aggregateByKey、combineByKey区别✔

ReduceByKey     没有初始值         分区内和分区间逻辑相同

foldByKey      有初始值           分区内和分区间逻辑相同

aggregateByKey   有初始值           分区内和分区间逻辑可以不同

combineByKey   初始值可以变化结构  分区内和分区间逻辑不同

### 107.Spark任务的划分✔

（1）Application：初始化一个SparkContext即生成一个Application；

（2）Job：一个Action算子就会生成一个Job；

（3）Stage：Stage等于宽依赖的个数加1；

（4）Task：一个Stage阶段中，最后一个RDD的分区个数就是Task的个数。

### 108.cache缓存级别✔

DataFrame的cache默认采用 MEMORY_AND_DISK 
RDD 的cache默认方式采用MEMORY_ONLY

### 109.Spark分区

1）默认采用Hash分区
缺点：可能导致每个分区中数据量的不均匀，极端情况下会导致某些分区拥有RDD的全部数据。
2）Ranger分区
要求RDD中的KEY类型必须可以排序。
3）自定义分区
       根据需求，自定义分区。

## SparkSQL

### 15.SparkSql执行的流程

### 16.SaprkSql是如何将数据写到hive表的

- SparkRDDApi  -> HDFS	**映射**
- SparkSql		-> DataFrame	->	缓存表	**直接插入**		

- 

### 88.Spark sql为什么比hive快呢？

### 110.SparkSQL中RDD、DataFrame、DataSet三者的转换（笔试重点）

![image.png](https://cdn.nlark.com/yuque/0/2023/png/29617954/1677901144741-fbaca06c-0175-4390-aa70-12e31b950bd3.png#averageHue=%23fefdfd&clientId=u8869e584-7142-4&from=paste&height=294&id=uef542093&originHeight=368&originWidth=798&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=28132&status=done&style=none&taskId=u1bcf9a38-76ee-42ef-8717-b12af26f863&title=&width=638.4)

## SparkStreaming

### 24.SparkStreaming以及基本工作原理？

### 25.DStream以及基本工作原理？

### 26.SparkStreaming整合Kafka的两种模式？

- Receiver
  - 主动去SparkExecutor的内存中处理数据
- Direct
  - 定期查询kafka中的offset，拉取新数据，进行处理

### 27.Spark主备切换原理知道吗？

- 基于文件系统，手动切换
- 基于ZooKeeper，自动切换

### 28.Spark解决了Hadoop的哪些问题？

- 硬编码
- 表达局限
- 一个Job一个MapReduce阶段
- 存储内存->磁盘
- 窄依赖并行处理
- 实时计算 

### 29.SparkMasterHA主从切换过程会不会影响到集群已有的作业的运行，为什么？

- 不会，已经分配好资源了

### 30.SparkMaster使用Zookeeper进行HA,有哪些源数据保存到Zookeeper里面？

- master的元数据Metastore

### 31.如何实现SparkStreaming读取Flume中的数据？

- 推模式
- 拉模式





