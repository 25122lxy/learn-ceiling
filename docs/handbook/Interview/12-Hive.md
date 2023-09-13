# Hive

## Hive面试题（一）

### 1.Hive内部表和外部表的区别✔

- `external`（外部表）

  未被 external 修饰的是内部表，被 external 修饰的为外部表。

- 区别（由谁管理、存储位置、删除情况）

  - 内部表数据由 Hive 自身管理，外部表数据由 HDFS 管理；

  - 内部表数据存储的位置是 hive.metastore.warehouse.dir（默认： /user/hive/warehouse），外部表数据的存储位置由自己制定（如果没有 LOCATION，Hive 将在 HDFS 上的/user/hive/warehouse 文件夹下以外部表 的表名创建一个文件夹，并将属于这个表的数据存放在这里）

  - 删除内部表会直接删除元数据（metadata）及存储数据；删除外部表仅仅会删除元数据，HDFS 上的文件并不会被删除。

### 2.Hive有索引吗

Hive支持索引（3.0版本之前），但是Hive的索引与关系型数据库中的索引并不相同，比如，**Hive不支持主键或者外键。并且Hive索引提供的功能很有限，效率也并不高，因此Hive索引很少使用。**

索引适用的场景：**适用于不更新的静态字段。以免总是重建索引数据**。每次建立、更新数据后，都要重建索引以构建索引表。

### 3.运维如何对hive进行调度

- 将HQL写到脚本中
- 使用azkaban进行调度
- 监控任务调度页面

### 4.ORC、Parquet等列式存储的优点

**ORC和Parquet都是高性能的存储方式，这两种存储格式总会带来存储和性能上的提升。**

Parquet:

1. **Parquet支持嵌套的数据模型**，类似于ProtocolBuffers，每一个数据模型的schema包含多个字段，每一个字段有三个属性：重复次数、数据类型和字段名。
   重复次数可以是以下三种：required(只出现1次)，repeated(出现0次或多次)，optional(出现0次或1次)。每一个字段的数据类型可以分成两种： group(复杂类型)和primitive(基本类型)。
2. **Parquet中没有Map、Array这样的复杂数据结构，但是可以通过repeated 和group组合来实现的。**
3. 由于Parquet支持的数据模型比较松散，可能一条记录中存在比较深的嵌套关系，如果为每一条记录都维护一个类似的树状结可能会占用较大的存储空间，因此Dremel论文中提出了一种高效的对于嵌套数据格式的压缩算法：Striping/Assembly算法。**通过Striping/Assembly算法，parquet 可以使用较少的存储空间表示复杂的嵌套格式，**并且通常Repetitionlevel和Definition level都是较小的整数值，可以通过RLE算法对其进行压缩，进一步降低存储空间。
4. **Parquet文件是以二进制方式存储的，是不可以直接读取和修改的**，Parquet文件是自解析的，文件中包括该文件的数据和元数据。



ORC:

1. ORC文件是自描述的，它的元数据使用Protocol Buffers**序列化，并且文件中的数据尽可能的压缩以降低存储空间的消耗。**

2. 和Parquet类似，**ORC文件也是以二进制方式存储的**，所以是不可以直接读取，ORC文件也是自解析的，它包含许多的元数据，这些元数据都是同构ProtoBuffer进行序列化的。

3. **ORC会尽可能合并多个离散的区间尽可能的减少I/O次数。**

4. **ORC中使用了更加精确的索引信息**，使得在读取数据时可以指定从任意一行开始读取，更细粒度的统计信息使得读取ORC文件跳过整个rowgroup，ORC默认会对任何一块数据和索引信息使用ZLIB压缩，因此ORC文件占用的存储空间也更小。

5. **在新版本的ORC中也加入了对BloomFilter的支持，**它可以进一 步提升谓词下推的效率，在Hive 1.2.0版本以后也加入了对此的支持。

### 5.数据建模用的哪些模型✔

- 星型模型

- - 维表主键与事实表相关联，呈星形分布

- ![image-20230913104908164](https://gitee.com/tjlxy/img/raw/master/image-20230913104908164.png)

- 雪花模型

- - 维表可连接维表，成本高、性能偏低

- ![image-20230913104932134](https://gitee.com/tjlxy/img/raw/master/image-20230913104932134.png)

- 星座模型

- - 多张事实表共享维度信息

- ![image-20230913105013995](https://gitee.com/tjlxy/img/raw/master/image-20230913105013995.png)

### 6.为什么要对数据仓库分层

- **用空间换时间**，通过大量的预处理来提升应用系统的用户体验（效率），因此数据仓库会存在大量冗余的数据。
- 整个项目需要改进时，对其中每个部分改的即可，不需要整体改动
- **简化数据清洗**，因为把原来一步的工作分到了多个步骤去完成，相当于把一个复杂的工作拆成了多个简单的工作，把一个大的黑盒变成了一个白盒，每一层的处理逻辑都相对简单和容易理解，这样我们比较容易保证每一个步骤的正确性，当数据发生错误的时候，往往我们只需要局部调整某个步骤即可。

### 7.使用过Hive解析JSON串吗

- 直接写入Hive表，使用UDF函数进行解析
- 写入前进行拆分，拆分开各个字段再插入HIVE表中

### 8.sort by 和 order by 的区别

- Sort By 在Reduce之前进行，可以保证每个reduce中的数据有序，不能保证全局有序
- Order By 只会产生一个reduce，对全局进行排序

### 10.Hive 小文件过多怎么解决

- 使用 hive 自带的 concatenate 命令，自动合并小文件

  ```sql
  #对于非分区表
  alter table A concatenate;
  #对于分区表
  alter table B partition(day=20201224) concatenate;
  ```

- 调整参数减少Map数量

- 减少Reduce的数量

- 使用hadoop的archive将小文件归档（HAR）

### 11.Hive优化有哪些✔

1. MapJoin：默认开启（大小表join时，可以省略reduce阶段，将小表加载到map阶段的内存中，在map阶段完成join，避免shuffle，省略reduce，速度快）

2. 分区、分桶：（避免全表扫描；抽样）

3. 压缩：snappy、lzo

4. 列式存储

   ```ini
   id	name	age
   1	zs		18
   2	ls		19
   
   ```

   列式：1	2	zs	ls	18	19

   行式：1	zs	18	2	ls	19

   查询语法：select name from A where age > 18

   列式：查询分析快（性能更高）、存储结构更紧凑、压缩后空间更小

5. 设置合理Map数量

   1. 控制切片：`mapreduce.input.fileinputformat.split.maxsize`
      1. 切片变大-》切片数变少-》map数变少
      2. 切片变小-》切片数变多-》map数变多

6. 设置合理的reduce数量

   1. 参数指定：`set mapreduce.job.reduces`默认-1。表示禁用
   2. 估算机制：数据量/每个reducer处理的数据量上限
   3. 特殊语法：order by、count（distinct）
   4. 优先级：特殊>参数>估算

7. 小文件

   1. JVM重用
   2. combineHiveInputFormat（将多个小文件合并成一个切片）256m读进一个maptask
   3. 合并功能：
      1. 再启动一个job，自动将小于16m的文件，合并成一个最大256m的大文件
      2. `map-only`，默认开启
      3. `map-reduce`，默认禁用，手动开启

8. 使用多引擎

   1. mr：处理年、月，时间跨度大、数据量比较大的指标
   2. spark：处理日常的天指标
   3. tez
   4. 多引擎是怎么使用的？
      1. 准备好各个引擎的环境
      2. 通过`set hive.exec.enginee=mr`select ...

9. 大表jon大表

   1. SMB Join：sort merge bucket join
      1. 分桶字段-桶的排序字段，桶数相等
      2. 开启几个参数
   2. 手动拆分
      1. A、B
      2. XX join XX union XX join XX

10. Hive有几种join

    1. map join：大小表join，没有shuffle
    2. smb join：大表join，有序桶
    3. common join：有shuffle

- 数据存储与压缩
- 通过参数调优
- 有效的减少数据集
- 优化SQL语句

### 12.Hive的HSQL转换为MapReduce的过程✔

- 语法解析：Antlr 定义 SQL 的语法规则，完成 SQL 词法，语法解析，将 SQL 转化为抽象 语法树 AST Tree；
- 语义解析：遍历 AST Tree，抽象出查询的基本组成单元 QueryBlock；
- 生成逻辑执行计划：遍历 QueryBlock，翻译为执行操作树 OperatorTree；
- 优化逻辑执行计划：逻辑层优化器进行 OperatorTree 变换，合并不必要的 ReduceSinkOperator，减少 shuffle 数据量；
- 生成物理执行计划：遍历 OperatorTree，翻译为 MapReduce 任务；
- 优化物理执行计划：物理层优化器进行 MapReduce 任务的变换，生成最终的执行计划。

> - sql -》 Antlr（解析） -》 AST（抽象语法树）
>
> - - -》OperatorTree（逻辑执行计划） -》 逻辑计划优化（RBO，基于规则的优化：谓词下推）
>   - -》 TaskTree（物理执行计划） -》 物理执行计划优化（CBO，基于代价的优化：比如调整join的顺序）
>   - 提交MR的Task执行

### 13.Hive底层与数据库交互原理	（hive架构）

![image-20230913110803480](https://gitee.com/tjlxy/img/raw/master/image-20230913110803480.png)

### 14.Hive的两张表关联，使用MapReduce怎么实现

- 大表和小表

  直接使用map端join的方式（map端加载小表）进行聚合。

- 大表和大表

  可以采用联合key的方式进行聚合。**联合key的第一个部分join on的部分为公共字段，第二部分添加一个flag，**就是一个标记，用来区分两张表，0代表着表A，1代表着表B。用来让Reduce端区分两张表的信息。在Mapper进行表的处理，join on公共字段相同的数据划分到同一个分区中，进而传输到一个reduce中，然后进行聚合。

### 15.请谈一下Hive的特点，Hive和RDBMS有什么异同✔

- 相同点：相似的sql语言，上手容易
- 数据存储位置

- - hive存储在hdfs上
  - 数据库存储在模块设备或本地系统

- 数据更新

- - Hive不建议对数据进行改写操作
  - 数据库通常会进行改写

- 执行延迟

- - Hive延迟较高（数据规模大到超过数据库的处理能力的时候，Hive的并行计算显然能体现出优势。）
  - 数据库延迟较低

- 数据规模

- - Hive支持很大规模的数据计算
  - 数据库可以支持的数据规模较小

### 16.请说明hive中 Sort By，Order By，Cluster By，Distrbute By各代表什么意思

* order by
  * 全局排序，最终只有一个reduce，（结合limit使用）
* sort by
  * 分区内排序（reduce中排序）
* distribute by
  * 决定数据如何分区
* cluster by
  * 当sort by和distribute by字段一致时，可以代替，只能升序

```sql

●  Order By全局排序，只有一个Reducer 
  ○  ASC（ascend）: 升序（默认） 
  ○  DESC（descend）: 降序 
  ○  ORDER BY 子句在 SELECT 语句的结尾 
#查询员工信息按工资降序排列
hive (default)> select * from emp order by sal desc;
 
●  Sort By每个 Reduce 内部排序 
  ○  Sort by 为每个 reducer 产生一个排序文件。每个 Reducer 内部进行排序，对全局结果集来说不是排序。 
#1）设置 reduce 个数
hive (default)> set mapreduce.job.reduces=3;
#2）查看设置 reduce 个数
hive (default)> set mapreduce.job.reduces;
#3）根据部门编号降序查看员工信息
hive (default)> select * from emp sort by deptno desc;
#4）将查询结果导入到文件中（按照部门编号降序排序）
hive (default)> insert overwrite local directory 
'/opt/module/data/sortby-result'
select * from emp sort by deptno desc;
 
●  Distrbute By分区 
  ○  在有些情况下，我们需要控制某个特定行应该到哪个 reducer，通常是为了进行后续的聚集操作。distribute by 子句可以做这件事。distribute by 类似 MR 中 partition （自定义分区），进行分区，结合 sort by 使用。 
  ○  对于 distribute by 进行测试，一定要分配多 reduce 进行处理，否则无法看到 distribute by 的效果。 
#先按照部门编号分区，再按照员工编号降序排序。
hive (default)> set mapreduce.job.reduces=3;
hive (default)> insert overwrite local directory 
'/opt/module/data/distribute-result' select * from emp distribute by 
deptno sort by empno desc;
 
  ○  注意： 
    ■ distribute by 的分区规则是根据分区字段的 hash 码与 reduce 的个数进行模除后， 余数相同的分到一个区。
    ■ Hive 要求 DISTRIBUTE BY 语句要写在 SORT BY 语句之前。
●  Cluster By 
  ○  当 distribute by 和 sorts by 字段相同时，可以使用 cluster by 方式。 
  ○  cluster by 除了具有 distribute by 的功能外还兼具 sort by 的功能。但是排序只能是升序排序，不能指定排序规则为 ASC 或者 DESC。 
#以下两种写法等价
hive (default)> select * from emp cluster by deptno;
hive (default)> select * from emp distribute by deptno sort by deptno
#注意：按照部门编号分区，不一定就是固定死的数值，可以是 20 号和 30 号部门分到一个分区里面去。

```



### 17.Hive有哪些方式保存元数据，各有哪些特点

Hive支持三种不同的元存储服务器，分别为：**内嵌式元存储服务器、本地元存储服务器、远程元存储服务器**，每种存储方式使用不同的配置参数。

- 内嵌式元存储主要用于单元测试，在该模式下每次只有一个进程可以连接到元存储，Derby是内嵌式元存储的默认数据库。
- 在本地模式下，每个Hive客户端都会打开到数据存储的连接并在该连接上请求SQL查询。
- 在远程模式下，所有的Hive客户端都将打开一个到元数据服务器的连接**，**该服务器依次查询元数据，元数据服务器和客户端之间使用Thrift协议通信。

### 18.Hive 中的压缩格式TextFile、SequenceFile、RCfile 、ORCfile各有什么区别

- 默认方式，按行存储，不支持压缩，数据开销大，磁盘解析大，反序列化需要逐个读取
- 二进制方式，按行存储，支持压缩
- 按行分块，按列存储
- 是RCfile的改良版，按行分块，按列存储

### 19.所有的Hive任务都会有MapReduce的执行吗

不是，从Hive0.10.0版本开始，对于简单的不需要聚合的类似SELECT  from 

### 20.写出hive中split、coalesce及collect_list函数的用法（可举例）

- 将字符串转化为数组
- 返回第一个不为空的值
- 返回所有值（不去重）

### 21.Fetch抓取

**Fetch抓取是指，Hive中对某些情况的查询可以不必使用MapReduce计算。**例如：SELECT * FROM employees;在这种情况下，Hive可以简单地读取employee对应的存储目录下的文件，然后输出查询结果到控制台。
在hive-default.xml.template文件中**hive.fetch.task.conversion**默认是more，老版本hive默认是minimal，该属性修改为more以后，在**全局查找、字段查找、limit查找**等都不走mapreduce。

### 22.本地模式

- 处理小数据集（可能触发执行任务时消耗的时长可能比实际job执行的时间还要多）

### 23.表的优化

- 小表和大表
- 大表和大表
- group by
- count(Distinct)
- 笛卡尔积
- 行列过滤

### 24.数据倾斜✔

- **空值引发的数据倾斜**

  **1）空KEY过滤**
  	有时join超时是因为某些key对应的数据太多，而相同key对应的数据都会发送到相同的reducer上，从而导致内存不够。此时我们应该仔细分析这些异常的key，很多情况下，**这些key对应的数据是异常数据，我们需要在SQL语句中进行过滤**。例如key对应的字段为空。
  **2）空key转换**
  	有时虽然某个key为空对应的数据很多，但是相应的数据**不是异常数据**，必须要包含在join的结果中，**此时我们可以表a中key为空的字段赋一个随机的值，使得数据随机均匀地分不到不同的reducer上。**

- **不同数据类型引发的数据倾斜**

  如果key字段既有string类型也有int类型，默认的hash就都会按int类型来分配，那我们直接把int类型都转为string就好了，这样key字段都为string，hash时就按照string类型分配了：

  SELECT *
  FROM users a
   LEFT JOIN logs b ON a.usr_id = CAST(b.user_id AS string);

- **不可拆分的大文件引发的数据倾斜**

  这种数据倾斜问题没有什么好的解决方案，只能将使用GZIP压缩等不支持文件分割的文件转为bzip和zip等支持文件分割的压缩方式。

  所以，**我们在对文件进行压缩时，为避免因不可拆分大文件而引发数据读取的倾斜，在数据压缩的时候可以采用bzip2和Zip等支持文件分割的压缩算法**

- **数据膨胀引发的数据倾斜**

  在Hive中可以通过参数 hive.new.job.grouping.set.cardinality 配置的方式自动控制作业的拆解，该参数默认值是30。表示针对grouping sets/rollups/cubes这类多维聚合的操作，如果最后拆解的键组合大于该值，会启用新的任务去处理大于该值之外的组合。如果在处理数据时，某个分组聚合的列有较大的倾斜，可以适当调小该值。	

- **表连接时引发的数据倾斜**

  1）将key相对分散，并且**数据量小的表放在join的左边**，这样可以有效**减少内存溢出**错误发生的几率；

  2）再进一步，可以**使用Group**让小的维度表（1000条以下的记录条数）**先进内存**。在**map端完成reduce**。
  	实际测试发现：新版的hive已经对小表JOIN大表和大表JOIN小表进行了优化。小表放在左边和右边已经没有明显区别。

- **确实无法减少的数据量引发的数据倾斜**

  这类问题最直接的方式就是调整reduce所执行的内存大小。

  调整reduce的内存大小使用mapreduce.reduce.memory.mb这个配置。

---

1. null值导致

1. 1. 空key过滤
   2. 空key转换

2. 类型不一致

3. 数据本身不均匀

1. 1. 预聚合
   2. 手动聚合

1. 压缩
2. join
3. 调整reduce所执行的内存大小

- Map个数
- Reduce个数
- 小文件合并
- 并行执行

---

* 现象
  * 部分reduce执行时间比其他reduce大很多（20倍）
* 定位、原因
  * 定位：日志、显示那个key
  * 原因：
    * 数据角度
      * 数据本身不均匀
      * null值
      * 类型不一致
    * 语法角度
      * join
      * group by
* 解决
  * null值
    * 没用的提前过滤掉
    * 参考数据不均匀情况的处理
  * 数据本身不均匀
    * group by
      1. 开启map端预聚合 `set hive.map.aggr=true`
      2. 双重聚合
         * 手动实现：自己写SQL实现
         * 开启参数：
           * `set hive.groupby.skewindata=true;`
    * join
      1. 大小表join：使用map join，避免shuffle
      2. 大大表join：
         1. 开启参数`hive.optimize.skewjoin`
            * 单独拿出大key，写到临时文件
            * 另一个job，使用map
         2. 手动拆分：
            * 定位到大key ==》 count（）group by key
            * where key = 大key
              * 打散大key，扩容另一张表的key
            * union
            * where key ！= 大key，正常join
  * join时类型不一致
    * A join B on cast(A.id as String) = B.id（手动转换类型）
* 具体场景
  * 按照各省份统计订单 =》单表group by 
  * 现象：跑了2个小时，部分reduce执行，部分reduce执行比其他的长20倍以上
  * 处理：
    * 定位一下key
    * map端预聚合
    * 双重聚合
  * 效果：30分钟跑完

### 25.系统函数

- 时间类
- 字符串类
- 空值处理
- 行列处理

### 26.自定义UDF、UDTF函数

- UDF：一进一出
- UDTF：一进多出
- UDAF：多进一出
- eg：项目用UDTF：解析前端埋点数据的json数组（JSON套JSON）
- 步骤
  * 继承GenericUDTF，重写三个方法
    * 初始化
    * process
    * 关闭
  * 打jar包-》上传HDFS-》创建creat function。。。using jar hdfs路径

### 27.窗口函数

1）Rank

（1）RANK() 排序相同时会重复，总数不会变

（2）DENSE_RANK() 排序相同时会重复，总数会减少

（3）ROW_NUMBER() 会根据顺序计算

2） OVER()：指定分析函数工作的数据窗口大小，这个数据窗口大小可能会随着行的变而变化

- **over(partition by ... order by ... rows between ... and ...)**

1）Rank

（1）RANK() 排序相同时会重复，总数不会变

（2）DENSE_RANK() 排序相同时会重复，总数会减少

（3）ROW_NUMBER() 会根据顺序计算

2） OVER()：指定分析函数工作的数据窗口大小，这个数据窗口大小可能会随着行的变而变化

（1）CURRENT ROW：当前行

（2）n PRECEDING：往前n行数据

（3） n FOLLOWING：往后n行数据

（4）UNBOUNDED：起点，UNBOUNDED PRECEDING 表示从前面的起点， UNBOUNDED FOLLOWING表示到后面的终点

（5） LAG(col,n)：往前第n行数据

（6）LEAD(col,n)：往后第n行数据

（7） NTILE(n)：把有序分区中的行分发到指定数据的组中，各个组有编号，编号从1开始，对于每一行，NTILE返回此行所属的组的编号。注意：n必须为int类型。

**3）手写：分组TopN、行转列、列转行**

### 28.Union与Union all区别

- 去重
- 不去重



## Hive面试题（二）