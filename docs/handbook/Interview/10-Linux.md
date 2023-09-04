# Linux

## 常用命令

1. find 、rm、rmdir、mv、cp、cat、pwd、chmod、kill、ping、ifconfig 
2. tail、ps、grep、netstat、echo、ssh、scp、top、mpstat、free、df

### 基础命令

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
- **`scp file user@host:dir`**
- `reboot`重启
- `shutdown now`关机

### 高级命令

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

### vi命令

- **`:set nu`显示行号**
- `:set nonu`取消显示行号

- **`:/xx`查找**
- `dd` 删除光标所在行
