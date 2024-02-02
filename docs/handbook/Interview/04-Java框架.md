# Java框架

## Spring 

### 使用Spring框架的好处是什么（为什么要用Spring框架）✔

- 轻量、控制反转、面向切面编程（AOP）、容器（IOC）、**MVC框架**、事务管理、异常处理

> - 控制反转(IoC=InversionofControl)IoC，用白话来讲，就是由容器控制程序之间的（依赖）关系，而非传统实现中，由程序代码直接操控。这也就是所谓“控制反转”的概念所在：(依赖)控制权由应用代码中转到了外部容器，控制权的转移，是所谓反转。
> - IoC还有一个另外的名字：“依赖注入(DI=DependencyInjection)”，即由容器动态的将某种依赖关系注入到组件之中

Spring是一个轻量级的应用框架，ta提供了**IOC和AOP**两个核心功能

它的核心目的：

- 1、简化企业级应用程序的开发，使得开发者只需要关心业务需求，不需要关心Bean的管理

- 2、通过切面增强功能减少代码的侵入性

从Spring本身特性来看：

- 1、轻量级：Spring是一个轻量级框架，它的基本的版本大约2MB

- 2、IOC/DI：Spring通过IOC容器来实现Bean的生命周期的管理以及通过DI来实现依赖注入，从而实现对向依赖的松耦合管理

- 3、面向切面编程（AOP）：Spring支持面向切面编程，从而把应用业务逻辑和系统服务分开

- 4、MVC框架：SpringMVC提供了功能更加强大且更加灵活的Web框架支持

- 5、事务管理：Spring通过AOP实现了事务的统一管理，对应用开发中的事务处理提供了非常灵活的支持

- 6、Spring从第一个版本发布到现在，整个生态已经非常庞大了，在业务开发领域，Spring生态几乎提供了非常完善的支持， 更重要的是社区的活跃度和技术成熟度都非常高

### 什么是SpringIOC容器✔

Spring容器使用依赖注入来管理组成应用程序的组件。（控制反转）

- 控制对象的创建，控制对象内属性的赋值（控制）
- 我们不需要手动创建对象，仅仅需要定义类和相关属性即可，加上注解，交给Spring帮我们创建对象及赋值（反转）
- 总结：IOC表示**控制反转**，表示如果用Spring，那么Spring会负责来创建对象，以及给对象内的属性赋值，也就是如果用Spring，那么对象的控制权会交给Spring

### 什么是依赖注入？可以通过多少种方式完成注入✔

- 依赖注入是指将依赖的对象实例交给spring帮我们注入管理，从而释放对对象的管理权，比如可以统一替换接口的实现，更高效的开发程序。

  是指在程序运行过程中，需要对象协助时，无需在代码中创建对象，通过ioc容器将他们装配在一起

- 构造函数注入、setter注入、（接口）、@autowire 自动注入

### 区分BeanFactory和ApplicationContext✔❤

ApplicationContext是BeanFactory的子接口  

- 1、`BeanFactory`
  - 使用懒加载、不支持国际化、不支持依赖注解、（使用语法显式提供资源对象）
  - 优点：启动时资源占用少
  - 缺点：运行速度相对较慢，可能存在空指针异常

- 2、`ApplicationContext`
  - 即使加载、( 继承MessageSource)支持国际化、支持依赖注解、（自己创建和管理资源对象）
  - 优点：所有bean在启动时就进行了加载，系统运行的速度快；在启动时，可以发现系统中的配置问题
  - 缺点：所有对象进行了预加载，内存占用较大


### 区分构造函数注入和setter注入❕

| 构造函数注入                   | setter注入                     |
| ------------------------------ | ------------------------------ |
| 没有部分注入                   | 有部分注入                     |
| 不会覆盖setter属性             | 会覆盖setter属性               |
| **任意修改都会创建一个新实例** | **任意修改不会创建一个新实例** |
| **适用于设置很多属性**         | **适用于设置很少属性**         |

### Spring提供了那些配置方式

- 基于xml配置
- 基于注解配置
- 基于JavaAPI配置`@Bean 和 @Configuration`

### Spring中的bean的作用域有哪些（Spring支持几种beanscope）✔

- `singleton`唯一bean实例，Spring中bean默认都是单例的，每个容器只有一个bean的实例（单实例）
- `prototype`每次注入时都会创建一个新的对象（多实例）
- `request`每一次HTTP请求都会产生一个新的bean，该bean仅在当前HTTP request内有效。
- `session`在一个HTTP Session中，一个Bean定义对应一个实例。该作用域仅在基于web的Spring ApplicationContext情形下有效。
- `global-session`全局session作用域

 仅当用户使用支持 Web 的 ApplicationContext 时，最后三个才可用。  

### 如何理解IOC和DI

- “控制反转”：不用自己创建实例对象，交给Spring的bean工厂帮我们创建管理
  
- “依赖注入”：通过配置，由容器动态的将某个依赖关系注入到组件之中


### 将一个类声明为Spring的bean的注解有哪些

一般使用 @Autowired 注解自动装配 bean，要想把类标识成可用于 @Autowired 注解自动装配的 bean 的类,采用以下注解可实现：

- 1、`@Compoent`标志为Spring组件，可标注任意类为 Spring 组件。如果一个Bean不知道属于哪个层，可以使用@Component 注解标注。
- 2、`@Repository`持久层，主要用于数据库相关操作。
- 3、`@Service`业务层，主要涉及一些复杂的逻辑，需要用到 Dao层
- 4、`@Controller`SpringMVC控制层，主要用户接受用户请求并调用 Service 层返回数据给前端页面

### Spring中的bean生命周期✔❗

- 1、创建前准备

  在加载之前要从上下文和一些配置中解析并通过`BeanDefinition`类**查找Bean的定义信息**，比如，类的全路径，是否是延迟加载，是否是单例等等这些信息 

- 2、<font color=blue>创建实例化</font>

  调用**构造函数实例化bean**，得到对象

- 3、<font color=blue>依赖注入（设置bean属性）</font>

  如果实例化的Bean存在依赖其他Bean对象的一些情况，则需要对这些依赖的Bean进行对象注入，比如一些set方法注入，像平时开发用的 @Autowire都是这一步完成 

- 4、实现Aware接口，设置依赖信息

  (BeanNameAware、BeanFactoryAware、ApplicationContextAware)，如果某一个bean实现了Aware接口就会重写方法执行 

- 5、初始化前，处理`@PostConstructor`注解，回调

  bean的后置处理器BeanPostProcessor，这个是前置处理器 

- 6、<font color=blue>初始化，处理InitializingBean接口</font>

  初始化方法，比如实现了接口InitializingBean或者自定义了方法 init-method标签或@PostContruct 

- 7、容器缓存

  执行了bean的后置处理器BeanPostProcessor，主要是对bean进行增强，有可能在这里产生代理对象

- 8、<font color=blue>销毁实例</font>

  可以调用destroy方法进行销毁，或自定义销毁方法

### 什么是Spring的内部bean

- 将`bean`用做另一个`bean`的属性

### 什么是Spring装配✔

- 当`bean`在`Spring`容器中组合在一起时，它被称为装配或`bean`装配（ autowire  ）

### 自动装配有什么局限

- 1、多个候选对象：如果有多个相同类型的候选对象可以自动装配，Spring无法确定要选择哪个对象。这时，需要通过使用`@Qualifier`注解或者`@Primary`注解来明确指定要装配的对象。

- 2、循环依赖：当存在循环依赖时，Spring无法完成自动装配。这意味着如果两个或多个bean之间存在相互依赖，且无法通过构造函数注入或setter方法注入来解决，那么自动装配将失败。

- 3、无法装配基本数据类型：自动装配功能通常用于装配bean对象，对于基本数据类型（如int、String等）无法进行自动装配，需要手动配置或使用`@Value`注解。

- 4、无法装配静态字段或私有字段：Spring的自动装配只能应用于非静态字段和公共字段，无法装配静态字段或私有字段。

- 5、无法装配集合类型：如果要装配的属性是集合类型（例如List、Set、Map等），则需要手动配置或使用`@Resource`、`@Inject`等注解。

- 6、无法覆盖已存在的bean定义：如果多个配置文件中都定义了相同的bean，且这些bean都使用了自动装配注解，那么将会发生冲突。此时，需要手动解决冲突或使用`@Primary`注解来指定首选bean。

总而言之，尽管Spring的自动装配功能很方便，但在处理复杂的依赖关系、循环依赖、基本数据类型等特殊情况时，可能会遇到一些局限性，需要通过手动配置或其他方式来解决。

### Spring中出现同名bean怎么办

- 同一配置文件内，以最上面定义的为准
- 不同配置文件中存在的，后解析的配置文件会覆盖先解析的配置文件
- 同文件中，`@bean`的会生效，【` @ComponentScan`扫描进来的优先级是最低的  】

### Spring怎么解决循环依赖问题✔？

- 构造器的循环依赖（直接抛出）

- 单例模式下的setter循环依赖（三级缓存）

  Spring解决循环依赖问题的主要方法是使用三级缓存机制。具体步骤如下：

  - 1、创建A对象实例：当Spring容器创建bean时，会将正在创建的bean放入“当前创建集合”中，并创建一个空的A对象实例。

  - 2、注入A对象的依赖：Spring会注入A对象的依赖（例如属性、构造函数参数）。

  - 3、将A对象实例放入“早期引用集合”中：将A对象实例放入“早期引用集合”中，表示A对象已经创建但尚未完全初始化。

  - 4、创建B对象实例：当Spring容器创建B对象时，会发现B对象依赖于A对象。

  - 5、从“当前创建集合”中获取A对象实例：Spring会从“当前创建集合”中查找A对象实例。

  - 6、从“早期引用集合”中获取A对象实例：如果在“当前创建集合”中没有找到A对象实例，则会从“早期引用集合”中查找A对象实例。

  - 7、完成A对象的初始化：如果找到了A对象实例，则完成A对象的初始化，包括执行A对象的初始化方法。

  - 8、注入B对象的依赖：Spring会注入B对象的依赖（例如属性、构造函数参数）。

  - 9、将B对象实例放入“早期引用集合”中：将B对象实例放入“早期引用集合”中，表示B对象已经创建但尚未完全初始化。

  - 10、完成B对象的初始化：完成B对象的初始化，包括执行B对象的初始化方法。

  通过这种三级缓存机制，Spring可以解决循环依赖问题。当发现循环依赖时，Spring会从“早期引用集合”中获取已经创建但尚未完全初始化的对象实例，以避免无限循环创建对象。

  需要注意的是，如果循环依赖关系太复杂或者存在无法解决的循环依赖，Spring将抛出BeanCurrentlyInCreationException异常，表示无法解决循环依赖。在这种情况下，需要考虑重新设计依赖关系或使用其他解决方案来避免循环依赖。

- 非单例循环依赖（无法处理）

### Spring中的循环引用✔❕

循环依赖：循环依赖其实就是循环引用,也就是两个或两个以上的bean互相持有对方,最终形成闭环。比如A依赖于B,B依赖于A 

循环依赖在spring中是允许存在，spring框架依据三级缓存已经解决了大部分的循环依赖

①一级缓存：单例池，缓存已经经历了完整的生命周期，已经初始化完成的 bean对象 

②二级缓存：缓存早期的bean对象（生命周期还没走完） 

③三级缓存：缓存的是ObjectFactory，表示对象工厂，用来创建某个对象的

### 循环依赖具体解决流程✔？

第一，先实例A对象，同时会创建ObjectFactory对象存入三级缓存 singletonFactories  

第二，A在初始化的时候需要B对象，这个走B的创建的逻辑 

第三，B实例化完成，也会创建ObjectFactory对象存入三级缓存 singletonFactories  

第四，B需要注入A，通过三级缓存中获取ObjectFactory来生成一个A的对象同时存入二级缓存，这个是有两种情况，一个是可能是A的普通对象，另外一个是A的代理对象，都可以让ObjectFactory来生产对应的对象，这也是三级缓存的关键 

第五，B通过从通过二级缓存earlySingletonObjects 获得到A的对象后可以正常注入，B创建成功，存入一级缓存singletonObjects  

第六，回到A对象初始化，因为B对象已经创建完成，则可以直接注入B，A 创建成功存入一次缓存singletonObjects 

第七，二级缓存中的临时对象A清除

### 构造方法出现了循环依赖怎么解决✔

由于bean的生命周期中构造函数是第一个执行的，spring框架并不能解决构造函数的的依赖注入，可以使用@Lazy懒加载，什么时候需要对象再进行bean对象的创建

### Spring中的单例bean的线程安全问题✔？

- 线程安全问题都是由全局变量及静态变量引起的
- 若有多个线程同时执行写操作，一般需要考虑线程同步，否则可能影响线程安全

有状态bean和无状态bean

- 有状态就是有数据存储功能，有实例变量的对象，线程不安全
- 无状态就是一次操作，不能保存数据，没有实例对象，线程安全

> 不是线程安全的，是这样的 
>
> 当多用户同时请求一个服务时，容器会给每一个请求分配一个线程，这是多个线程会并发执行该请求对应的业务逻辑（成员方法），如果该处理逻辑中有对该单列状态的修改（体现为该单例的成员属性），则必须考虑线程同步问题。 
>
> Spring框架并没有对单例bean进行任何多线程的封装处理。关于单例bean的线程安全和并发问题需要开发者自行去搞定。
>
> 比如：我们通常在项目中使用的Spring bean都是不可变的状态(比如 Service类和DAO类)，所以在某种程度上说Spring的单例bean是线程安全的。 
>
> 如果你的bean有多种状态的话（比如 View Model对象），就需要自行保证线程安全。最浅显的解决办法就是将多态bean的作用由“singleton”变更为 “prototype”。

Spring中的单例bean在多线程环境下可能存在线程安全问题。这是因为多个线程同时访问同一个单例bean实例时，可能会出现数据竞争、并发访问等问题。

具体来说，以下是可能出现线程安全问题的几种情况：

1. 实例变量的可见性问题：如果单例bean中包含共享的实例变量，那么多个线程同时访问这些变量可能会出现可见性问题，即一个线程修改了变量的值，但另一个线程看到的还是旧值。

2. 状态不一致问题：如果单例bean中包含多个实例变量，它们之间有依赖关系，那么多个线程同时访问这些变量可能会出现状态不一致问题，即一个线程修改了其中一个变量的值，但其他线程看到的是不一致的状态。

3. 竞争条件问题：如果单例bean中包含需要进行连续多步操作的代码段，那么多个线程同时执行这些操作可能会出现竞争条件问题，即两个或多个线程在执行多个操作时可能会交错执行，导致最终结果不正确。

为了解决这些线程安全问题，可以采用以下方法：

1. 避免共享实例变量：对于单例bean中的实例变量，应该尽量避免共享，并使用局部变量代替共享变量。

2. 使用同步机制：可以使用synchronized关键字或者ReentrantLock等同步机制来保证对共享变量的访问是线程安全的。

3. 使用ThreadLocal：对于需要保存线程本地状态的情况，可以使用ThreadLocal来实现，确保线程之间不会出现状态混淆问题。

4. 使用无状态bean：对于不需要保存状态的bean，可以使用无状态（stateless）bean，以避免状态不一致问题。

总之，在编写单例bean时应该注意线程安全问题，根据具体情况采取适当的线程安全措施。

### 什么是AOP✔

面向切面编程

- 将程序中的交叉业务逻辑封装成一个切面，然后注入到目标对象中，AOP可以对某个对象或某些对象的功能进行增强，比如对象中的方法需要扩扩展业务，可以在执行某个方法之前额外的做一些事情，在某个方法执行之后额外的做一些事情
- 将新的业务功能添加到已有的对象中，不影响原有业务

> aop是面向切面编程，在spring中用于将那些与业务无关，但却对多个对象产生影响的公共行为和逻辑，抽取公共模块复用，降低耦合，一般比如可以做为公共日志保存，事务处理等

### AOP的使用情景有哪些?简述其实现原理✔

- 1、**统一日志处理**
- 2、统一异常处理
- 3、访问限制（权限，限流等）
- 4、**事务处理**
- 5、缓存管理等
- 6、aop是面向切面编程，通过代理的方式（jdk或cglib）为程序统一添加功能，解决公共问题

### AOP有哪些通知类型

在面向切面编程（AOP）中，通知是指在特定连接点（例如方法执行前、方法执行后、方法抛出异常时等）执行的代码。AOP中的通知包括以下几种类型：

- 前置通知（Before advice）：在目标方法执行之前执行的通知。

- 后置通知（After returning advice）：在目标方法成功执行之后执行的通知。

- 环绕通知（Around advice）：在目标方法执行前后都可以执行的通知，可以完全控制目标方法的执行。

- 抛出异常通知（After throwing advice）：在目标方法抛出异常后执行的通知。

- 最终通知（After (finally) advice）：无论目标方法是否成功执行，都将执行的通知。

这些通知类型可以让开发人员在不改变原有业务逻辑的情况下，通过切面来添加横切关注点，实现诸如日志记录、性能监控、事务管理等功能。

### 你们项目中有没有使用到AOP

> 我们当时在后台管理系统中，就是使用aop来记录了系统的操作日志主要思路是这样的，使用aop中的环绕通知+切点表达式，这个表达式就是要找到要记录日志的方法，然后	通过环绕通知的参数获取请求方法的参数，比如类信息、方法信息、注解、请求方式等，获取到这些参数以后，保存到数据库

### Aop有哪些实现方式

- 静态代理：在编译阶段就可生成 AOP 代理类  
  
- 动态代理：在运行时在内存中“临时”生成 AOP 动态代理类  


### Spring Aop and AspectJ Aop有什么区别

- 编译时和运行时：AspectJ AOP是在编译时织入切面，而Spring AOP是在运行时动态生成代理对象，并在代理对象中织入切面。
- 功能：AspectJ AOP具有更强大的功能，包括静态织入和动态织入、支持多种切入点表达式、可以织入final方法等。而Spring AOP只支持动态代理和基于JDK的代理，同时只能织入公共方法。
- 性能：AspectJ AOP相对于Spring AOP来说性能更高。因为AspectJ AOP是在编译时进行织入，所以它的代理对象已经存在了。而Spring AOP是在运行时创建代理对象，会涉及到一定的性能开销。
- 集成：Spring AOP是Spring框架的一部分，因此与Spring框架的其他组件集成非常容易。而AspectJ AOP需要单独引入AspectJ的编译器和运行时库，集成起来可能相对麻烦一些。

### Spring框架中用到了那些设计模式✔

- 工厂设计模式
- 代理设计模式
- 单例设计模式
- 模板方法模式
- 包装器设计模式
- 观察者模式
- 适配器模式

### Spring事务实现方式有哪些（如何实现）✔

- 1、编程式事务管理

  这种方式需要在代码中显式地使用事务管理器来开始、提交或回滚事务。开发人员需要手动编写代码来管理事务的边界和异常处理。

- 2、声明式事务管理 `@Transactional注解就是声明式的。或xml配置事务  `

  这种方式通过将事务管理逻辑从业务逻辑中分离出来，在配置文件或使用注解的方式声明事务的属性。Spring提供了两种声明式事务管理的方法：基于XML的配置和基于注解的配置。

- 3、注解驱动事务。。

> spring实现的事务本质就是aop完成，对方法前后进行拦截，在执行方法之前开启事务，在执行完目标方法之后根据执行情况提交或者回滚事务。

#### 在如下代码中，当调用insertA 方法的时候，如果insertB 插入b表的时候有异常，能否保证 insertA中的a 表插入成功，如果不能，应该如何修改

```java
@Service
@Transactional
public class TestService{
    @Autowired
    private JdbcTemplate jt;

    public void insertA(){
        jt.execute("insert into a(m,n) values(1,2)");
        insertB();
    }

    public void insertB(){
        jt.execute("insert into b(h,j) values(1,2)");
    }
}
```

- 1、不能，在类上使用了@Transactional注解，默认开启了全局读写事务
- 2、可以细粒度在方法上加注解

### Spring框架的事务管理有哪些优点

- 提供了跨不同事务api 的一致编程模型
- 支持声明式事务管理
- 集成了Spring的各种访问抽象

### Spring事务定义的传播规则✔

- PROPAGATION_REQUIRED: 支持当前事务，如果当前没有事务，就新建一个事务。这是最常见的选择。
- PROPAGATION_SUPPORTS: 支持当前事务，如果当前没有事务，就以非事务方式执行。
- PROPAGATION_MANDATORY: 支持当前事务，如果当前没有事务，就抛出异常。
- PROPAGATION_REQUIRES_NEW: 新建事务，如果当前存在事务，把当前事务挂起。
- PROPAGATION_NOT_SUPPORTED: 以非事务方式执行操作，如果当前存在事务，就把当前事务挂起。
- PROPAGATION_NEVER: 以非事务方式执行，如果当前存在事务，则抛出异常。
- PROPAGATION_NESTED:如果当前存在事务，则在嵌套事务内执行。如果当前没有事务，则进行与PROPAGATION_REQUIRED类似的操作。

### `@Controller`注解有什么用

- 标记一个类为Spring Web MVC 控制器 Controller

### Spring单例bean和单例模式❕

- 单例模式表示JVM中某个类的对象只会存在唯一一个
- 而单例bean并不表示JVM中只能存在唯一的某个类的bean对象

### Spring事务什么时候会失效（Spring中事务失效的场景有哪些）✔

- 1、发生自调用，类⾥⾯使⽤this调⽤本类的⽅法（this通常省略），此时这个this对象不是代理类，⽽是UserService对象本身！
- 2、方法本身public：@Transactional 只能⽤于 public 的⽅法上，否则事务不会失效，如果要⽤在⾮ public ⽅法上，可以开启 AspectJ 代理模式。
- 3、数据库不支持事务
- 4、没有被Spring管理
- 5、异常被吃掉，事务不会回滚(或者抛出的异常没有被定义，默认为RuntimeException)

> 第一个，如果方法上异常捕获处理（try-catch），自己处理了异常，没有抛出，就会导致事务失效，所以一般处理了异常以后，别忘了抛出去就行了 
>
> 第二个，如果方法抛出检查异常（throw ，例如ClassNotFoundException ），如果报错也会导致事务失效，最后在 spring事务的注解上，就是@Transactional上配置rollbackFor属性为 Exception，这样别管是什么异常，都会回滚事务 
>
> 第三，我之前还遇到过一个，如果方法上不是public修饰的，也会导致事务失效

### 为什么有些公司禁止使用@Transactional声明式事务✔

1、**在方法上增加@Transaction声明式事务**，如果一个方法中存在较多耗时的操作，很容易引发**长事务**的问题，而长事务会带来**锁的竞争**、影响性能，同时也会导致**数据库的连接池被消耗尽**、**影响到程序的正常执行**。

2、如果方法存在嵌套调用，而被嵌套调用的方法也声明了@Transaction事务，这时就会出现事务嵌套的调用行为，**容易引起事务混乱**、**造成程序运行结果出现异常**。

3、@Transaction的声明式事务是将事务控制逻辑放在注解中，如果项目中的复杂度增加，**事务的控制可能会变的更加复杂**，**导致代码的可读性和维护性下降**

所有为了避免这一类问题，有些公司会推荐使用编程时事务，这样可以更加**灵活的去控制事务的范围**、**减少事务的锁定时间**、**提高系统的性能**

### Spring是什么

轻量级的开源的J2EE框架。它是⼀个容器框架，⽤来装javabean（java对象），中间层框架（万能胶） 可以起⼀个连接作⽤，⽐如说把Struts和hibernate粘合在⼀起运⽤，可以让我们的企业开发更快、更简洁，Spring是⼀个轻量级的控制反转（IoC)和⾯向切⾯（AOP）的容器框架： 

- 从大小与开销两⽅⾯⽽⾔Spring都是轻量级的。 
- 通过控制反转(IoC)的技术达到松耦合的⽬的提供了⾯向切⾯编程的丰富⽀持，允许通过分离应⽤的业务逻辑与系统级服务进⾏内聚性的开发 
- 包含并管理应⽤对象(Bean)的配置和⽣命周期，这个意义上是⼀个容器。 
- 将简单的组件配置、组合成为复杂的应⽤，这个意义上是⼀个框架。  

### @Component和@Bean区别✔

@Component注解是一个通用注解，可以用在任何类上，包括普通的Java类、业务逻辑组件、持续化对象等，通过Component注解，**Spring会自动去创建该类的实例注入到SpringIOC容器中**

@Bean注解是用于配置类中声明一个Bean的，通常用在配置类的方法上面，表示把这个方法的返回对象注册到SpringIOC容器中，通过Bean注解，**可以自定义Bean的创建和初始化过程，包括指定Bean的名称、作用域、依赖关系等**，

- 1、用途不同
  - @Component注解的用于标识一个普通的类
  - @Bean注解是在配置类中声明和配置Bean对象
- 2、使用方式不同
  - @Component注解是一个类级别的注解，Spring通过@ComponetsScan注解扫描并注册为Bean（SpringIOC容器中）
  - @Bean注解是修饰在方法层面，在配置类中手动声明一个Bean的定义
- 3、控制权不同
  - @Component注解修饰的类是由Spring框架来创建和初始化的
  - @Bean注解运行开发人员手动控制Bean 的创建和配置过程（更加灵活）

## SpringMVC

### SpringMVC工作原理了解吗✔❕

**请求到达前端控制器（DispatcherServlet）**->**处理器映射器（Handler Mapping）**->**处理器适配器（Handler Adapter）**->**处理器执行业务逻辑**->**模型和视图解析器（Model and View Resolver）**->**视图渲染**->**响应返回给客户端**

1、用户发送出请求到前端控制器（DispatcherServlet），这是一个调度中心，Spring MVC的核心组件。它是一个Servlet，负责拦截所有进入应用程序的请求。

2、前端控制器（DispatcherServlet）收到请求调用处理器映射器（Handler Mapping）。 

3、处理器映射器（Handler Mapping）找到具体的处理器（Handler）(可查找xml配置或注解配置)，生成处理器对象及处理器拦截器(如果有)，再一起返回给前端控制器（DispatcherServlet）。 

4、前端控制器（DispatcherServlet）调用处理器适配器（Handler Adapter）。 

5、处理器适配器（Handler Adapter）经过适配调用具体的处理器（Handler/Controller）。 在这一阶段，处理器（Handler）执行请求的业务逻辑，如处理表单提交、访问数据库等。

6、Controller执行完成返回ModelAndView对象。 

7、处理器适配器（Handler Adapter）将Controller执行结果ModelAndView返回给前端控制器（DispatcherServlet）。 

8、前端控制器（DispatcherServlet）将ModelAndView传给视图解析器（ViewReslover）。

9、视图解析器（ViewReslover）解析后返回具体视图（View）。 

10、前端控制器（DispatcherServlet）根据View进行渲染视图（即将模型数据填充至视图中）。 

11、前端控制器（DispatcherServlet）响应用户。 

当然现在的开发，基本都是前后端分离的开发的，并没有视图这些，一般都是handler中使用Response直接结果返回

> ①用户发送出请求到前端控制器DispatcherServlet
>
> ②DispatcherServlet收到请求调用HandlerMapping（处理器映射器）
>
> ③HandlerMapping找到具体的处理器，生成处理器对象及处理器拦截器(如果有)，再一起返回给DispatcherServlet。
>
> ④DispatcherServlet调用HandlerAdapter（处理器适配器）
>
> ⑤HandlerAdapter经过适配调用具体的处理器（Handler/Controller）
>
> ⑥方法上添加了@ResponseBody
>
> ⑦通过HttpMessageConverter来返回结果转换为JSON并响应

### 简单介绍SpringMVC的核心组件✔

- ` DispatcherServlet `SpringMvc核心组件，是请求的入口，负责协调各个组件工作，负责拦截所有进入应用程序的请求。
- ` Handler  `处理器
- ` HandlerMapping  `处理器映射器
- ` HandlerAdapter  ` 处理器的适配器  
- `ViewResolver`视图解析器

### `@RequestMapping`注解有什么用

- 配置处理器的HTTP 请求方法、url。。。
- 用在类上面或方法上面

### `@RestController` 和 `@Controller `有什么区别

- 提供了 Restful  Api，返回 JSON 数据格式

### `@RequestMapping `和 `@GetMapping`注解的不同之处在哪里

- 注解位置
- resultful Api

### `@RequestParam`和`@PathVariable`两个注解的区别

- `@RequestParam `参数从请求携带的参数中获取（xxx/index?name=zhansan&age=18）
- `@PathVariable`从请求的url中获取（xxx/findById/{3}）

### 返回 JSON 格式使用什么注解

- `@ResponseBody`
- `@RestController` 

### 什么是SpringMVC拦截器以及如何使用它✔❕

实现`org.springframework.web.servlet`包的`HandlerInteceptor`接口

- 1、`preHandle`在执行实际处理程序之前调用
- 2、`postHandle`在执行完实际程序之后调用
- 3、`afterCompletion`在完成请求后调用

### SpringMVC和Structs2的异同

- 1、入口不同
  - Servlet控制器
  - Filter过滤器

- 2、配置映射不同
  - 基于方法
  - 基于类

- 3、视图不同

### REST 代表着什么

- 抽象转移：根据http协议从客户端发送协议到服务端


### 什么是安全的 REST 操作

-  是否安全的界限，在于是否修改服务端的资源  

### REST API 是无状态的吗

- 是无状态的

### REST安全吗? 你能做什么来保护它  

- 通常不安全，需要开发任务自己实现安全机制

### 如何实现一个IOC容器  ❕

1、配置文件配置包扫描路径 

2、递归包扫描获取.class文件 

3、反射、确定需要交给IOC管理的类 

4、对需要注入的类进行依赖注入  

## SpringBoot

### 为什么要用SpringBoot✔

- 1、**快速创建**独立 Spring 应用<font color=red>**-简化开发**</font>
  - SSM：导包、写配置、启动运行
- 2、直接**嵌入**Tomcat、Jetty or Undertow（无需部署 war 包）【Servlet容器】<font color=red>**-简化部署**</font>
  - linux java tomcat mysql： war 放到 tomcat 的 webapps下
  - jar： java环境； java -jar
- 3、**重点**：提供可选的starter，简化应用**整合**<font color=red>**-简化整合**</font>
  - **场景启动器**（starter）：web、json、邮件、oss（对象存储）、异步、定时任务、缓存...
  - 导包一堆，控制好版本。
  - 为每一种场景准备了一个依赖； **web-starter。mybatis-starter**
- 4、**重点**：按需自动配置 Spring 以及第三方库<font color=red>**-简化配置**</font>
  - 如果这些场景我要使用（生效）。这个场景的所有配置都会自动配置好。
  - **约定大于配置**：每个场景都有很多默认配置。
  - 自定义：配置文件中修改几项就可以
- 5、提供生产级特性：如 监控指标、健康检查、外部化配置等<font color=red>**-简化监控、简化运维**</font>
  - 监控指标、健康检查（k8s）、外部化配置
- 无代码生成、无xml

总结：简化开发，简化配置，简化整合，简化部署，简化监控，简化运维。

### SpringBoot中约定优于配置的理解

- 约定优于配置是一种软件设计范式。

  **核心思想是减少开发人员对于配置项的维护，从而让开发人员更加聚集在业务逻辑上**

- SpringBoot就是约定优于配置这一理念下的产物，类似于Spring框架中的一个脚手架，通过SpringBoot可以**快速开发基于Spring生态下的应用程序** 

- 基于传统的Spring框架开发web应用，需要做很多和业务开发无关的并且只做一次的配置

  比如：**管理jar包依赖、web.xml维护、Dispatch-servlet.xml配置项的维护、应用部署到web容器、第三方Ioc容器中的配置项维护**

  在SpringBoot中不需要再次做这些繁琐的配置，SpringBoot已经完成

- 默认加载配置文件Application.yml等等

### SpringBoot中如何对不同环境的属性配置文件的支持

- `application.properties`文件中添加`spring.profiles.active=test`

### Spring Boot 的核心注解是那个？它主要由那几个注解组成的✔

- `@SpringBootApplication`这个注解标识了一个SpringBoot工程，实际上也是另外三个注解的组合
  - `@SpringBootConfiguration`配置文件（实际就是一个`@Configuration`，表示启动类也是一个配置类）
  - `@EnableAutoConfiguration`打开自动配置
  - `@ComponentScan`spring组件扫描

- `@Bean`注解：定义Bean，通过执行方法得到你的bean对象
- `@Controller`，`@Service`，`@ResponseBody`，`@Autowired`等

### 你如何理解SpringBoot中的Starters✔

- **启动器**

Spring Boot中的Starters是一种便捷的方式来引入常用的依赖项和配置。它们是预先配置好的Maven或Gradle依赖项，可以帮助我们快速启动和构建特定功能的应用程序。

Starters的设计目的是简化Spring Boot应用程序的配置和集成流程。通过引入适当的Starter，可以自动配置所需的依赖项、类和配置，并且不需要手动编写大量的配置代码。

每个Starter都针对不同的功能模块，例如Web开发、数据访问、安全性等，它们都有自己的命名规范，通常以"spring-boot-starter-"开头，后面跟着模块名称。例如，"spring-boot-starter-web"用于启动一个Web应用程序，它会自动配置Spring MVC、Tomcat服务器和其他相关依赖项。

使用Starters非常简单，只需在项目的构建文件（如pom.xml）中添加相应的Starter依赖项即可。Spring Boot会根据启动器的依赖关系自动处理版本兼容性，并自动配置所需的组件。

总之，**Spring Boot的Starters提供了一种方便快捷的方式，以模块化和自动化的方式引入常用功能的依赖项和配置，使得开发人员能够更加专注于业务逻辑的实现，而不需要过多关注底层配置和依赖项的集成**。

### SpringBoot Starter的工作原理是什么❕

- 1、读取配置信息
- 2、对资源进行初始化
- 3、直接注入对应的bean资源

> Spring Boot Starter的工作原理主要基于自动配置和条件化加载。
>
> 首先，每个Spring Boot Starter都包含一个自动配置（Auto-configuration）类。这些自动配置类使用Spring的条件化注解（@Conditional）根据类路径上存在的依赖项自动配置应用程序。例如，如果类路径上存在Tomcat依赖项，那么自动配置将启用内嵌Tomcat服务器。
>
> 其次，每个Starter还包含一个Spring.factories文件，其中列出了该Starter提供的自动配置类。这样，当引入某个Starter时，Spring Boot会自动扫描并加载相应的自动配置类。
>
> 在应用程序启动时，Spring Boot会根据classpath上的Starter依赖项和相关条件来决定是否应用某个自动配置。如果满足自动配置的条件，Spring Boot将自动为应用程序配置相关的组件、bean和属性。
>
> 此外，Spring Boot还提供了@ConfigurationProperties注解，可以将自动配置的属性绑定到特定的配置类上。这允许开发者通过配置文件或其他方式轻松地自定义应用程序的行为。
>
> 总体而言，Spring Boot Starter的工作原理是通过自动配置和条件化加载来简化应用程序的配置。它根据类路径上的依赖项和条件判断来决定是否应用特定的自动配置，并自动为应用程序提供所需的组件和属性。这大大简化了应用程序的配置和集成过程，提高了开发效率。

### 保护SpringBoot应用有哪些方法

- 生成中使用HTTPS
- 升级到最新版本
- 使用Snyk检查你的依赖关系
- 启用CSRF保护
- 使用内容安全策略防止XSS攻击

### Spring、SpringBoot和SpringCloud的关系

- Spring古老框架，可以解决企业开发中大部分问题
  - IOC容器，管理bean，使用依赖注入实现控制反转
  - 补充：SpringMVC是Spring对web框架的一个解决方案

- SpringBoot是为了简化Spring的开发
  - 快速开发应用，简化配置

- SpringCloud是简化了分布式系统的开发，基于Springboot开发的，解决微服务治理的框架

### springboot是如何管理版本依赖的

- springboot底层使用maven管理依赖，通过控制pom.xml父子关系来完成细节配置，在父pom中定义具体框架和版本号以及额外的信息。
- 提供了很多场景的spring-boot-starter 的 pom.xml文件，来标准化的引入依赖避免冲突

### SpringBoot自动配置机制❕

**初步理解**

- **自动配置**的 Tomcat、SpringMVC 等

- - **导入场景**，容器中就会自动配置好这个场景的核心组件。
  - 以前：DispatcherServlet、ViewResolver、CharacterEncodingFilter....
  - 现在：自动配置好的这些组件
  - 验证：**容器中有了什么组件，就具有什么功能**

```java
    public static void main(String[] args) {

        //java10： 局部变量类型的自动推断
        var ioc = SpringApplication.run(MainApplication.class, args);

        //1、获取容器中所有组件的名字
        String[] names = ioc.getBeanDefinitionNames();
        //2、挨个遍历：
        // dispatcherServlet、beanNameViewResolver、characterEncodingFilter、multipartResolver
        // SpringBoot把以前配置的核心组件现在都给我们自动配置好了。
        for (String name : names) {
            System.out.println(name);
        }

    }
```

- **默认的包扫描规则**

- - `@SpringBootApplication` 标注的类就是主程序类
  - **SpringBoot只会扫描主程序所在的包及其下面的子包，自动的component-scan功能**
  - **自定义扫描路径**

- - - @SpringBootApplication(scanBasePackages = "com.lxy25122")
    - `@ComponentScan("com.lxy25122")` 直接指定扫描的路径

- **配置默认值**

- - **配置文件**的所有配置项是和某个**类的对象**值进行一一绑定的。
  - 绑定了配置文件中每一项值的类： **属性类**。
  - 比如：

- - - `ServerProperties`绑定了所有Tomcat服务器有关的配置
    - `MultipartProperties`绑定了所有文件上传相关的配置
    - ....参照[官方文档](https://docs.spring.io/spring-boot/docs/current/reference/html/application-properties.html#appendix.application-properties.server)：或者参照 绑定的  **属性类**。

- 按需加载自动配置

- - 导入场景`spring-boot-starter-web`
  - 场景启动器除了会导入相关功能依赖，导入一个`spring-boot-starter`，是所有`starter`的`starter`，基础核心starter
  - `spring-boot-starter`导入了一个包 `spring-boot-autoconfigure`。包里面都是各种场景的`AutoConfiguration`**自动配置类**
  - 虽然全场景的自动配置都在 `spring-boot-autoconfigure`这个包，但是不是全都开启的。

- - - 导入哪个场景就开启哪个自动配置

总结： 导入场景启动器、触发 `spring-boot-autoconfigure`这个包的自动配置生效、容器中就会具有相关场景的功能



### Springboot自动配置原理✔

在Spring Boot项目中的引导类上有一个注解@SpringBootApplication，这个注解是对三个注解进行了封装，分别是：

- @SpringBootConfiguration 
- @EnableAutoConfiguration 
- @ComponentScan

其中 @EnableAutoConfiguration 是实现自动化配置的核心注解。 

该注解通过 @Import 注解导入对应的配置选择器。关键的是内部就是读取了该项目和该项目引用的Jar包的classpath路径下METAINF/spring.factories文件中的所配置的类的全类名

在这些配置类中所定义的Bean会根据条件注解所指定的条件来决定是否需要将其导入到Spring容器中。

一般条件判断会有像 @ConditionalOnClass 这样的注解，判断是否有对应的 class文件，如果有则加载该类，把这个配置类的所有的Bean放入spring容器中使用。

> 1. **所加载使用的jar包 如果是比较常见的，spring都提供了默认配置，也就是不像以前一样需要把框架的每一个属性都要配置一遍，主要目的是简化开发**
> 2. springboot 通过在启动类上添加注解 @SpringBootApplication 完成自动配置
> 3. 内部完成了读取每个jar包下的`META-INF/spring.factories`和spring-boot-autoconfigure-2.6.7.jar中的默认配置

**什么是起步依赖**

指的是各种starter重点是pom.xml,其中包含了框架所需要的其他依赖以及默认配置文件，不需要我们手动配置了。

### SpringBoot如何解决跨域问题✔

跨域指的是浏览器在执行网页中的JavaScript代码的时候，由于浏览器的同源策略的一个限制，只能访问同源的资源

http://192.168.137.60:8080

协议、域名、端口号，只要有一项不同，就能够造成跨域问题

解决跨域就是在不破坏同源策略的情况下，能够安全地实现数据共享和交互

在 Spring  Boot 中跨域问题有很多种解决方案，Cors是在服务器后端解决跨域的方案

1、使用`@CrossOrigin`注解实现跨域，可以用在类和方法上面

```java
@CrossOrigin(origins = "http://localhost:8090")
//origins指运行那些origins允许跨域，也可直接@CrossOrigin
```

2、通过配置文件，实现`WebMvcConfigurer `接口，重写`addCorsMappings`方法，配置允许跨域的请求源

### Spring Boot是如何启动Tomcat的

Spring Boot使用嵌入式容器来启动Tomcat服务器。具体来说，它使用Tomcat的嵌入式容器类`Tomcat`来启动和管理Tomcat服务器。

1、当你运行一个Spring Boot应用程序时，Spring Boot会自动检测你的项目依赖，并根据这些依赖配置和启动嵌入式的Tomcat服务器。

2、Spring Boot会在classpath中查找`org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory`类并创建一个`TomcatServletWebServerFactory`对象。然后，它会设置Tomcat服务器的一些属性，例如端口号、上下文路径等。

3、接下来，Spring Boot会注册所需的Servlet、Filter和Listener，并将它们添加到Tomcat服务器的`StandardContext`中。然后，它会调用`Tomcat.start()`方法来启动Tomcat服务器。

4、一旦Tomcat服务器启动成功，它就会监听指定的端口，等待客户端请求。当有请求到达时，Tomcat会根据配置的Servlet映射将请求分发给相应的Servlet进行处理。

**总结起来，Spring Boot通过配置嵌入式的Tomcat容器来启动和管理Tomcat服务器，使得开发者无需手动部署和配置Tomcat服务器，简化了应用程序的部署和开发过程。**

### Spring Boot中配置文件的加载顺序是怎样的❕

- 1、命令行参数
- 2、系统属性
- 3、系统环境变量
- 4、配置文件

### Spring 的常见注解有哪些✔

第一类是：声明bean，有@Component、@Service、@Repository、 @Controller 

第二类是：依赖注入相关的，有@Autowired、@Qualifier、@Resourse 

第三类是：设置作用域 @Scope 

第四类是：spring配置相关的，比如@Configuration，@ComponentScan 和 @Bean 

第五类是：跟aop相关做增强的注解 @Aspect，@Before，@After， @Around，@Pointcut

### SpringMVC常见的注解有哪些✔

@RequestMapping：用于映射请求路径； 

@RequestBody：注解实现接收http请求的json数据，将json转换为java对象； 

@RequestParam：指定请求参数的名称； 

@PathViriable：从请求路径下中获取请求参数(/user/{id})，传递给方法的形式参数；

@ResponseBody：注解实现将controller方法返回对象转化为json 对象响应给客户端。

@RequestHeader：获取指定的请求头数据，

还有像 @PostMapping、@GetMapping这些。

### Springboot常见注解有哪些✔

Spring Boot的核心注解是@SpringBootApplication , 他由几个注解组成 : 

- @SpringBootConfiguration： 组合了- @Configuration注解，实现配置文件的功能； 
- @EnableAutoConfiguration：打开自动配置的功能，也可以关闭某个自动配置的选项 
- @ComponentScan：Spring组件扫描

## Mybatis

### Mybatis是什么

- 简化SQL开发，内部封装jdbc，加载驱动，创建连接等，可以通过xml或者注解的方式配置映射信息

### Mybatis的优缺点✔❕

- **优点**：
  - 1）基于SQL语句编程，灵活
  - 2）解除SQL与代码的耦合，统一管理
  - 3）相比jdbc，减少50%以上的代码量
  - 4）**与各种数据库兼容**
  - 5）集成Spring框架
  - 6）**提供映射标签（实体类对象与数据库中的字段）**

- **缺点**：
  - 1）SQL编写工作量大（配置ORM字段映射等）
  - 2）SQL语句依赖于数据库，可移植性差


### 为什么说Mybatis是半自动ORM映射工具？它与全自动的区别在哪里

- 需要手动编写SQL

### Hibernate和MyBatis的区别✔

- **相同点**：都是对jdbc的封装，持久层的框架，dao层的开发
- **不同点**：
  - 映射关系
  - **SQL优化**
  - 开发难易程度和学习成本


MyBatis 是一个小巧、方便、高效、简单、直接、半自动化的持久层框架， 

Hibernate 是一个强大、方便、高效、复杂、间接、全自动化的持久层框架。  

### JDBC编程有哪些不足之处，Mybatis是如何解决这些问题的❕

- 1、JDBC：配置数据连接池，创建、释放造成资源浪费，影响系统性能
  - MyBatis：在sqlMapConfig中配置数据连接池，方便管理
- 2、JDBC：SQL语句在代码中，不易维护，SQL变动需要改变java代码
  - MyBatis：将SQL与java代码分离，卸载xml文件中
- 3、JDBC：**SQL传参麻烦，需要占位符一一对应**
  - MyBatis：mybatis自动将java对象映射到SQL语句
- 4、JDBC：**数据库与java对象映射麻烦，解析需要遍历**
  - MyBatis：Mybatis自动将SQL执行结果映射至java对象


### Mybatis编程步骤是什么样的

- 1、`SqlSessionFactory ` 
- 2、`SqlSession`
- 3、执行数据库操作
- 4、提交事务`sessuib.commit()`
- 5、关闭会话`session.close()`

### Mybatis的优点

- 1）基于SQL语句编程，灵活
- 2）解除SQL与代码的耦合，统一管理
- 3）相比jdbc，减少50%以上的代码量
- 4）**与各种数据库兼容**
- 5）集成Spring框架
- 6）**提供映射标签（实体类对象与数据库中的字段）**

### Mybatis框架的缺点

- 1）可移植性差
- 2）SQL编写工作量大

### Mybatis是如何进行分页的✔

1、直接在`select`语句上增加数据库提供的分页关键字，然后在应用程序里面传递当前页，以及每页展示条数即可

```sql
select id,name from studnet limit 2,10;#从第3条开始查，查询10行数据
select id,name from student limit 5;#查询前5行数据
select id,name from student limit 3 offset 6;#从第7条开始查，查询3条数据

-----------------------------------------
int pageSize = 10;#每页条数 10
int currentPage = 3;#当前页 3
int offset = (currentPage - 1) * pageSize; #从第？条开始查询
String sql = "SELECT * FROM user LIMIT " + offset + "," + pageSize; #从第21条开始查，查询10条数据
```

2、使用Mybatis提供的`RowBounds`对象，实现内存级别分页

```java
public interface UserMapper {
    List<User> selectAllUsers(RowBounds rowBounds);
}
//-------------------------------------
SqlSession sqlSession = sqlSessionFactory.openSession();
UserMapper userMapper = sqlSession.getMapper(UserMapper.class);

int pageSize = 10;
int currentPage = 3;
int offset = (currentPage - 1) * pageSize;
RowBounds rowBounds = new RowBounds(offset, pageSize);

List<User> users = userMapper.selectAllUsers(rowBounds);
```

3、基于Mybatis里面的`Interecptor`拦截器，在`select`语句执行之前，动态去拼接分页的关键字	

```java
@Intercepts({
    @Signature(type = StatementHandler.class, method = "query", args = {Statement.class, ResultHandler.class})
})
public class PaginationInterceptor implements Interceptor {

    @Override
    public Object intercept(Invocation invocation) throws Throwable {
        StatementHandler statementHandler = (StatementHandler) invocation.getTarget();
        MetaObject metaObject = SystemMetaObject.forObject(statementHandler);
        MappedStatement mappedStatement = (MappedStatement) metaObject.getValue("delegate.mappedStatement");

        // 判断是否需要进行分页操作
        if (!isPaginationStatement(mappedStatement)) {
            return invocation.proceed();
        }

        BoundSql boundSql = statementHandler.getBoundSql();
        String originalSql = boundSql.getSql();

        // 进行分页操作
        int pageSize = 10;
        int currentPage = 3;
        int offset = (currentPage - 1) * pageSize;
        String paginationSql = buildPaginationSql(originalSql, offset, pageSize);

        // 修改原始的SQL语句
        metaObject.setValue("delegate.boundSql.sql", paginationSql);

        return invocation.proceed();
    }

    private boolean isPaginationStatement(MappedStatement mappedStatement) {
        // 在此处判断是否需要进行分页操作，例如根据mappedStatement的ID或方法名、注解等进行判断
        ...
    }

    private String buildPaginationSql(String originalSql, int offset, int pageSize) {
        // 在此处拼接分页关键字，例如MySQL的limit语句
        return originalSql + " LIMIT " + pageSize + " OFFSET " + offset;
    }
}

```

在Mybatis配置文件中声明该拦截器

```xml
<configuration>
    ...
    <plugins>
        <plugin interceptor="com.example.PaginationInterceptor"/>
    </plugins>
    ...
</configuration>

```

4、使用PageHelper进行分页，PageHelper是一个通用的分页插件，它能够与MyBatis框架无缝集成，提供了方便、灵活的分页查询支持。

1）引入PageHelper依赖：在Maven或Gradle中引入PageHelper的依赖，以便在项目中使用它。

2）配置PageHelper插件：在MyBatis的配置文件（通常是`mybatis-config.xml`）中配置PageHelper插件。示例配置如下：

```xml
<plugins>
    <plugin interceptor="com.github.pagehelper.PageInterceptor">
        <property name="helperDialect" value="your-database-dialect"/>
    </plugin>
</plugins>
```

其中，`your-database-dialect`需要替换为你所使用的数据库方言，例如MySQL、Oracle等。

3）在代码中使用PageHelper：在需要进行分页查询的地方，调用`PageHelper.startPage(pageNum, pageSize)`方法来开启分页功能。`pageNum`表示当前页码，`pageSize`表示每页显示的记录数。例如：

```java
int pageNum = 1; // 当前页码，从1开始
int pageSize = 10; // 每页显示的记录数

PageHelper.startPage(pageNum, pageSize);
List<User> userList = userMapper.getUsers(); // 调用查询方法
```

在调用`startPage`方法后，后续的查询操作会自动被分页，返回的结果会被封装到`PageInfo`对象中。

4）获取分页结果：使用`PageInfo`对象来获取分页查询的结果信息，例如总记录数、当前页码、总页数等。你可以通过`PageInfo`对象的方法来获取这些信息，并从中提取出需要的数据。例如：

```java
PageInfo<User> pageInfo = new PageInfo<>(userList);
long total = pageInfo.getTotal(); // 总记录数
int currentPage = pageInfo.getPageNum(); // 当前页码
int totalPages = pageInfo.getPages(); // 总页数
// 其他操作...
```

### Mybatis中#{}和${}的区别✔

Mybatis里面提供了`#{}`，`${}`两种占位符，都是去实现动态SQL的一种方式，可以把参数传递给XML里面，在传递之前会对这两种占位符进行动态解析

- 1、**`#{}`预编译处理，是占位符，预编译处理？？？**

  - 将SQL中的`#{}`替换为`?`，调用PrepareStatement来赋值

  ![image-20231003100345215](https://gitee.com/tjlxy/img/raw/master/image-20231003100345215.png)

  - 等同于JDBC里面的一个`?`占位符，相当于向`PreparedStatement`里面的预处理语句设置参数，而`PreparedStatement`是预编译的，规定了这样的一个结构，设置参数时候，有特殊字符会自动转义，防止SQL注入

- 2、**`${}`拼接符，字符串替换，没有预编译处理**

  - 替换为变量的值，调用Statement来赋值

  ![image-20231003100634783](https://gitee.com/tjlxy/img/raw/master/image-20231003100634783.png)

  - 使用 `${}`传参，相当于之间把参数拼接到原始SQL里面，Mybatis不会对它进行特殊处理，

- 最大区别就是，`#{}`是占位符，`${}`是动态参数，动态参数无法防止SQL注入

> `#{}`用于预编译SQL语句，可以防止SQL注入攻击，同时也可以将传入的参数自动进行类型转换。预编译后的SQL语句会使用占位符代替传入的参数值，例如：
>
> ```xml
> <select id="getUserById" resultType="User">
>     SELECT * FROM user WHERE id = #{userId}
> </select>
> ```
>
> 在上面的示例中，`#{}`标识了一个参数占位符，MyBatis会将其替换为一个问号（`?`），然后将传入的参数值设置到预编译的SQL语句中。这种方式可以有效地避免SQL注入攻击，同时也可以将传入参数的类型自动转换为SQL语句所需的类型。
>
> `${}`则用于直接替换SQL语句中的参数占位符，不会进行预编译或转义处理，传入的参数值直接拼接到SQL语句中。例如：
>
> ```xml
> <select id="getUserByName" resultType="User">
>     SELECT * FROM user WHERE name = '${userName}'
> </select>
> ```
>
> 在上面的示例中，`${}`会将传入的参数值直接拼接到SQL语句中，如果传入的参数值中包含特殊字符，可能会导致SQL注入攻击。因此，在使用`${}`时需要特别注意，应该避免直接使用用户输入的参数值作为SQL语句的一部分。
>
> 举个例子，假设我们要查询所有年龄大于传入参数值的用户信息，如果使用`#{}`和`${}`来实现，分别如下：
>
> ```xml
> <!-- 使用#{}完成参数预编译 -->
> <select id="getUsersByAge" resultType="User">
>     SELECT * FROM user WHERE age > #{age}
> </select>
> 
> <!-- 使用${}直接替换参数 -->
> <select id="getUsersByAge" resultType="User">
>     SELECT * FROM user WHERE age > ${age}
> </select>
> ```
>
> 在上面的示例中，第一个示例使用了`#{}`来进行参数预编译，可以避免SQL注入攻击，也可以将传入参数的类型自动转换为SQL语句所需的类型。而第二个示例则直接使用了`${}`来替换参数，如果传入的参数值包含特殊字符，可能会导致SQL注入攻击，因此不太安全。

### 一个XML映射文件，都会写一个Dao接口与之对应，Dao接口的工作原理是什么？Dao接口里的方法、参数不同时，方法能重载吗

需要遵循以下规则

- 1、接口名称与Mapper映射文件的namespace相同。
- 2、接口中的方法名称与Mapper映射文件中定义的SQL语句的id一致，并且方法的返回值类型必须与SQL语句执行后所返回的结果集类型一致。
- 3、接口方法的参数列表必须与Mapper映射文件中定义的SQL语句所需要的参数一致，或者使用`@Param`注解来指定参数名称。

不能（ 接口全限名+方法名的拼接字符串作为key值  ）

### 在Mapper中如何传递多个参数

- xml中：`#{0}`代表接收的是Dao层的第一个参数`#{1}`代表Dao层的第二个参数。。
- 使用注解：dao层参数前加`@Param`注解
- 多个参数封装成Map集合

### Mybatis动态SQL有什么用？执行原理是什么？有哪些动态SQL

- 根据表达式的值完成逻辑判断，并动态拼接SQL的功能
- ` trim、where、set、foreach、if、choose、when、otherwise、bind  `

### XML映射文件中，不同的xml映射文件id是否可以重复

- `namespace+id`是作为Map<String,MapperStatement>的key使用，如果没有`namespace`，就剩下id，那么id重复会导致数据互相覆盖。

### Mybatis实现一对一有几种方式？具体是怎么操作的

- 联合查询
  - 多张表联合查询

- 嵌套查询
  - 先查一个表。在根据外键查另一个表

### Mybatis的一级、二级缓存（缓存机制）✔

Mybatis里面设计了二级缓存来提升数据的一个检索效率，避免每一次数据的检索都去查询数据库，一级缓存是`SqlSession`级别的一个缓存，也叫本地缓存，因为每一个用户在执行查询的时候，都需要使用`SqlSession`来执行，为了避免每一次都去查询数据库，Mybatis把查询出来的数据库缓存到`SqlSession`的本地缓存里面，后续Sql如果在命中缓存的情况下，就可以直接到本地缓存去读取这样的一个数据，如果想要实现跨`SqlSession`级别的一个缓存，一级缓存是无法做到的，因此引入了二级缓存，当多个用户在进行查询数据的时候，只要有任何一个`SqlSession`拿到了数据，就会放入到二级缓存里面，那么其他`SqlSession`就可以直接从二级缓存里面去加载数据。

- 一级缓存：作用域session，当flush、close后，cache将清空，默认打开一级缓存
  
- 二级缓存：HashMap存储，作用域为Mapper（namespace），


> mybatis的一级缓存: 基于 PerpetualCache 的 HashMap 本地缓存，其存储作用域为 Session，当Session进行flush或close之后，该Session中的所有Cache 就将清空，默认打开一级缓存
>
> 关于二级缓存需要单独开启 
>
> 二级缓存是基于namespace和mapper的作用域起作用的，不是依赖于SQL session，默认也是采用 PerpetualCache，HashMap 存储。 
>
> 如果想要开启二级缓存需要在全局配置文件和映射文件中开启配置才行。

### Mybatis的二级缓存什么时候会清理缓存中的数据✔

当某一个作用域(一级缓存 Session/二级缓存Namespaces)的进行了**新增、修改、删除操作**后，默认该作用域下所有 select 中的缓存将被 clear

### 使用Mybatis的Mapping接口调用时有哪些要求

- 接口方法名和xml文件中id相同
- 接口方法的输入参数类型和xml文件中ParameterType类型相同
- 接口方法的输出参数类型和xml文件中resultType类型相同
- namespace是mapper接口的类路径

### Mybatis的执行流程✔❕

①读取MyBatis配置文件：mybatis-config.xml加载运行环境和映射文件 

②构造会话工厂SqlSessionFactory，一个项目只需要一个，单例的，一般由 spring进行管理

③会话工厂创建SqlSession对象，这里面就含了执行SQL语句的所有方法 

④操作数据库的接口，Executor执行器，同时负责查询缓存的维护 

⑤Executor接口的执行方法中有一个MappedStatement类型的参数，封装了 映射信息 

⑥输入参数映射 

⑦输出结果映射

### Mybatis是否支持延迟加载✔

延迟加载的意思是：就是在需要用到数据时才进行加载，不需要用到数据时就不加载数据。 

Mybatis支持一对一关联对象和一对多关联集合对象的延迟加载 

在Mybatis配置文件中，可以配置是否启用延迟加载 

`lazyLoadingEnabled=true|false`，默认是关闭的

### 延迟加载的底层原理知道吗

延迟加载在底层主要使用的CGLIB动态代理完成的 

第一是，使用CGLIB创建目标对象的代理对象，这里的目标对象就是开启了延迟加载的mapper 

第二个是当调用目标方法时，进入拦截器invoke方法，发现目标方法是null 值，再执行sql查询 

第三个是获取数据以后，调用set方法设置属性值，再继续查询目标方法，就有值了

## 补充

### jsp的8个隐含对象有哪些

jsp本质上就是servlet

**1、pageContext**

类型：PageContext

代表：当前页面的上下文

作用：可以获取到页面中的其他隐含对象，同时它还是一个域对象。

**2、request**

类型：HttpServletRequest

代表：请求

作用：可以获取用户发送的请求信息，它也是一个域对象。

**3、session**

类型：HttpSession

代表：当前会话

作用：可以作为域对象，用来共享数据。

**4、application** 

类型：ServletContext

代表：代表整个WEB应用

作用：是JavaWeb中最大的域对象。

**5、response**

类型：HttpServletResponse

代表：响应

作用：向浏览器发送响应信息

**6、out**

类型：JspWriter

代表：输出流

作用：可以向页面输出内容

**7、config**

类型：ServletConfig

代表：当前JSP的配置信息

作用：可以获取到Servlet标签中初始化参数

**8、page**

类型：Object 在service方法中有如下代码 Object page = this;

代表：代表当前JSP的对象

**9、exception**

类型：Throwable

代表：异常信息

作用：获取页面中的异常

### JDBC连接数据库步骤

![image-20230922095746828](https://gitee.com/tjlxy/img/raw/master/image-20230922095746828.png)

### vue中的钩子函数

在 Vue.js 中，钩子函数指的是在组件生命周期中可以用来挂载自定义逻辑的一系列方法。这些钩子函数允许你在特定的生命周期阶段执行代码，以便在组件被创建、更新或销毁时实现一些特定的行为。

以下是 Vue.js 中常用的生命周期钩子函数：

- 1、**beforeCreate**: 在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用。
- 2、**created**: 实例已经创建完成之后被调用。在这一步，实例已完成以下的配置：数据观测 (data observer)，属性和方法的运算，watch/event 事件回调。然而，挂载阶段还没开始，$el 属性目前不可见。
- 3、**beforeMount**: 在挂载开始之前被调用：相关的 render 函数首次被调用。
- 4、**mounted**: el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。
- 5、**beforeUpdate**: 数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。
- 6、**updated**: 由于数据更改导致的虚拟 DOM 重新渲染和打补丁后调用。
- 7、**beforeDestroy**: 在实例销毁之前调用。实例仍然完全可用。
- 8、**destroyed**: 实例销毁后调用。该钩子被调用后，对应Vue实例的所有指令都被解绑，所有事件监听器被移除，所有子实例也会被销毁。

这些钩子函数允许开发者在组件生命周期的不同阶段注入自定义逻辑，以便进行数据处理、异步操作、DOM 操作等。通过合理地利用这些钩子函数，可以更好地控制组件的行为，实现更加复杂的交互和逻辑。

### Get请求与Post请求区别

1、参数传递方式不同

GET请求中，参数是通过URL传递的，即将参数以键值对的形式附加在URL后面，使用“?”分隔参数和URL，使用“&”连接多个参数。例如：http://www.example.com?name=John&age=22。由于URL的**长度存在限制**，GET请求传递的参数大小也存在一定限制。

而POST请求中，参数是通过HTTP请求体传递的，即将参数封装在HTTP请求体中发送给服务器。这种方式可以传递更多的参数，并且参数的大小没有限制。

2、安全性不同

因为GET请求中参数是通过URL传递的，所以参数会**暴露在URL**中，容易被第三方获取。

而POST请求中参数是放在请求体中的，相对来说比较安全。

3、缓存机制不同

因为GET请求的参数是以URL形式传递的，所以浏览器可以**缓存GET请求的结果**，下次再发起同样的请求时，直接从缓存中获取结果。

而POST请求不支持缓存机制。

4、适用场景不同

一般来说，GET请求**适合处理读取数据的操作**，如查询、搜索等；

而POST请求适合处理写入数据的操作，如表单提交、文件上传等。