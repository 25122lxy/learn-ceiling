# Java集合

## 算法复杂度

### 时间复杂度

#### 常见复杂度表示形式

![image-20230628143849093](https://gitee.com/tjlxy/img/raw/master/image-20230628143849093.png)

速记口诀：**常对幂指阶** 

越在上面的性能就越高，越往下性能就越低

####  时间复杂度O(1)

```java
public int test01(int n){
    int i=0;
    int j = 1;
    return i+j;
}
```

代码只有三行，它的复杂度也是O(1)，而不是O(3）

```java
public void test02(int n){
    int i=0;
    int sum=0;
    for(;i<100;i++){
        sum = sum+i;
    }
    System.out.println(sum);
}

```

整个代码中因为循环次数是固定的就是100次，这样的代码复杂度我们认为也是 O(1) 

一句话总结：只要代码的执行时间不随着n的增大而增大，这样的代码复杂度都 是O(1)

#### 时间复杂度O(n)

```java
/**
* 求1~n的累加和
* @param n
* @return
*/
public int sum(int n) {
    int sum = 0;
    for ( int i = 1; i <= n; i++) {
        sum = sum + i;
    }
    return sum;
}
```

一层for循序时间复杂度就是O(n)

```java
public static int sum2(int n){
    int sum = 0;
    for (int i = 1; i < n; ++i) {
        for (int j = 1; j < n; ++j) {
            sum = sum + i * j;
        }
    }
    return sum;
}

```

这个代码的执行行数为：O( 3n^2 + 3n + 3 )，不过，依据大O表示的规则：常 量、系数、低阶，可以忽略 

所以这个代码最终的时间复杂度为：O(n^2)

#### 时间复杂度O(logn)

```java
public void test04(int n){
    int i=1;
    while(i<=n){
        i = i * 2;
    }
}

```

分析这个代码的复杂度，我们必须要再强调一个前提：复杂度分析就是要弄清 楚代码的执行次数和数据规模n之间的关系 

以上代码最关键的一行是： i = i * 2 ，这行代码可以决定这个while循环执行 代码的行数， i 的值是可以无限接近 n 的值的。如果 i 一旦大于等于了 n 则循 环条件就不满足了。也就说达到了最大的行数。我们可以分析一下 i 这个值变化 的过程

![image-20230628144242349](https://gitee.com/tjlxy/img/raw/master/image-20230628144242349.png)

由此可知，代码的时间复杂度表示为O(log n)

#### 间复杂度O(n * log	n)

分析完O( log n )，那O( n * log n )就很容易理解了，比如下列代码：

```java
public void test05(int n){
    int i=0;
    for(;i<=n;i++){
        test04(n);
    }
}

public void test04(int n){
    int i=1;
    while(i<=n){
        i = i * 2;
    }
}
```



### 空间复杂度

空间复杂度全称是渐进空间复杂度，表示算法占用的额外**存储空间**与**数据规模**之间的增长关系

看下面代码

```java
public void test(int n){
    int i=0;
    int sum=0;
    for(;i<n;i++){
        sum = sum+i;
    }
    System.out.println(sum);
}
```

代码执行并不需要占用额外的存储空间，只需要常量级的内存空间大小，因此空间复杂度是O(1)

再来看一个其他例子：

```java
void print(int n) {
    int i = 0;
    int[] a = new int[n];
    for (i; i <n; ++i) {
        a[i] = i * i;
    }
    for (i = n-1; i >= 0; --i) {
        System.out.println(a[i]);
    }
}
```

传入一个变量n，决定申请多少的int数组空间内存，此段代码的空间复杂度为O(n)

我们常见的空间复杂度就是O(1),O(n),O(n ^2)，其他像对数阶的复杂度几乎用不到，因此空间复杂度比时间复杂度分析要简单的多。

##  面试题

### 1.常见的集合有哪些✔

- `Collection`接口
  - `List`
    - `ArrayList`数组
    - `Linkedlist`双向链表
    - `Vector`数组
  - `Set`
    - `HashSet`哈希表
    - `LinkedHashSet`哈希表+链表
    - `TreeSet`红黑树
- `Map`接口
  - `HashMap`链表+数组+（红黑树）
  - `LinkedHashMap`哈希表+双向链表
  - `TreeMap`红黑树

> 在java中提供了大量的集合框架，主要分为两类： 
>
> 第一个是Collection 属于单列集合，第二个是Map 属于双列集合 
>
> - 在Collection中有两个子接口List和Set。在我们平常开发的过程中用的比较多像list 接口中的实现类ArrarList和LinkedList。 在Set接口中有实现类HashSet和 TreeSet。 
> - 在map接口中有很多的实现类，平时比较常见的是HashMap、TreeMap，还有一个线程安全的map:ConcurrentHashMap

### 2.线程安全的集合有哪些？线程不安全的呢

- 线程安全的
  - Hashtable
  - ConcurrentHashMap
  - Vector
  - Stack
- 线程不安全

### 3.ArrayList与LinkedList异同点✔

- `ArrayList`
- `LinkedList`
- 线程安全、底层数据结构、查询，插入删除效率、内存占用（ArrayList体现在list列表的结尾会预留一定空间，LinkedList需要消耗更多的空间，要存放直接后继和直接前驱以及数据）

> 它们两个主要是底层使用的数据结构不一样，ArrayList 是动态数组， LinkedList 是双向链表，这也导致了它们很多不同的特点。
>
> 1、从操作数据效率来说
>
> ArrayList按照下标查询的时间复杂度O(1)【内存是连续的，根据寻址公式】， LinkedList不支持下标查询
>
> 查找（未知索引）： ArrayList需要遍历，链表也需要遍历，时间复杂度都是 O(n)
>
> 新增和删除
>
> - ArrayList尾部插入和删除，时间复杂度是O(1)；其他部分增删需要挪动数组，时间复杂度是O(n) 
> - LinkedList由于只需要调整节点的链接关系，插入和删除操作的效率较高，无论在任何位置进行插入和删除，时间复杂度都为O(1)。
>
> 2、**从内存空间占用来说**
>
> ArrayList底层是数组，内存连续，节省内存 
>
> LinkedList 是双向链表需要存储数据，和两个指针，更占用内存
>
> 3、从线程安全来说，ArrayList和LinkedList都不是线程安全的

根据具体的需求，选择合适的集合类可以提高代码的效率和可读性。如果需要频繁随机访问元素或在末尾进行插入和删除操作，可以选择ArrayList。如果需要频繁在任意位置进行插入和删除操作，可以选择LinkedList。

### 4.ArratList与Vector区别

- 线程安全问题
- 扩容问题`0.5 -> 1`（ArrayList有利于节省内存空间）

### 5.说一说ArrayList的扩容机制

- 将原有数组内容复制到新数组中去

### 6.Array和ArrayList有什么区别？什么时候该用Array而不是ArrayList呢

- 类型
  - 基本数据类型+对象类型
  - 对象类型
- 大小
  - 前者大小固定的
  - 后者动态变化的
- 后者提供了更多的方法和特性

### 7.HashMap的底层数据结构是什么(1.7和1.8有什么区别)✔

- 1.7 数组+链表
- 1.8 数组+链表+红黑树
  - 链表超过8，数据总量超过64转换为红黑树，
  - 数组长度小于64，先对数组进行扩容，减少查询数据
  - 1.8中链表插入使用尾插法（需判断元素个数）
- 1.7中链表插入使用头插法，哈希算法比较复杂，1.8新增红黑树，简化哈希算法，节省CPU资源
- 1.8中加红黑树的目的是提高HashMap插入和查询整体效率

### 8.解决Hash冲突的办法有那些？HashMap用的那种

- 开放定址法
- 再哈希法
- 链地址法
- 建立公共溢出区

> 1. 链地址法（Chaining）：
>    - 在哈希表的每个槽（bucket）中维护一个链表或其他数据结构（如红黑树）。
>    - 当发生哈希冲突时，将新的键值对插入到链表（或其他数据结构）中。
>    - 不同的键通过哈希函数计算得到相同的索引位置时，并不会覆盖原有的键值对。
> 2. 开放地址法（Open Addressing）：
>    - 在哈希表中，使用线性探测、二次探测、双重哈希等方法来寻找下一个可用的空槽。
>    - 当发生哈希冲突时，通过一定的步长探测下一个空槽，并将键值对插入其中。
>    - 不同的键通过哈希函数计算得到相同的索引位置时，会尝试寻找下一个可用的空槽。
> 3. 再哈希法（Rehashing）：
>    - 当哈希表的负载因子达到一定阈值时，可以扩展哈希表的容量，并重新计算所有键的哈希值。
>    - 通过增加桶的数量，降低哈希冲突的概率。
>
> HashMap使用的哈希冲突解决方法是链地址法（Chaining）。当发生哈希冲突时，新的键值对会通过链表（或红黑树）的方式插入到相应的桶中，在同一个桶中的键值对通过链表的形式进行存储。当链表长度超过一定阈值时（默认为8），链表会转换为红黑树，以提高查找效率。这种解决冲突的方法在实际应用中性能较好，并且能够保持较低的插入成本和查找成本。

### 9.为什么在解决hash冲突的时候，不直接用红黑树？而选择先用链表，再转红黑树

- 元素个数小于8的时候，链表查询性能大于红黑树

### 10.HashMap默认加载因子是多少？为什么是0.75，不是0.6或者0.8

### 11. HashMap 中 key 的存储索引是怎么计算的？  

- 根据key的值计算出hashcode的值，
- 然后根据hashcode计算出hash值，
- 最后通过hash&（length-1）计算得到存储的位置

### 12. HashMap 的put方法流程 ✔ 

- 是否为空、是否出现hash冲突、key是否存在、数据结构是否为红黑树、链表长度是否大于8、数据容量是否小于64

![image-20230625090954671](https://gitee.com/tjlxy/img/raw/master/image-20230625090954671.png)

> 1. 判断键值对数组table是否为空或为null，如果是则需要执行resize()进行扩容（初始化） 
> 2. 根据键值key计算hash值得到数组索引 （通过哈希函数将键转换为哈希值，并计算索引位置）
> 3. 判断table[i]==null或空，条件成立，直接新建节点添加 
> 4. 如果table[i]==null ,不成立 
>    1. 判断table[i]的首个元素是否和key一样，如果相同直接覆盖value 
>    2. 判断table[i] 是否为treeNode，即table[i] 是否是红黑树，如果是红黑树，则直接在树中插入键值对 
>    3. 遍历table[i]，如果是链表，则链表的尾部插入数据，然后判断链表长度是否大于8，大于8的话把链表转换为红黑树，在红黑树中执行插入操作，遍历过程中若发现key已经存在直接覆盖value 
> 5. 插入成功后，判断实际存在的键值对数量size是大于等于最大容量threshold（数组 长度*0.75），如果大于等于，进行扩容。

### 13. HashMap 的扩容方式✔

- HashMap在容量超过负载因子所定义的容量之后，就会扩容。（扩大为原来数组的两倍）

![image.png](https://cdn.nlark.com/yuque/0/2023/png/29617954/1678539957979-f62f356e-0435-4493-8eb5-6c7c99310b17.png#averageHue=%23eeeeee&clientId=u749efe4e-f659-4&from=paste&height=430&id=u1645ff50&name=image.png&originHeight=538&originWidth=954&originalType=binary&ratio=1.25&rotation=0&showTitle=false&size=288416&status=done&style=none&taskId=u30875403-9d9c-459b-9cc2-1cf5e0cecaf&title=&width=763.2)

> - 在添加元素或初始化的时候需要调用resize方法进行扩容，第一次添加数据初始化数组长度为16，以后每次每次扩容都是达到了扩容阈值（数组长度 * 0.75） 
> - 每次扩容的时候，都是扩容之前容量的2倍； 
> - 扩容之后，会新创建一个数组，需要把老数组中的数据挪动到新的数组中 
> - 没有hash冲突的节点，则直接使用 e.hash & (newCap - 1) 计算新数组的索引位置 
> - 如果是红黑树，走红黑树的添加 
> - 如果是链表，则需要遍历链表，可能需要拆分链表，判断(e.hash & oldCap)是否为 0，该元素的位置要么停留在原始位置，要么移动到原始位置+增加的数组大小这个位置上

### 通过hash计算后找到数组的下标，是如何找到的呢，你了解hashMap的寻址算法吗

这个哈希方法首先计算出key的hashCode值，然后通过这个hash值右移16位后的二进制进行按位异或运算得到最后的hash值。 

在putValue的方法中，计算数组下标的时候使用hash值与数组长度取模得到存储数据下标的位置，hashmap为了性能更好，并没有直接采用取模的方式，而是使用了数组长度-1 得到一个值，用这个值按位与运算hash值，最终得到数组的位置。

### 为何HashMap的数组长度一定是2的次幂

第一： 

计算索引时效率更高：如果是 2 的 n 次幂可以使用位与运算代替取模 

第二： 

扩容时重新计算索引效率更高：在进行扩容是会进行判断 hash值按位与运算旧数组长租是否 == 0 

如果等于0，则把元素留在原来位置 ，否则新位置是等于旧位置的下标+旧数组长度

### 你知道hashmap在1.7情况下的多线程死循环问题吗

jdk7的的数据结构是：数组+链表 

在数组进行扩容的时候，因为链表是头插法，在进行数据迁移的过程中，有可能导致死循环 

比如说，现在有两个线程 

线程一：读取到当前的hashmap数据，数据中一个链表，在准备扩容时，线程二介入 

线程二也读取hashmap，直接进行扩容。因为是头插法，链表的顺序会进行颠倒过来。比如原来的顺序是AB，扩容后的顺序是BA，线程二执行结束。 

当线程一再继续执行的时候就会出现死循环的问题。 

线程一先将A移入新的链表，再将B插入到链头，由于另外一个线程的原因， B的next指向了A，所以B->A->B,形成循环。 

当然，JDK 8 将扩容算法做了调整，不再将元素加入链表头（而是保持与扩 容前一样的顺序），尾插法，就避免了jdk7中死循环的问题。

### 14. 一般用什么作为HashMap的key

- String
  - 不可变， 所以在它创建的时候 hashcode 就被缓存了，不需要重新计算  
  - 获取对象时要用到 equals() 和 hashCode() 方法，String已经重写过了

### 15. HashMap为什么线程不安全

- 多线程下扩容循环
  - 1.7采用头插法，容易导致环形链表
  - 1.8采用尾插法，保持链表原有的顺序
- 多线程的put可能导致元素的丢失
  - 索引位置相同时，前一个key被后一个key覆盖
- put和get并发时，可能导致get为null

我们可以采用ConcurrentHashMap进行使用，它是一个线程安全的 HashMap

### 16. ConcurrentHashMap 的实现原理是什么

- JDK1.7
  - segment数组+HashEntry数组
- JDK1.8
  - 数组+链表+红黑树

### 17. ConcurrentHashMap 的 put 方法执行逻辑是什么

- JDK1.7
  - 计算hashcode值定位到hash entry
  - 遍历HashEntry
- JDK1.8
  - 计算hash值
  - 。。。

### 18. ConcurrentHashMap 的 get 方法是否要加锁，为什么

。。。

- `volatile`修饰

### 19. get方法不需要加锁与volatile修饰的哈希桶有关吗

### 20. ConcurrentHashMap 不支持 key 或者 value 为 null 的原因

- key
  - 源码就是这样编写的
- value（二义性）
  - 无法判断映射的`value`是空值，还是没有找到对应的`key`而为null

### 21. ConcurrentHashMap 的并发度是多少

默认16

### 22. ConcurrentHashMap 迭代器是强一致性还是弱一致性

- 弱一致性
  -  在遍历过程中，内部元素可能会发生变化，如果变化发生在已遍历过的部分，迭代器就不会反映出来，而如果变化发生在未遍历过的部分，迭代器就会发现并反映出来，这就是弱一致性。 

### 23. JDK1.7与JDK1.8 中ConcurrentHashMap 的区别

- 数据结构：
  - 取消了Segment分段锁的数据结构，取而代之的是数组+链表+红黑树的结构。	

- 保证线程安全机制：
  - JDK1.7采用Segment的分段锁机制实现线程安全，其中segment继承自 ReentrantLock。JDK1.8 采用CAS+Synchronized保证线程安全。

- 锁的粒度
  - 对需要进行数据操作的Segment加锁
  - 对每个数组元素加锁
- 链表转换为红黑树
  - hash算法简化
- 查询时间复杂度
      - O(n)
      - O(logN)

### 24. ConcurrentHashMap 和Hashtable的效率哪个更高？为什么

- ConcurrentHashMap的效率要高于Hashtable
- ConcurrentHashMap的锁粒度更低

### 25. 说一下Hashtable的锁机制 

- 给整个哈希表加了一把大锁
- 多线程环境下。。。

### 26. 多线程下安全的操作 map还有其他方法吗

- 使用`Collections.synchronizedmap`方法，对方法加同步锁

### 27. HashMap 和 HashSet 区别 ✔

- 上层实现接口
  - Map接口
  - Set接口

- 存储内容
  - 存储键值对
  - 存储对象

- 添加元素方法
  - put()
  - add()

- 速度
  - HashMap相对于HashSet较快，因为它使用唯一的键获取对象
  - HashSet较HashMap来说比较慢


> ### HashMap和HashTable有何不同
>
> 第一，数据结构不一样，hashtable是数组+链表，hashmap在1.8之后改为了 数组+链表+红黑树 
>
> 第二，hashtable存储数据的时候都不能为null，而hashmap是可以的 
>
> 第三，hash算法不同，hashtable是用本地修饰的hashcode值，而hashmap经常了二次hash 
>
> 第四，扩容方式不同，hashtable是当前容量翻倍+1，hashmap是当前容量翻倍 
>
> 第五，hashtable是线程安全的，操作数据的时候加了锁synchronized， hashmap不是线程安全的，效率更高一些 在实际开中不建议使用HashTable，在多线程环境下可以使用 ConcurrentHashMap类

### 28. Collection框架中实现比较要怎么做

- 内部比较器
  - 实现`compare(T t)`
- 外部比较器
  - 实现`compare(T t1,T t2)`

### 29. Iterator 和 ListIterator 有什么区别

- 遍历元素
  - 前者可以遍历所有集合  ，后者只能可以向前和向后遍历集合中的元素。
- 修改元素
  - Iterator无法修改集合中的元素
- 添加元素
  - Iterator无法向集合中添加元素
- 获取索引

遍历List数组

```java
List<String> list = Arrays.asList("Apple", "Banana", "Orange");

// 使用for循环遍历List
for (int i = 0; i < list.size(); i++) {
    String item = list.get(i);
    System.out.println(item);
}

// 使用增强型for循环遍历List
for (String item : list) {
    System.out.println(item);
}

//使用Iterator遍历List
List<String> list = Arrays.asList("Apple", "Banana", "Orange");

Iterator<String> iterator = list.iterator();
while (iterator.hasNext()) {
    String item = iterator.next();
    System.out.println(item);
}

//使用ListIterator遍历List
List<String> list = new ArrayList<>();
list.add("Apple");
list.add("Banana");
list.add("Orange");

ListIterator<String> listIterator = list.listIterator();
while (listIterator.hasNext()) {
    String item = listIterator.next();
    System.out.println(item);
}

// 反向遍历List
while (listIterator.hasPrevious()) {
    String item = listIterator.previous();
    System.out.println(item);
}
//忽略集合名
```

遍历Map数组

```java
Map<Integer, String> map = new HashMap<>();
map.put(1, "Apple");
map.put(2, "Banana");
map.put(3, "Orange");

// 遍历Map的键值对
for (Map.Entry<Integer, String> entry : map.entrySet()) {
    Integer key = entry.getKey();
    String value = entry.getValue();
    System.out.println("Key: " + key + ", Value: " + value);
}

// 遍历Map的键
for (Integer key : map.keySet()) {
    System.out.println("Key: " + key);
}

// 遍历Map的值
for (String value : map.values()) {
    System.out.println("Value: " + value);
}

```



### 30. 讲一讲快速失败(fail-fast)和安全失败(fail-safe)  

### 谈谈ConcurrentHashMap的扩容机制✔

- 1.7版本
  - 1.7版本的ConcurrentHashMap是基于segment分段实现的
  - 每个Segment相对于小型的HashMap
  - 每个Segment内部会进行扩容，和HashMap的扩容逻辑类似
  - 先生成新的数组，然后转移元素到新数组中
  - 扩容的判断也是每个Segment内部单独判断的，判断是否超过阈值
- 1.8版本
  - 1.8版本的ConcurrentHashMap不再基于Segment实现
  - 当某个线程进行put时，如果发现ConcurrentHashMap正在进行扩容那么该线程一起进行扩容
  - 如果某个线程put时，发现没有正在进行扩容，则将key-value添加到ConcurrentHashMap中，然后判断是否超过阈值，超过了则进行扩容
  - ConcurrentHashMap是支持多个线程扩容的
  - 扩容之前也先生成一个新的数组
  - 在转移元素时，先将原数组分组，将每组分给不同的线程来进行元素的转移，每个线程负责一组或多组的元素转移工作

### CopyOnWriteArrayList的底层原理是怎样的

1. 首先CopyOnWriteArrayList内部也是用过数组来实现的，在向CopyOnWriteArrayList添加元素时，会复制一个新的数组，写操作在新数组上进行，读操作在原数组上进行
2. 并且，写操作会加锁，防止出现并发写入丢失数据的问题
3. 写操作介绍之后会把原数组指向新数组
4. CopyOnWriteArrayList允许在写操作时来读取数据，大大提高了读的性能，因此此适合读多写少的应用场景，但是CopyOnWriteArrayList会比较占内存，同时可能读到的数据不是实时最新的数据，所有不适合实时性要求很高的场景

### HashMap和HashTable有什么区别？底层实现是什么

- HashMap方法没有`synchronized`修饰，线程不安全；HashTable线程安全
- HashMap允许key和value为null，而HashTable不允许

### ArrayList list=new	ArrayList(10)中的list扩容几次☆☆

![image-20230628112442241](https://gitee.com/tjlxy/img/raw/master/image-20230628112442241.png)

该语句只是声明和实例了一个 ArrayList，指定了容量为 10，未扩容

在ArrayList的源码中提供了一个带参数的构造方法，这个参数就是 指定的集合初始长度，所以给了一个10的参数，就是指定了集合的初始长度是10，这里面并没有扩容。

### 如何实现数组和List之间的转换☆☆

![image-20230628112508529](https://gitee.com/tjlxy/img/raw/master/image-20230628112508529.png)

- 数组转List ，使用JDK中java.util.Arrays工具类的asList方法 
- List转数组，使用List的toArray方法。无参toArray方法返回 Object数组，传入初始化长度的数组对象，返回该对象数组

#### 用Arrays.asList转List后，如果修改了数组内容，list受影响吗 

数组转List受影响

Arrays.asList转换list之后，如果修改了数组的内容，list会受影响，因为它的底层使用的Arrays类中的一个内部类ArrayList来构造的集合，在这个集合的构造器中，把我们传入的这个集合进行了包装而已，最终指向的都是同一个内存地址

#### List用toArray转数组后，如果修改了List内容，数组受影响吗

List转数组不受影响

list用了toArray转数组后，如果修改了list内容，数组不会影响，当调用了toArray 以后，在底层是它是进行了数组的拷贝，跟原来的元素就没啥关系了，所以即使 list修改了以后，数组也不受影响

![image-20230628112736563](https://gitee.com/tjlxy/img/raw/master/image-20230628112736563.png)

### ArrayList底层是如何实现的

我主要说一下add方法吧 

第一：确保数组已使用长度（size）加1之后足够存下下一个数据 

第二：计算数组的容量，如果当前数组已使用长度+1后的大于当前的数组长度，则调用grow方法扩容（原来的1.5倍） 

第三：确保新增的数据有地方存储之后，则将新元素添加到位于size的位置 上。 

第四：返回添加成功布尔值。

### ArrayList 和 LinkedList 不是线程安全的，在项目中是如何解决这个的线程安全问题的

第一：我们使用这个集合，优先在方法内使用，定义为局部变量，这样的话，就不会出现线程安全问题。

第二：如果非要在成员变量中使用的话，可以使用线程安全的集合来替代 ArrayList可以通过Collections 的 synchronizedList 方法将 ArrayList 转换成线 程安全的容器后再使用。

LinkedList 换成ConcurrentLinkedQueue来使用

### HashMap的实现原理

1. 底层使用hash表数据结构，即数组+（链表 | 红黑树） 

2. 添加数据时，计算key的值确定元素在数组中的下标 

   key相同则替换 

   不同则存入链表或红黑树中

3. 获取数据通过key的hash计算数组下标获取元素



## 常见算法

### 查找算法

#### 1. 基本查找/顺序查找

```java
package com.lxy25122.search;

/**
 * @user 25122
 * @date 2023/8/27
 * @time 20:52
 * @description 基本查找/顺序查找
 * 核心：从第0个索引开始挨个往后查找
 */
public class A01_BasicSearchDemo1 {

    /**
     * 需求：定义一个方法利用基本查找，查询某个元素是否存在
     * 数据如下：{132,12,43,64,3,75,3,1}
     */
    public static void main(String[] args) {
        int [] arr = {132,12,43,64,3,75,3,1};
        int number = 132;
        boolean result = basicSearch(arr, number);
        System.out.println(result);
    } 

    /**
     *
     * @param arr 数组
     * @param number 要查找的元素
     * @return 元素是否存在
     */
    public static boolean basicSearch(int[] arr, int number){
        //利用基本查找来查找number在arr数组中是否存在
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == number) return true;
        }
        return false;
    }

}
```

**扩展**

```java
package com.lxy25122.search;

import java.util.ArrayList;
import java.util.List;

/**
 * @user 25122
 * @date 2023/8/27
 * @time 20:52
 * @description 基本查找/顺序查找
 * 核心：从第0个索引开始挨个往后查找
 */
public class A01_BasicSearchDemo2 {

    /**
     * Exe1
     * 需求：定义一个方法利用基本查找，查询某个元素在数组中的索引
     * 要求：不需要考虑数组中元素是否重复
     * <p>
     * Exe2：
     * 需求：定义一个方法利用基本查找，查询某个元素在数组中的索引
     * 要求：需要考虑数组中元素有重复的可能性
     * {132,12,43,64,3,75,3,1,12}
     * 需要查找12，想要返回的是所有索引 1 8
     * 如果要返回多个数据的话，可以把这些数据放到数组或者集合中
     */
    public static void main(String[] args) {
        int[] arr = {132, 12, 43, 64, 3, 75, 3, 1, 12};
        int number = 2;
        int index = exe1(arr, number);
        System.out.println(index);
        System.out.println("---------------------");
        List<Integer> integers = exe2(arr, 12);
        System.out.println(integers);
    }


    public static int exe1(int[] arr, int number) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == number) return i;
        }
        return -1;
    }

    public static List<Integer> exe2(int[] arr, int number) {
        ArrayList<Integer> arrayList = new ArrayList<Integer>();
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == number) arrayList.add(i);
        }
        return arrayList;
    }


}
```

#### 2. 二分查找/折半查找

```java
package com.lxy25122.search;

/**
 * @user 25122
 * @date 2023/8/28
 * @time 20:20
 * @description 二分查找/折半查找
 * 核心：每次排除一半的查找范围
 * 1、数据必须是有序的（前提）
 * 2、查找过程：
 *  min和max表示当前要查找的范围
 *  mid在min和max中间的
 *  如果要查找的元素在mid的左边，在缩小范围的时候，min不变，max等于mid减1
 *  如果要查找的元素在mid的右边，在缩小范围的时候，max不变，min等于mid加1
 * <br></br>
 * 二分查找：mid每次都是指向范围的中间位置
 * 插值查找：mid尽可能的靠近要查找的数据，但是要求数据尽可能分别均匀
 * 斐波那契查找：根据黄金分割点来计算mid指向的位置
 */
public class A02_BinarySearchDemo1 {

    /**
     * 需求：定义一个方法利用二分查找，查询某个元素在数组中的索引
     * 数据如下：{2,7,9,13,25,26,47,58,70,99,121}
     * min      mid     max
     */
    public static void main(String[] args) {
        int[] arr = {2,7,9,13,25,26,47,58,70,99,121};
        int index = binarySearch(arr, 13);
        System.out.println(index);
    }

    /**
     * 二分查找/折半查找
     * @param arr 数组
     * @param number 要查找的元素
     * @return 索引位置
     */
    public static int binarySearch(int[] arr, int number){
        //1、定义两个变量，记录要查找的范围
        int min = 0;
        int max =arr.length - 1;
        //2、利用循环不断的去找要查找的数据
        while (true){
            if (min > max){
                return -1;
            }
            //3、找到min和max的中间位置 mid
            int mid = (min + max)/2;
            //4、拿着mid指向的元素跟要查找的元素进行比较
            if (number < arr[mid]){
                //4.1、number在mid的左边
                // min不变，max=mid-1
                max = mid - 1;
            }else if (number > arr[mid]){
                //4.2、number在mid的右边
                //min = mid + 1，max不变
                min = mid + 1;
            }else {
                //4.3、number跟mid指向的元素一样
                //mid = number
                return mid;
            }
        }
    }

}

```

#### 3. 插值查找

```java
public class InterpolationSearch {  
    public static int interpolationSearch(int[] arr, int x) {  
        int low = 0;  
        int high = arr.length - 1;  
  
        while (low <= high && x >= arr[low] && x <= arr[high]) {  
            if (low == high) {  
                if (arr[low] == x) return low;  
                return -1;  
            }  
  
            int pos = low + ((x - arr[low]) * (high - low)) / (arr[high] - arr[low]);  
  
            if (arr[pos] == x) return pos;  
  
            if (arr[pos] < x) low = pos + 1;  
            else high = pos - 1;  
        }  
  
        return -1;  
    }  
  
    public static void main(String[] args) {  
        int[] arr = {1, 3, 5, 7, 9, 11, 13, 15};  
        int x = 7;  
        int index = interpolationSearch(arr, x);  
        if (index != -1) System.out.println("Element found at index: " + index);  
        else System.out.println("Element not found in the array");  
    }  
}
```

在这个程序中，我们首先设定一个低位(low)和高位(high)。然后，我们使用目标值(x)与数组的低端和高端的差值，来计算出一个位置(pos)。这个位置是根据插值公式计算出来的，这个公式就是 `pos = low + ((x - arr[low]) * (high - low)) / (arr[high] - arr[low])`。然后我们检查这个位置的值是否等于目标值。如果等于，我们就返回这个位置。如果这个位置的值小于目标值，我们就把低位移动到这个位置的右边一位。否则，我们就把高端移动到这个位置的左边一位。然后我们重复这个过程，直到低位大于高端，或者我们找到目标值。

#### 4. 分块查找

```java
package com.lxy25122.search;

/**
 * @user 25122
 * @date 2023/8/28
 * @time 21:35
 * @description 分块查找
 * 核心思想：块内无序，块间有序
 * 实现步骤：
 *  1、创建数组BlockArr存放每一块对象的信息
 *  2、先查找blockArr确定要查找的数据属于那一块
 *  3、再单独遍历这一块数据即可
 */
public class A03_BlockSearchDemo1 {

    public static void main(String[] args) {

        int[] arr = {
                16, 5, 9, 12, 21, 18,
                32, 23, 37, 26, 45, 34,
                50, 48, 61, 52, 73, 66
        };
        //1. 要把数据进行分块
        //  要分为几块：arr.length=18 开根号 4.24块
        //  18/4 = 4.5块

        //创建三个块的对象
        Block block1 = new Block(21,0,5);
        Block block2 = new Block(45,6,11);
        Block block3 = new Block(66,12,17);

        //定义数组用来管理三个块的对象（索引表）
        Block[] blockArr = {block1,block2,block3};

        //定义一个变量用来记录要查找的元素
        int number = 37;

        //调用方法，传递、索引表，数组，要查找的元素
        int index = getIndex(blockArr,arr,number);
        System.out.println(index);

    }

    /**
     * 利用分块查找的原理，查询number的索引 ✔
     * @param blockArr
     * @param arr
     * @param number
     * @return
     */
    private static int getIndex(Block[] blockArr, int[] arr, int number) {
        //1.确定number在那一块当中
        int indexBlock = findIndexBlock(blockArr, number);
        if (indexBlock == -1){
            //表示number不在数组当中
            return -1;
        }
        //2. 获取这一块的起始索引和结束索引
        //获取当前块的对象
        Block block = blockArr[indexBlock];
        int startIndex = block.getStartIndex();
        int endIndex = block.getEndIndex();
        //3. 遍历原始数组
        for (int i = startIndex; i <= endIndex; i++){
            if (arr[i] == number){
                return i;
            }
        }
        return -1;
    }

    /**
     * 确定number在索引表的位置
     * @return
     */
    public static int findIndexBlock(Block[] blockArr, int number){
//        Block block1 = new Block(21,0,5);     ---0
//        Block block2 = new Block(45,6,11);    ---1
//        Block block3 = new Block(66,12,17);   ---2
        //从0索引开始遍历blockArr，如果number小于max，那么就表示number是在这一块当中的
        for (int i = 0; i < blockArr.length; i++) {
            if (number <= blockArr[i].getMax()){
                return i;
            }
        }
        return -1;
    }


}

class Block{

    private int max;//最大值
    private int startIndex;//起始索引
    private int endIndex;//结束索引

    public Block() {
    }

    public Block(int max, int startIndex, int endIndex) {
        this.max = max;
        this.startIndex = startIndex;
        this.endIndex = endIndex;
    }

    public int getMax() {
        return max;
    }

    public void setMax(int max) {
        this.max = max;
    }

    public int getStartIndex() {
        return startIndex;
    }

    public void setStartIndex(int startIndex) {
        this.startIndex = startIndex;
    }

    public int getEndIndex() {
        return endIndex;
    }

    public void setEndIndex(int endIndex) {
        this.endIndex = endIndex;
    }
}

```

**扩展**

```java
package com.lxy25122.search;

/**
 * @user 25122
 * @date 2023/8/28
 * @time 21:35
 * @description 【扩展的分块查找，块内无序，块外无序】
 * 核心思想：块内无序，块间有序
 * 实现步骤：
 *  1、创建数组BlockArr存放每一块对象的信息
 *  2、先查找blockArr确定要查找的数据属于那一块
 *  3、再单独遍历这一块数据即可
 */
public class A03_BlockSearchDemo2 {

    public static void main(String[] args) {

        int[] arr = {
                27, 22, 30, 40, 36,
                13, 19, 16, 20,
                7, 10,
                43, 50, 48
        };
        //1. 要把数据进行分块
        //  要分为几块：arr.length=18 开根号 4.24块
        //  18/4 = 4.5块

        //创建四个块的对象
        Block2 block1 = new Block2(40,22,0,4);
        Block2 block2 = new Block2(20,13,5,8);
        Block2 block3 = new Block2(10,7,9,10);
        Block2 block4 = new Block2(50,43,11,13);

        //定义数组用来管理三个块的对象（索引表）
        Block2[] blockArr = {block1,block2,block3,block4};

        //定义一个变量用来记录要查找的元素
        int number = 7;

        //调用方法，传递、索引表，数组，要查找的元素
        int index = getIndex(blockArr,arr,number);
        System.out.println(index);

    }

    /**
     * 利用分块查找的原理，查询number的索引 ✔
     * @param blockArr
     * @param arr
     * @param number
     * @return
     */
    private static int getIndex(Block2[] blockArr, int[] arr, int number) {
        //1.确定number在那一块当中
        int indexBlock = findIndexBlock(blockArr, number);
        if (indexBlock == -1){
            //表示number不在数组当中
            return -1;
        }
        //2. 获取这一块的起始索引和结束索引
        //获取当前块的对象
        Block2 block = blockArr[indexBlock];
        int startIndex = block.getStartIndex();
        int endIndex = block.getEndIndex();
        //3. 遍历原始数组
        for (int i = startIndex; i <= endIndex; i++){
            if (arr[i] == number){
                return i;
            }
        }
        return -1;
    }

    /**
     * 确定number在索引表的位置
     * @return
     */
    public static int findIndexBlock(Block2[] blockArr, int number){
//        Block2 block1 = new Block2(40,22,0,4);        --0
//        Block2 block2 = new Block2(20,13,5,8);        --1
//        Block2 block3 = new Block2(10,7,9,10);        --2
//        Block2 block4 = new Block2(50,43,11,13);      --3
        //从0索引开始遍历blockArr，如果number小于max，那么就表示number是在这一块当中的
        for (int i = 0; i < blockArr.length; i++) {
            if (number <= blockArr[i].getMax() && blockArr[i].getMin() <= number){
                return i;
            }
        }
        return -1;
    }


}

class Block2{

    private int max;//最大值
    private int min;//最小值
    private int startIndex;//起始索引
    private int endIndex;//结束索引

    public Block2() {
    }

    public Block2(int max, int min, int startIndex, int endIndex) {
        this.max = max;
        this.min = min;
        this.startIndex = startIndex;
        this.endIndex = endIndex;
    }

    public int getMax() {
        return max;
    }

    public void setMax(int max) {
        this.max = max;
    }

    public int getMin() {
        return min;
    }

    public void setMin(int min) {
        this.min = min;
    }

    public int getStartIndex() {
        return startIndex;
    }

    public void setStartIndex(int startIndex) {
        this.startIndex = startIndex;
    }

    public int getEndIndex() {
        return endIndex;
    }

    public void setEndIndex(int endIndex) {
        this.endIndex = endIndex;
    }

}
```

### 排序算法

#### 1.冒泡排序✔

相邻的数据两两比较，小的放前面，大的放后面。

```java
package com.lxy25122.mysort;

/**
 * @user 25122
 * @date 2023/9/3
 * @time 10:43
 * @description 冒泡排序
 * 核心思想
 * 1、相邻的元素两两比较，大的放右边，小的放左边。
 * 2、第一轮比较完毕之后，最大值就已经确定，第二轮可以少循环一次，后面以此类推。
 * 3、如果数组中有n个数据，总共我们只要执行n-1轮的代码就可以。
 *
 */
public class A01_BubbleDemo1 {

    public static void main(String[] args) {

        //1.定义数组
        int[] arr = {2, 4, 5, 3, 1};
        //2.利用冒泡排序将数组中的数据变成 1 2 3 4 5
        //第一轮：结束之后，最大值在数组的最右边。。。。5
//        for (int i = 0; i < arr.length - 1; i++) {
//            //i 依次表示数组中的每一个索引： 0 1 2 3 4
//            if (arr[i] > arr[i + 1]){
//                int temp = arr[i];
//                arr[i] = arr[i + 1];
//                arr[i + 1] = temp;
//            }
//        }
//        printArr(arr);
//        //第二轮：
//        for (int i = 0; i < arr.length - 1 - 1; i++) {
//            //i 依次表示数组中的每一个索引： 0 1 2 3 4
//            if (arr[i] > arr[i + 1]){
//                int temp = arr[i];
//                arr[i] = arr[i + 1];
//                arr[i + 1] = temp;
//            }
//        }
//        printArr(arr);
        //最终代码：
        //外循环：表示我要执行多少轮，如果有n个数据，那么执行n-1轮
        for (int i = 0; i < arr.length - 1; i++) { // 0 1 2 3
            //内循环：每一轮中我如何比较数据并找到当前的最大值
            //-1：为了防止索引越界
            //-i：提高效率，每一轮执行的次数应该比上一轮少一次
            for (int j = 0; j < arr.length - 1 - i; j++){
                //i 依次表示数组中的每一个索引： 0 1 2 3 4
                if (arr[j] > arr[j + 1]){
                    int temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
            printArr(arr);
        }

    }

    public static void printArr(int[] arr){
        //3.遍历数组
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i] + "、");
        }
        System.out.println();
    }

}
```



#### 2.选择排序✔

从0索引开始，拿着每一个索引上的元素跟后面的元素依次比较，小的放前面，大的放后面，依次类推

```java
package com.lxy25122.mysort;

/**
 * @user 25122
 * @date 2023/9/4
 * @time 21:27
 * @description 选择排序
 * 1、从 0 索引开始，跟后面的元素一一比较。
 * 2、小的放前面，大的放后面。
 * 3、第一次循环结束后，最小的数据已经确定。
 * 4、第二次循环从 1 索引开始以此类推。
 */
public class A02_SelectionDemo1 {

    public static void main(String[] args) {
        //1.定义数组
        int[] arr = {2, 4, 5, 3, 1};
        //2.利用选择排序让数组变成 1 2 3 4 5
        //第一轮：从 0 索引开始，跟后面元素一一比较
//        for (int i = 0 + 1; i < arr.length; i++) {
//            //拿着 0 索引跟后面的数据进行比较
//            if (arr[0] > arr[i]){
//                int temp = arr[0];
//                arr[0] = arr[i];
//                arr[i] = temp;
//            }
//        }
        //最终代码：
        //外循环：i 表示这一轮中，拿着哪个索引上的数据跟后面的数据进行比较并交换
        for (int i = 0; i < arr.length - 1; i++) {
            //内循环：拿着 i 跟 i 后面的数据进行比较交换
            for (int j = i + 1; j < arr.length; j++) {
                if (arr[i] > arr[j]){
                    int temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;
                }
            }
        }

        printArr(arr);
    }


    public static void printArr(int[] arr){
        //3.遍历数组
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i] + "、");
        }
        System.out.println();
    }

}

```





#### 3.插入排序

将数组分为有序和无序两组，遍历无序数据，将元素插入有序序列中即可

```java
package com.lxy25122.mysort;

/**
 * @user 25122
 * @date 2023/9/6
 * @time 10:39
 * @description 插入排序
 * 将 0 索引的元素到 N 索引的元素看做是有序的，把 N+1 索引的元素到最后一个当做是无序的，
 * 遍历无序的数据，将遍历的元素插入有序序列中适当位置，如遇到相同数据，插在后面，
 * N 的范围：0到最大索引
 */
public class A03_InsertDemo1 {

    public static void main(String[] args) {
        int[] arr = {3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48};
        //1.找到无序的那一组数据是从哪个索引开始的。index-2
        int startIndex = -1;
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] > arr[i + 1]){
                System.out.println(i);//表示有序的那一组数据到 1 索引就结束了
                startIndex = i + 1;
                break;
            }
        }
        System.out.println("------------------");
        //2.遍历从startIndex 开始到最后一个元素，依次得到无序的那一组数据中的每一个元素
//        int[] arr = {3, 44, 38, 5, 47, 15, 36, 26, 27, 2, 46, 4, 19, 50, 48};

        for (int i = startIndex; i < arr.length; i++) {
//            System.out.println(arr[i]);
            //开始向有序的数据中插入
            //记录当前要插入数据的索引
            int j = i;
            while (j > 0 && arr[j] < arr[j - 1]){
                //交换位置
                int temp = arr[j];
                arr[j] = arr[j - 1];
                arr[j - 1] = temp;
                j--;
            }

            //修改这个索引

        }

        printArr(arr);

    }

    public static void printArr(int[] arr){
        //3.遍历数组
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i] + "、");
        }
        System.out.println();
    }

}

```





#### 4.快速排序

**递归算法**

指的是方法中调用本身的现象

注意：递归一定要有出口，否则就会出现内存溢出

作用：

- 把一个复杂的问题层层转化为一个**与原问题相似的规模较小**的问题
- 递归策略只需**少量的程序**就可描述出解题过程所需要的多次重复计算

核心：

- 找出口：什么时候不再调用方法
- 找规则：如何把大问题变成规模较小的问题

eg：递归求和，求1-100之间的和

```java
package com.lxy25122.mysort;

/**
 * @user 25122
 * @date 2023/9/11
 * @time 20:46
 * @description 递归求1-100之间的和
 * 100 + 99 + 98 + .. + 2 + 1
 * 1~100 = 100 + (1~99)
 * 1~99 = 99 + (1~98)
 * 1~98 = 98 + (1~97)
 * ...
 * 1~3 = 3 + (1 ~ 2)
 * 1~2 = 2 + (1 ~ 1)
 * 1~1 = 1(递归出口)
 */
public class A04_RecursionDemo2 {

    public static void main(String[] args) {
        int sum = getSum(100);
        System.out.println(sum);//5050
    }

    public static int getSum(int number){
        //如果是1
        if (number == 1){
            return 1;
        }
        //如果不是1
        return number + getSum(number - 1);
    }

}

```

eg：递归求5的阶乘

```java
package com.lxy25122.mysort;

/**
 * @user 25122
 * @date 2023/9/11
 * @time 20:46
 * @description 递归求5的阶乘
 * 核心：
 *
 * - 找出口：什么时候不再调用方法
 * - 找规则：如何把大问题变成规模较小的问题
 * 5! = 5 * 4!
 * 4! = 4 * 3!
 * 3! = 3 * 2!
 * 2! = 2 * 1!
 * 1! = 1(递归出口)
 */
public class A04_RecursionDemo3 {

    public static void main(String[] args) {

        int sum2 = deliveryX(5);
        System.out.println(sum2);//120
    }

    public static int deliveryX(int number){
        if (number == 1){
            return 1;
        }
        return number * deliveryX(number - 1);
    }


}

```

**快速排序**

第一轮：把0索引的数字作为基准数，确定基准数在数组中正确的位置。比基准数小的全部在左边，比基准数大的全部在右边

后续递归操作，完成排序

```java
package com.lxy25122.mysort;

import javafx.scene.input.DataFormat;

import java.util.Date;

/**
 * @user 25122
 * @date 2023/9/12
 * @time 16:05
 * @description 快速排序
 * 第一轮：
 * 把 0 索引的数字作为基准数，确定基准数在数组中正确的位置。
 * 比基准数小的全部在左边，比基准数大的全部在右边，【先从结束索引开始比较】
 * 后面以此类推， end索引和start索引都移动位置后 进行互换
 *
 */
public class A05_QuickSortDemo {

    public static void main(String[] args) {
        /**
         *    {6, 1【start】, 2, 7, 9, 3, 4, 5, 10, 8【end】} end
         *    基准数：0->6，起始索引：1->1，结束索引：arr.length-1->8
         *    6,1【start】,2,7,9,3,4,5【end】,10,8 start
         *    6,1,2,5【start】,9,3,4,7【end】,10,8 end
         *    6,1,2,5,4【start】,3,9【end】,7,10,8 start
         *    6,1,2,5,4【start】,3【end】,9,7,10,8 end
         *    6,1,2,5,4,3【start】【end】,9,7,10,8 start
         *    3,1,2,5,4,6【start|end】，9,7,10,8 一轮结束
         */
        int arr[] = {6, 1, 2, 7, 9, 3, 4, 5, 10, 8};
        long start = System.currentTimeMillis();
        quickSort(arr,0,arr.length - 1);
        long end = System.currentTimeMillis();
        System.out.println(end - start);
        for (int i = 0; i < arr.length; i++) {
            System.out.print(arr[i] + ",");
        }
    }

    /**
     * 快速排序
     * @param arr 要排序的数组
     * @param startIndex 数组的起始索引
     * @param endIndex  数组的结束索引
     */
    public static void quickSort(int arr[], int startIndex, int endIndex){
        //定义两个变量记录要查找的范围
        int start = startIndex;
        int end = endIndex;

        if (start > end){
            //递归出口
            return;
        }

        //记录基准数
        int baseNumber = arr[startIndex];
        //利用循环找到要交换的数字
        while (start != end){
            //1、利用 end 从后往前开始找，比基准数小的数字
            while (true){
                //结束索引位置 <= 起始索引位置 || 结束索引位置的值 < 基准数
                if (end <= start || arr[end] < baseNumber){
                    break;
                }
                end--;//不满足条件，结束索引向左移一位
            }
            //2、利用 start 从前往后找，比基准数大的数字
            while (true){
                //结束索引位置 <= 起始索引位置 || 起始索引位置的值 > 基准数
                if (end <= start || arr[start] > baseNumber){
                    break;
                }
                start++;//不满足条件，起始索引向右移一位
            }
            //交换 end 和 start 指向的元素
            int temp = arr[start];
            arr[start] = arr[end];
            arr[end] = temp;
        }
        //当start和end指向了同一个元素的时候，那么上面的循环就会结束
        //表示已经找到了基准数在数组中应存入的位置
        //3、基准数归位 就是拿着这个范围中的第一个数字，跟start指向的元素进行交换
        int temp = arr[startIndex];
        arr[startIndex] = arr[start];
        arr[start] = temp;
        //一轮结束结果：3,1,2,5,4,6,9,7,10,8,
        //确定 6 左边的范围，重复刚刚调用【递归】
        quickSort(arr,startIndex,start - 1);
        //确定 6 右边的范围【递归】
        quickSort(arr, start + 1, endIndex);

    }

}

```



### 综合练习

#### 1.按照要求进行排序

定义数组并存储一些女朋友对象，利用Arrays中的sort方法进行排序

要求1：属性有姓名、年龄、身高。

要求2：按照年龄的大小进行排序，年龄一样，按照身高排序，身高一样按照姓名的字母进行排序。

(姓名中不要有中文或特殊字符，会涉及到后面的知识)

**GirlFriend.java**

```java
package com.lxy25122.testExe;

import jdk.nashorn.internal.objects.annotations.Constructor;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @user 25122
 * @date 2023/9/14
 * @time 15:54
 * @description 练习一
 *
 * 要求1：属性有姓名、年龄、身高。
 *
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class GirlFriend {

    private String name;

    private Integer age;

    private double height;


}
```

**Test1.java**

```java
package com.lxy25122.testExe;

import java.util.Arrays;
import java.util.Comparator;

/**
 * @user 25122
 * @date 2023/9/14
 * @time 15:51
 * @description 练习一
 * 定义数组并存储一些女朋友对象，利用Arrays中的sort方法进行排序
 *
 * 要求1：属性有姓名、年龄、身高。
 *
 * 要求2：按照年龄的大小进行排序，年龄一样，按照身高排序，身高一样按照姓名的字母进行排序。
 *
 * (姓名中不要有中文或特殊字符，会涉及到后面的知识)
 *
 */
public class Test1 {

    public static void main(String[] args) {

        //1.创建三个女朋友对象
        GirlFriend gf1 = new GirlFriend("xiaotu",18,1.67);
        GirlFriend gf2 = new GirlFriend("xiaobai",18,1.67);
        GirlFriend gf3 = new GirlFriend("xiaomei",21,1.65);
        //2.定义数组存储女朋友信息
        GirlFriend[] arr = {gf1,gf2,gf3};
        //3.利用Arrays 中的 sort 方法进行排序
//        //匿名内部类方式
//        Arrays.sort(arr, new Comparator<GirlFriend>() {
//            @Override
//            public int compare(GirlFriend o1, GirlFriend o2) {
//                //要求2：按照年龄的大小进行排序，年龄一样，按照身高排序，身高一样按照姓名的字母进行排序。
//                double temp = o1.getAge() - o2.getAge();//比较年龄
//                temp = temp == 0 ? o1.getHeight() - o2.getHeight() : temp;//比较身高
//                temp = temp == 0 ? o1.getName().compareTo(o2.getName()) : temp;//比较姓名字母
//                if (temp > 0){
//                    return 1;
//                }else if (temp < 0){
//                    return -1;
//                }else {
//                    return 0;
//                }
//            }
//        });
        //Lambda方式
        Arrays.sort(arr, (o1, o2) -> {
                //要求2：按照年龄的大小进行排序，年龄一样，按照身高排序，身高一样按照姓名的字母进行排序。
                double temp = o1.getAge() - o2.getAge();//比较年龄
                temp = temp == 0 ? o1.getHeight() - o2.getHeight() : temp;//比较身高
                temp = temp == 0 ? o1.getName().compareTo(o2.getName()) : temp;//比较姓名字母
                if (temp > 0){
                    return 1;
                }else if (temp < 0){
                    return -1;
                }else {
                    return 0;
                }
            }
        );
        //4.展示数组中的内容
        System.out.println(Arrays.toString(arr));


    }


}

```

#### 2.不死神兔

有一个很有名的数学逻辑题叫做不死神兔问题，有一对兔子，从出生后第三个月起每个月都生一对兔子,小兔子长到第三个月后每个月又生一对兔子，假如兔子都不死，问第十二个月的兔子对数为多少？

![image-20230915133528986](https://gitee.com/tjlxy/img/raw/master/image-20230915133528986.png)

```java
package com.lxy25122.testExe;

/**
 * @user 25122
 * @date 2023/9/15
 * @time 13:36
 * @description 不死神兔
 * 有一个很有名的数学逻辑题叫做不死神兔问题，有一对兔子，从出生后第三个月起每个月都生一对兔子,
 * 小兔子长到第三个月后每个月又生一对兔子，假如兔子都不死，问第十二个月的兔子对数为多少？
 * 特点：从第三个数据开始，是前两个数据的和（斐波那契数列）
 */
public class Test2 {

    public static void main(String[] args) {
        //求解一：
        //1.创建一个长度为12的数组
        int[] arr = new int[12];
        //2.手动给 0 索引和 1 索引的数据进行赋值
        arr[0] = 1;
        arr[1] = 1;
        //3.利用循环给剩余的数据进行赋值
        for (int i = 2; i < arr.length; i++) {
            arr[i] = arr[i - 1] + arr[i - 2];

        }
        //4.获取最大索引上的数据即可
        System.out.println(arr[11]);
        System.out.println("-------------------------");

        //求解二：
        /**
         * 递归的方式去完成
         * 1.递归的出口
         * 2.找到递归的规律
         * Fn(12) = Fn(11) + Fn(10)
         * Fn(11) = Fn(10) + Fn(9)
         * Fn(10) = Fn(9) + Fn(8)
         * ...
         * Fn(3) = F(2) + F(1)
         * Fn(2) = 1
         * Fn(1) = 1
         */
        System.out.println(getSum(12));
    }

    public static Integer getSum(int month){
        if (month == 1 || month == 2){
            return 1;
        }else {
            return getSum(month - 1) + getSum(month - 2);
        }
    }

}

```



#### 3.猴子吃桃子

有一堆桃子，猴子第一天吃了其中的一半，并多吃了一个！

以后每天猴子都吃当前剩下来的一半，然后再多吃一个，

第18天的时候（还没吃），发现只利下一个桃子了，请问，最初总共多少个桃子？

```java
package com.lxy25122.testExe;

/**
 * @user 25122
 * @date 2023/9/16
 * @time 21:13
 * @description 猴子吃桃子
 * 有一堆桃子，猴子第一天吃了其中的一半，并多吃了一个！
 * 以后每天猴子都吃当前剩下来的一半，然后再多吃一个，
 * 第18天的时候（还没吃），发现只利下一个桃子了，请问，最初总共多少个桃子？
 *
 * 分析：
 * day 10：  1
 * day 9：   (day10 + 1) * 2 = 4
 * day 8：   (day9 + 1) * 2 = 10
 * day 7：   (day8 + 1) * 2 = 22
 * ...
 * day 1:   (day2 + 1) * 2 = ?
 *
 *
 * 1.出口
 *  day==10 剩下1
 * 2.规律
 *  每一天桃子数量都是后一天数量加1，乘以2
 *
 *  反向递归
 */
public class Test3 {

    public static void main(String[] args) {
//        long start = System.currentTimeMillis();
        int count = getCount(1);
//        long end = System.currentTimeMillis();
        System.out.println(count);
//        System.out.println(start - end);
    }

    public static int getCount(int day){
        if (day <= 0 || day >11){
            System.out.println("当前时间错误");
            return -1;
        }
        //递归出口
        if (day == 10){
            return 1;
        }else {
            return (getCount(day + 1) + 1) * 2;
        }

    }

}

```

