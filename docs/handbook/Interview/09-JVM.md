# JVM

## 

### 1. 什么是JVM内存结构✔

- 程序计数器
  - 记录当前虚拟机正在执行的线程指令地址
- 虚拟机栈
  - 每个方法执行的时候会创建一个栈帧
- 本地方法栈
  - JVM创建的线程调用native方法
- Java堆
  - 所有线程共享的一块内存
- 方法区
  - 存放被加载的类信息、常量、静态变量、编译后的代码数据。

### 2. 什么是JVM内存模型？  

- 指定了一组排序规则，来保证线程的可见性

### 3. heap 和stack 有什么区别？  

...

- 申请方式
- 申请后系统的响应
- 申请大小的限制
- 申请效率的比较
- heap和stack中的存储内容

### 4. 什么情况下会发生栈内存溢出？  

- 当线程请求的栈深度超过了虚拟机允许的最大深度时

### 5. 谈谈对 OOM 的认识？如何排查 OOM 的问题？  

### 6. 谈谈 JVM 中的常量池？  

...

- Class文件常量池	
- 运行时常量池
- 全局字符串常量池
- 基本类型包装类对象常量池

### 7. 如何判断一个对象是否存活？   （ GC如何判断对象可以被回收  ）✔

- 引用计数法
  -  这种⽅式是给堆内存当中的每个对象记录⼀个引⽤个数。引⽤个数为0的就认为是垃圾。这是早期JDK中使⽤的⽅式。引⽤计数⽆法解决循环引⽤的问题  
- 可达性分析法
  -  这种⽅式是在内存中，从引⽤根对象向下⼀直找引⽤，找不到的对象就是垃圾。  

### 8. 强引用、软引用、弱引用、虚引用是什么，有什么区别✔

- 强引用：普通对象引用关系
- 软引用：内存不足时，系统会回收
- 弱引用：生命周期更短，当JVM垃圾回收时，无论内存是否充足，都会被回收
- 虚引用：主要用来跟踪对象被垃圾回收的活动

### 9. 被引用的对象就一定能存活吗✔

- 不一定
- 弱引用在GC时被回收，软引用在内存不足时回收

### 10. Java中的垃圾回收算法有哪些✔

- MarkSweep 标记清除算法
- Copying 拷贝算法
- MarkCompack 标记压缩算法

### 11. 有哪几种垃圾回收器，各自的优缺点是什么✔ 

- 新生代收集器
  - `Serial`单线程收集器
  - `ParNew`Serial收集器的多线程版本
  - `Parallel Scavenge`新生代收集器，并发的多线程收集器
- 老年代收集器
  - `CMS`以获得最短回收停顿时间为目标的收集器 
  - `Serial Old`
  - `Parallel Old`
- 整堆收集器
  - `G1`优先回收价值最大的区域

### 12. 详细说一下CMS的回收过程？CMS的问题是什么？  

...

- 回收过程
  - 初始标记
  - 并发标记
  - 重新标记
  - 并发清除
- 问题
  - 并发回收导致CPU资源紧张
  - 无法清理浮动垃圾
  - 并发失败
  - 内存碎片问题

### 13. 详细说一下G1的回收过程？  

... G1设计初衷就是替换 CMS  

- 初始标记
- 并发标记
- 最终标记
- 清理阶段

![image.png](https://gitee.com/tjlxy/img/raw/master/1679015927945-8aa545af-d187-41c1-a2cd-e6264e76e55e.png)

### 14. JVM中一次完整的GC是什么样子的✔ 

...

- 新生代`1/3`
  - eden`8/10`
  - from  Survivor  `1/10`
  - to  Survivor  `1/10`
- 老年代`2/3`

### 15. Minor GC 和 Full GC 有什么不同呢？  

- `Minor GC`只收集新生代的GC
- `Full GC`收集整个堆

### 16. 介绍下空间分配担保原则？  

-  JVM会先检查老年代最大可用连续空间是否大于新生代所有对象的总大小。  

### 17. 什么是类加载？类加载的过程？  

...

- 类加载：吧描述类的数据加载到内存里面，最终变成虚拟机直接使用的class对象
- 过程（ 加载、验证、准备、初始化和卸载  ）
  - 加载
  - **验证  \**
  - **准备	 |->连接**
  - **解析  /**
  - 初始化
  - 使用
  - 卸载

### 18. 什么是类加载器，常见的类加载器有哪些✔  

- 通过一个类的全限定性，类名获取该类的二进制字节流叫做类加载器
- 常见类加载器
  - 启动类加载器（BootStrap ClassLoader）
    - 是ExtClassLoader的父类加载器，默认负责加载`%JAVA_HOME%lib`下的jar包和class文件
  - 扩展类加载器（Extension ClassLoader）
    - 是AppClassLoader的父类加载器，负责加载`%JAVA_HOME%/lib/ext`文件夹下的jar包和class类
  - 系统类加载器（AppClassLoader）
    - 是自定义类加载器，负责加载`classpath`下的类文件
  - 自定义类加载器：继承自ClassLoader

### 19. 什么是双亲委派模型？为什么需要双亲委派模型✔  

收到请求后，先将请求委派到父类加载器去加载

- JVM在加载一个类时，会调用AppClassLoader的loadClass方法加载这个类，不过会先使ExtClassLoader的loadClass方法加载类，同样ExtClassLoader的loadClass会先使用BootstrapClassLoader加载类，如果BootstrapClassLoader加载到了就直接成功，如果没有加载到，extClassLoader尝试加载该类，如果没有加载到由APPClassLoader加载
- JVM在加载类时，会委派给Ext和Bootstrap进行加载，如果没加载到才有自己进行加载

### 20. 列举一些你知道的打破双亲委派机制的例子，为什么要打破？  

### 21. 说一下 JVM 调优的命令✔

- jps：正在运行的虚拟机进程
- jstat：监视虚拟机各种运行状态信息的命令行	
- jmap：生成堆转储快照
- jstack：生成虚拟机当前时刻的线程快照，查看各个线程的调用堆栈
- 。。。

### 补充

### JVM中那些是线程共享区

![image.png](https://cdn.nlark.com/yuque/0/2023/png/29617954/1678591346185-7263384a-f229-4ccf-8afa-fe69bfc75141.png#averageHue=%23fcfdfa&clientId=u110a8216-7dd4-4&from=paste&height=413&id=uc99c486c&name=image.png&originHeight=516&originWidth=689&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=267035&status=done&style=none&taskId=ubba0d0a5-a7d9-4022-8ea2-15cdcaf2bec&title=&width=551.2)

### 你们项⽬如何排查JVM问题  （调优命令）

### 什么是STW