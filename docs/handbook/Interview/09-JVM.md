# JVM

## JVM组成

### 什么是JVM内存结构✔

- 1、程序计数器
  - 记录当前虚拟机正在执行的线程指令地址
- 2、虚拟机栈
  - 每个方法执行的时候会创建一个栈帧
- 3、本地方法栈
  - JVM创建的线程调用native方法
- 4、Java堆
  - 所有线程共享的一块内存
- 5、方法区
  - 存放被加载的类信息、常量、静态变量、编译后的代码数据。

**JVM是什么**

Java Virtual Machine Java程序的运行环境（java二进制字节码的运行环境）

好处：

- 1）一次编写，到处运行
- 2）自动内存管理，**垃圾回收**机制

![image-20230710103457041](https://gitee.com/tjlxy/img/raw/master/image-20230710103457041.png)

从图中可以看出 JVM 的主要组成部分

- 1）ClassLoader（类加载器）
- 2）**Runtime Data Area（运行时数据区，内存分区）**
- 3）Execution Engine（执行引擎）
- 4）Native Method Library（本地库接口）

### JVM运行流程❕

1、类加载器（ClassLoader）把Java代码转换为字节码

2、运行时数据区（Runtime Data Area）把字节码加载到内存中，而字节码文件只是JVM的一套指令集规范，并不能直接交给底层系统去执行，而是有执行引擎运行

3、执行引擎（Execution Engine）将字节码翻译为底层系统指令，再交由CPU执行去执行，此时需要调用其他语言的本地库接口（Native Method Library）来实现整个程序的功能。

### 什么是程序计数器✔

**程序计数器：线程私有的，内部保存的字节码的行号。用于记录正在执行的字节码指令的地址。**

`javap -verbose  xx.class`    打印堆栈大小，局部变量的数量和方法的参数。

**java虚拟机对于多线程是通过线程轮流切换并且分配线程执行时间**。在任何的一个时间点上，一个处理器只会处理执行一个线程，如果当前被执行的这个线程它所分配的执行时间用完了【挂起】。处理器会切换到另外的一个线程上来进行执行。并且这个线程的执行时间用完了，接着处理器就会又来执行被挂起的这个线程。

那么现在有一个问题就是，当前处理器如何能够知道，对于这个被挂起的线程，它上一次执行到了哪里？那么这时就需要从程序计数器中来回去到当前的这个线程他上一次执行的行号，然后接着继续向下执行。

程序计数器是JVM规范中唯一一个没有规定出现OOM的区域，所以这个空间也不会进行GC。

### 什么是Java堆✔

**线程共享的区域：主要用来保存对象实例，数组等，当堆中没有内存空间可分配给实例，也无法再扩展时，则抛出OutOfMemoryError异常。**

- 年轻代被划分为三部分，Eden区和两个大小严格相同的Survivor区，根据JVM的策略，在经过几次垃圾收集后，仍然存活于Survivor的对象将被移动到老年代区间。
- 老年代主要保存生命周期长的对象，一般是一些老的对象
- 元空间保存的类信息、静态变量、常量、编译后的代码

为了避免方法区出现OOM，所以在java8中将堆上的方法区【永久代】给移动到了本地内存上，重新开辟了一块空间，叫做**元空间**。那么现在就可以避免掉OOM的出现了。

##### 元空间(MetaSpace)介绍

​	在 HotSpot JVM 中，永久代（ ≈ 方法区）中用于存放类和方法的元数据以及常量池，比如Class 和 Method。每当一个类初次被加载的时候，它的元数据都会放到永久代中。

​	永久代是有大小限制的，因此如果加载的类太多，很有可能导致永久代内存溢出，即OutOfMemoryError，为此不得不对虚拟机做调优。

​	那么，Java 8 中 PermGen 为什么被移出 HotSpot JVM 了？

官网给出了解释：http://openjdk.java.net/jeps/122

~~~
This is part of the JRockit and Hotspot convergence effort. JRockit customers do not need to configure the permanent generation (since JRockit does not have a permanent generation) and are accustomed to not configuring the permanent generation.

移除永久代是为融合HotSpot JVM与 JRockit VM而做出的努力，因为JRockit没有永久代，不需要配置永久代。
~~~

1）由于 PermGen 内存经常会溢出，引发OutOfMemoryError，因此 JVM 的开发者希望这一块内存可以更灵活地被管理，不要再经常出现这样的 OOM。

2）移除 PermGen 可以促进 HotSpot JVM 与 JRockit VM 的融合，因为 JRockit 没有永久代。

​	准确来说，Perm 区中的字符串常量池被移到了堆内存中是在 Java7 之后，Java 8 时，PermGen 被元空间代替，其他内容比如**类元信息、字段、静态属性、方法、常量**等都移动到元空间区。比如 java/lang/Object 类元信息、静态属性 System.out、整型常量等。

​	元空间的本质和永久代类似，都是对 JVM 规范中方法区的实现。不过元空间与永久代之间最大的区别在于：元空间并不在虚拟机中，而是使用本地内存。因此，默认情况下，元空间的大小仅受本地内存限制。

### 什么是虚拟机栈✔

**栈是线程私有的内存区域，每个线程都有自己的栈空间**。注意存储局部变量、函数参数、返回地址等临时数据

Java Virtual machine Stacks (java 虚拟机栈)

- **每个线程运行时所需要的内存，称为虚拟机栈，先进后出**
- 每个栈由多个栈帧（frame）组成，对应着每次方法调用时所占用的内存
- 每个线程只能有一个活动栈帧，对应着当前正在执行的那个方法



- 1）垃圾回收是否涉及栈内存？

   垃圾回收主要指就是堆内存，当栈帧弹栈以后，内存就会释放

- 2）栈内存分配越大越好吗？

   未必，默认的栈内存通常为1024k

   栈帧过大会导致线程数变少，例如，机器总内存为512m，目前能活动的线程数则为512个，如果把栈内存改为2048k，那么能活动的栈帧就会减半

- 3）方法内的局部变量是否线程安全？

   - 如果方法内局部变量没有逃离方法的作用范围，它是线程安全的

   - 如果是局部变量引用了对象，并逃离方法的作用范围，需要考虑线程安全

### 解释一下方法区

**方法区属于线程共享的内存区域，用于存储类的结构信息、静态变量、常量池、方法字节码等**

- **方法区(Method Area)是各个线程共享的内存区域**
- 主要存储类的信息、运行时常量池
- 虚拟机启动的时候创建，关闭虚拟机时释放
- 如果方法区域中的内存无法满足分配请求，则会抛出OutOfMemoryError: Metaspace

**常量池**

可以看作是一张表，虚拟机指令根据这张常量表找到要执行的类名、方法名、参数类型、字面量等信息

查看字节码结构（类的基本信息、常量池、方法定义）`javap -v xx.class`

比如下面是一个Application类的main方法执行，源码如下：

```java
public class Application {
    public static void main(String[] args) {
        System.out.println("hello world");
    }
}
```

找到类对应的class文件存放目录，执行命令：`javap -v Application.class`   查看字节码结构

```java
D:\code\jvm-demo\target\classes\com\heima\jvm>javap -v Application.class
Classfile /D:/code/jvm-demo/target/classes/com/heima/jvm/Application.class
  Last modified 2023-05-07; size 564 bytes    //最后修改的时间
  MD5 checksum c1b64ed6491b9a16c2baab5061c64f88   //签名
  Compiled from "Application.java"   //从哪个源码编译
public class com.heima.jvm.Application   //包名，类名
  minor version: 0
  major version: 52     //jdk版本
  flags: ACC_PUBLIC, ACC_SUPER  //修饰符
Constant pool:   //常量池
   #1 = Methodref          #6.#20         // java/lang/Object."<init>":()V
   #2 = Fieldref           #21.#22        // java/lang/System.out:Ljava/io/PrintStream;
   #3 = String             #23            // hello world
   #4 = Methodref          #24.#25        // java/io/PrintStream.println:(Ljava/lang/String;)V
   #5 = Class              #26            // com/heima/jvm/Application
   #6 = Class              #27            // java/lang/Object
   #7 = Utf8               <init>
   #8 = Utf8               ()V
   #9 = Utf8               Code
  #10 = Utf8               LineNumberTable
  #11 = Utf8               LocalVariableTable
  #12 = Utf8               this
  #13 = Utf8               Lcom/heima/jvm/Application;
  #14 = Utf8               main
  #15 = Utf8               ([Ljava/lang/String;)V
  #16 = Utf8               args
  #17 = Utf8               [Ljava/lang/String;
  #18 = Utf8               SourceFile
  #19 = Utf8               Application.java
  #20 = NameAndType        #7:#8          // "<init>":()V
  #21 = Class              #28            // java/lang/System
  #22 = NameAndType        #29:#30        // out:Ljava/io/PrintStream;
  #23 = Utf8               hello world
  #24 = Class              #31            // java/io/PrintStream
  #25 = NameAndType        #32:#33        // println:(Ljava/lang/String;)V
  #26 = Utf8               com/heima/jvm/Application
  #27 = Utf8               java/lang/Object
  #28 = Utf8               java/lang/System
  #29 = Utf8               out
  #30 = Utf8               Ljava/io/PrintStream;
  #31 = Utf8               java/io/PrintStream
  #32 = Utf8               println
  #33 = Utf8               (Ljava/lang/String;)V
{
  public com.heima.jvm.Application();  //构造方法
    descriptor: ()V
    flags: ACC_PUBLIC
    Code:
      stack=1, locals=1, args_size=1
         0: aload_0
         1: invokespecial #1                  // Method java/lang/Object."<init>":()V
         4: return
      LineNumberTable:
        line 3: 0
      LocalVariableTable:
        Start  Length  Slot  Name   Signature
            0       5     0  this   Lcom/heima/jvm/Application;

  public static void main(java.lang.String[]);  //main方法
    descriptor: ([Ljava/lang/String;)V
    flags: ACC_PUBLIC, ACC_STATIC
    Code:
      stack=2, locals=1, args_size=1
         0: getstatic     #2                  // Field java/lang/System.out:Ljava/io/PrintStream;
         3: ldc           #3                  // String hello world
         5: invokevirtual #4                  // Method java/io/PrintStream.println:(Ljava/lang/String;)V
         8: return
      LineNumberTable:
        line 7: 0
        line 8: 8
      LocalVariableTable:
        Start  Length  Slot  Name   Signature
            0       9     0  args   [Ljava/lang/String;
}
SourceFile: "Application.java"
```

下图，左侧是main方法的指令信息，右侧constant pool  是常量池

main方法按照指令执行的时候，需要到常量池中查表翻译找到具体的类和方法地址去执行

**运行时常量池**

常量池是 *.class 文件中的，当该类被加载，它的常量池信息就会放入运行时常量池，并把里面的符号地址变为真实地址

### 介绍一下直接内存

不受 JVM 内存回收管理，是虚拟机的系统内存，常见于 NIO 操作时，用于数据缓冲区，分配回收成本较高，但读写性能高，不受 JVM 内存回收管理

举例：

需求，在本地电脑中的一个较大的文件（超过100m）从一个磁盘挪到另外一个磁盘

```java
/**
 * 演示 ByteBuffer 作用
 */
public class Demo1_9 {
    static final String FROM = "E:\\编程资料\\第三方教学视频\\youtube\\Getting Started with Spring Boot-sbPSjI4tt10.mp4";
    static final String TO = "E:\\a.mp4";
    static final int _1Mb = 1024 * 1024;

    public static void main(String[] args) {
        io(); // io 用时：1535.586957 1766.963399 1359.240226
        directBuffer(); // directBuffer 用时：479.295165 702.291454 562.56592
    }

    private static void directBuffer() {
        long start = System.nanoTime();
        try (FileChannel from = new FileInputStream(FROM).getChannel();
             FileChannel to = new FileOutputStream(TO).getChannel();
        ) {
            ByteBuffer bb = ByteBuffer.allocateDirect(_1Mb);
            while (true) {
                int len = from.read(bb);
                if (len == -1) {
                    break;
                }
                bb.flip();
                to.write(bb);
                bb.clear();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        long end = System.nanoTime();
        System.out.println("directBuffer 用时：" + (end - start) / 1000_000.0);
    }

    private static void io() {
        long start = System.nanoTime();
        try (FileInputStream from = new FileInputStream(FROM);
             FileOutputStream to = new FileOutputStream(TO);
        ) {
            byte[] buf = new byte[_1Mb];
            while (true) {
                int len = from.read(buf);
                if (len == -1) {
                    break;
                }
                to.write(buf, 0, len);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
        long end = System.nanoTime();
        System.out.println("io 用时：" + (end - start) / 1000_000.0);
    }
}
```

可以发现，使用传统的IO的时间要比NIO操作的时间长了很多了，也就说NIO的读性能更好。

这个是跟我们的JVM的直接内存是有一定关系，如下图，是传统阻塞IO的数据流程

![image-20230724103154681](https://gitee.com/tjlxy/img/raw/master/image-20230724103154681.png)

下图是NIO传输数据的流程，在这个里面主要使用到了一个直接内存，不需要在堆中开辟空间进行数据的拷贝，jvm可以直接

操作直接内存，从而使数据读写传输更快

![image-20230724103218546](https://gitee.com/tjlxy/img/raw/master/image-20230724103218546.png)

### 什么是JVM内存模型

- 指定了一组排序规则，来保证线程的可见性

### JVM 内存模型中，为什么要区分新生代和年老代，对于新生代，为什么又要区分eden 区survial区✔

- 主流垃圾回收器 cms g1都使用了分代收集算法
- 正常系统运行时会有**海量临时对象**产生，这些对象短期内大部分就会失效，对于这些对象我们把他们临时放到新生代
- 新生代满了之后需要清理垃圾对象，我们会把有效对象复制到老年代，以便后续继续使用
- **为了更有效的区分哪些对象应该被复制到老年代，所以在新生代划分出了eden去和s0,s1区域**
- 细化后的新生代内部被再次划分以便保证高速读写同时内存连续，
   - 新对象会被保存到eden区（开始是空的所以内存连续），eden区满了会把有效对象复制到s0（s0也是空的所以也是连续空间）
   - 清空eden区（再次写入时又是连续空间）
   - s0 和 s1 在命名上互换 原来的s1等待写入（空的）
   - eden区再次满了，重复上面步骤
- eden区通过复制/清除算法保证了读写连续性（因为新生代的对象产生和销毁非常频繁，所以才采用了清空的方式）

### heap 和stack 有什么区别✔

申请方式：

- stack:**由系统自动分配**。例如，声明在函数中一个局部变量 int b; 系统自动在栈中为 b 开辟空间

- heap:**需要程序员自己申请，并指明大小**，在 c 中 malloc 函数，对于Java 需要手动 new Object()的形式开辟

申请后系统的响应：

- stack：**只要栈的剩余空间大于所申请空间，系统将为程序提供内存**，否则将报异常提示栈溢出。

- heap：**首先应该知道操作系统有一个记录空闲内存地址的链表，当系统收到程序的申请时，会遍历该链表，寻找第一个空间大于所申请空间的堆结点，然后将该结点从空闲结点链表中删除，并将该结点的空间分配给程序**。另外，由于找到的堆结点的大小不一定正好等于申请的大小，系统会自动的将多余的那部分重新放入空闲链表中。

存储内容：

- 堆：**存储动态分配的对象、数组和数据结构等，大小可动态增长或缩小**。
- 栈：**存储局部变量、函数参数、返回地址和临时数据等，大小固定且有限**。

内存管理：

- 堆：**需要手动管理内存的分配和释放，以避免内存泄漏和悬挂指针等问题**。
- 栈：**自动管理内存的分配和释放，不需要手动干预**。

生命周期：

- 堆：**对象在堆上分配，直到手动释放或程序结束时才会被回收**。
- 栈：**变量在栈上创建时分配空间，离开作用域后自动释放**。

补充：

1、栈内存一般会用来存储局部变量和方法调用，但堆内存是用来存储Java对象和数组的。堆会GC垃圾回收，而栈不会。

2、栈内存是线程私有的，而堆内存是线程共有的。

3、两者异常错误不同，但如果栈内存或者堆内存不足都会抛出异常。

栈空间不足：java.lang.StackOverFlowError。

堆空间不足：java.lang.OutOfMemoryError。

### 什么情况下会发生栈内存溢出

- 当线程请求的栈深度超过了虚拟机允许的最大深度时

### 谈谈对 OOM 的认识？如何排查 OOM 的问题

OOM（Out of Memory）是指Java虚拟机（JVM）中的内存不足，导致无法继续正常的运行。通常情况下，当程序需要的内存超过了JVM所能提供的内存时，就会发生OOM错误。

OOM问题通常是由以下几个方面引起的：

- 1、内存泄漏：如果一个对象已经不再需要，但仍然被程序占用，那么它就会占用内存资源，最终导致内存溢出。

- 2、程序错误：如果程序本身存在逻辑错误或算法错误，可能会导致程序无限制地分配内存，最终导致OOM。

- 3、JVM配置不合理：如果JVM的堆内存大小设置不合理，或者GC算法配置不正确，可能会导致OOM问题的发生。

为了排查OOM问题，可以采取以下几个步骤：

- 1、分析错误日志：当程序发生OOM错误时，JVM会生成一份错误日志，其中包含了OOM错误的详细信息。通过分析日志文件，可以了解到错误发生的位置、原因以及相关的堆栈信息等。

- 2、检查代码：分析错误日志后，可以结合代码逐步排查错误。首先可以检查程序中是否存在内存泄漏的情况，例如未关闭文件流、未释放资源等。

- 3、检查内存使用情况：可以通过工具监控程序的内存使用情况，了解程序中哪些对象占用了大量的内存。可以使用JConsole、VisualVM等工具来查看程序的堆内存使用情况。

- 4、调整JVM配置：如果排查后发现是JVM配置不合理导致的OOM问题，可以尝试调整JVM的堆内存大小、GC算法等参数来解决问题。

- 5、加强代码质量管理：对于存在内存泄漏等问题的代码，可以进行优化或重构。同时也可以加强代码质量管理，避免出现逻辑错误和算法错误等问题。

总之，排查OOM问题是一个需要耐心和细心的过程，需要从多个方面入手，结合实际情况采取相应的措施。

### 谈谈 JVM 中的常量池

- Class文件常量池	
- 运行时常量池
- 全局字符串常量池
- 基本类型包装类对象常量池

### 你理解的JVM 原理

![image-20230827102541868](https://gitee.com/tjlxy/img/raw/master/image-20230827102541868.png)

关键点：

1. jvm标准与实现
2. 解决了跨平台问题
3. JMM内存管理
4. JVM模型
5. 不同的垃圾回收器

答： jvm是java虚拟机，我们的class文件运行在虚拟机上，通过虚拟机解决了跨平台的问题，jvm中有jmm来管理java内存访问的方式，不同的jvm实现性能关注有差异，现在主流的实现是Hotspot，垃圾回收器是G1，jvm运行时内存中分为方法区，堆，栈，本地方法栈，执行代码时需要执行引擎

## 垃圾回收

### 如何判断一个对象是否存活（ GC如何判断对象可以被回收  ）✔

简单一句就是：如果一个或多个对象没有任何的引用指向它了，那么这个对象现在就是垃圾，如果定位了垃圾，则有可能会被垃圾回收器回收。

如果要定位什么是垃圾，有两种方式来确定，第一个是引用计数法，第二个是可达性分析算法

- 1、**引用计数法**
  
  -  这种⽅式是给堆内存当中的每个对象记录⼀个引⽤个数。引⽤个数为0的就认为是垃圾。这是早期JDK中使⽤的⽅式。引⽤计数⽆法解决循环引⽤的问题  
  -  一个对象被引用了一次，在当前的对象头上递增一次引用次数，如果这个对象的引用次数为0，代表这个对象可回收
  
  ```java
  String demo = new String("123");		//ref = 1
  
  String demo = null;		//ref = 0
  ```
  
  注意：当对象间出现了循环引用的话，则引用计数法就会失效
  
- 2、**可达性分析法**
  
  - 这种⽅式是在内存中，从引⽤根对象向下⼀直找引⽤，找不到的对象就是垃圾。  
  
  - **现在的虚拟机采用的都是通过可达性分析算法来确定哪些内容是垃圾。**
  
    会存在一个根节点【GC Roots】，引出它下面指向的下一个节点，再以下一个节点节点开始找出它下面的节点，依次往下类推。直到所有的节点全部遍历完毕。扫描堆中的对象，看是否能够沿着 GC Root 对象 为起点的引用链找到该对象，找不到，表示可以回收

### 强引用、软引用、弱引用、虚引用是什么，有什么区别✔

不同的引用类型呢主要体现的是**对象不同的可达性状态和对于垃圾收集的影响**

- 强引用：普通对象的引用关系

  只要还有强引用指向一个对象，就表示对象还活着，垃圾收集器无法回收这一类对象，只有在没有其他引用关系或者是超过了引用的作用域，再或者是显示去把引用赋值为null的时候，垃圾收集器才能够去进行内存的一个回收。

- 软引用：内存不足时，系统会回收

  当JVM任务内存不足时候，会试图回收引用指向的对象，通常用来实现内存敏感的一线缓存，如果还有空闲内存，就可以暂时去保留缓存，当内存不足时会清理掉，这样就可以使用缓存的一个同时，不会耗尽内存

- 弱引用：生命周期更短，当JVM垃圾回收时，无论内存是否充足，都会被回收

  弱引用是相对与强引用而言的，允许在存在引用关联的情况下，被垃圾回收的一个对象

- 虚引用：主要用来跟踪对象被垃圾回收的活动

  不会决定对象的生命周期，它提供了一种确保对象被finalize以后，去做某些事情的一种机制，当垃圾回收期准备去回收一个对象的时候，如果发现还有虚引用就会在回收对象的内存之前把这个虚引用加入到与之关联的一个引用队列里面，判断是否可以进行垃圾回收

### 被引用的对象就一定能存活吗✔

- 不一定
- 弱引用在GC时被回收，软引用在内存不足时回收

### Java中的垃圾回收算法有哪些✔

- 1、**MarkSweep 标记清除算法**

  标记清除算法，是将垃圾回收分为2个阶段，分别是**标记和清除**。

  1.根据可达性分析算法得出的垃圾进行标记

  2.对这些标记为可回收的内容进行垃圾回收

  标记清除算法解决了引用计数算法中的循环引用的问题，没有从root节点引用的对象都会被回收。

  同样，标记清除算法也是有缺点的：

  - 1）效率较低，**标记和清除两个动作都需要遍历所有的对象**，并且在GC时，**需要停止应用程序**，对于交互性要求比较高的应用而言这个体验是非常差的。
  - 2）（**重要**）通过标记清除算法清理出来的内存，碎片化较为严重，因为被回收的对象可能存在于内存的各个角落，所以清理出来的内存是不连贯的。

- 2、**Copying 拷贝算法、复制算法**

  复制算法的核心就是，**将原有的内存空间一分为二，每次只用其中的一块**，在垃圾回收时，将正在使用的对象复制到另一个内存空间中，然后将该内存空间清空，交换两个内存的角色，完成垃圾的回收。

  如果内存中的垃圾对象较多，需要复制的对象就较少，这种情况下适合使用该方式并且效率比较高，反之，则不适合

  1）将内存区域分成两部分，每次操作其中一个。

  2）当进行垃圾回收时，将正在使用的内存区域中的存活对象移动到未使用的内存区域。当移动完对这部分内存区域一次性清除。

  3）周而复始。

  优点：

  - 在垃圾对象多的情况下，效率较高
  - 清理后，内存无碎片

  缺点：

  - 分配的2块内存空间，在同一个时刻，只能使用一半，内存使用率较低

- 3、**MarkCompack 标记压缩算法、标记整理法**

  标记压缩算法是在标记清除算法的基础之上，做了优化改进的算法。和标记清除算法一样，也是从根节点开始，对对象的引用进行标记，在清理阶段，并不是简单的直接清理可回收对象，而是将存活对象都向内存另一端移动，然后清理边界以外的垃圾，从而解决了碎片化的问题

  1）标记垃圾。

  2）需要清除向右边走，不需要清除的向左边走。

  3）清除边界以外的垃圾。

  优缺点同标记清除算法，解决了标记清除算法的碎片化的问题，同时，标记压缩算法多了一步，对象移动内存位置的步骤，其效率也有有一定的影响。

  与复制算法对比：复制算法标记完就复制，但标记整理算法得等把所有存活对象都标记完毕，再进行整理

### 有哪几种垃圾回收器，各自的优缺点是什么✔ 

- 1、新生代收集器
  - `Serial`单线程收集器
  - `ParNewSerial`收集器的多线程版本
  - `Parallel Scavenge`新生代收集器，并发的多线程收集器
- 2、老年代收集器
  - `CMS`以获得最短回收停顿时间为目标的收集器 
  - `Serial Old`
  - `Parallel Old`
- 3、整堆收集器
  - `G1`优先回收价值最大的区域

### 详细说一下CMS的回收过程？CMS的问题是什么

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

### 详细说一下G1的回收过程

G1设计初衷就是替换 CMS  

- 初始标记
- 并发标记
- 最终标记
- 清理阶段

> - 1、用户创建一个对象，JVM需要到方法区去找对象的类型信息。然后再创建对象
> - 2、JVM要实例化一个对象，首先要在堆中先创建一个对象-->半初始化状态
> - 3、对象首先会分配在堆内存中的新生代Eden。然后经过一个Minor GC，对象如果存活，就会进入S区。在后续的没错GC中，如果对象一直存活，就会在S去来回拷贝，每移动一次，年龄加1，-->多大年龄才会移入老年代？年龄最大15，超过一定年龄后，对象转入老年代
> - 4、当方法执行结束后，栈中的指针会先移除掉
> - 5、堆中的对象，经过Full GC，就会被标记为垃圾，然后被GC线程清理掉

### JVM中一次完整的GC是什么样子的✔ 

- 新生代`1/3`
  - eden`8/10`
  - from  Survivor  `1/10`
  - to  Survivor  `1/10`
- 老年代`2/3`

### Minor GC 和 Full GC 有什么不同呢

- `Minor GC`只收集新生代的GC
- `Full GC`收集整个堆

### 介绍下空间分配担保原则

-  JVM会先检查老年代最大可用连续空间是否大于新生代所有对象的总大小。  

### JVM分带年龄为什么是15次

在JVM的垃圾回收过程中，年轻代和老年代是不同的内存区域，其中年轻代又分为Eden区、Survivor区（一般是两个）。

JVM使用了分代垃圾回收算法，即将对象根据其生命周期分为不同的代（Generation）。大部分对象在创建后很快就不再被引用，因此它们被认为是"新生代"（Young Generation）的对象。而一些经过多次垃圾回收仍然存活的对象被移到"老年代"（Old Generation）。

为了更高效地进行垃圾回收，JVM使用了一种叫做"分带年龄"（Generational Aging）的策略。该策略基于一个假设：大部分对象的生命周期较短，而只有少量的对象会存活很长时间。

当对象在Eden区被创建时，它们的初始年龄为0。每当发生一次垃圾回收，如果对象仍然存活，则它的年龄会增加1。当对象的年龄达到一定的阈值（默认为15），则该对象会被晋升到老年代。

这种设计的目的是通过年龄来衡量对象的存活能力。如果一个对象经过多次垃圾回收仍然存活，那么它很可能是一个长期存活的对象，将其移到老年代可以减少年轻代的垃圾回收次数，提高性能。

值得注意的是，JVM并没有固定的"15次"作为对象晋升的阈值，这个值可以通过JVM参数进行调整。不同的JVM实现和配置可能会有不同的默认值。

总结起来，分带年龄（Generational Aging）策略是JVM中用于优化垃圾回收的一种技术，在对象的生命周期中通过对象年龄来判断其是否晋升到老年代。默认情况下，对象的年龄达到15次时会被晋升到老年代。

## 类加载器

### 什么是类加载？类加载的过程

- 类加载：**把描述类的数据加载到内存里面，最终变成虚拟机直接使用的class对象**

- 过程（ 加载、验证、准备、初始化和卸载  ）
  - 加载
  
    查找和导入class文件
  
  - **验证  \\**
  
    保证加载类的准确性
  
  - **准备	 |->连接**
  
    为类变量分配内存并设置类变量初始值
  
  - **解析  /**
  
    把类中的符号引用转换为直接引用
  
  - 初始化
  
    对类的静态变量，静态代码块执行初始化操作
  
  - 使用
  
    JVM 开始从入口方法开始执行用户的程序代码
  
  - 卸载
  
    当用户程序代码执行完毕后，JVM便开始销毁创建的Class对象。

### 什么是类加载器，常见的类加载器有哪些

**类加载器**

通过一个类的全限定性，类名获取该类的二进制字节流叫做类加载器

JVM只会运行二进制文件，而类加载器（ClassLoader）的主要作用就是将**字节码文件加载到JVM中**，从而让Java程序能够启动起来。现有的类加载器基本上都是java.lang.ClassLoader的子类，该类的主要职责就是用于将指定的类找到或生成对应的字节码文件，同时类加载器还会负责加载程序所需要的资源

**常见类加载器**：

- 1、**启动类加载器(BootStrap ClassLoader)：**
  
  该类并不继承ClassLoader类，其是由C++编写实现。用于加载**JAVA_HOME/jre/lib**目录下的类库。
  
- 2、**扩展类加载器(ExtClassLoader)：**

  该类是ClassLoader的子类，主要加载**JAVA_HOME/jre/lib/ext**目录中的类库。

- 3、**应用类加载器(AppClassLoader)：**

  该类是ClassLoader的子类，主要用于加载**classPath**下的类，也就是加载开发者自己编写的Java类。

- 4、**自定义类加载器：**

  开发者自定义类继承ClassLoader，实现自定义类加载规则。

类加载器的体系并不是“继承”体系，而是**委派体系**，类加载器首先会到自己的parent中查找类或者资源，如果找不到才会到自己本地查找。类加载器的委托行为动机是为了避免相同的类被加载多次。

### 什么是双亲委派模型✔

收到请求后，先将请求委派到父类加载器去加载

如果一个类加载器在接到加载类的请求时，它首先不会自己尝试去加载这个类，而是把这个请求任务委托给父类加载器去完成，依次递归，如果父类加载器可以完成类加载任务，就返回成功；只有父类加载器无法完成此加载任务时，才由下一级去加载

- JVM在加载一个类时，会调用**应用类加载器**(AppClassLoader)的loadClass方法加载这个类，不过会先使**扩展类加载器**(ExtClassLoader的loadClass)方法加载类，同样ExtClassLoader的loadClass会先使用**启动类加载器**(BootstrapClassLoader)加载类，如果启动类加载器(BootstrapClassLoader)加载到了就直接成功，如果没有加载到，扩展类加载器(ExtClassLoader的loadClass)尝试加载该类，如果没有加载到由应用类加载器(AppClassLoader)加载
- JVM在加载类时，会委派给Ext和Bootstrap进行加载，如果没加载到才有自己进行加载

### 为什么需要双亲委派模型✔

（1）通过双亲委派机制可以避免某一个类被重复加载，当父类已经加载后则无需重复加载，保证唯一性。

（2）为了安全，保证类库API不会被修改

在工程中新建java.lang包，接着在该包下新建String类，并定义main函数

```java
public class String {

    public static void main(String[] args) {

        System.out.println("demo info");
    }
}
```

此时执行main函数，会出现异常，在类 java.lang.String 中找不到 main 方法

出现该信息是因为由双亲委派的机制，java.lang.String的在启动类加载器(Bootstrap classLoader)得到加载，因为在核心jre库中有其相同名字的类文件，但该类中并没有main方法。这样就能防止恶意篡改核心API库。

### 列举一些你知道的打破双亲委派机制的例子，为什么要打破

- 1、OSGi：OSGi（Open Service Gateway Initiative）是一种面向服务的模块化架构，其运行环境中存在多个不同版本的Java类库。在OSGi中，每个模块都有自己的ClassLoader，打破了双亲委派机制，从而实现了多个ClassLoader并存的效果。

- 2、JBoss Modules：JBoss Modules是一个用于管理JAR依赖关系和加载顺序的模块化框架。在JBoss Modules中，每个模块都有自己的ClassLoader，打破了双亲委派机制，从而实现了更加灵活的ClassLoader管理方式。

- 3、Tomcat：在Tomcat中，Web应用程序通常都有自己的ClassLoader，并且这些ClassLoader都是平级的，不存在父子关系，打破了双亲委派机制。

- 4、JSP编译器：在JSP编译器中，由于需要将JSP页面转换为Java代码，因此需要使用一个独立的ClassLoader来加载JSP页面所依赖的类库，从而打破了双亲委派机制。

为什么要打破双亲委派机制呢？主要是为了解决一些特殊的问题，比如模块化开发、插件化开发、动态代码生成等。在这些场景下，往往需要动态加载一些类库并进行隔离，如果使用双亲委派机制，就会出现一些问题，比如无法隔离类库、类库冲突等。打破双亲委派机制可以实现更加灵活的ClassLoader管理方式，从而解决这些问题。

## JVM调优

### 说一下 JVM 调优的命令✔

- jps：正在运行的虚拟机进程
- jstat：监视虚拟机各种运行状态信息的命令行
- jmap：生成堆转储快照
- jstack：生成虚拟机当前时刻的线程快照，查看各个线程的调用堆栈

```
进行JVM调优时，可以使用一些命令行选项来设置Java虚拟机的运行参数。以下是一些常用的JVM调优的命令：

1. -Xms: 设置JVM的初始堆大小。
   例如：-Xms512m，表示初始堆大小为512MB。

2. -Xmx: 设置JVM的最大堆大小。
   例如：-Xmx2g，表示最大堆大小为2GB。

3. -XX:NewSize: 设置新生代的初始大小。
   例如：-XX:NewSize=256m，表示新生代初始大小为256MB。

4. -XX:MaxNewSize: 设置新生代的最大大小。
   例如：-XX:MaxNewSize=512m，表示新生代最大大小为512MB。

5. -XX:SurvivorRatio: 设置新生代中Eden区和Survivor区的比例。
   例如：-XX:SurvivorRatio=8，表示Eden区和Survivor区的比例为8:1。

6. -XX:PermSize: 设置永久代（在JDK 8及以前版本中）的初始大小。
   例如：-XX:PermSize=128m，表示永久代初始大小为128MB。

7. -XX:MaxPermSize: 设置永久代（在JDK 8及以前版本中）的最大大小。
   例如：-XX:MaxPermSize=256m，表示永久代最大大小为256MB。

8. -XX:MetaspaceSize: 设置元空间（在JDK 8及以后版本中替代了永久代）的初始大小。
   例如：-XX:MetaspaceSize=128m，表示元空间初始大小为128MB。

9. -XX:MaxMetaspaceSize: 设置元空间（在JDK 8及以后版本中替代了永久代）的最大大小。
   例如：-XX:MaxMetaspaceSize=256m，表示元空间最大大小为256MB。

10. -Xss: 设置线程的栈大小。
    例如：-Xss1m，表示线程的栈大小为1MB。

这些是一些常见的JVM调优命令，具体使用哪些命令需要根据具体场景和需求进行选择和配置。在进行JVM调优时，还可以使用其他一些选项和工具来监视和分析应用程序的性能，例如jstat、jvisualvm等。
```

### CPU飙高系统反应慢怎么排查

- 1、查看系统监控工具：使用系统自带或第三方的监控工具，例如`top`、`htop`、`Task Manager`等，查看CPU占用率最高的进程或线程。
- 2、定位具体代码或模块：根据占用CPU的进程或线程，定位到具体的代码或模块。可以借助日志、性能分析工具（如Java VisualVM、YourKit等）进行分析。
- 3、分析代码逻辑：检查相关代码逻辑是否存在无限循环、死锁、资源争用等问题。这些问题可能导致CPU持续高占用。
- 4、检查数据库操作：如果涉及数据库访问，检查是否存在慢查询、缓存问题等。优化数据库查询语句、添加索引、合理使用缓存可以改善系统性能。
- 5、检查外部资源访问：如果代码中有网络请求、文件读写等操作，确保这些操作没有出现阻塞或超时问题。
- 6、调整线程池配置：对于多线程应用，检查线程池的配置是否合理。过大的线程池可能导致资源竞争，过小的线程池则可能导致任务排队等待。
- 7、性能优化和代码重构：根据具体情况进行性能优化，例如并发处理、异步操作、减少资源消耗等。有时，可能需要进行代码重构以改善系统的可维护性和性能。

### JVM中那些是线程共享区

堆区和方法区是所有线程共享的，栈、本地方法栈、程序计数器是每个线程独有的

![image.png](https://cdn.nlark.com/yuque/0/2023/png/29617954/1678591346185-7263384a-f229-4ccf-8afa-fe69bfc75141.png#averageHue=%23fcfdfa&clientId=u110a8216-7dd4-4&from=paste&height=413&id=uc99c486c&name=image.png&originHeight=516&originWidth=689&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=267035&status=done&style=none&taskId=ubba0d0a5-a7d9-4022-8ea2-15cdcaf2bec&title=&width=551.2)

### 什么是STW

STW（Stop-The-World）是指在Java虚拟机（JVM）中进行垃圾回收（GC）时，会发生一种**暂停所有应用线程**的情况。在这个过程中，应用程序的所有线程都将停止执行，直到垃圾回收完成。

垃圾回收是JVM的一项重要功能，用于自动管理内存资源。当应用程序运行时，会产生一些不再使用的对象，这些对象占用了内存空间。为了释放这些无用的对象并回收内存，JVM会定期启动垃圾回收器来进行回收操作。

在进行垃圾回收时，为了保证数据的一致性和完整性，JVM会暂停所有的应用线程，停止它们的执行。这意味着在STW期间，应用程序的所有线程都无法继续执行任何任务，包括用户请求的处理和业务逻辑的执行。

STW的存在可能会导致一些问题，例如：

- 1、响应时间延迟：在STW期间，应用程序无法响应用户的请求，可能会导致用户体验下降，特别是对于需要快速响应的实时系统或高并发系统而言。

- 2、性能抖动：由于STW会暂停所有线程，因此垃圾回收的时间越长，应用程序的性能就会受到更大的影响。这可能导致应用程序在某些时候性能下降，而在回收完成后恢复正常。

为了减少STW对应用程序的影响，JVM引入了一些优化技术，例如分代垃圾回收、并发垃圾回收等。这些技术可以将垃圾回收的工作分散到不同的阶段或与应用程序并发执行，从而减少STW的时间和影响。

总之，STW是指在进行垃圾回收时，JVM会暂停所有应用线程的情况。它可能会导致响应时间延迟和性能抖动，但通过优化技术可以减少其影响。