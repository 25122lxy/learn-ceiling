# Nacos注册中心

## 1. 认识和安装Nacos

[Nacos](https://nacos.io/)是阿里巴巴的产品，现在是[SpringCloud](https://spring.io/projects/spring-cloud)中的一个组件。相比[Eureka](https://github.com/Netflix/eureka)功能更加丰富，在国内受欢迎程度较高。

### 1. Windows安装

**下载安装包**

在Nacos的GitHub页面，提供有下载链接，可以下载编译好的Nacos服务端或者源代码：

GitHub主页：https://github.com/alibaba/nacos

GitHub的Release下载页：https://github.com/alibaba/nacos/releases



windows版本使用`nacos-server-1.4.4.zip`包即可。

**解压**

目录说明：

- bin：启动脚本
- conf：配置文件

**端口配置**

Nacos的默认端口是8848，如果你电脑上的其它进程占用了8848端口，请先尝试关闭该进程。

**如果无法关闭占用8848端口的进程**，也可以进入nacos的conf目录，修改配置文件中的端口：

![image-20230606164029391](https://gitee.com/tjlxy/img/raw/master/image-20230606164029391.png)

修改其中的内容：

![image-20230606164829040](https://gitee.com/tjlxy/img/raw/master/image-20230606164829040.png)

**启动**

执行命令启动单机版

```shell
startup.cmd -m standalone
```

**访问**

http://127.0.0.1:8848/nacos

默认的账号和密码都是nacos

登录成功即可

### 2. Linux安装

后续补充。。。

### 3.Nacos依赖

父工程：

```xml
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-alibaba-dependencies</artifactId>
    <version>2.3.6.RELEASE</version>
    <type>pom</type>
    <scope>import</scope>
</dependency>
```

客户端：

```xml
<!-- nacos客户端依赖包 -->
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
</dependency>

```

## 2. 服务注册到Nacos

Nacos是SpringCloudAlibaba的组件，而SpringCloudAlibaba也遵循SpringCloud中定义的服务注册、服务发现规范。因此使用Nacos和使用Eureka对于微服务来说，并没有太大区别。

主要差异在于：

- 依赖不同
- 服务地址不同

**添加依赖**

在cloud-demo父工程的pom文件中的`<dependencyManagement>`中引入SpringCloudAlibaba的依赖:

```xml
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-alibaba-dependencies</artifactId>
    <version>2.3.6.RELEASE</version>
    <type>pom</type>
    <scope>import</scope>
</dependency>
```

然后在user-service和order-service中的pom文件中引入nacos-discovery依赖：

```xml
<dependency>
    <groupId>com.alibaba.cloud</groupId>
    <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
</dependency>
```

> **注意**：这里需要注释掉eureka的依赖。

**配置nacos地址**

在user-service和order-service的application.yml中添加nacos地址：

```yaml
spring:
  cloud:
    nacos:
      server-addr: localhost:8848
```

> **注意**：这里需要注释掉eureka的地址

**重启**

重启微服务后，登录nacos管理页面，可以看到微服务信息：

![image-20230606164908625](https://gitee.com/tjlxy/img/raw/master/image-20230606164908625.png)



## 3. 服务分级存储模型

一个**服务**可以有多个**实例**，例如我们的user-service，可以有:

- 127.0.0.1:8081
- 127.0.0.1:8082
- 127.0.0.1:8083

假如这些实例分布于全国各地的不同机房，例如：

- 127.0.0.1:8081，在上海机房
- 127.0.0.1:8082，在上海机房
- 127.0.0.1:8083，在杭州机房

Nacos就将同一机房内的实例 划分为一个**集群**。

也就是说，user-service是服务，一个服务可以包含多个集群，如杭州、上海，每个集群下可以有多个实例，形成分级模型，如图：

![image-20230606165003505](https://gitee.com/tjlxy/img/raw/master/image-20230606165003505.png)

微服务互相访问时，应该尽可能访问同集群实例，因为本地访问速度更快。当本集群内不可用时，才访问其它集群。例如：

![image-20230606165024128](https://gitee.com/tjlxy/img/raw/master/image-20230606165024128.png)

杭州机房内的order-service应该优先访问同机房的user-service。



### 3.1 给user-service配置集群

修改user-service的application.yml文件，添加集群配置：

```yaml
spring:
  cloud:
    nacos:
      server-addr: localhost:8848 #nacos服务地址
      discovery:
        cluster-name: HZ # 集群名称，HZ代指杭州，SH代指上海 8083在idea中配置了SH
```

重启两个user-service实例后，我们可以在nacos控制台看到下面结果：

![image-20230606170126438](https://gitee.com/tjlxy/img/raw/master/image-20230606170126438.png)

我们再次复制一个user-service启动配置，添加属性：

```sh
-Dserver.port=8083 -Dspring.cloud.nacos.discovery.cluster-name=SH
```

配置如下图所示

![image-20230606170249261](https://gitee.com/tjlxy/img/raw/master/image-20230606170249261.png)

启动UserApplication3后再次查看nacos控制台：

![image-20230606170306919](https://gitee.com/tjlxy/img/raw/master/image-20230606170306919.png)

### 3.2 同集群优先的负载均衡

默认的`ZoneAvoidanceRule`并不能实现根据同集群优先来实现负载均衡。

因此Nacos中提供了一个`NacosRule`的实现，可以优先从同集群中挑选实例。

**就是说服务消费者优先从同集群挑选服务提供者**

1）给order-service配置集群信息

修改order-service的application.yml文件，添加集群配置：

```yaml
spring:
  cloud:
    nacos:
      server-addr: localhost:8848
      discovery:
        cluster-name: HZ # 集群名称
```

2）修改负载均衡规则

修改order-service的application.yml文件，修改负载均衡规则：

```yaml
userservice:
  ribbon:
    NFLoadBalancerRuleClassName: com.alibaba.cloud.nacos.ribbon.NacosRule # nacos负载均衡规则 
```





## 4. 权重配置

实际部署中会出现这样的场景：

服务器设备性能有差异，部分实例所在机器性能较好，另一些较差，我们希望性能好的机器承担更多的用户请求。

但默认情况下NacosRule是同集群内随机挑选，不会考虑机器的性能问题。



因此，Nacos提供了权重配置来控制访问频率，权重越大则访问频率越高。



在nacos控制台，找到user-service的实例列表，点击编辑，即可修改权重：

![image-20230606171712570](https://gitee.com/tjlxy/img/raw/master/image-20230606171712570.png)

在弹出的编辑窗口，修改权重：

![image-20230606171728691](https://gitee.com/tjlxy/img/raw/master/image-20230606171728691.png)

>  **注意**：如果权重修改为0，则该实例永远不会被访问

## 5. 环境隔离

Nacos提供了namespace来实现环境隔离功能。

- nacos中可以有多个namespace
- namespace下可以有group、service等
- 不同namespace之间相互隔离，例如不同namespace的服务互相不可见

![image-20230606171815078](https://gitee.com/tjlxy/img/raw/master/image-20230606171815078.png)

### 5.1 创建namespace

默认情况下，所有service、data、group都在同一个namespace，名为public：

![image-20230606171831682](https://gitee.com/tjlxy/img/raw/master/image-20230606171831682.png)

我们可以点击页面新增按钮，添加一个namespace：

![image-20230606171903469](https://gitee.com/tjlxy/img/raw/master/image-20230606171903469.png)

然后填写表单：

![image-20230606171926202](https://gitee.com/tjlxy/img/raw/master/image-20230606171926202.png)

就能在页面看到一个新的namespace：

![image-20230606171939088](https://gitee.com/tjlxy/img/raw/master/image-20230606171939088.png)

### 5.2 给微服务配置namespace

给微服务配置namespace只能通过修改配置来实现。

例如，修改order-service的application.yml文件：

```yaml
spring:
  cloud:
    nacos:
      server-addr: localhost:8848
      discovery:
        cluster-name: HZ
        namespace: 492a7d5d-237b-46a1-a99a-fa8e98e4b0f9 # 命名空间，填ID
```

重启order-service后，访问控制台，可以看到下面的结果：

![image-20230606172053627](https://gitee.com/tjlxy/img/raw/master/image-20230606172053627.png)

![image-20230606172103795](https://gitee.com/tjlxy/img/raw/master/image-20230606172103795.png)

此时访问order-service，因为namespace不同，会导致找不到userservice，控制台会报错：

![image-20230606172115984](https://gitee.com/tjlxy/img/raw/master/image-20230606172115984.png)

## 6. Nacos和Rureka的区别

Nacos的服务实例分为两种l类型：

- 临时实例：如果实例宕机超过一定时间，会从服务列表剔除，默认的类型。

- 非临时实例：如果实例宕机，不会从服务列表剔除，也可以叫永久实例。

配置一个服务实例为永久实例：

```yaml
spring:
  cloud:
    nacos:
      discovery:
        ephemeral: false # 设置为非临时实例
```

Nacos和Eureka整体结构类似，服务注册、服务拉取、心跳等待，但是也存在一些差异：

![image-20230606172304515](https://gitee.com/tjlxy/img/raw/master/image-20230606172304515.png)



- Nacos与eureka的共同点
  - 都支持服务注册和服务拉取
  - 都支持服务提供者心跳方式做健康检测

- Nacos与Eureka的区别
  - Nacos支持服务端主动检测提供者状态：临时实例采用心跳模式，非临时实例采用主动检测模式
  - 临时实例心跳不正常会被剔除，非临时实例则不会被剔除
  - Nacos支持服务列表变更的消息推送模式，服务列表更新更及时
  - Nacos集群默认采用AP方式，当集群中存在非临时实例时，采用CP模式；Eureka采用AP方式

