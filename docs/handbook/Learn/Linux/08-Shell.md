# Shell

## 1. Shell入门

### 1.1 概述

Shell是一个**命令行解释器**，它接受应用程序/用户命令，然后调用操作系统内核

Shell还是一个功能相当强大的编程语言

1）Linux 提供的 Shell 解析器有

```shell
[lxy25122@centos7 ~]$ cat /etc/shells
/bin/sh
/bin/bash
/usr/bin/sh
/usr/bin/bash
```

2）bash 和 sh 的关系

```shell
[lxy25122@centos7 ~]$ ll /bin/ | grep bash
-rwxr-xr-x. 1 root root     964536 4月   1 2020 bash
lrwxrwxrwx. 1 root root          4 10月 31 2022 sh -> bash
...
```

3）Centos 默认的解析器是 bash

```shell
[lxy25122@centos7 ~]$ echo $SHELL
/bin/bash
```

### 1.2 Shell脚本

脚本格式：脚本以`#!/bin/bash` 开头（指定解析器）

eg：创建一个 Shell 脚本，输出 helloworld

- `vim helloworld.sh`

- 在 helloworld.sh 中输入如下内容 

  ```shell
  #!/bin/bash 
  echo "helloworld"
  ```

- 执行方式

  - 1、采用 bash 或 sh+脚本的相对路径或绝对路径（不用赋予脚本+x 权限）

  - 2、采用输入脚本的绝对路径或相对路径执行脚本（**必须具有可执行权限+x**）

    注意：第一种执行方法，本质是 bash 解析器帮你执行脚本，所以脚本本身不需要执行权限。第二种执行方法，本质是脚本需要自己执行，所以需要执行权限。

  - 3、在脚本的路径前加上“.”或者 source

  **注意**：前两种方式都是在当前 shell 中打开一个子 shell 来执行脚本内容，当脚本内容结束，则子 shell 关闭，回到父 shell 中。

  第三种，也就是使用在脚本路径前加“.”或者 source 的方式，可以使脚本内容在当前shell 里执行，而无需打开子 shell！这也是为什么我们每次要修改完/etc/profile 文件以后，需要 source 一下的原因。 

  开子 shell 与不开子 shell 的区别就在于，环境变量的继承关系，如在子shell 中设置的当前变量，父 shell 是不可见的。

## 2. 变量

### 2.1 系统预定义变量

1）常用系统变量

$HOME、$PWD、$SHELL、$USER 等

eg：

- 查看系统变量的值

  ```shell
  [lxy25122@centos7 ~]$ echo $SHELL
  /bin/bash
  [lxy25122@centos7 ~]$ echo $HOME
  /home/lxy25122
  [lxy25122@centos7 ~]$ echo $PWD
  /home/lxy25122
  [lxy25122@centos7 ~]$ echo $USER
  lxy25122
  ```

- 显示当前 Shell 中所有变量：set

  ```shell
  [lxy25122@centos7 ~]$ set | head -10
  BASH=/bin/bash
  BASHOPTS=checkwinsize:cmdhist:expand_aliases:extquote:force_fignore:histappend:hostcomplete:interactive_comments:login_shell:progcomp:promptvars:sourcepath
  BASH_ALIASES=()
  BASH_ARGC=()
  BASH_ARGV=()
  BASH_CMDS=()
  BASH_LINENO=()
  BASH_SOURCE=()
  BASH_VERSINFO=([0]="4" [1]="2" [2]="46" [3]="2" [4]="release" [5]="x86_64-redhat-linux-gnu")
  BASH_VERSION='4.2.46(2)-release'
  ```



### 2.2 自定义变量

基本语法：

（1）定义变量：变量名=变量值，**注意，=号前后不能有空格**

（2）撤销变量：unset 变量名

（3）声明静态变量：readonly 变量，注意：不能 unset

变量定义规则：

（1）变量名称可以由字母、数字和下划线组成，但是不能以数字开头，**环境变量名建议大写**。 

（2）等号两侧不能有空格 

（3）在 bash 中，变量默认类型都是字符串类型，无法直接进行数值运算。

（4）变量的值如果有空格，需要使用双引号或单引号括起来。

eg：

（1）定义变量 A`A=5`

（2）给变量 A 重新赋值`A=8`

（3）撤销变量 A`unset A`

（4）声明静态的变量 B=2，不能 unset`readonly B=2`

（5）在 bash 中，变量默认类型都是字符串类型，无法直接进行数值运算

（6）变量的值如果有空格，需要使用双引号或单引号括起来`D="I love xiaoli"`

（7）可把变量提升为全局环境变量，可供其他 Shell 程序使用`export 变量名`

### 2.3 特殊变量

#### 2.3.1 $n

基本语法：

$n （功能描述：n 为数字，$0 代表该脚本名称，$1-$9 代表第一到第九个参数，十以上的参数，十以上的参数需要用大括号包含，如${10}）

```shell
[lxy25122@centos7 scripts]$ cat test.sh
#!/bin/bash
echo "$0"
echo "$1"
[lxy25122@centos7 scripts]$ sh test.sh 1 2
test.sh
1
```

#### 2.3.2 $#

基本语法：$# （功能描述：获取所有输入**参数个数**，常用于循环,判断参数的个数是否正确以及加强脚本的健壮性）。

```shell
[lxy25122@centos7 shells]$ vim parameter.sh
#!/bin/bash
echo '==========$n=========='
echo $0
echo $1
echo $2
echo '==========$#=========='
echo $#
[lxy25122@centos7 shells]$ chmod 777 parameter.sh
[lxy25122@centos7 shells]$ ./parameter.sh cls xz
==========$n==========
./parameter.sh
cls
[lxy25122@centos7 shells]$ vim parameter.sh
#!/bin/bash
echo '==========$n=========='
echo $0
echo $1
echo $2
echo '==========$#=========='
echo $#
[lxy25122@centos7 shells]$ chmod 777 parameter.sh
[lxy25122@centos7 shells]$ ./parameter.sh cls xz
==========$n==========
./parameter.sh
cls
xz
==========$#==========
2
```



#### 2.3.3 $*、$@

基本语法：

- $* （功能描述：这个变量代表命令行中所有的参数，$*把所有的参数看成一个整体）
- $@ （功能描述：这个变量也代表命令行中所有的参数，不过$@把每个参数区分对待）

eg：

```shell
[lxy25122@centos7 shells]$ vim parameter.sh
#!/bin/bash
echo '==========$n=========='
echo $0
echo $1
echo $2
echo '==========$#=========='
echo $#
echo '==========$*=========='
echo $*
echo '==========$@=========='
echo $@
[lxy25122@centos7 shells]$ ./parameter.sh a b c d e f g
==========$n==========
./parameter.sh
a
b
==========$#==========
7
==========$*==========
a b c d e f g
==========$@==========
a b c d e f g
```

#### 2.3.4 $?

基本语法：

$？ （功能描述：最后一次执行的命令的返回状态。如果这个变量的值为0，证明上一个命令正确执行；如果这个变量的值为非 0（具体是哪个数，由命令自己来决定），则证明上一个命令执行不正确了。）

eg：判断 helloworld.sh 脚本是否正确执行

```shell
[lxy25122@centos7 shells]$ ./helloworld.sh
hello world
[lxy25122@centos7 shells]$ echo $?
0
```



## 3. 运算符

基本语法：`“$((运算式))” 或 “$[运算式]”`

eg：计算（2+3）* 4 的值

```shell
25122@LAPTOP-04B2GRAF MINGW64 /e/Work/data
$ echo $[(2+3)*4]
20

25122@LAPTOP-04B2GRAF MINGW64 /e/Work/data
$ echo $(((2+3)*4))
20
```



## 4. 条件判断

基本语法：

（1）test condition 

（2）[ condition ]（**注意 condition 前后要有空格**） 

注意：条件非空即为 true，[ lxy ]返回 true，[ ] 返回 false。

常用判断条件：

（1）两个整数之间比较 

- `-eq` 等于（equal） `-ne` 不等于（not equal） 
- `-lt` 小于（less than） `-le` 小于等于（less equal） 
- `-gt` 大于（greater than） `-ge` 大于等于（greater equal） 

注：如果是字符串之间的比较 ，用等号“=”判断相等；用“!=”判断不等。

（2）按照文件权限进行判断

-  `-r` 有读的权限（read） 
- `-w` 有写的权限（write） 
- `-x` 有执行的权限（execute） 

（3）按照文件类型进行判断 

- `-e` 文件存在（existence） 
- `-f` 文件存在并且是一个常规的文件（file） 
- `-d` 文件存在并且是一个目录（directory）

eg：

（1）23是否大于等于22

```shell
25122@LAPTOP-04B2GRAF MINGW64 /e/Work/data
$ [ 23 -ge 22 ]

25122@LAPTOP-04B2GRAF MINGW64 /e/Work/data
$ echo $?
0
```

（2）a.txt是否具有写的权限

```shell
25122@LAPTOP-04B2GRAF MINGW64 /e/Work/data
$ ls -l
total 3
-rw-r--r-- 1 25122 197609  35 Dec 23 11:28 a.txt
-rwxr-xr-x 1 25122 197609 180 Dec 23 12:16 paramater.sh*
-rw-r--r-- 1 25122 197609  19 Dec 23 11:29 sh_te.sh

25122@LAPTOP-04B2GRAF MINGW64 /e/Work/data
$ [ -w a.txt ]

25122@LAPTOP-04B2GRAF MINGW64 /e/Work/data
$ echo $?
0
```

（3）/e/Work/data/a.txt 目录中的文件是否存在

```shell
25122@LAPTOP-04B2GRAF MINGW64 /e/Work/data
$ [ -e /e/Work/data/a.txt ]

25122@LAPTOP-04B2GRAF MINGW64 /e/Work/data
$ echo $?
0

25122@LAPTOP-04B2GRAF MINGW64 /e/Work/data
$ ls
a.txt  paramater.sh*  sh_te.sh  无标题-2023-12-25-2142.excalidraw
```

（4）多条件判断（&& 表示前一条命令执行成功时，才执行后一条命令，|| 表示上一条命令执行失败后，才执行下一条命令）

```shell
25122@LAPTOP-04B2GRAF MINGW64 /e/Work/data
$ [ lxy25122 ] && echo OK || echo notOK
OK

25122@LAPTOP-04B2GRAF MINGW64 /e/Work/data
$ [ ] && echo OK || echo notOK
notOK
```

## 5. 流程控制（重点）

### 5.1 if判断

基本语法：

（1）单分支 

```shell
if [ 条件判断式 ];then
	程序
fi
```

或者

```shell
if [ 条件判断式 ]
then
	程序
fi
```

（2）多分支

```shell
if [ 条件判断式 ]
then
	程序
elif [ 条件判断式 ]
then
	程序
else
	程序
fi
```

注意事项： 

①[ 条件判断式 ]，中括号和条件判断式之间必须有空格 

②if 后要有空格

eg：输入一个数字，如果是 1，则输出 banzhang zhen shuai，如果是 2，则输出cls zhen mei，如果是其它，什么也不输出。

```shell
#!/bin/bash
if [ $1 -eq 1 ]
then
        echo "banzhang zhen shuai"
elif [ $1 -eq 2 ]
then
        echo "cls zhen mei"
fi
```



### 5.2 case语句

基本语法：

```shell
case $变量名 in
"值1"）
	如果变量的值等于值 1，则执行程序 1
;;
"值2"）
	如果变量的值等于值 2，则执行程序 2
;;
	…省略其他分支…
*）
	如果变量的值都不是以上的值，则执行此程序
;;
esac
```

注意事项： 

（1）case 行尾必须为单词“in”，每一个模式匹配必须以右括号“）”结束。

（2）双分号“;;”表示命令序列结束，相当于 java 中的 break。

（3）最后的“*）”表示默认模式，相当于 java 中的 default。

eg：输入一个数字，如果是 1，则输出 banzhang，如果是 2，则输出cls，如果是其它，输出renyao。

```shell
!/bin/bash
case $1 in
"1")
	echo "banzhang"
;;
"2")
	echo "cls"
;;
*)
	echo "renyao"
;;
esac
```

### 5.3 for循环

基本语法：

```shell
for (( 初始值;循环控制条件;变量变化 ))
do
	程序
done
```

eg：从 1 加到 100

```shell
#!/bin/bash
sum=0
for((i=0;i<=100;i++))
do
	sum=$[$sum+$i]
done
echo $sum
```

基本语法2：

```shell
for 变量 in 值 1 值 2 值 3…
do
	程序
done
```

eg：

（1）打印所有输入参数

```shell
#!/bin/bash
#打印数字
for i in cls mly wls
do
	echo "ban zhang love $i"
done
```

```bash
25122@LAPTOP-04B2GRAF MINGW64 /e/Work/data
$ ./for_test.sh
ban zhang love cls
ban zhang love mly
ban zhang love wls
```

（2）比较$*和$@区别

$*和$@都表示传递给函数或脚本的所有参数，不被双引号“”包含时，都以$1 $2 …$n的形式输出所有参数。

当它们被双引号“”包含时，$*会将所有的参数作为一个整体，以“$1 $2 …$n”的形式输出所有参数；$@会将各个参数分开，以“$1” “$2”…“$n”的形式输出所有参数。

```shell
#!/bin/bash
echo '=============$*============='
for i in "$*"
#$*中的所有参数看成是一个整体，所以这个 for 循环只会循环一次
do
	echo "ban zhang love $i"
done
echo '=============$@============='
for j in "$@"
#$@中的每个参数都看成是独立的，所以“$@”中有几个参数，就会循环几次
do
	echo "ban zhang love $j"
done
```

```bash
25122@LAPTOP-04B2GRAF MINGW64 /e/Work/data
$ ./for_test2.sh xiaoli xiaotu xiaobai
=============$*=============
ban zhang love xiaoli xiaotu xiaobai
=============$@=============
ban zhang love xiaoli
ban zhang love xiaotu
ban zhang love xiaobai
```



### 5.4 while循环

基本语法：

```shell
while [ 条件判断式 ]
do
	程序
done
```

eg：

```shell
#!/bin/bash
sum=0
i=1
while [ $i -le 100 ]
do
	sum=$[$sum+$i]
	i=$[$i+1]
done
echo $sum
```

## 6. read读取控制台输入

基本语法：

read (选项) (参数) 

①选项： 

- -p：指定读取值时的提示符； 
- -t：指定读取值时等待的时间（秒）如果-t 不加表示一直等待

②参数 

- 变量：指定读取值的变量名

eg：提示 7 秒内，读取控制台输入的名称

```shell
#!/bin/bash
read -t 7 -p "Enter your name in 7 seconds :" NN
echo $NN
```

```bash
25122@LAPTOP-04B2GRAF MINGW64 /e/Work/data
$ ./read.sh
Enter your name in 7 seconds :xiaoli
xiaoli
```



## 7. 函数

### 7.1 系统函数

#### 7.1.1 basename

基本语法：

- `basename [string / pathname] [suffix]` 

- 功能描述：basename 命令会删掉所有的前缀包括最后一个（‘/’）字符，然后将字符串显示出来。

  basename 可以理解为取路径里的文件名称

选项：

- suffix 为后缀，如果 suffix 被指定了，basename 会将 pathname 或string 中的suffix 去掉

eg：截取该`/e/Work/data/a.txt` 路径的文件名称

```shell
25122@LAPTOP-04B2GRAF MINGW64 /e/Work/data
$ basename /e/Work/data/a.txt
a.txt

25122@LAPTOP-04B2GRAF MINGW64 /e/Work/data
$ basename /e/Work/data/a.txt .txt
a
```

#### 7.1.2 dirname

基本语法：

- `dirname 文件绝对路径`

- 功能描述：从给定的包含绝对路径的文件名中去除文件名（非目录的部分），然后返回剩下的路径（目录的部分）

  dirname 可以理解为取文件路径的绝对路径名称

注：**绝对路径**

eg：获取 read.sh 文件的路径

```shell
25122@LAPTOP-04B2GRAF MINGW64 /e/Work/data
$ dirname ./read.sh
.

25122@LAPTOP-04B2GRAF MINGW64 /e/Work/data
$ dirname /e/Work/data/read.sh
/e/Work/data
```



### 7.2 自定义函数

基本语法：

```shell
[ function ] funname[()]
{
    Action;
    [return int;]
}
```

注意：

（1）必须在调用函数地方之前，先声明函数，shell 脚本是逐行运行。不会像其它语言一样先编译。 

（2）函数返回值，只能通过$?系统变量获得，可以显示加：return 返回，如果不加，将以最后一条命令运行结果，作为返回值。return 后跟数值 n(0-255)

eg：计算两个输入参数的和

```shell
#!/bin/bash
function sum()
{
        s=0
        s=$[$1+$2]
        echo "$s"
}
read -p "Please input the number1: " n1;
read -p "Please input the number2: " n2;
sum $n1 $n2;
```

```bash
25122@LAPTOP-04B2GRAF MINGW64 /e/Work/data
$ ./add_sum.sh
Please input the number1: 18
Please input the number2: 32
50
```



## 8. 正则表达式入门

正则表达式使用单个字符串来描述、匹配一系列符合某个语法规则的字符串。在很多文本编辑器里，正则表达式通常被用来检索、替换那些符合某个模式的文本。在Linux 中，grep，sed，awk 等文本处理工具都支持通过正则表达式进行模式匹配。

### 8.1 常规匹配

一串不包含特殊字符的正则表达式匹配它自己，

例如：匹配所有包含read的行

```bash
25122@LAPTOP-04B2GRAF MINGW64 /e/Work/data
$ cat /e/Work/data/add_sum.sh | grep read
read -p "Please input the number1: " n1;
read -p "Please input the number2: " n2;
```



### 8.2 特殊类型字符

**1）特殊字符**：`^`

^ 匹配一行的开头，

例如：`cat /etc/passwd | grep ^a`会匹配出所有以a开头的行

**2）特殊字符**：`$`

$ 匹配一行的结束，

例如：`cat /etc/passwd | grep t$`会匹配出所有以 t 结尾的行

**3）特殊字符**：`.`

. 匹配一个任意的字符，

例如：`cat /etc/passwd | grep r..t`会匹配包含 rabt,rbbt,rxdt,root 等的所有行

**4）特殊字符**：`*`

\* 不单独使用，他和上一个字符连用，表示匹配上一个字符 0 次或多次

例如：`cat /etc/passwd | grep ro*t`会匹配 rt, rot, root, rooot, roooot 等所有行

**5）字符区间（中括号）**：`[ ]`

```
[ ] 表示匹配某个范围内的一个字符，例如
[6,8]------匹配 6 或者 8
[0-9]------匹配一个 0-9 的数字
[0-9]*------匹配任意长度的数字字符串
[a-z]------匹配一个 a-z 之间的字符
[a-z]* ------匹配任意长度的字母字符串
[a-c, e-f]-匹配 a-c 或者 e-f 之间的任意字符
```

例如：`cat /etc/passwd | grep r[a,b,c]*t`会匹配 rt,rat, rbt, rabt, rbact,rabccbaaacbt 等等所有行

**6）特殊字符**：`\`

\ 表示转义，并不会单独使用。由于所有特殊字符都有其特定匹配模式，当我们想匹配某一特殊字符本身时（例如，我想找出所有包含 '$' 的行），就会碰到困难。此时我们就要将转义字符和特殊字符连用，来表示特殊字符本身，

例如：`cat /etc/passwd | grep ‘a\$b’`就会匹配所有包含 a$b 的行。注意需要使用单引号将表达式引起来。

## 9. 文本处理工具

### 9.1 cut

cut 的工作就是“剪”，具体的说就是在文件中负责剪切数据用的。cut 命令从文件的每一行剪切字节、字符和字段并将这些字节、字符和字段输出。

基本用法：

- cut [选项参数] filename 
- 说明：默认分隔符是制表符

选项说明：

- `-f`：列号，提取第几列
- `-d`：分隔符，按照指定分隔符分割列，默认是制表符“\t”
- `-c`：按字符进行切割 后加加 n 表示取第几列 比如-c 1

eg：

（1）数据准备

```
dong shen
guan zhen
wo wo
lai lai
le le
```

（2）切割 cut.txt 第一列

```bash
25122@LAPTOP-04B2GRAF MINGW64 /e/Work/data
$ cut -d " " -f 1 cut.txt
dong
guan
wo
lai
le
```

（3）切割 cut.txt 第二、三列

```shell
25122@LAPTOP-04B2GRAF MINGW64 /e/Work/data
$ cut -d " " -f 2,3 cut.txt
shen
zhen
wo
lai
le
```

（4）在 cut.txt 文件中切割出 guan

```shell
25122@LAPTOP-04B2GRAF MINGW64 /e/Work/data
$ cat cut.txt |grep guan | cut -d " " -f 1
guan
```

（5）选取系统 PATH 变量值，第 2 个“：”开始后的所有路径

`echo $PATH | cut -d ":" -f 3-`

（6）切割 ifconfig 后打印的 IP 地址

```
$ ifconfig ens33 | grep netmask | cut -d " " -f 
```



### 9.2 awk

一个强大的文本分析工具，把文件逐行的读入，以空格为默认分隔符将每行切片，切开的部分再进行分析处理。

基本用法：

- awk [选项参数] ‘/pattern1/{action1} /pattern2/{action2}...’ filename 
- pattern：表示 awk 在数据中查找的内容，就是匹配模式 
- action：在找到匹配内容时所执行的一系列命令

选项说明：

- `-F` 指定输入文件分隔符 
- `-v` 赋值一个用户定义变量

eg：

（1）数据准备

```shell
[lxy25122@centos7 test]$ sudo cp /etc/passwd ./

[lxy25122@centos7 test]$ head -5 passwd
root:x:0:0:root:/root:/bin/bash
bin:x:1:1:bin:/bin:/sbin/nologin
daemon:x:2:2:daemon:/sbin:/sbin/nologin
adm:x:3:4:adm:/var/adm:/sbin/nologin
lp:x:4:7:lp:/var/spool/lpd:/sbin/nologin
#passwd 数据的含义
#用户名:密码(加密过后的):用户 id:组 id:注释:用户家目录:shell 解析器
```

（2）搜索 passwd 文件以 root 关键字开头的所有行，并输出该行的第7 列。

```shell
[lxy25122@centos7 test]$ awk -F : '/^root/{print $7}' passwd
/bin/bash
```

（3）搜索 passwd 文件以 root 关键字开头的所有行，并输出该行的第1 列和第7 列，中间以“，”号分割。

```shell
[lxy25122@centos7 test]$ awk -F : '/^root/{print $1","$7}' passwd
root,/bin/bash
```

（4）只显示/etc/passwd 的第一列和第七列，以逗号分割，且在所有行前面添加列名user，shell 在最后一行添加"dahaige，/bin/zuishuai"。

```shell
[lxy25122@centos7 test]$ awk -F : 'BEGIN{print "user,shell"}{print $1,$7}END{print "dahaige,/bin/zuishuai"}' passwd
```

注意：BEGIN 在所有数据读取行之前执行；END 在所有数据执行之后执行。

（5）将 passwd 文件中的用户 id 增加数值 1 并输出

```shell
[lxy25122@centos7 test]$ awk -v i=1 -F : '{print $3+i}' passwd
1
2
3
4
。。。
```

awk内置变量

变量说明 

- `FILENAME` 文件名 
- `NR` 已读的记录数（行号） 
- `NF` 浏览记录的域的个数（切割后，列的个数）

eg：

（1）统计 passwd 文件名，每行的行号，每行的列数

```shell
[lxy25122@centos7 test]$ awk -F : '{print "文件名:" FILENAME ",行数："NR",列数："NF}' passwd
文件名:passwd,行数：1,列数：7
文件名:passwd,行数：2,列数：7
文件名:passwd,行数：3,列数：7
。。。
```

（2）查询 ifconfig 命令输出结果中的空行所在的行号

```shell
[lxy25122@centos7 test]$ ifconfig | awk '/^$/{print NR}'
9
18
```

（3）切割 IP

```shell
[lxy25122@centos7 test]$ ifconfig ens33 | awk '/netmask/{print $2}'
192.168.137.50
```

## 10. 综合应用案例

### 10.1 归档文件



### 10.2 发送消息
