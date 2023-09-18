# Docker-部署

必须指定同一网络

提前部署MySQL等相关软件，并初始化数据库

## 1.部署Java应用



```sh
docker build -t hmall .
```



```sh
docker run -d --name hmall -p 8080:8080 --network hmall(网络名) hmall(容器名)
```





## 2.部署前端


将html和nginx.conf 挂载到本地

```sh
docker run -d \
--name nginx \
-p 18080:18080 \
-p 18081:18081 \
#-v /root/nginx/html:/usr/share/nginx/html \
-v /root/nginx/html:/etc/nginx/html \ #获取在nginx.conf修改配置文件地址
-v /root/nginx/nginx.conf:/etc/nginx/nginx.conf \
--network hmalll(网络名)
nginx(容器名)
```





## 3.DockerCompose

### 3.1 基本语法

Docker Compose通过一个单独的**docker-compose.yml** 模板文件（YAML 格式）来定义一组相关联的应用容器，帮助我们实现**多个相互关联的Docker容器的快速部署。**

![image-20230918203428855](https://gitee.com/tjlxy/img/raw/master/image-20230918203428855.png)

举例，用docker run部署MySQL的命令：

```sh
docker run -d \
  --name mysql \
  -p 3306:3306 \
  -e TZ=Asia/Shanghai \
  -e MYSQL_ROOT_PASSWORD=123 \
  -v ./mysql/data:/var/lib/mysql \
  -v ./mysql/conf:/etc/mysql/conf.d \
  -v ./mysql/init:/docker-entrypoint-initdb.d \
  --network hmall
  mysql

```

用`docker-compose.yml `部署命令：

```yaml
version: "3.8"
services:
  mysql:
    image: mysql
    container_name: mysql
    ports:
      - "3306:3306"
    environment:
      TZ: Asia/Shanghai
      MYSQL_ROOT_PASSWORD: 123
    volumes:
      - "./mysql/conf:/etc/mysql/conf.d"
      - "./mysql/data:/var/lib/mysql"
      - "./mysql/init:/docker-entrypoint-initdb.d" 
    networks:
      - hmall
```

对比如下：

| docker run 参数 | docker compose 指令 | 说明       |
| --------------- | ------------------- | ---------- |
| --name          | container_name      | 容器名称   |
| -p              | ports               | 端口映射   |
| -e              | environment         | 环境变量   |
| -v              | volumes             | 数据卷配置 |
| --network       | network             | 网络       |

hmall商城示例

```yaml
version: "3.8"

services:
  mysql:
    image: mysql
    container_name: mysql
    ports:
      - "3306:3306"
    environment:
      TZ: Asia/Shanghai
      MYSQL_ROOT_PASSWORD: 123
    volumes:
      - "./mysql/conf:/etc/mysql/conf.d"
      - "./mysql/data:/var/lib/mysql"
      - "./mysql/init:/docker-entrypoint-initdb.d"
    networks:
      - new
  hmall:
    build:
       context: .
       dockerfile: Dockerfile
    container_name: hmall
    ports:
      - "8080:8080"
    networks:
      - new
    depends_on:
      - mysql
  nginx:
    image: nginx
    container_name: nginx
    ports:
      - "18080:18080"
      - "18081:18081"
    volumes:
      - "./nginx/nginx.conf:/etc/nginx/nginx.conf"
      - "./nginx/html:/etc/nginx/html"
    depends_on:
      - hmall
    networks:
      - new
networks:
  new:
    name: hmall

```

### 3.2 基础命令

**docker compose**的命令格式如下：

```yaml
docker compose [OPTIONS] [COMMAND]
```

| **类型** | **参数或指令** | **说明**                     |
| -------- | -------------- | ---------------------------- |
| Options  | -f             | 指定compose文件的路径和名称  |
|          | -p             | 指定project名称              |
| Commands | up             | 创建并启动所有service容器    |
|          | down           | 停止并移除所有容器、网络     |
|          | ps             | 列出所有启动的容器           |
|          | logs           | 查看指定容器的日志           |
|          | stop           | 停止容器                     |
|          | start          | 启动容器                     |
|          | restart        | 重启容器                     |
|          | top            | 查看运行的进程               |
|          | exec           | 在指定的运行中容器中执行命令 |

```sh
docker compose up -d	
```

