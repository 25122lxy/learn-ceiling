# Java框架

## Spring 

### 1.使用Spring框架的好处是什么（为什么要用Spring框架）✔

- 轻量、控制反转、面向切面编程（AOP）、容器（IOC）、**MVC框架**、事务管理、异常处理

> - 控制反转(IoC=InversionofControl)IoC，用白话来讲，就是由容器控制程序之间的（依赖）关系，而非传统实现中，由程序代码直接操控。这也就是所谓“控制反转”的概念所在：(依赖)控制权由应用代码中转到了外部容器，控制权的转移，是所谓反转。
> - IoC还有一个另外的名字：“依赖注入(DI=DependencyInjection)”，即由容器动态的将某种依赖关系注入到组件之中

Spring是一个轻量级的应用框架，ta提供了IOC和AOP两个核心功能

它的核心目的：

- 简化企业级应用程序的开发

  使得开发者只需要关心业务需求，不需要关心Bean的管理

- 通过切面增强功能减少代码的侵入性

从Spring本身特性来看：

- 轻量级

  Spring是一个轻量级框架，它的基本的版本大约2MB

- IOC/DI

  Spring通过IOC容器来实现Bean的生命周期的管理以及通过DI来实现依赖注入，从而实现对向依赖的松耦合管理

- 面向切面编程（AOP）

  Spring支持面向切面编程，从而把应用业务逻辑和系统服务分开，

- MVC框架

  SpringMVC提供了功能更加强大且更加灵活的Web框架支持

- 事务管理

  Spring通过AOP实现了事务的统一管理，对应用开发中的事务处理提供了非常灵活的支持

- Spring从第一个版本发布到现在，整个生态已经非常庞大了，在业务开发领域，Spring生态几乎提供了非常完善的支持， 更重要的是社区的活跃度和技术成熟度都非常高

### 2.什么是SpringIOC容器✔

Spring容器使用依赖注入来管理组成应用程序的组件。

- 控制对象的创建，控制对象内属性的赋值（控制）
- 我们不需要手动创建对象，仅仅需要定义类和相关属性即可，加上注解，交给Spring帮我们创建对象及赋值（反转）
- 总结：IOC表示**控制反转**，表示如果用Spring，那么Spring会负责来创建对象，以及给对象内的属性赋值，也就是如果用Spring，那么对象的控制权会交给Spring

### 3.什么是依赖注入？可以通过多少种方式完成注入✔

- 依赖注入是指将依赖的对象实例交给spring帮我们注入管理，从而释放对对象的管理权，比如可以统一替换接口的实现，更高效的开发程序

  是指在程序运行过程中，需要对象协助时，无需在代码中创建对象，通过ioc容器将他们装配在一起

- 构造函数注入、setter注入、（接口）、@autowire 自动注入

### 4.区分BeanFactory和ApplicationContext✔❤

ApplicationContext是BeanFactory的子接口  

- `BeanFactory`
  - 使用懒加载、不支持国际化、不支持依赖注解、（使用语法显式提供资源对象）
  - 优点：启动时资源占用少
  - 缺点：运行速度相对较慢，可能存在空指针异常

- `ApplicationContext`
  - 即使加载、( 继承MessageSource)支持国际化、支持依赖注解、（自己创建和管理资源对象）
  - 优点：所有bean在启动时就进行了加载，系统运行的速度快；在启动时，可以发现系统中的配置问题
  - 缺点：所有对象进行了预加载，内存占用较大


### 5.区分构造函数注入和setter注入

| 构造函数注入                   | setter注入                     |
| ------------------------------ | ------------------------------ |
| 没有部分注入                   | 有部分注入                     |
| 不会覆盖setter属性             | 会覆盖setter属性               |
| **任意修改都会创建一个新实例** | **任意修改不会创建一个新实例** |
| **适用于设置很多属性**         | **适用于设置很少属性**         |

### 6.Spring提供了那些配置方式

- 基于xml配置
- 基于注解配置
- 基于JavaAPI配置`@Bean 和 @Configuration`

### 7.Spring中的bean的作用域有哪些（Spring支持几种beanscope）✔

- `singleton`唯一bean实例，Spring中bean默认都是单例的，每个容器只有一个bean的实例（单实例）
- `prototype`每次注入时都会创建一个新的对象（多实例）
- `request`每一次HTTP请求都会产生一个新的bean，该bean仅在当前HTTP request内有效。
- `session`在一个HTTP Session中，一个Bean定义对应一个实例。该作用域仅在基于web的Spring ApplicationContext情形下有效。
- `global-session`全局session作用域

 仅当用户使用支持 Web 的 ApplicationContext 时，最后三个才可用。  

### 8.如何理解IOC和DI

- “控制反转”
  - 不用自己创建实例对象，交给Spring的bean工厂帮我们创建管理

- “依赖注入”
  - 通过配置，由容器动态的将某个依赖关系注入到组件之中


### 9.将一个类声明为Spring的bean的注解有哪些

一般使用 @Autowired 注解自动装配 bean，要想把类标识成可用于 @Autowired 注解自动装配的 bean 的类,采用以下注解可实现：

- `@Compoent`标志为Spring组件，可标注任意类为 Spring 组件。如果一个Bean不知道属于哪个层，可以使用@Component 注解标注。
- `@Repository`持久层，主要用于数据库相关操作。
- `@Service`业务层，主要涉及一些复杂的逻辑，需要用到 Dao层
- `@Controller`SpringMVC控制层，主要用户接受用户请求并调用 Service 层返回数据给前端页面

### 11.Spring中的bean生命周期✔

- 创建前准备

  在加载之前要从上下文和一些配置中解析并通过`BeanDefinition`类**查找Bean的定义信息**，比如，类的全路径，是否是延迟加载，是否是单例等等这些信息 

- <font color=blue>创建实例化</font>

  调用**构造函数实例化bean**，得到对象

- <font color=blue>依赖注入（设置bean属性）</font>

  如果实例化的Bean存在依赖其他Bean对象的一些情况，则需要对这些依赖的Bean进行对象注入，比如一些set方法注入，像平时开发用的 @Autowire都是这一步完成 

- 实现Aware接口，设置依赖信息

  (BeanNameAware、BeanFactoryAware、ApplicationContextAware)，如果某一个bean实现了Aware接口就会重写方法执行 

- 初始化前，处理`@PostConstructor`注解，回调

  bean的后置处理器BeanPostProcessor，这个是前置处理器 

- <font color=blue>初始化，处理InitializingBean接口</font>

  初始化方法，比如实现了接口InitializingBean或者自定义了方法 init-method标签或@PostContruct 

- 容器缓存

  执行了bean的后置处理器BeanPostProcessor，主要是对bean进行增强，有可能在这里产生代理对象

- <font color=blue>销毁实例</font>

  可以调用destroy方法进行销毁，或自定义销毁方法

### 12.什么是Spring的内部bean

- 将`bean`用做另一个`bean`的属性

### 13.什么是Spring装配✔

- 当`bean`在`Spring`容器中组合在一起时，它被称为装配或`bean`装配（ autowire  ）

### 14.自动装配有什么局限？

- 覆盖的可能性
- 基本元数据类型
- 自动装配不太精确

### 15.Spring中出现同名bean怎么办

- 同一配置文件内，以最上面定义的为准
- 不同配置文件中存在的，后解析的配置文件会覆盖先解析的配置文件、
- 同文件中，`@bean`的会生效，【` @ComponentScan`扫描进来的优先级是最低的  】

### 16.Spring怎么解决循环依赖问题✔？

- 构造器的循环依赖（直接抛出）
- 单例模式下的setter循环依赖（三级缓存）
- 非单例循环依赖（无法处理）

### Spring中的循环引用✔

循环依赖：循环依赖其实就是循环引用,也就是两个或两个以上的bean互相持有对方,最终形成闭环。比如A依赖于B,B依赖于A 

循环依赖在spring中是允许存在，spring框架依据三级缓存已经解决了大部分的循环依赖

①一级缓存：单例池，缓存已经经历了完整的生命周期，已经初始化完成的 bean对象 

②二级缓存：缓存早期的bean对象（生命周期还没走完） 

③三级缓存：缓存的是ObjectFactory，表示对象工厂，用来创建某个对象的

### 循环依赖具体解决流程✔

第一，先实例A对象，同时会创建ObjectFactory对象存入三级缓存 singletonFactories  

第二，A在初始化的时候需要B对象，这个走B的创建的逻辑 

第三，B实例化完成，也会创建ObjectFactory对象存入三级缓存 singletonFactories  

第四，B需要注入A，通过三级缓存中获取ObjectFactory来生成一个A的对象同时存入二级缓存，这个是有两种情况，一个是可能是A的普通对象，另外一个是A的代理对象，都可以让ObjectFactory来生产对应的对象，这也是三级缓存的关键 

第五，B通过从通过二级缓存earlySingletonObjects 获得到A的对象后可以正常注入，B创建成功，存入一级缓存singletonObjects  

第六，回到A对象初始化，因为B对象已经创建完成，则可以直接注入B，A 创建成功存入一次缓存singletonObjects 

第七，二级缓存中的临时对象A清除

### 构造方法出现了循环依赖怎么解决✔

由于bean的生命周期中构造函数是第一个执行的，spring框架并不能解决构造函数的的依赖注入，可以使用@Lazy懒加载，什么时候需要对象再进行bean对象的创建

### 17.Spring中的单例bean的线程安全问题✔

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

### 18.什么是AOP✔

面向切面编程

- 将程序中的交叉业务逻辑封装成一个切面，然后注入到目标对象中，AOP可以对某个对象或某些对象的功能进行增强，比如对象中的方法需要扩扩展业务，可以在执行某个方法之前额外的做一些事情，在某个方法执行之后额外的做一些事情
- 将新的业务功能添加到已有的对象中，不影响原有业务

> aop是面向切面编程，在spring中用于将那些与业务无关，但却对多个对象产生影响的公共行为和逻辑，抽取公共模块复用，降低耦合，一般比如可以做为公共日志保存，事务处理等

### AOP的使用情景有哪些?简述其实现原理✔

1. **统一日志处理**

   

2. 统一异常处理

3. 访问限制（权限，限流等）

4. **事务处理**

   

5. 缓存管理等

6. aop是面向切面编程，通过代理的方式（jdk或cglib）为程序统一添加功能，解决公共问题

### 你们项目中有没有使用到AOP

> 我们当时在后台管理系统中，就是使用aop来记录了系统的操作日志主要思路是这样的，使用aop中的环绕通知+切点表达式，这个表达式就是要找到要记录日志的方法，然后通过环绕通知的参数获取请求方法的参数，比如类信息、方法信息、注解、请求方式等，获取到这些参数以后，保存到数据库

### 19.Aop有哪些实现方式

- 静态代理
  - 在编译阶段就可生成 AOP 代理类  

- 动态代理
  - 在运行时在内存中“临时”生成 AOP 动态代理类  


### 20.Spring Aop and AspectJ Aop有什么区别

- 动态代理方法实现
- 静态代理方法实现

### 21.Spring框架中用到了那些设计模式✔

- 工厂设计模式
- 代理设计模式
- 单例设计模式
- 模板方法模式
- 包装器设计模式
- 观察者模式
- 适配器模式

### 22.Spring事务实现方式有哪些（如何实现）✔

- 编程式事务管理

  这种方式需要在代码中显式地使用事务管理器来开始、提交或回滚事务。开发人员需要手动编写代码来管理事务的边界和异常处理。

- 声明式事务管理 `@Transactional注解就是声明式的。或xml配置事务  `

  这种方式通过将事务管理逻辑从业务逻辑中分离出来，在配置文件或使用注解的方式声明事务的属性。Spring提供了两种声明式事务管理的方法：基于XML的配置和基于注解的配置。

- 注解驱动事务。。

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

关键点：

1. 数据库事务
2. 编程式事务 beginTransaction、commit、rollback
3. 声明式事务 @Transactional

答:

1. 不能，在类上使用了@Transactional注解，默认开启了全局读写事务
2. 可以细粒度在方法上加注解

### 23.Spring框架的事务管理有哪些优点

- 提供了跨不同事务api 的一致编程模型
- 支持声明式事务管理
- 集成了Spring的各种访问抽象

### 24.Spring事务定义的传播规则✔

- PROPAGATION_REQUIRED: 支持当前事务，如果当前没有事务，就新建一个事务。这是最常见的选择。
- PROPAGATION_SUPPORTS: 支持当前事务，如果当前没有事务，就以非事务方式执行。
- PROPAGATION_MANDATORY: 支持当前事务，如果当前没有事务，就抛出异常。
- PROPAGATION_REQUIRES_NEW: 新建事务，如果当前存在事务，把当前事务挂起。
- PROPAGATION_NOT_SUPPORTED: 以非事务方式执行操作，如果当前存在事务，就把当前事务挂起。
- PROPAGATION_NEVER: 以非事务方式执行，如果当前存在事务，则抛出异常。
- PROPAGATION_NESTED:如果当前存在事务，则在嵌套事务内执行。如果当前没有事务，则进行与PROPAGATION_REQUIRED类似的操作。

### 25.SpringMVC工作原理了解吗✔

1. **请求到达前端控制器（DispatcherServlet）**：前端控制器是Spring MVC的核心组件。它是一个Servlet，负责拦截所有进入应用程序的请求。
2. **处理器映射器（Handler Mapping）**：前端控制器通过处理器映射器（Handler Mapping）确定请求对应的处理器（Handler）。
3. **处理器适配器（Handler Adapter）**：处理器适配器（Handler Adapter）负责将请求发送给处理器（Handler）并执行处理器中的业务逻辑。
4. **处理器执行业务逻辑**：在这一阶段，处理器（Handler）执行请求的业务逻辑，如处理表单提交、访问数据库等。
5. **模型和视图解析器（Model and View Resolver）**：处理器（Handler）通过模型（Model）存储处理结果的数据，并选择适当的视图（View）进行渲染。
6. **视图渲染**：视图（View）使用模型（Model）中的数据生成最终的响应内容，可以是HTML、JSON、XML等。
7. **响应返回给客户端**：前端控制器将生成的响应返回给客户端。

1、用户发送出请求到前端控制器（DispatcherServlet），这是一个调度中心 

2、前端控制器（DispatcherServlet）收到请求调用处理器映射器（Handler Mapping）。 

3、处理器映射器（Handler Mapping）找到具体的处理器（Handler）(可查找xml配置或注解配置)，生成处理器对象及处理器拦截器(如果有)，再一起返回给前端控制器（DispatcherServlet）。 

4、前端控制器（DispatcherServlet）调用处理器适配器（Handler Adapter）。 

5、处理器适配器（Handler Adapter）经过适配调用具体的处理器（Handler/Controller）。 

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

### 26.简单介绍SpringMVC的核心组件✔

- ` DispatcherServlet `SpringMvc核心组件，是请求的入口，负责协调各个组件工作
- ` Handler  `处理器
- ` HandlerMapping  `处理器映射器
- ` HandlerAdapter  ` 处理器的适配器  
- `ViewResolver`视图解析器

### 27.`@Controller`注解有什么用

- 标记一个类为Spring Web MVC 控制器 Controller

### 28.`@RequestMapping`注解有什么用

- 配置处理器的HTTP 请求方法、url。。。
- 用在类上面或方法上面

### 29.@RestController 和 @Controller 有什么区别

- 提供了 Restful  Api，返回 JSON 数据格式

### 30.@RequestMapping 和 @GetMapping 注解的不同之处在哪里

- 注解位置
- resultful Api

### 31.`@RequestParam`和`@PathVariable`两个注解的区别

- `@RequestParam `参数从请求携带的参数中获取
- `@PathVariable`从请求的url中获取

### 32.返回 JSON 格式使用什么注解

- `@ResponseBody`
- `@RestController` 

### 33.什么是SpringMVC拦截器以及如何使用它✔

实现`org.springframework.web.servlet`包的`HandlerInteceptor`接口

- `preHandle`在执行实际处理程序之前调用
- `postHandle`在执行完实际程序之后调用
- `afterCompletion`在完成请求后调用

### 34.SpringMVC和Structs2的异同

- 入口不同
  - Servlet控制器
  - Filter过滤器

- 配置映射不同
  - 基于方法
  - 基于类

- 视图不同

### 35. REST 代表着什么

- 抽象转移
  - 根据http协议从客户端发送协议到服务端


### 36. 什么是安全的 REST 操作

-  是否安全的界限，在于是否修改服务端的资源  

### 37. REST API 是无状态的吗

- 是无状态的

### 38. REST安全吗? 你能做什么来保护它  

- 通常不安全，需要开发任务自己实现安全机制

### 39.为什么要用SpringBoot✔

- 自动装配，零配置。无冗余代码生成和XML 强制配置，遵循“约定大于配置” 。
- 创建项目时，可以选择需要的依赖关系
- 可以打成jar文件，部署到服务器上
- **内嵌Tomcat服务器，独立运行**
- 无须准备各种独立的JAR文件，引入相关依赖即可
- 集成Spring框架，方便与其他框架整合，Spring Boot 应用为这些第三方库提供了几乎可以零配置的开箱即用的能力。

---

- **快速创建**独立 Spring 应用
  - SSM：导包、写配置、启动运行

- 直接**嵌入**Tomcat、Jetty or Undertow（无需部署 war 包）【Servlet容器】
  - linux  java tomcat mysql： war 放到 tomcat 的 webapps下
  - jar： java环境；  java -jar

- **重点**：提供可选的starter，简化应用**整合**
  - **场景启动器**（starter）：web、json、邮件、oss（对象存储）、异步、定时任务、缓存...
  - 导包一堆，控制好版本。
  - 为每一种场景准备了一个依赖； **web-starter。mybatis-starter**

- **重点**：按需自动配置 Spring 以及 第三方库
  - 如果这些场景我要使用（生效）。这个场景的所有配置都会自动配置好。
  - **约定大于配置**：每个场景都有很多默认配置。
  - 自定义：配置文件中修改几项就可以

- 提供生产级特性：如 监控指标、健康检查、外部化配置等
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

### 40.SpringBoot中如何对不同环境的属性配置文件的支持

- `application.properties`文件中添加`spring.profiles.active=test`

### 41.Spring Boot 的核心注解是那个？它主要由那几个注解组成的✔

- `@SpringBootApplication`这个注解标识了一个SpringBoot工程，实际上也是另外三个注解的组合
  - `@SpringBootConfiguration`配置文件（实际就是一个`@Configuration`，表示启动类也是一个配置类）
  - `@EnableAutoConfiguration`打开自动配置
  - `@ComponentScan`spring组件扫描

- `@Bean`注解：定义Bean，通过执行方法得到你的bean对象
- `@Controller`，`@Service`，`@ResponseBody`，`@Autowired`等

### 42.你如何理解SpringBoot中的Starters✔

- 启动器

### 43.SpringBoot Starter的工作原理是什么

- 读取配置信息
- 对资源进行初始化
- 直接注入对应的bean资源

### 44.保护SpringBoot应用有哪些方法

- 生成中使用HTTPS
- 升级到最新版本
- 使用Snyk检查你的依赖关系
- 启用CSRF保护
- 使用内容安全策略防止XSS攻击

### 45.Spring、SpringBoot和SpringCloud的关系

- Spring古老框架，可以解决企业开发中大部分问题
  - IOC容器，管理bean，使用依赖注入实现控制反转
  - 补充：SpringMVC是Spring对web框架的一个解决方案

- SpringBoot是为了简化Spring的开发
  - 快速开发应用，简化配置

- SpringCloud是简化了分布式系统的开发，基于Springboot开发的，解决微服务治理的框架

### springboot是如何管理版本依赖的

关键点：

1.maven

2.springboot pom.xml 父子关系

3.spring-boot-starter

答：

1. springboot底层使用maven管理依赖，通过控制pom.xml父子关系来完成细节配置，在父pom中定义具体框架和版本号以及额外的信息。
2. 提供了很多场景的spring-boot-starter 的 pom.xml文件，来标准化的引入依赖避免冲突

### SpringBoot自动配置机制

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

- - - @SpringBootApplication(scanBasePackages = "com.atguigu")
    - `@ComponentScan("com.atguigu")` 直接指定扫描的路径

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

在这些配置类中所定义的Bean会根据条 件注解所指定的条件来决定是否需要将其导入到Spring容器中。

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

### 如何实现一个IOC容器  

1、配置文件配置包扫描路径 

2、递归包扫描获取.class文件 

3、反射、确定需要交给IOC管理的类 

4、对需要注入的类进行依赖注入  

### Spring单例bean和单例模式

- 单例模式表示JVM中某个类的对象只会存在唯一一个
- 而单例bean并不表示JVM中只能存在唯一的某个类的bean对象

### Spring事务什么时候会失效（Spring中事务失效的场景有哪些）✔

- 发生自调用，类⾥⾯使⽤this调⽤本类的⽅法（this通常省略），此时这个this对象不是代理类，⽽是UserService对象本身！
- 方法本身public：@Transactional 只能⽤于 public 的⽅法上，否则事务不会失效，如果要⽤在⾮ public ⽅法上，可以开启 AspectJ 代理模式。
- 数据库不支持事务
- 没有被Spring管理
- 异常被吃掉，事务不会回滚(或者抛出的异常没有被定义，默认为RuntimeException)

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

- 从⼤⼩与开销两⽅⾯⽽⾔Spring都是轻量级的。 
- 通过控制反转(IoC)的技术达到松耦合的⽬的提供了⾯向切⾯编程的丰富⽀持，允许通过分离应⽤的业务逻辑与系统级服务进⾏内聚性的开发 
- 包含并管理应⽤对象(Bean)的配置和⽣命周期，这个意义上是⼀个容器。 
- 将简单的组件配置、组合成为复杂的应⽤，这个意义上是⼀个框架。  

### Spring Boot是如何启动Tomcat的  

### Spring Boot中配置⽂件的加载顺序是怎样的

- 命令行参数
- 系统属性
- 系统环境变量
- 配置文件

### @Component和@Bean区别✔

@Component注解是一个通用注解，可以用在任何类上，包括普通的Java类、业务逻辑组件、持续化对象等，通过Component注解，**Spring会自动去创建该类的实例注入到SpringIOC容器中**

@Bean注解是用于配置类中声明一个Bean的，通常用在配置类的方法上面，表示把这个方法的返回对象注册到SpringIOC容器中，通过Bean注解，**可以自定义Bean的创建和初始化过程，包括指定Bean的名称、作用域、依赖关系等**，

- 用途不同
  - @Component注解的用于标识一个普通的类
  - @Bean注解是在配置类中声明和配置Bean对象
- 使用方式不同
  - @Component注解是一个类级别的注解，Spring通过@ComponetsScan注解扫描并注册为Bean（SpringIOC容器中）
  - @Bean注解是修饰在方法层面，在配置类中手动声明一个Bean的定义
- 控制权不同
  - @Component注解修饰的类是由Spring框架来创建和初始化的
  - @Bean注解运行开发人员手动控制Bean 的创建和配置过程（更加灵活）

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

### 1.Mybatis是什么

- 简化SQL开发，内部封装jdbc，加载驱动，创建连接等，可以通过xml或者注解的方式配置映射信息

### 2.Mybatis的优缺点✔

- 优点
  - 基于SQL语句编程，灵活
  - 解除SQL与代码的耦合，统一管理
  - 相比jdbc，减少50%以上的代码量
  - **与各种数据库兼容**
  - 集成Spring框架
  - **提供映射标签（实体类对象与数据库中的字段）**

- 缺点
  - SQL编写工作量大（配置ORM字段映射等）
  - SQL语句依赖于数据库，可移植性差


### 3.为什么说Mybatis是半自动ORM映射工具？它与全自动的区别在哪里

- 需要手动编写SQL

### 4.Hibernate和MyBatis的区别✔

- 相同点：都是对jdbc的封装，持久层的框架，dao层的开发
- 不同点
  - 映射关系
  - **SQL优化**
  - 开发难易程度和学习成本


MyBatis 是一个小巧、方便、高效、简单、直接、半自动化的持久层框架， 

Hibernate 是一个强大、方便、高效、复杂、间接、全自动化的持久层框架。  

### 5.JDBC编程有哪些不足之处，Mybatis是如何解决这些问题的

- 配置数据连接池，创建、释放造成资源浪费，影响系统性能
  - 在sqlMapConfig中配置数据连接池，方便管理

- SQL语句在代码中，不易维护，SQL变动需要改变java代码
  - 将SQL与java代码分离，卸载xml文件中

- **SQL传参麻烦，需要占位符一一对应**
  - mybatis自动将java对象映射到SQL语句

- **数据库与java对象映射麻烦，解析需要遍历**
  - Mybatis自动将SQL执行结果映射至java对象


### 6.Mybatis编程步骤是什么样的

- `SqlSessionFactory ` 
- `SqlSession`
- 执行数据库操作
- 提交事务`sessuib.commit()`
- 关闭会话`session.close()`

### 8.Mybatis的优点

- 基于SQL语句编程，灵活
- 解除SQL与代码的耦合，统一管理
- 相比jdbc，减少50%以上的代码量
- 与各种数据库兼容
- 集成Spring框架
- 提供映射标签（实体类对象与数据库中的字段）

### 9.Mybatis框架的缺点

- 可移植性差
- SQL编写工作量大

### 10.#{}和${}的区别✔

- `#{}`预编译处理，是占位符，预编译处理？？？
  - 将SQL中的`#{}`替换为`?`，调用PrepareStatement来赋值

- `${}`拼接符，字符串替换，没有预编译处理
  - 替换为变量的值，调用Statement来赋值


### 11.通常一个XML映射文件，都会写一个Dao接口与之对应，那么这个Dao接口的工作原理是什么？Dao接口里的方法、参数不同时，方法能重载吗

- 不能（ 接口全限名+方法名的拼接字符串作为key值  ）

### 12.在Mapper中如何传递多个参数

- xml中：`#{0}`代表接收的是Dao层的第一个参数`#{1}`代表Dao层的第二个参数。。
- 使用注解：dao层参数前加`@Param`注解
- 多个参数封装成Map集合

### 13.Mybatis动态SQL有什么用？执行原理是什么？有哪些动态SQL

- 根据表达式的值完成逻辑判断，并动态拼接SQL的功能
- ` trim、where、set、foreach、if、choose、when、otherwise、bind  `

### 14.XML映射文件中，不同的xml映射文件id是否可以重复

- `namespace+id`是作为Map<String,MapperStatement>的key使用，如果没有`namespace`，就剩下id，那么id重复会导致数据互相覆盖。

### 15.Mybatis实现一对一有几种方式？具体是怎么操作的

- 联合查询
  - 多张表联合查询

- 嵌套查询
  - 先查一个表。在根据外键查另一个表


### 16.Mybatis的一级、二级缓存✔

- 一级缓存
  - 作用域session，当flush、close后，cache将清空，默认打开一级缓存

- 二级缓存
  - HashMap存储，作用域为Mapper（namespace），


> mybatis的一级缓存: 基于 PerpetualCache 的 HashMap 本地缓存，其存储作用域为 Session，当Session进行flush或close之后，该Session中的所有Cache 就将清空，默认打开一级缓存
>
> 关于二级缓存需要单独开启 
>
> 二级缓存是基于namespace和mapper的作用域起作用的，不是依赖于SQL session，默认也是采用 PerpetualCache，HashMap 存储。 
>
> 如果想要开启二级缓存需要在全局配置文件和映射文件中开启配置才行。

### Mybatis的二级缓存什么时候会清理缓存中的数据✔

当某一个作用域(一级缓存 Session/二级缓存Namespaces)的进行了新增、修 改、删除操作后，默认该作用域下所有 select 中的缓存将被 clear

### 18.使用Mybatis的Mapping接口调用时有哪些要求

- 接口方法名和xml文件中id相同
- 接口方法的输入参数类型和xml文件中ParameterType类型相同
- 接口方法的输出参数类型和xml文件中resultType类型相同
- namespace是mapper接口的类路径

### Mybatis的执行流程✔

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

lazyLoadingEnabled=true|false，默认是关闭的

### 延迟加载的底层原理知道吗

延迟加载在底层主要使用的CGLIB动态代理完成的 

第一是，使用CGLIB创建目标对象的代理对象，这里的目标对象就是开启了延迟加载的mapper 

第二个是当调用目标方法时，进入拦截器invoke方法，发现目标方法是null 值，再执行sql查询 

第三个是获取数据以后，调用set方法设置属性值，再继续查询目标方法，就有值了



## Other

### jsp的8个隐含对象有哪些

jsp本质上就是servlet

**1 pageContext**

类型：PageContext

代表：当前页面的上下文

作用：可以获取到页面中的其他隐含对象，同时它还是一个域对象。

**2 request**

类型：HttpServletRequest

代表：请求

作用：可以获取用户发送的请求信息，它也是一个域对象。

**3 session**

类型：HttpSession

代表：当前会话

作用：可以作为域对象，用来共享数据。

**4 application** 

类型：ServletContext

代表：代表整个WEB应用

作用：是JavaWeb中最大的域对象。

**5 response**

类型：HttpServletResponse

代表：响应

作用：向浏览器发送响应信息

**6 out**

类型：JspWriter

代表：输出流

作用：可以向页面输出内容

**7 config**

类型：ServletConfig

代表：当前JSP的配置信息

作用：可以获取到Servlet标签中初始化参数

**8 page**

类型：Object 在service方法中有如下代码 Object page = this;

代表：代表当前JSP的对象

**9 exception**

类型：Throwable

代表：异常信息

作用：获取页面中的异常

### JDBC连接数据库步骤

![image-20230922095746828](https://gitee.com/tjlxy/img/raw/master/image-20230922095746828.png)