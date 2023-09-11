# Java并发

## 基础知识

### 1.线程和进程有什么区别✔

- 进程：是操作系统资源分配的基本单位
- 线程：是处理器任务调度和执行的基本单位（轻量进程）

> 程序由指令和数据组成，但这些指令要运行，数据要读写，就必须将指令加载至 CPU，数据加载至内存。在指令运行过程中还需要用到磁盘、网络等设备。进程就是用来加载指令、管理内存、管理 IO 的。
>
> **当一个程序被运行，从磁盘加载这个程序的代码至内存，这时就开启了一个进程**。
>
> 一个进程之内可以分为一到多个线程。
>
> 一个线程就是一个指令流，将指令流中的一条条指令以一定的顺序交给 CPU 执行
>
> Java 中，**线程作为最小调度单位，进程作为资源分配的最小单位**。在 windows 中**进程是不活动的，只是作为线程的容器**
>
> - **进程是正在运行程序的实例，进程中包含了线程，每个线程执行不同的任务** 
> - **不同的进程使用不同的内存空间，在当前进程下的所有线程可以共享内存空间** 
> - **线程更轻量，线程上下文切换成本一般上要比进程上下文切换低(上下文切换指的是从一个线程切换到另一个线程)**

### 2. 创建线程的三种方式的对比✔

共有四种方式可以创建线程，分别是：继承Thread类、实现runnable接口、实现 Callable接口、线程池创建线程

- 实现Runnable接口
- 实现Callable接口
- 继承Thread类
- 线程池创建线程

### 3. 为什么要使用多线程呢

- 轻量进程（和进程对比）
  - 是程序执行的最小单位，线程的切换与调度成本远远小于进程
- 高并发系统
  - 多线程是高并发系统的基础，提高系统整体的并发能力和性能。

### 4. 线程的状态流转✔

线程的状态可以参考JDK中的Thread类中的枚举State

```java
public enum State {
    /**
        * 尚未启动的线程的线程状态
        */
    NEW,
    /**
        * 可运行线程的线程状态。处于可运行状态的线程正在 Java 虚拟机中执行，但它可能正在等待来自 
        * 操作系统的其他资源，例如处理器。
        */
    RUNNABLE,
    /**
        * 线程阻塞等待监视器锁的线程状态。处于阻塞状态的线程正在等待监视器锁进入同步块/方法或在调 
        * 用Object.wait后重新进入同步块/方法。
        */
    BLOCKED,
    /**
        * 等待线程的线程状态。由于调用以下方法之一，线程处于等待状态：
        * Object.wait没有超时
        * 没有超时的Thread.join
        * LockSupport.park
        * 处于等待状态的线程正在等待另一个线程执行特定操作。
        * 例如，一个对对象调用Object.wait()的线程正在等待另一个线程对该对象调用Object.notify() 
        * 或Object.notifyAll() 。已调用Thread.join()的线程正在等待指定线程终止。
        */
    WAITING,
    /*
        * 具有指定等待时间的等待线程的线程状态。由于以指定的正等待时间调用以下方法之一，线程处于定 
        * 时等待状态：
        * Thread.sleep
        * Object.wait超时
        * Thread.join超时
        * LockSupport.parkNanos
        * LockSupport.parkUntil
        * </ul>
        */
    TIMED_WAITING,
    /**
        * 已终止线程的线程状态。线程已完成执行
        */
    TERMINATED;
}

```



- 新建（new）
- 就绪（runnable）
- 运行（Running）
- 阻塞（Blocked）
- 死亡（Dead）

![image.png](https://cdn.nlark.com/yuque/0/2023/png/29617954/1678182403018-69f1a0f7-cdbb-453a-9dd3-1c45af3df473.png#averageHue=%23f4f4f4&clientId=ub056d680-a9fb-4&from=paste&height=511&id=u08465efa&name=image.png&originHeight=639&originWidth=864&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=188643&status=done&style=none&taskId=ub811b595-6d80-4618-aec3-efb4d3e0345&title=&width=691.2)

**新建**

当用new关键字创建一个线程时，还没调用start 就是新建状态。

**就绪**

调用了 start 方法之后，线程就进入了就绪阶段。此时，线程不会立即执行run方法，需要等待获取CPU资源。

**运行**

当线程获得CPU时间片后，就会进入运行状态，开始执行run方法。

**阻塞**

调用sleep方法，使线程睡眠。

调用wait方法，使线程进入等待。

注意：阻塞状态只能进入就绪状态，不能直接进入运行状态。因为，从就绪状态到运行状态的切换是不受线程自己控制的，而是由线程调度器所决定。只有当线程获得了CPU时间片之后，才会进入运行状态。

**死亡**

当run方法正常执行结束时，或者由于某种原因抛出异常都会使线程进入死亡状态。(或者调用stop)

![image-20230629110102621](https://gitee.com/tjlxy/img/raw/master/image-20230629110102621.png)

### 5. 什么是线程死锁?如何避免死锁✔

**死锁**：两个或多个线程相互等待对方释放资源而无法继续执行的一种状态。简单来说，当两个或多个线程无法继续执行，因为每个线程都在等待其他线程所占有的资源时，就会发生死锁。

- 多个线程同时被阻塞

- 死锁原因
  - 互斥条件：一个资源每次只能被一个线程使用
  - 请求与保持条件：一个线程在阻塞等待某个资源时，不释放已占资源
  - 不可剥夺条件：一个线程已获得的资源，在未使用完之前，不能强行剥夺
  - 循环等待条件：若干线程形成头尾相接的循环等待资源关系
  
- 如何避免
  - 注意加锁顺序，保证每个线程按同样的顺序进行加锁
  
  - 注意加锁时限，可以针对所设置一个超时时间
  
  - **注意死锁检查**，这是一种预防机制，确保在第一时间发现死锁并进行解决
  
    ---
  
  - 避免循环等待：按照相同的顺序获取资源，或者使用资源请求的层级关系来避免循环等待。
  
  - 避免持有并等待：在获取某个资源前，先释放已经持有的资源。
  
  - 引入资源剥夺机制：如果一个线程等待时间过长，可以考虑强制剥夺它所持有的资源。
  
  - 使用超时机制：限制资源等待的时间，在一定时间内无法获得资源，则放弃或重试。

### 如何进行死锁诊断

第一：查看运行的线程

```shell
jps
```

第二：使用jstack查看线程运行的情况

运行命令：`jstack -l 46032`

**其他解决工具，可视化工具**

- jconsole

用于对jvm的内存，线程，类的监控，是一个基于 jmx 的 GUI 性能监控工具

打开方式：java 安装目录 bin目录下 直接启动 jconsole.exe 就行

- VisualVM：故障处理工具

能够监控线程，内存情况，查看方法的CPU时间和内存中的对象，已被GC的对象，反向查看分配的堆栈

打开方式：java 安装目录 bin目录下 直接启动 jvisualvm.exe就行



### ConcurrentHashMap 底层具体实现原理✔

基本功能

- 本质是一个HashMap，在HashMap的基础上，提供了并发安全的一个实现，并发安全的主要实现，主要是通过对于Node节点去加锁来保证数据跟新的安全性

性能方面的优化

- 引入红黑树，降低了数据查询的时间复杂度

ConcurrentHashMap 是一种线程安全的高效Map集合

底层数据结构：

- JDK1.7底层采用分段的数组+链表实现

  数据结构

  - 提供了一个segment数组，在初始化ConcurrentHashMap 的时候可以指定数组的长度，默认是 16，一旦初始化之后中间不可扩容
  - 在每个segment中都可以挂一个HashEntry数组，数组里面可以存储具体的元素，HashEntry数组是可以扩容的
  - 在HashEntry存储的数组中存储的元素，如果发生冲突，则可以挂单向链表

  存储流程

  - 再通过hash值确定hashEntry数组中的下标存储数据
  - 在进行操作数据的之前，会先判断当前segment对应下标位置是否有线程进行操作，为了线程安全使用的是ReentrantLock进行加锁，如果获取锁是被会使用cas自旋锁进行尝试

- JDK1.8 采用的数据结构跟HashMap1.8的结构一样，数组+链表/红黑二叉树。

  - 当数组长度大于64，并且链表长度大于等于8 时候，单向链表就会转化成红黑树，一旦链表长度小于8，红黑树会退回成单向链表

  - CAS控制数组节点的添加
  - synchronized只锁定当前链表或红黑二叉树的首节点，只要hash不冲突，就不会产生并发的问题 , 效率得到提升



### 6. 常见的对比✔

- **Runnable VS Callable**

  - 重写方法
  - 返回值
    - Runnable 接口run方法没有返回值；
    - Callable接口call方法有返回值，是个泛型，和Future、FutureTask配合可以用来获取异步执行的结果
  - 异常处理
    - call方法可以抛出异常
    - run方法不可以抛出异常

  Callalbe接口支持返回执行结果，需要调用FutureTask.get()得到，此方法会阻塞主进程的继续往下执行，如果不调用不会阻塞。

- Shutdown() VS shutdownNow() **关闭线程池**

  - shutdown（）队列的任务得执行完毕
  - shutdownNow（）	终止当前正在执行的任务

- isTerminated() VS isShutdown()

  -  isTerminated 当调用 shutdown() 方法后，并且所有提交的任务完成后返回为 true  

### 线程池中shutdown()和shutdownNow()方法的区别✔

shutdown() 和 shutdownNow() 这两个方法都是用来关闭线程池的

**shutdown() 会使得线程池状态变为关闭状态，意味着不再接收新的任务，但是已提交的任务会继续执行，直到完成**，因此shutdown() 并不会立即停止线程池中的工作线程，它只是停止了新任务的提交，一旦所有的任务都执行完成，线程池中的工作线程就会自动退出，它是一种优雅停止线程池的方法，在内部的实现中，线程池用到了AQS同步状态来判断当前是否有正在运行的线程

**shutdownNow() 是尝试立即停止所有正在执行的任务**，暂停等待的任务，并返回正在等待执行的任务列表，在内部的实现中，它是通过调用线程的interrupt方法来停止线程的，这个方法依赖于工作线程，对于这个中断的响应特性，不保证能立即停止正在执行的任务，但是会尽力去做，所有这个方法类似于一种暴力停机的实现

**所以在实际开发中，尽可能使用shutdown() 去保证线程的优雅中断，来确保任务的完整性**

### 7. sleep() 方法和 wait() 方法区别和共同点✔

**<font color=blue>共同点</font>**

- wait()和slee()这两个方法在并发编程中使用比较多，这两个方法都是让线程阻塞等待，但是等待的场景不一样
- wait() ，wait(long) 和 sleep(long) 的效果都是让当前线程暂时放弃 CPU 的使用权，进入阻塞状态

wait()方法通常与sychronized关键字一起使用，用于线程的同步和协作

sleep()方法通常用于线程的等待，以便控制执行的时间间隔或实现简单的定时任务

**<font color=blue>不同点</font>**

1、**方法归属不同**

* wait()，wait(long) 都是 Object 的成员方法，每个对象都有
* sleep(long) 是 Thread 的静态方法

2、**用途不同**

- wait()方法用于多个线程之间的协作通信
- sleep()方法用于线程的休眠

3、**使用不同**

- wait()方法必须在synchronized同步块中调用
- sleep()方法没有使用限制

4、**醒来时机不同**

- wait()方法会释放对象锁，使得当前线程进入等待状态，直到其他线程调用**notify()或notifyAll()方法唤醒**，如果不唤醒就一直等下去
- sleep()方法使当前线程暂停执行一段时间，不会释放对象锁

执行 sleep(long) 和 wait(long) 的线程都会在等待相应毫秒后醒来

它们都可以被打断唤醒

5、**锁特性不同（重点）**

* wait 方法的调用必须先获取 wait 对象的锁，而 sleep 则无此限制
* wait 方法执行后会释放对象锁，允许其它线程获得该对象锁（我放弃 cpu，但你们还可以用）
* 而 sleep 如果在 synchronized 代码块中执行，并不会释放对象锁（我放弃 cpu，你们也用不了）

**wait方法必须和synchronized配合使用**

```java
public class WaitSleepCase {

    static final Object LOCK = new Object();

    public static void main(String[] args) throws InterruptedException {
        sleeping();
    }

    private static void illegalWait() throws InterruptedException {
        LOCK.wait();
    }

    private static void waiting() throws InterruptedException {
        Thread t1 = new Thread(() -> {
            synchronized (LOCK) {
                try {
                    get("t").debug("waiting...");
                    LOCK.wait(5000L);
                } catch (InterruptedException e) {
                    get("t").debug("interrupted...");
                    e.printStackTrace();
                }
            }
        }, "t1");
        t1.start();

        Thread.sleep(100);
        synchronized (LOCK) {
            main.debug("other...");
        }

    }

    private static void sleeping() throws InterruptedException {
        Thread t1 = new Thread(() -> {
            synchronized (LOCK) {
                try {
                    get("t").debug("sleeping...");
                    Thread.sleep(5000L);
                } catch (InterruptedException e) {
                    get("t").debug("interrupted...");
                    e.printStackTrace();
                }
            }
        }, "t1");
        t1.start();

        Thread.sleep(100);
        synchronized (LOCK) {
            main.debug("other...");
        }
    }
}
```



### Thread.sleep(0)有意义吗✔

Thread.sleep() 方法是Java线程调度的一部分，它让当前运行的线程暂停执行，并进入到阻塞状态，让出CPU的执行权，这个方法的底层是调用操作系统的sleep或者nanosleep系统调用，操作系统会把这个线程挂起，让出CPU的执行权给到其他线程或者进程，同时操作系统会设置一个定时器，当定时器到了以后，操作系统会再次唤醒这个线程，**Thread.sleep(0) 这个调用虽然没有传递睡眠时长**，**但实际上还是会触发线程调度的切换**，也就是说，**当前线程会从运行状态变为就绪状态**，然后操作系统调度器再根据优先级来选择一个线程执行，如果有优先级更高的线程正在等待CPU的时间片，那么这个线程就会得到执行，如果没有，那么可能就会立即再次选择刚刚进入就绪状态的这个线程来执行，具体的调度策略取决于操作系统层面的调度算法



### 线程的 run()和 start()有什么区别

- start(): 用来启动线程，改变的是线程的状态，由就绪进入执行，通过该线程调用run方法执行run方法中所定义的逻辑代码。start方法只能被调用一次。 

- run(): 封装了要被线程执行的代码，在执行状态时运行里面的代码，方法返回值是void，可以被调用多次。



### 新建 T1、T2、T3 三个线程，如何保证它们按顺序执行✔

在多线程中有多种方法让线程按特定顺序执行，**你可以用线程类的join()方法在一个线程中启动另一个线程**，另外一个线程完成该线程继续执行。

举例：

为了确保三个线程的顺序你应该先启动最后一个(T3调用T2，T2调用T1)，这样 T1就会先完成而T3最后完成

```java
public class JoinTest {
    public static void main(String[] args) {
        // 创建线程对象
        Thread t1 = new Thread(() -> {
            System.out.println("t1");
        }) ;
        Thread t2 = new Thread(() -> {
            try {
                t1.join(); // 加入线程t1,只有t1线程执行完毕以后，再次执行该线程
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println("t2");
        }) ;
        Thread t3 = new Thread(() -> {
            try {
                t2.join(); // 加入线程 t2,只有t2线程执行完毕以后，再次执行该线程
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println("t3");
        }) ;
        // 启动线程
        t1.start();
        t2.start();
        t3.start();
    }
}
```

### notify()和 notifyAll()有什么区别

- notifyAll：唤醒所有wait的线程 
- notify：只随机唤醒一个 wait 线程

```java
public class WaitNotify {

    static boolean flag = false;
    static Object lock = new Object();

    public static void main(String[] args) {

        Thread t1 = new Thread(() -> {
            synchronized (lock){
                while (!flag){
                    System.out.println(Thread.currentThread().getName()+"...wating...");
                    try {
                        lock.wait();
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
                System.out.println(Thread.currentThread().getName()+"...flag is true");
            }
        });

        Thread t2 = new Thread(() -> {
            synchronized (lock){
                while (!flag){
                    System.out.println(Thread.currentThread().getName()+"...wating...");
                    try {
                        lock.wait();
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
                System.out.println(Thread.currentThread().getName()+"...flag is true");
            }
        });

        Thread t3 = new Thread(() -> {
            synchronized (lock) {
                System.out.println(Thread.currentThread().getName() + " hold lock");
                lock.notifyAll();
                flag = true;
                try {
                    Thread.sleep(2000);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        });
        t1.start();
        t2.start();
        t3.start();

    }

}
```

### 如何停止一个正在运行的线程

有三种方式可以停止线程

- 使用退出标志，使线程正常退出，也就是当run方法完成后线程终止
- 使用stop方法强行终止（不推荐，方法已作废）
- 使用interrupt方法中断线程

代码参考如下：

① **使用退出标志，使线程正常退出**。

```java
public class MyInterrupt1 extends Thread {

    volatile boolean flag = false ;     // 线程执行的退出标记

    @Override
    public void run() {
        while(!flag) {
            System.out.println("MyThread...run...");
            try {
                Thread.sleep(3000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

    public static void main(String[] args) throws InterruptedException {

        // 创建MyThread对象
        MyInterrupt1 t1 = new MyInterrupt1() ;
        t1.start();

        // 主线程休眠6秒
        Thread.sleep(6000);

        // 更改标记为true
        t1.flag = true ;

    }
}
```

② **使用stop方法强行终止**

```java
public class MyInterrupt2 extends Thread {

    volatile boolean flag = false ;     // 线程执行的退出标记

    @Override
    public void run() {
        while(!flag) {
            System.out.println("MyThread...run...");
            try {
                Thread.sleep(3000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

    public static void main(String[] args) throws InterruptedException {

        // 创建MyThread对象
        MyInterrupt2 t1 = new MyInterrupt2() ;
        t1.start();

        // 主线程休眠2秒
        Thread.sleep(6000);

        // 调用stop方法
        t1.stop();

    }
}
```

③ **使用interrupt方法中断线程**。

```java

public class MyInterrupt3 {

    public static void main(String[] args) throws InterruptedException {

        //1.打断阻塞的线程
        /*Thread t1 = new Thread(()->{
            System.out.println("t1 正在运行...");
            try {
                Thread.sleep(5000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }, "t1");
        t1.start();
        Thread.sleep(500);
        t1.interrupt();
        System.out.println(t1.isInterrupted());*/


        //2.打断正常的线程
        Thread t2 = new Thread(()->{
            while(true) {
                Thread current = Thread.currentThread();
                boolean interrupted = current.isInterrupted();
                if(interrupted) {
                    System.out.println("打断状态："+interrupted);
                    break;
                }
            }
        }, "t2");
        t2.start();
        Thread.sleep(500);
//        t2.interrupt();

    }
}
```



### 如何知道线程池中的任务已经执行完成✔

在java中，有多种方法去判断线程池中的任务是否已经执行完成

1. 使用`Future`对象，线程池有一个叫`submit()`方法，它会返回一个`Future`对象，我们可以通过`Future`的`isDone()`方法，来判断任务是否已经完成

   其次可以通过`Future.get()`方法，获得任务的执行结果，当线程池中的任务没有执行完之前，方法会一直阻塞，直到任务执行结束，只要方法正常返回，就意味着传入线程池中的任务已经执行完成了

   ```java
   Executorservice executor = Executors.newFixedThreadPoo1(1); 
   Future future = executor.submit(new Runnable(){
       @override
       pubic void run {
           //任务内容
       }
   });
   boolean done = future.isDone();
   ```

2. 使用`CountDownLatch`计数器，`CountDownLatch`是一个同步工具类，可以在开始的时候，设置一个初始值，每个任务执行完成以后，调用`CountDownLatch`方法，把计数器减1，然后在主线程中调用`await()`方法，等待计数器归零，当计数器归零的时候，表示所有的任务已经完成了

   ```java
   int taskcount = 10;
   CountDownLatch latch = new CountDownLatch(taskcount);
   Executorservice executor = Executors.newFixedThreadPoo1(10);
   for (int i = 0;i < taskcount; i++){
       executor.submit(new Runnable() {
           @override
           public void run() {
               //任务内容
               1atch. countDown();//任务执行结束后，计数器减1
           }
       });
   }
   1atch .await();//等待所有任务完成
   
   ```

3. 使用线程池中的`ThreadPoolExecutor`的`isTerminated()`方法，当调用了线程池中的`shutdonw()`方法或者`shutdownNow()`方法以后，并且所有任务都已经执行完成以后，`isTerminated()`方法，会返回`true`，当然我们一般不会主动关闭线程，因此较少使用

不管是线程池内部还是外部，想要知道线程是否执行结束，必须要获取线程执行结束后的状态，而线程本身是没有返回值的，所以只能通过阻塞-唤醒的方式来实现

### 9. Thread类中的yield方法有什么作用

- 暂停当前正在执行的线程对象

### 10. 谈谈volatile的使用及其原理✔

- 保证变量对所有线程的可见性

### 11. 如何创建线程实例并运行✔

共有四种方式可以创建线程，分别是：继承Thread类、实现runnable接口、实现 Callable接口、线程池创建线程

**底层都是实现Runnable接口**

- 继承Thread类
  - 重写`run()`
  - 调用`new 类().start()`
- 实现Runnable接口
  - 重写`run()`
  - 调用`new Thread( new 类() ).start() `
- 实现Callable接口
  - 重写`call()`
  - `FuntureTask<String> futureTask = new FutureTask<>(new 类() )`
  - `new Thread(futureTask).start`
  - 拿到call方法中的结果`futureTask.get()`
- 创建线程池开启线程

```java
public class Person implements Runnable{

    public static void main(String []args) throws Execution(){
        ExecutorService executorService = Executors.newFixedThreadPool(10);//不建议
        executorService.execute(new Person())//线程池会为我们开启一个线程
    }

    public void run(){
        System.out.println("hello world");
    }
    
}
```

### 12. 线程阻塞的三种情况  

- 等待阻塞
  - 运行状态的线程执行`wait（）`方法后
- 同步阻塞
  - 对象获取同步锁时，同步锁被其他线程占用，JVM将线程放入锁池中
- 其他阻塞

### 13. 线程死亡的三种方式  

- 正常结束
- 异常结束
- 调用stop

### 14. 为什么我们调用start()方法时会执行run()方法，为什么我们不能直接调用run()方法 

- 在start（）中调用run（），会另起一个线程
- 直接调用run（）会在主线程中执行，没有起到多线程的作用

### 15. 守护线程是什么✔

- 运行在后台的一种特殊进程
- 线程分为用户线程和守护线程，用户线程就是普通线程，守护线程就是JVM的后台线程

### 16. 了解Fork/Join框架吗  

- 用于并行执行任务的框架
- 是一个把大任务分割成若干个小任务，最终汇总每个小任务结果后得到大任务结果的框架
- 分而治之+工作窃取算法

## 线程中并发锁

### 17. CAS了解吗  

- 比较并交换（Compare And Swap）它体现的一种乐观锁的思想，在无锁情况下保证线程操作共享数据的原子性。

在JUC（ java.util.concurrent ）包下实现的很多类都用到了CAS操作

- AbstractQueuedSynchronizer（AQS框架）
- AtomicXXX类

### 乐观锁和悲观锁

- CAS 是基于乐观锁的思想：最乐观的估计，不怕别的线程来修改共享变量，就算改了也没关系，我吃亏点再重试呗。

- synchronized 是基于悲观锁的思想：最悲观的估计，得防着其它线程来修改共享变量，我上了锁你们都别想改，我改完了解开锁，你们才有机会。

### 18. CAS有什么缺陷

- ABA问题
- 循环时间长开销
- 只能保证一个变量的原子操作

### 请谈谈你对 volatile 的理解

一旦一个共享变量（类的成员变量、类的静态成员变量）被volatile修饰之后，那么就具备了两层语义：

- 保证线程间的可见性

保证了不同线程对这个变量进行操作时的可见性，即一个线程修改了某个变量的值，这新值对其他线程来说是立即可见的,volatile关键字会强制将修改的值立即写入主存。

- 禁止进行指令重排序

用 volatile 修饰共享变量会在读、写共享变量时加入不同的屏障，阻止其他读写操作越过屏障，从而达到阻止重排序的效果

### 19. synchronized 和 volatile 的区别是什么

- synchronized解决的是执行控制的问题，阻止其他线程获取当前对象的监控锁
- volatile解决的是内存的可见性

### 20. synchronized 和 Lock 有什么区别✔

* 特性层面
  * synchronized 是Java中的同步关键字，源码在 jvm 中，用 c++ 语言实现，用在方法，代码块上
  * Lock 是JUC包里面提供的一个接口，源码由 jdk 提供，用 java 语言实现，用在代码块上
  * **使用 synchronized 时，退出同步代码块锁会自动释放，而使用 Lock 时，需要手动调用 unlock 方法释放锁，可以判断是否成功获取到锁，Lock锁更加灵活**
* 功能层面
  * lock和syschronized都是Java中解决线程安全的一个工具，二者均属于悲观锁、都具备基本的互斥、同步、锁重入功能
  * Lock 提供了许多 synchronized 不具备的功能，例如获取等待状态、公平锁、可打断、可超时、多条件变量
  * Lock 有适合不同场景的实现，如 ReentrantLock， ReentrantReadWriteLock
  * **Lock提供了公平锁和非公平锁的机制 ，Synchronized只提供了一种非公平锁的实现**
* 性能层面
  * 在没有竞争时，synchronized 做了很多优化，如偏向锁、轻量级锁，实现锁的优化
  * 在竞争激烈时，Lock 的实现通常会提供更好的性能，通过自旋锁实现性能优化

### 21. synchronized 和 ReentrantLock 区别是什么✔ 

- 都是可重入锁：一个线程中可以多次获取同一把锁
- 依赖JVM和JDK Api
- 后者更加高级。。
- 如何选择（优先前者）

![image.png](https://cdn.nlark.com/yuque/0/2023/png/29617954/1678452554553-29135f98-725b-498a-9ed1-3262779cb1bc.png#averageHue=%23f1f1f1&clientId=uf6b2decf-7cc8-4&from=paste&height=372&id=u975e4497&name=image.png&originHeight=465&originWidth=1450&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=244167&status=done&style=none&taskId=u4020a87c-2448-4b1d-90b7-8cee2b52950&title=&width=1160)

### 22. synchronized的用法有哪些

- 修饰普通方法、静态方法、代码块

### 23. Synchronized的作用有哪些（导致并发程序出现问题的根本原因是什么）

- 原子性

  一个线程在CPU中操作不可暂停，也不可中断，要不执行完成，要不不执行

  解决方案：

  1.synchronized：同步加锁

  2.JUC里面的lock：加锁

- 可见性

  内存可见性：让一个线程对共享变量的修改对另一个线程可见

  解决方案：

  - synchronized

  - volatile（推荐）

  - LOCK

- 有序性

  指令重排：处理器为了提高程序运行效率，可能会对输入代码进行优化，它不保证程序中各个语句的执行先后顺序同代码中的顺序一致，但是它会保证程序最终执行结果和代码顺序执行的结果是一致的

  解决方案：

  - volatile

### 24.  说一下 synchronized 底层实现原理  

Java中的synchronized有偏向锁、轻量级锁、重量级锁三种形式，分别对应了锁只被一个线程持有、不同线程交替持有锁、多线程竞争锁三种情况。

|          | **描述**                                                     |
| -------- | ------------------------------------------------------------ |
| 重量级锁 | 底层使用的Monitor实现，里面涉及到了用户态和内核态的切换、进程的上下文切换，成本较高，性能比较低。 |
| 轻量级锁 | 线程加锁的时间是错开的（也就是没有竞争），可以使用轻量级锁来优化。轻量级修改了对象头的锁标志，相对重量级锁性能提升很多。每次修改都是CAS操作，保证原子性 |
| 偏向锁   | 一段很长的时间内都只被一个线程使用锁，可以使用了偏向锁，在第一次获得锁时，会有一个CAS操作，之后该线程再获取锁，只需要判断mark  word中是否是自己的线程id即可，而不是开销相对较大的CAS命令 |

**一旦锁发生了竞争，都会升级为重量级锁**

### 25. 多线程中 synchronized 锁升级的原理是什么

### 26. synchronized 为什么是非公平锁？非公平体现在哪些地方

- 当线程尝试获取锁失败，进入阻塞时，放入链表的顺序，和最终被唤醒的顺序是不一致的

### 27. JVM对synchronized的优化有哪些

- 锁膨胀
- 锁消除
- 锁粗化
- 自旋锁与自适应自旋锁

### 28. synchronized 锁能降级吗

- 可以的，执行清理任务的时候会尝试降级锁

### 29. ThreadLocal是什么✔

- 线程本地变量
- 如果你创建了一个ThreadLocal变量，那么访问这个变量的每个线程都会有这个变量的一个本地拷贝，多个线程操作这个变量的时候，实际是操作自己本地内存里面的变量， 从而起到线程隔离的作用，避免了线程安全问题。  

ThreadLocal 主要功能有两个，第一个是可以实现资源对象的线程隔离，让每个线程各用各的资源对象，避免争用引发的线程安全问题，第二个是实现了线程内的资源共享

### 30. ThreadLocal的实现原理✔

- Thread对象中持有一个ThreadLocalMap  的实例变量 threadLocals
- ThreadLocalMap内部维护了Entry数组，每个Entry代表一个完整的对象，key是ThreadLocal本身，value是ThreadLocal的泛型值

在ThreadLocal内部维护了一个一个 ThreadLocalMap 类型的成员变量，用来存储资源对象

当我们调用 set 方法，就是以 ThreadLocal 自己作为 key，资源对象作为 value，放入当前线程的 ThreadLocalMap 集合中

当调用 get 方法，就是以 ThreadLocal 自己作为 key，到当前线程中查找关联的资源值

当调用 remove 方法，就是以 ThreadLocal 自己作为 key，移除当前线程关联的资源值

### 31. 知道ThreadLocal 内存泄露问题吗

- 弱引用（只要垃圾回收机制一运行，不管JVM的内存空间是否充足，都会回收该对象）
  -  ThreadLocal（ThreadLocalMap的Key）被垃圾回收器回收了，ThreadLocalMap的key没了，value还在 ，造成内存泄露

>是因为ThreadLocalMap 中的 key 被设计为弱引用，它是被动的被GC调用释放key，不过关键的是只有key可以得到内存释放，而value不会，因为value是一个强引用。
>
>在使用ThreadLocal 时都把它作为静态变量（即强引用），因此无法被动依靠 GC 回收，建议主动的remove 释放 key，这样就能避免内存溢出。

### ThreadLocal有哪些使用场景✔

ThreadLocal是可以基于副本的隔离机制来**保证共享变量的安全性**，以下是几种常见的使用场景

1. 线程的上下文传递

   在跨线程调用的场景中，可以使用ThreadLocal在不修改方法签名的情况下传递线程上下文信息，比如框架和中间件里面，把请求的相关信息，比如用户信息、请求id信息等等，存储在ThreadLocal里面，在后续的请求处理链路中，都可以方便的去访问这些信息

2. 数据库的连接管理

   在使用数据库连接池的情况下，可以把数据库的连接存储在ThreadLocal里面，这样每个线程可以独立管理自己的数据库连接，避免了线程之间的竞争和冲突，比如Mybatis中的SqlSession对象，使用了ThrashLocal来存储当前线程的数据库会话信息

3. 事务管理

   在一些需要手动管理事务的场景中，可以使用ThreadLocal来存储事务上下文，每个线程可以独立的控制自己的事务，保证事务的隔离性，Spring中的TransactionSynchronizeManager类，就使用了ThreadLocal来存储事务相关的上下文信息，不过在使用ThreadLocal的时候，需要注意使用规范，避免出现内存泄露的问题

### 32. 了解ReentrantLock吗✔

ReentrantLock翻译过来是可重入锁，相对于synchronized它具备以下特点：

- 可中断、可重入
- 可以设置超时时间
- 可以设置公平锁，支持非公平锁
- 支持多个条件变量
- 与synchronized一样，都支持重

ReentrantLock主要利用CAS+AQS队列来实现。它支持公平锁和非公平锁，两者的实现类似

构造方法接受一个可选的公平参数（默认非公平锁），当设置为true时，表示公平锁，否则为非公平锁。公平锁的效率往往没有非公平锁的效率高，在许多线程访问的情况下，公平锁表现出较低的吞吐量。

1. ReentrantLock 是在**多线程竞争资源**时使用的锁，他是一个独占锁、可重入锁，也是悲观锁
2. ReentrantLock 支持公平锁，对公平和非公平锁有不同的实现逻辑
3. ReentrantLock  使用 aqs（AbstractQueuedSynchronizer）来实现的获取锁的线程队列等待的过程
4. 内部使用了原子操作类 cas 比较线程与对应的锁关系
5. 内部支持newCondition来灵活的控制获取到锁的线程的阻塞与释放

### 33. ReadWriteLock是什么

- 读写锁接口

### 你谈谈 JMM（Java 内存模型）

JMM(Java Memory Model)Java内存模型,是java虚拟机规范中所定义的一种内存模型。

Java内存模型(Java Memory Model)描述了Java程序中各种变量(线程共享变量)的访问规则，以及在JVM中将变量存储到内存和从内存中读取变量这样的底层细节

特点：

1. 所有的共享变量都存储于主内存(计算机的RAM)这里所说的变量指的是实例变量和类变量。不包含局部变量，因为局部变量是线程私有的，因此不存在竞争问题。

2. 每一个线程还存在自己的工作内存，线程的工作内存，保留了被线程使用的变量的工作副本。
3. 线程对变量的所有的操作(读，写)都必须在工作内存中完成，而不能直接读写主内存中的变量，不同线程之间也不能直接访问对方工作内存中的变量，线程间变量的值的传递需要通过主内存完成。

### 写一个会导致死锁的程序

1. 获得锁后不释放，其他线程一直拿不到锁
2. 解决：不要嵌套获得多个锁

```java

    static Object lockA = new Object();
    static Object lockB = new Object();
    public static void main(String[] args) {




        new Thread(new Runnable() {
            @Override
            public void run() {


                System.out.println(Thread.currentThread() + " 尝试获取锁A");
                synchronized (lockA){

                    System.out.println(Thread.currentThread() + " 获取到了锁A");

                    try {
                        Thread.sleep(100);
                    } catch (InterruptedException e) {
                        throw new RuntimeException(e);
                    }
                    System.out.println(Thread.currentThread() + " 尝试获取锁B");
                    synchronized (lockB){
                        System.out.println(Thread.currentThread() + " 获取到了锁B");
                    }
                }
            }
        }).start();




        new Thread(new Runnable() {
            @Override
            public void run() {


                System.out.println(Thread.currentThread() + " 尝试获取锁B");
                synchronized (lockB){

                    System.out.println(Thread.currentThread() + " 获取到了锁B");

                    try {
                        Thread.sleep(100);
                    } catch (InterruptedException e) {
                        throw new RuntimeException(e);
                    }

                    System.out.println(Thread.currentThread() + " 尝试获取锁A");
                    synchronized (lockA){
                        System.out.println(Thread.currentThread() + " 获取到了锁A");
                    }
                }
            }
        }).start();
    }
```





## 线程池

### 34. 为什么要用线程池✔

- 因为频繁的开启线程或者停止线程，线程需要重新被CPU从就绪到运行状态调度，需要发生CPU的上下文切换，效率非常低
- 线程池是复用机制，提前创建好一些固定的线程数一直在运行状态，实现复用，从而可以减少就绪到运行状态的切换
  。。。

**线程池的作用：**

- 降低资源消耗
- 提高响应速度
- 提高系统的可管理性
- 提供更多强大的功能：线程池具备可扩展性，允许开发人员向其中增加更多的功能。如延时定时线程池

### 35. 执行execute()方法和submit()方法的区别是什么呢

- execute：用于提交无返回值的任务
- submit：用于提交有返回值的任务

### 36. 说下线程池核心参数✔

- `corePoolSize`：核心线程大小，一直正在保存运行的线程
- `maximumPoolSize`线程池最大线程数，（线程池运行创建的最大线程数） = (核心线程+救急线程的最大数目)
- `KeepAliveTime`非核心线程的心跳时间，（超出corePoolSize后创建的线程的存活时间，默认60s，超过时间没有任务执行就会停掉超过时间的线程，所有说线程池创建的线程并不会一直在运行状态	）
- `workQueue`阻塞队列，存放线程池的任务，（阻塞队列，保存待执行的任务）
- `defaultHandler`饱和策略
- `ThreadFactory`线程工厂（线程内部创建线程所有的工厂）
- `handler`任务无法执行时的处理器，workQueue 也放满时，会触发拒绝策略
- unit 时间单位 - 救急线程的生存时间单位，如秒、毫秒等

### 37. 线程池执行任务的流程（ 线程池底层ThreadPoolExecutor  实现原理）✔

实际上最多执行多少个任务：核心线程数+缓存队列的容量+最大线程数-核心线程数

1. 当线程数小于核心线程数时，创建线程。
2. 当线程数大于等于核心线程数，且任务队列未满时，将任务放入任务队列。
3. 当线程数大于等于核心线程数，且任务队列已满
   1. 若线程数小于最大线程数，创建线程
   2. 若线程数等于最大线程数，抛出异常，拒绝任务

![image.png](https://cdn.nlark.com/yuque/0/2023/png/29617954/1675158850882-ebaaeb4c-138e-46d3-ad5f-21225ac2dda8.png#averageHue=%23f7f4f2&clientId=ub07cf81e-dc25-4&from=paste&height=590&id=u071e20a9&name=image.png&originHeight=737&originWidth=892&originalType=binary&ratio=1&rotation=0&showTitle=false&size=103312&status=done&style=none&taskId=u1cd264e8-a421-4667-a2cc-8b9297994dd&title=&width=713.6)

### 38. 常用的JAVA线程池有哪几种类型

- `newCachedThreadPool`可缓存线程池
  - 可灵活回收空闲线程，
  - 线程创建数量几乎没有限制
- `newFixedThreadPool`创建一个指定工作线程数量的线程池
  - 不用释放工作线程，会占用一定的系统资源
- `newSingleThreadExecutor`创建一个单线程化的Executor
  - 顺序执行各个任务（FIFO）
- `newSchedulerThreadPool`创建一个定长的线程池
  - 支持定时及周期性任务执行

### 39. 线程池常用的阻塞队列有哪些

![image.png](https://cdn.nlark.com/yuque/0/2023/png/29617954/1680490088943-924c71f1-dfe2-4060-8ed9-41092308619d.png#averageHue=%23fbfdfc&clientId=u37fba2b1-9588-4&from=paste&height=350&id=u3121adac&name=image.png&originHeight=437&originWidth=966&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=81077&status=done&style=none&taskId=u9e06232b-27e1-4376-b93a-a23906ee203&title=&width=772.8)

比较常见的有4个，用的最多是ArrayBlockingQueue和LinkedBlockingQueue

1.ArrayBlockingQueue：基于数组结构的有界阻塞队列，FIFO。

2.LinkedBlockingQueue：基于链表结构的有界阻塞队列，FIFO。

3.DelayedWorkQueue ：是一个优先级队列，它可以保证每次出队的任务都是当前队列中执行时间最靠前的

4.SynchronousQueue：不存储元素的阻塞队列，每个插入操作都必须等待一个移出操作。

**ArrayBlockingQueue的LinkedBlockingQueue区别**

| **LinkedBlockingQueue**          | **ArrayBlockingQueue** |
| -------------------------------- | ---------------------- |
| 默认无界，支持有界               | 强制有界               |
| 底层是链表                       | 底层是数组             |
| 是懒惰的，创建节点的时候添加数据 | 提前初始化 Node  数组  |
| 入队会生成新 Node                | Node需要是提前创建好的 |
| 两把锁（头尾）                   | 一把锁                 |

### 什么叫做阻塞队列的有界和无界✔

阻塞队列是一种特殊的队列，它在普通队列的基础上提供了两种附加的功能。

第一，当队列为空的时候，获取队列中元素的消费者线程它会被阻塞，同时会唤醒生产者线程。

第二，当队列中的元素满了的时候，向队列中去添加元素的生产者线程会被阻塞，同时会唤醒消费者线程，其中，阻塞队列中能够容纳的元素个数通常情况下是有限的，比如说我们去实例化一个`ArrayBlockinglist`可以在构造方法中去传入一个整形的数字，表示这个基于数组的阻塞队列中，能够容纳的元素个数，这种称为有界队列。

第三，而无界队列就是没有设置固定大小的队列，并不是元素中没有任何限制，而是它的元素存储量很大，像`LinkedBlockingQueue`，它的默认队列长度是`Integer.Max.Value`，所有感知不到它的长度限制。无界队列存在比较大的潜在风险，如果在并发量比较大的情况下，线程池中几乎可以无限制的添加任务，容易导致内存溢出的问题

### 40. 源码中线程池是怎么复用线程的

![image.png](https://gitee.com/tjlxy/img/raw/master/1678185487298-87e8d2c1-9ba2-461e-9ef8-d6571fa3ea1c.png)

-  源码中ThreadPoolExecutor中有个内置对象Worker，每个worker都是一个线程  
-  通过置换worker中Runnable对象，运行其run方法起到线程置换的效果  

### 41. 如何合理配置线程池参数 

- CPU密集型
  - 需要最大运算，没有阻塞，CPU一直全速运行
- IO密集型
  - 需要大量IO，即大量的阻塞，大部分线程被阻塞，需要多配置线程数

### 如何确定核心线程数

在设置核心线程数之前，需要先熟悉一些执行线程池执行任务的类型

- IO密集型任务

一般来说：文件读写、DB读写、网络请求等

推荐：核心线程数大小设置为2N+1    （N为计算机的CPU核数）



- CPU密集型任务

一般来说：计算型代码、Bitmap转换、Gson转换等

推荐：核心线程数大小设置为N+1    （N为计算机的CPU核数）		

### 42. Executor和Executors的区别

- `Executor`
  - 接口
- `Executors`
  - 工具类

### 为什么不建议用Executors创建线程池

其实这个事情在阿里提供的最新开发手册《Java开发手册-嵩山版》中也提到了

主要原因是如果使用Executors创建线程池的话，它允许的请求队列默认长度是Integer.MAX_VALUE，这样的话，有可能导致堆积大量的请求，从而导致OOM（内存溢出）。

所以，我们一般推荐使用ThreadPoolExecutor来创建线程池，这样可以明确规定线程池的参数，避免资源的耗尽。

## AQS

### 43. 说一说什么是AQS✔

- AQS是一个锁框架，它定义了锁的实现机制，并开放出扩展的地方，让子类去实现

  全称是 AbstractQueuedSynchronizer，是JUC包下面Lock锁的底层实现，是阻塞式锁和相关的同步器工具的框架，它是构建锁或者其他同步组件的基础框架

**AQS与Synchronized的区别**

| **synchronized**               | **AQS**                                |
| ------------------------------ | -------------------------------------- |
| 关键字，c++ 语言实现           | java  语言实现                         |
| 悲观锁，自动释放锁             | 悲观锁，手动开启和关闭                 |
| 锁竞争激烈都是重量级锁，性能差 | 锁竞争激烈的情况下，提供了多种解决方案 |

AQS常见的实现类

- ReentrantLock      阻塞式锁

- Semaphore        信号量

- CountDownLatch   倒计时锁

### 44. AQS使用了哪些设计模式

### 45. 了解AQS中同步队列的数据结构吗

### 46. 了解AQS 对资源的共享方式吗

- `Exclusive`（独占）
- `Share`（共享）

### 47. AQS 组件了解吗



## Atomic 原子类 

### 48. 介绍一下 Atomic 原子类  

-  简单点就是具有原子 / 原子操作特征的类。  

### 49. JUC 包中的原子类是哪4类

- 基本类型
- 数组类型
- 引用类型
- 对象属性修改类型

### 50. 简单介绍一下 AtomicInteger 类的原理  

- AtomicInteger 类主要利用 CAS和 volatile 和 native 方法来保证原子操作，从而避免 synchronized 的 高开销，执行效率大为提升。  

### 补充

### 51.为什么不建议使用Executors创建线程

- 底层调用new ThreadPoolExecutro中的其中一个参数为`LinkedBlockingQueue`
- 创建的队列为`LinkedBlockingQueue`，是一个无界阻塞队列，如果使用该线程池执行任务，如果任务过多就会不断的添加到队列中，任务越多占用的内存就越多，最终可以耗尽内存，**导致OOM**
- 同时使用Executors创建线程池也不能自定义线程的名字，不利于排查问题

### 52.线程池有几种状态

![image.png](https://cdn.nlark.com/yuque/0/2023/png/29617954/1678452467928-f95cba14-34b4-4ea1-8998-69a8d501e0c7.png#averageHue=%23f1f1f1&clientId=uf6b2decf-7cc8-4&from=paste&height=498&id=u1566ad8a&name=image.png&originHeight=623&originWidth=1443&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=331166&status=done&style=none&taskId=u6aae9bf6-3226-44fa-bb27-9b793dc6bf0&title=&width=1154.4)
![image.png](https://cdn.nlark.com/yuque/0/2023/png/29617954/1678452401147-da4378cb-0940-453a-90b1-92d5f941fe14.png#averageHue=%23f3f3f3&clientId=uf6b2decf-7cc8-4&from=paste&height=430&id=ue9482d1d&name=image.png&originHeight=538&originWidth=1443&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=265290&status=done&style=none&taskId=ud3afbcb4-ce8f-47b6-9026-b05aca10f66&title=&width=1154.4)

### 53.公平锁和非公平锁✔

- 如果是公平锁，会先检查AQS队列中是否存在线程在排队，如果有线程在排队，则当前线程也进行排队
- 如果是非公平锁，则不会去检查是否有线程在排队，而是直接竞争锁
- **总结**：不管是公平锁还是非公平锁，一旦没有竞争到锁，都会进行排队，当锁释放时，都是唤醒锁排在最前面的线程，**所有非公平锁只是体现在了线程加锁阶段，而没有体现在线程被唤醒阶段，二者都是可重入的**

### 54.说说对线程安全的理解✔

- 一段代码在多个线程同时执行的情况下，能否得到正确的结果
- 多个线程同时执行这段代码时，不会产生混乱，依然能够得到正常的结果
- i++，i初始值0，两个线程同时执行，如果线程安全，一个1，一个2；如果两个线程都是1，说明线程不安全

### 55.并发、并行、串行之间的区别✔

- 串行

  - 一个任务执行完，才能执行下一个任务（排队）

- 并行

  - 两个任务同时执行

    并行（parallel）是同一时间动手做（doing）多件事情的能力

- 并发

  - 两个任务整体看上去是同时执行，在底层，两个任务被拆分成了很多份，然后一个一个执行，站在更高的角度看来两个任务是同时在执行的

    并发（concurrent）是同一时间应对（dealing	with）多件事情的能力

> 举例： 
>
> - 家庭主妇做饭、打扫卫生、给孩子喂奶，她一个人轮流交替做这多件事，这时就是并发 
> - 家庭主妇雇了个保姆，她们一起这些事，这时既有并发，也有并行（这时会产生 竞争，例如锅只有一口，一个人用锅时，另一个人就得等待） 
> - 雇了3个保姆，一个专做饭、一个专打扫卫生、一个专喂奶，互不干扰，这时是并行

### 56.线程池为什么是先添加队列而不是先创建最大线程

在创建新线程的时候，是要获取全局锁的，这个时候其它的就得阻塞，影响了整体效率。 

就好⽐⼀个企业⾥⾯有10个（core）正式⼯的名额，最多招10个正式⼯，要是任务超过正式⼯⼈数 （task > core）的情况下，⼯⼚领导（线程池）不是⾸先扩招⼯⼈，还是这10⼈，但是任务可以稍微积压⼀下，即先放到队列去（代价低）。10个正式⼯慢慢⼲，迟早会⼲完的，要是任务还在继续增加，超 过正式⼯的加班忍耐极限了（队列满了），就的招外包帮忙了（注意是临时⼯）要是正式⼯加上外包还是不能完成任务，那新来的任务就会被领导拒绝了（线程池的拒绝策略）。

## 线程使用场景问题

### 如何控制某一个方法允许并发访问线程的数量

在jdk中提供了一个Semaphore[seməfɔːr]类（信号量）

它提供了两个方法，semaphore.acquire() 请求信号量，可以限制线程的个数，是一个正数，如果信号量是-1,就代表已经用完了信号量，其他线程需要阻塞了

第二个方法是semaphore.release()，代表是释放一个信号量，此时信号量的个数+1

### 那该如何保证Java程序在多线程的情况下执行安全呢

刚才讲过了导致线程安全的原因，如果解决的话，jdk中也提供了很多的类帮助我们解决多线程安全的问题，比如：

- JDK Atomic开头的原子类、synchronized、LOCK，可以解决原子性问题
- synchronized、volatile、LOCK，可以解决可见性问题
- Happens-Before 规则可以解决有序性问题

### 在项目中哪里用了多线程

参考场景一：

es数据批量导入

在我们项目上线之前，我们需要把数据量的数据一次性的同步到es索引库中，但是当时的数据好像是1000万左右，一次性读取数据肯定不行（oom异常），如果分批执行的话，耗时也太久了。所以，当时我就想到可以使用线程池的方式导入，利用CountDownLatch+Future来控制，就能大大提升导入的时间。

参考场景二：

在我做那个xx电商网站的时候，里面有一个数据汇总的功能，在用户下单之后需要查询订单信息，也需要获得订单中的商品详细信息（可能是多个），还需要查看物流发货信息。因为它们三个对应的分别三个微服务，如果一个一个的操作的话，互相等待的时间比较长。所以，我当时就想到可以使用线程池，让多个线程同时处理，最终再汇总结果就可以了，当然里面需要用到Future来获取每个线程执行之后的结果才行

参考场景三：

《黑马头条》项目中使用的

我当时做了一个文章搜索的功能，用户输入关键字要搜索文章，同时需要保存用户的搜索记录（搜索历史），这块我设计的时候，为了不影响用户的正常搜索，我们采用的异步的方式进行保存的，为了提升性能，我们加入了线程池，也就说在调用异步方法的时候，直接从线程池中获取线程使用



## Other

### 编写一个基于线程安全的懒加载单例模式

关键点：

1. 多线程访问
2. 防止直接new对象
3. 使用锁
4. 内部类加载实现、cas实现等



```java
public class Test03 {

    private Test03(){}


    private static Test03 instance = null;

    public  static  Test03 getInstance(){

        // 有可能在多线程访问的时候，重复new 了对象
        if (instance == null){

            // 可能会有多个线程 进入抢锁等待状态
            synchronized (Test03.class){
                if(instance == null){
                    instance = new Test03();
                }else{
                    return instance;
                }
            }
        }

        return instance;

    }
}
```

