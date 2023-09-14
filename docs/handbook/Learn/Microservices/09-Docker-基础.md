# Docker-基础

![image-20230914184846374](https://gitee.com/tjlxy/img/raw/master/image-20230914184846374.png)

## 1. 镜像操作

### 1.1 镜像名称

首先来看下镜像的名称组成：

- 镜名称一般分两部分组成：[repository]:[tag]。
- 在没有指定tag时，默认是latest，代表最新版本的镜像

![image-20230612154232614](https://gitee.com/tjlxy/img/raw/master/image-20230612154232614.png)

这里的mysql就是repository，5.7就是tag，合一起就是镜像名称，代表5.7版本的MySQL镜像。

### 1.2 镜像命令

![image-20230612154319727](https://gitee.com/tjlxy/img/raw/master/image-20230612154319727.png)

### 1.3 创建Nginx镜像案例

https://hub.docker.com/ 可以在镜像仓库中搜索，查看官方教程

- 拉取镜像

  ```sh
  docker pull nginx
  ```

- 查看拉取到的镜像

  ```sh
  docker images
  ```

- 导出镜像

  ```sh
  docker save -o nginx.tar nginx:latest
  ```

- 加载镜像（需要先删除本地镜像）

  删除本地镜像

  ```sh
  docker rmi nginx:latest
  ```

  加载本地的镜像

  ```sh
  docker load -i nginx.tar
  ```

  再次查看镜像，加载成功`docker images`



## 2. 容器操作

### 2.1 容器相关命令

![image-20230612161502634](https://gitee.com/tjlxy/img/raw/master/image-20230612161502634.png)

容器保护三个状态：

- 运行：进程正常运行
- 暂停：进程暂停，CPU不再运行，并不释放内存
- 停止：进程终止，回收进程占用的内存、CPU等资源



其中：

- docker run：创建并运行一个容器，处于运行状态
- docker pause：让一个运行的容器暂停
- docker unpause：让一个容器从暂停状态恢复运行
- docker stop：停止一个运行的容器
- docker start：让一个停止的容器再次运行
- docker rm：删除一个容器

### 2.2 案例-启动Nginx容器

- 在上述创建成功基础上，运行容器

  ```sh
  docker run --name nginxContainer -p 80:80 -d nginx
  ```

  命令解读：

  - docker run ：创建并运行一个容器
  - --name : 给容器起一个名字，比如叫做 `nginxContainer`
  - -p ：将宿主机端口与容器端口映射，冒号左侧是宿主机端口，右侧是容器端口
  - -d：后台运行容器
  - nginx：镜像名称，例如nginx

  这里的`-p`参数，是将容器端口映射到宿主机端口。

  默认情况下，容器是隔离环境，我们直接访问宿主机的80端口，肯定访问不到容器中的nginx。

  现在，将容器的80与宿主机的80关联起来，当我们访问宿主机的80端口时，就会被映射到容器的80，这样就能访问到nginx了：

  ![image-20230612162032232](https://gitee.com/tjlxy/img/raw/master/image-20230612162032232.png)

- 进入容器，修改文件

  进入Nginx容器，修改HTML文件内容

  ```sh
  docker exec -it nginxContainer bash
  ```

  命令解读：

  - docker exec ：进入容器内部，执行一个命令
  - -it : 给当前进入的容器创建一个标准输入、输出终端，允许我们与容器交互
  - nginxContainer：要进入的容器的名称
  - bash：进入容器后执行的命令，bash是一个linux终端交互命令

  进入nginx的HTML所在目录 /usr/share/nginx/html（**镜像仓库官网可以查询路径**）

  容器内部会模拟一个独立的Linux文件系统，看起来如同一个linux服务器一样：

  nginx的环境、配置、运行文件全部都在这个文件系统中，包括我们要修改的html文件。

  查看DockerHub网站中的nginx页面，可以知道nginx的html目录位置在`/usr/share/nginx/html`

  我们执行命令，进入该目录：

  ```sh
  cd /usr/share/nginx/html
  ```

  容器内没有vi命令，无法直接修改，我们用下面的命令来修改：

  ```sh
  sed -i -e 's#Welcome to nginx#你好 bigdata#g' -e 's#<head>#<head><meta charset="utf-8">#g' index.html
  ```

  在浏览器访问 centos7即可看到结果

### 2.3 案例-运行Redis容器

- 拉取镜像

  ```sh
  docker pull redis
  ```

- 查看拉取的镜像

  ```
  docker images
  ```

- 运行Redis容器

  ```sh'
  docker run --name redisContainer -p 6379:6379 -d redis redis-server --appendonly yes
  ```

  命令解读：

  - docker run ：创建并运行一个容器
  - --name : 给容器起一个名字，比如叫做 `redisContainer`
  - -p ：将宿主机端口与容器端口映射，冒号左侧是宿主机端口，右侧是容器端口
  - -d：后台运行容器
  - redis：镜像名称，例如redis
  - redis-server --appendonly yes 配置单机启动



### 2.4 小结

docker run命令的常见参数有哪些？

- --name：指定容器名称
- -p：指定端口映射
- -d：让容器后台运行

查看容器日志的命令：

- docker logs
- 添加 -f 参数可以持续查看日志

查看容器状态：

- docker ps
- docker ps -a 查看所有容器，包括已经停止的



## 3. 数据卷

### 3.1 什么是数据卷

**数据卷（volume）**是一个虚拟目录，指向宿主机文件系统中的某个目录。

![image-20230612165140694](https://gitee.com/tjlxy/img/raw/master/image-20230612165140694.png)

一旦完成数据卷挂载，对容器的一切操作都会作用在数据卷对应的宿主机目录了。

这样，我们操作宿主机的/var/lib/docker/volumes/html目录，就等于操作容器内的/usr/share/nginx/html目录了

### 3.2 数据集操作命令

数据卷操作的基本语法如下：

```sh
docker volume [COMMAND]
```

docker volume命令是数据卷操作，根据命令后跟随的command来确定下一步的操作：

- create 创建一个volume
- inspect 显示一个或多个volume的信息
- ls 列出所有的volume
- prune 删除未使用的volume
- rm 删除一个或多个指定的volume

### 3.3 创建和查看数据卷

**需求**：创建一个数据卷，并查看数据卷在宿主机的目录位置

① 创建数据卷

```sh
docker volume create html
```

② 查看所有数据

```sh
docker volume ls
```

③ 查看数据卷详细信息卷

```sh
docker volume inspect html
```

在结果中可以看到，创建的html这个数据卷关联的宿主机目录为`/var/lib/docker/volumes/html/_data`目录。



**小结**：

数据卷的作用：

- 将容器与数据分离，解耦合，方便操作容器内数据，保证数据安全

数据卷操作：

- docker volume create：创建数据卷
- docker volume ls：查看所有数据卷
- docker volume inspect：查看数据卷详细信息，包括关联的宿主机目录位置
- docker volume rm：删除指定数据卷
- docker volume prune：删除所有未使用的数据卷

### 3.4 挂载数据卷

在创建容器时，可以通过 -v 参数来挂载一个数据卷到某个容器内目录，命令格式如下：

```sh
docker run \
--name nginxContainer \
-v html:/usr/share/nginx/html \
-p 80:80 \
-d nginx
```

这里的-v就是挂载数据卷的命令：

- `-v html:/usr/share/nginx/html` ：把html数据卷挂载到容器内的/usr/share/nginx/html这个目录中

### 3.5 案例-给Nginx挂载数据卷

**前提**：创建容器，创建数据卷html，查看数据卷详细信息卷

 ① 创建容器并挂载数据卷到容器内的HTML目录

```sh
docker run --name nginxContainer -v html:/usr/share/nginx/html -p 80:80 -d nginx
```

② 进入html数据卷所在位置，并修改HTML内容

```sh
# 查看html数据卷的位置
docker volume inspect html
# 进入该目录
cd /var/lib/docker/volumes/html/_data
# 修改文件
vi index.html
```

### 3.6 案例-给MySQL挂载本地目录

容器不仅仅可以挂载数据卷，也可以直接挂载到宿主机目录上。关联关系如下：

- 带数据卷模式：宿主机目录 --> 数据卷 ---> 容器内目录
- 直接挂载模式：宿主机目录 ---> 容器内目录

![image-20230613133819066](https://gitee.com/tjlxy/img/raw/master/image-20230613133819066.png)

**语法**：

目录挂载与数据卷挂载的语法是类似的：

- -v [宿主机目录]:[容器内目录]
- -v [宿主机文件]:[容器内文件]

**创建并运行一个MySQL容器，将宿主机目录直接挂载到容器**

**需求：**创建并运行一个MySQL容器，将宿主机目录直接挂载到容器

- **前提**：创建MySQL容器

- 在宿舍机创建目录/tmp/mysql/data

- 在宿舍机创建目录/tmp/mysql/conf，

  conf目录下创建hmy.cnf文件

  ```bash
  [mysqld]
  skip-name-resolve
  character_set_server=utf8
  datadir=/var/lib/mysql
  server-id=1000
  ```

- ① 挂载/tmp/mysql/data到mysql容器内数据存储目录

  ② 挂载/tmp/mysql/conf/hmy.cnf到mysql容器的配置文件

  ③ 设置MySQL密码

  ```shell
  docker run \
  --name mysqlContainer \
  -e MYSQL_ROOT_PASSWORD=123456 \
  -p 3307:3307 \ #默认3306端口号，修改端口号后需要在hmy.cnf中添加端口号信息
  -v /tmp/mysql/conf/hmy.cnf:/etc/mysql/conf.d/hmy.cnf \
  -v /tmp/mysql/data:/var/lib/mysql \
  -d \
  mysql:5.7.25
  ```

  在hmy.cnf中添加端口号信息

  ```bash
  [mysqld]
  skip-name-resolve
  character_set_server=utf8
  datadir=/var/lib/mysql
  server-id=1000
  port=3307
  ```

- MySQL容器启动成功

### 3.7 小结

docker run的命令中通过 -v 参数挂载文件或目录到容器中：

- -v volume名称:容器内目录
- -v 宿主机文件:容器内文
- -v 宿主机目录:容器内目录

数据卷挂载与目录直接挂载的

- 数据卷挂载耦合度低，由docker来管理目录，但是目录较深，不好找
- 目录挂载耦合度高，需要我们自己管理目录，不过目录容易寻找查看

