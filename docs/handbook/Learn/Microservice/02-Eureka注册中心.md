# Eureka注册中心

假如我们的服务提供者user-service部署了多个实例，如图：

![image-20230606105731887](C:/Users/25122/AppData/Roaming/Typora/typora-user-images/image-20230606105731887.png)

远程调用问题：

- order-service在发起远程调用的时候，该如何得知user-service实例的ip地址和端口？
- 有多个user-service实例地址，order-service调用时该如何选择？
- order-service如何得知某个user-service实例是否依然健康，是不是已经宕机？

## 1. Eureka的结构和作用

这些问题都需要利用SpringCloud中的注册中心来解决，其中最广为人知的注册中心就是Eureka，其结构如下：

![image-20230606105913889](C:/Users/25122/AppData/Roaming/Typora/typora-user-images/image-20230606105913889.png)

回答之前的各个问题。

问题1：order-service如何得知user-service实例地址？

获取地址信息的流程如下：

- user-service服务实例启动后，将自己的信息注册到eureka-server（Eureka服务端）。这个叫服务注册
- eureka-server保存服务名称到服务实例地址列表的映射关系
- order-service根据服务名称，拉取实例地址列表。这个叫服务发现或服务拉取

问题2：order-service如何从多个user-service实例中选择具体的实例？

- order-service从实例列表中利用负载均衡算法选中一个实例地址
- 向该实例地址发起远程调用

问题3：order-service如何得知某个user-service实例是否依然健康，是不是已经宕机？

- user-service会每隔一段时间（默认30秒）向eureka-server发起请求，报告自己状态，称为心跳
- 当超过一定时间没有发送心跳时，eureka-server会认为微服务实例故障，将该实例从服务列表中剔除
- order-service拉取服务时，就能将故障实例排除了

> 注意：一个微服务，既可以是服务提供者，又可以是服务消费者，因此eureka将服务注册、服务发现等功能统一封装到了eureka-client端

动手实践步骤：

1. 搭建注册中心

   搭建EurekaServer

2. 服务注册

   将user-service、order-service都注册到Eureka

3. 服务发现

   在order-service中完成服务拉取，然后通过负载均衡挑选一个服务，实现远程调用

## 2. 搭建EurekaServer

创建eureka-server服务，在cloud-demo父工程下，创建一个子模块eureka-server

添加相关依赖

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
</dependency>
```

创建启动类

```java
/**
 * @user 25122
 * @date 2023/6/2
 * @time 11:35
 * @description
 */
@EnableEurekaServer
@SpringBootApplication
public class EurekaApplication {
    public static void main(String[] args) {
        SpringApplication.run(EurekaApplication.class,args);
    }
}
```

编写配置文件

```yaml
server:
  port: 10086
spring:
  application:
    name: eureka-server
eureka:
  client:
    service-url: 
      defaultZone: http://127.0.0.1:10086/eureka
```

启动服务，访问成功 http://127.0.0.1:10086



## 3. 服务注册

将user-service注册到eureka-server中去。

在user-service的pom文件中，引入下面的eureka-client依赖：

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
</dependency>
```

修改配置文件，添加服务名称、eureka地址：

```yaml
spring:
  application:
    name: userservice
eureka:
  client:
    service-url:
      defaultZone: http://127.0.0.1:10086/eureka
```

启动多个user-service实例

步骤如下

![image-20230606111348171](https://gitee.com/tjlxy/img/raw/master/image-20230606111348171.png)

![image-20230606111421311](https://gitee.com/tjlxy/img/raw/master/image-20230606111421311.png)

启动进程

![image-20230606111441032](https://gitee.com/tjlxy/img/raw/master/image-20230606111441032.png)

查看eureka-server管理页面：

![image-20230606113627414](https://gitee.com/tjlxy/img/raw/master/image-20230606113627414.png)









## 4. 服务发现

下面，我们将order-service的逻辑修改：向eureka-server拉取user-service的信息，实现服务发现。

**添加依赖**

在order-service的pom文件中，引入下面的eureka-client依赖：

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
</dependency>
```

**修改配置文件**

服务发现也需要知道eureka地址，因此第二步与服务注册一致，都是配置eureka信息：

在order-service中，修改application.yml文件，添加服务名称、eureka地址：

```yaml
spring:
  application:
    name: orderservice
eureka:
  client:
    service-url:
      defaultZone: http://127.0.0.1:10086/eureka
```

**服务拉取和负载均衡**

在order-service的OrderApplication中，给RestTemplate这个Bean添加一个@LoadBalanced注解：

```java
package com.lxy25122.order;

import com.netflix.loadbalancer.IRule;
import com.netflix.loadbalancer.RandomRule;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

@MapperScan("com.lxy25122.order.mapper")
@SpringBootApplication
public class OrderApplication {

    public static void main(String[] args) {
        SpringApplication.run(  OrderApplication.class, args);
    }

    /**
     * 创建RestTemplate并注入Spring容器
     * @return
     */
    @Bean
    @LoadBalanced//负载均衡【服务发现】 默认轮询
    public RestTemplate restTemplate(){
        return new RestTemplate();
    }

}
```

修改order-service服务中的cn.itcast.order.service包下的OrderService类中的queryOrderById方法。修改访问的url路径，用服务名代替ip、端口：

```java
package com.lxy25122.order.service;

import com.lxy25122.order.mapper.OrderMapper;
import com.lxy25122.order.pojo.Order;
import com.lxy25122.order.pojo.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class OrderService {

    @Autowired
    private OrderMapper orderMapper;

    @Autowired
    private RestTemplate restTemplate;

    public Order queryOrderById(Long orderId) {
        // 1.查询订单
        Order order = orderMapper.findById(orderId);
        //2. 利用RestTemplate发起http请求
        //2.1 url路径
//        String url = "http://localhost:8081/user/" + order.getUserId();
        //修改访问的url路径，用服务名代替ip、端口【服务发现】
        String url = "http://userservice/user/" + order.getUserId();
        //2.2 发起调用
        User user = this.restTemplate.getForObject(url, User.class);
        //3. 封装user到order
        order.setUser(user);
        // 4.返回
        return order;
    }
}

```

spring会自动帮助我们从eureka-server端，根据userservice这个服务名称，获取实例列表，而后完成负载均衡。

