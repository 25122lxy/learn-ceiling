# Linux

## Bigdata-Basic

### 1.常用命令

- `pwd`
- `ls`
- `ls -a`
- `ls -l`
- `cd`
- `cd dir`
- `mkdir dir`
- `rm -rf dir`
- `rm file`
- `~`
- 文件查看命令
  - `cat file.txt`
  - `tac file.txt`从最后一行开始看
  - `nl file.txt`显示行号
  - `more file.txt`一页一页看
  - `less file.txt`
  - **`head -n 20 `看前20行**
  - **`tail -n 20`看后20行**
- `tar -zxvf file`
- `mv file newfile`
- `mv  file/dir dir`
- `su`
- `su -`
- `ssh user@host`
- **`scp -r file user@host:dir`**（-r代表递归复制）
- `rsync -av /path/to/source_folder user@remote_host:/path/to/destination_folder`
- `reboot`重启
- `shutdown now`关机

1. find 、rm、rmdir、mv、cp、cat、pwd、chmod、kill、ping、ifconfig 
2. tail、ps、grep、netstat、echo、ssh、scp、top、mpstat、free、df

### 2.高级命令

- 查看内存:  `free -h`
- 查看磁盘:  `df -h`
- 查看CPU:  `top`
- 任务管理器：`ps -ef`
- **查找进程:  `ps -ef | grep xxxx`**
- 查看目录大小:  `du -sh`
- **查看端口号:  `netstat -anp xx`**
- 测试网络:  `ping`
- 测试端口:  `telnet`
- 查看io:  `iotop`
- `sort` 排序
- `awk` 对文本处理
- `cut` 对文本切分
- `sed` 对文本内容全局替换

<hr>

当在 Linux 系统中使用以下命令时，可以实现不同的文本处理和操作：

1. `sort` 排序：

   - 对文件进行排序，并将结果输出到标准输出：

     ```
     sort file.txt
     ```

   - 将排序结果写入新文件：

     ```
     sort file.txt > sorted_file.txt
     ```

   - 按照数字进行排序（例如，按照第一列的数字值进行排序）：

     ```
     sort -n -k1 file.txt
     ```

2. `awk` 对文本处理：

   - 打印文件的第一列：

     ```
     awk '{print $1}' file.txt
     ```

   - 计算文件每行的总和：

     ```
     awk '{sum=0; for(i=1;i<=NF;i++) sum+=$i; print sum}' file.txt
     ```

   - 根据分隔符切分并打印指定列：

     ```
     awk -F',' '{print $3}' file.txt
     ```

3. `cut` 对文本切分：

   - 切分文件的某个字段并打印：

     ```
     cut -d',' -f3 file.txt
     ```

   - 根据字节位置切分文件：

     ```
     cut -b 1-5 file.txt
     ```

4. `sed` 对文本内容全局替换：

   - 将文件中的 "old" 替换为 "new" 并输出到标准输出：

     ```
     sed 's/old/new/g' file.txt
     ```

   - 直接在原文件中替换并进行备份：

     ```
     sed -i.bak 's/old/new/g' file.txt
     ```

   - 在指定行范围内进行替换：

     ```
     sed '10,20s/old/new/g' file.txt
     ```

以上是这些命令的简单示例用法，你可以根据具体需求和文本文件的结构进行进一步的使用和调整。

---

在虚拟机之间传输文件，可以使用以下命令：

1. 使用 scp 命令：`scp` 是 Secure Copy 的缩写，可以通过 SSH 安全地复制文件。以下是使用 scp 命令从本地主机复制文件到远程虚拟机：

   ```
   scp /path/to/local/file username@remote_host:/path/to/destination
   ```

   这将把本地 `/path/to/local/file` 文件复制到远程虚拟机的 `/path/to/destination` 目录下。

   反之，如果要从远程虚拟机复制文件到本地主机，可以使用如下命令：

   ```
   scp username@remote_host:/path/to/remote/file /path/to/destination
   ```

   这会将远程虚拟机上的 `/path/to/remote/file` 文件复制到本地主机的 `/path/to/destination` 目录下。

   注意：在执行以上命令时，需要替换 `username`、`remote_host`、`/path/to/local/file`、`/path/to/destination` 和 `/path/to/remote/file` 为实际的值。

2. 使用 rsync 命令：`rsync` 是一个强大的文件复制和同步工具。以下是使用 rsync 命令从本地主机复制文件到远程虚拟机：

   ```
   rsync -avz /path/to/local/file username@remote_host:/path/to/destination
   ```

   类似地，如果要从远程虚拟机复制文件到本地主机，可以使用如下命令：

   ```
   rsync -avz username@remote_host:/path/to/remote/file /path/to/destination
   ```

   注意：同样需要替换 `username`、`remote_host`、`/path/to/local/file`、`/path/to/destination` 和 `/path/to/remote/file` 为实际的值。

无论是使用 scp 还是 rsync 命令，都需要确保主机之间已经建立了网络连接，并且具有正确的权限来访问文件和目录。

### 3.vi命令

- **`:set nu`显示行号**
- `:set nonu`取消显示行号

- **`:/xx`查找**
- `dd` 删除光标所在行



###  4.脚本

1. 离线数仓分层脚本

   ```shell
   #!/bin/bash
   ...
   sql=""
   ...
   ```

   

2. 自己封装、分发、xcall、。。。

3. 集群启停脚本

   ```shell
   #!/bin/bash
   
   case $1 in 
   "start"){
   	for i in master slave01 slave02
   	do
   		ssh 用户名@主机名 "绝对路径 + 启动命令"
   	done
   };;
   "stop"){
   	for i in master slave01 slave02
   	do
   		ssh 用户名@主机名 "绝对路径 + 停止命令"
   	done
   };;
   esac
   ```

4. datax的脚本

###  5.单引号、双引号

```bash
嵌套，看最外层

``	字符串

""	取变量值

'"$do_date"' 字符串，"$do_date"

"'do_date'"	取变量值，'2020-02-02'

`date` 反引号`，执行引号中命令 2019年 05月 02日 星期四 21:02:08 CST
```



###  6.Linux是什么操作系统

CentOS 7.5



###  7.服务器怎么监控的？——内存、磁盘、CPU。。。

Prometheus（采集工具） + Grafana(可视化)

Zabbix （采集工具）+  Grafana(可视化)



### 8. Shell中提交了一个脚本，进程号已经不知道了，但是需要kill掉这个进程，怎么操作

`ssh $i "ps -ef | grep file-flume-kafka | grep -v grep |awk '{print \$2}' | xargs kill"`
