(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{344:function(a,t,s){"use strict";s.r(t);var e=s(1),r=Object(e.a)({},(function(){var a=this,t=a._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[t("h1",{attrs:{id:"软件包管理"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#软件包管理"}},[a._v("#")]),a._v(" 软件包管理")]),a._v(" "),t("h2",{attrs:{id:"_1-rpm"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-rpm"}},[a._v("#")]),a._v(" 1. RPM")]),a._v(" "),t("h3",{attrs:{id:"_1-1-rpm概述"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-1-rpm概述"}},[a._v("#")]),a._v(" 1.1 RPM概述")]),a._v(" "),t("p",[a._v("RPM（RedHat Package Manager），RedHat软件包管理工具，类似windows里面的setup.exe 是Linux这系列操作系统里面的打包安装工具，它虽然是RedHat的标志，但理念是通用的。")]),a._v(" "),t("p",[a._v("RPM包的名称格式 Apache-1.3.23-11.i386.rpm")]),a._v(" "),t("ul",[t("li",[a._v("“apache” 软件名称")]),a._v(" "),t("li",[a._v("“1.3.23-11”软件的版本号，主版本和此版本")]),a._v(" "),t("li",[a._v("“i386”是软件所运行的硬件平台，Intel 32位处理器的统称")]),a._v(" "),t("li",[a._v("“rpm”文件扩展名，代表RPM包")])]),a._v(" "),t("h3",{attrs:{id:"_1-2-rpm查询命令-rpm-qa"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-rpm查询命令-rpm-qa"}},[a._v("#")]),a._v(" 1.2 RPM查询命令（rpm-qa）")]),a._v(" "),t("p",[a._v("基本语法：rpm -qa （功能描述：查询所安装的所有 rpm 软件包）")]),a._v(" "),t("p",[a._v("注意：由于软件包比较多，一般都会采取过滤。rpm -qa | grep rpm软件包")]),a._v(" "),t("p",[a._v("eg：")]),a._v(" "),t("p",[a._v("查询MySQL软件的安装情况")]),a._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("lxy25122@centos7 archive"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("$ "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("rpm")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token parameter variable"}},[a._v("-qa")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("|")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("grep")]),a._v(" mysql\nmysql-community-client-5.7.38-1.el7.x86_64\nmysql-community-server-5.7.38-1.el7.x86_64\nmysql-community-common-5.7.38-1.el7.x86_64\nmysql-community-libs-5.7.38-1.el7.x86_64\n")])])]),t("h3",{attrs:{id:"_1-3-rpm卸载命令-rpm-e"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-3-rpm卸载命令-rpm-e"}},[a._v("#")]),a._v(" 1.3 RPM卸载命令（rpm -e）")]),a._v(" "),t("p",[a._v("基本语法：")]),a._v(" "),t("p",[a._v("（1）rpm -e RPM软件包")]),a._v(" "),t("p",[a._v("（2）rpm -e --nodeps 软件包")]),a._v(" "),t("p",[a._v("选项说明：")]),a._v(" "),t("ul",[t("li",[a._v("-e：卸载软件包")]),a._v(" "),t("li",[a._v("--nodeps：卸载软件时，不检查依赖。这样的话，那些使用该软件包的软件在此之后可能就不能正常工作了。")])]),a._v(" "),t("p",[a._v("eg：卸载firefox软件"),t("code",[a._v("rpm -e firefox")])]),a._v(" "),t("h3",{attrs:{id:"_1-4-rpm安装命令-rpm-ivh"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-4-rpm安装命令-rpm-ivh"}},[a._v("#")]),a._v(" 1.4 RPM安装命令（rpm -ivh）")]),a._v(" "),t("p",[a._v("基本语法："),t("code",[a._v("rpm -ivh RPM 包全名")])]),a._v(" "),t("p",[a._v("选项说明：")]),a._v(" "),t("ul",[t("li",[a._v("-i：install，安装")]),a._v(" "),t("li",[a._v("-v：--verbose，显示详细信息")]),a._v(" "),t("li",[a._v("-h：--hash，进度条")]),a._v(" "),t("li",[a._v("--nodeps：安装前不检查依赖")])]),a._v(" "),t("p",[a._v("eg：安装firefox软件")]),a._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("root@hadoop101 Packages"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# pwd")]),a._v("\n/run/media/root/CentOS "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("7")]),a._v(" x86_64/Packages\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("root@hadoop101 Packages"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# rpm -ivh firefox-45.0.1-1.el6.centos.x86_64.rpm")]),a._v("\nwarning: firefox-45.0.1-1.el6.centos.x86_64.rpm: Header V3 RSA/SHA1\nSignature, key ID c105b9de: NOKEY\nPreparing"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("..")]),a._v(". "),t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("###########################################")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("100")]),a._v("%"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("1")]),a._v(":firefox "),t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("###########################################")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("100")]),a._v("%"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v("\n")])])]),t("h2",{attrs:{id:"_2-yum仓库配置"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-yum仓库配置"}},[a._v("#")]),a._v(" 2. YUM仓库配置")]),a._v(" "),t("h3",{attrs:{id:"_2-1-yum概述"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-1-yum概述"}},[a._v("#")]),a._v(" 2.1 YUM概述")]),a._v(" "),t("p",[a._v("YUM（全称为 Yellow dog Updater, Modified）是一个在 Fedora 和RedHat 以及CentOS中的 Shell 前端软件包管理器。基于 RPM 包管理，能够从指定的服务器自动下载RPM包并且安装，"),t("strong",[a._v("可以自动处理依赖性关系")]),a._v("，并且一次安装所有依赖的软件包，无须繁琐地一次次下载、安装")]),a._v(" "),t("p",[a._v("YUM类似于Java中的maven工具，可以从镜像网站上下载应用程序，并直接安装")]),a._v(" "),t("h3",{attrs:{id:"_2-2-yum的常用命令"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-2-yum的常用命令"}},[a._v("#")]),a._v(" 2.2 YUM的常用命令")]),a._v(" "),t("p",[a._v("基本语法：yum [选项] [参数]")]),a._v(" "),t("p",[a._v("选项说明：")]),a._v(" "),t("ul",[t("li",[a._v("-y：对所有提问都回答“yes”")])]),a._v(" "),t("p",[a._v("参数说明：")]),a._v(" "),t("ul",[t("li",[a._v("install：安装 rpm 软件包")]),a._v(" "),t("li",[a._v("update：更新 rpm 软件包")]),a._v(" "),t("li",[a._v("check-update：检查是否有可用的更新 rpm 软件包")]),a._v(" "),t("li",[a._v("remove：删除指定的 rpm 软件包")]),a._v(" "),t("li",[a._v("list：显示软件包信息")]),a._v(" "),t("li",[a._v("clean：清理 yum 过期的缓存")]),a._v(" "),t("li",[a._v("deplist：显示 yum 软件包的所有依赖关系")])]),a._v(" "),t("p",[a._v("eg：采用 yum 方式安装 firefox"),t("code",[a._v("yum -y install firefox")])]),a._v(" "),t("h3",{attrs:{id:"_2-3-修改网络-yum-源"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-3-修改网络-yum-源"}},[a._v("#")]),a._v(" 2.3 修改网络 YUM 源")]),a._v(" "),t("p",[a._v("默认的系统 YUM 源，需要连接国外 apache 网站，网速比较慢，可以修改关联的网络YUM 源为国内镜像的网站，比如网易 163,aliyun 等")]),a._v(" "),t("p",[a._v("1）安装 wget, wget 用来从指定的 URL 下载文件")]),a._v(" "),t("p",[t("code",[a._v("[root@hadoop101 ~] yum install wget")])]),a._v(" "),t("p",[a._v("2）在/etc/yum.repos.d/目录下，备份默认的 repos 文件")]),a._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("root@hadoop101 yum.repos.d"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token builtin class-name"}},[a._v("pwd")]),a._v("\n/etc/yum.repos.d\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("root@hadoop101 yum.repos.d"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("cp")]),a._v(" CentOS-Base.repo CentOS-Base\n.repo.backup\n")])])]),t("p",[a._v("3）下载网易 163 或者是 aliyun 的 repos 文件,任选其一，")]),a._v(" "),t("div",{staticClass:"language-java extra-class"},[t("pre",{pre:!0,attrs:{class:"language-java"}},[t("code",[t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("root"),t("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[a._v("@hadoop101")]),a._v(" yum"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("repos"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("d"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v(" wget\nhttp"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("mirrors"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("aliyun"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("com"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("repo"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("Centos")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("7.")]),a._v("repo "),t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("//阿里云")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("root"),t("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[a._v("@hadoop101")]),a._v(" yum"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("repos"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("d"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),a._v(" wget\nhttp"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("mirrors"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("163.")]),a._v("com"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("help"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("CentOS7")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("Base")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("163.")]),a._v("repo "),t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("//网易 163")]),a._v("\n")])])]),t("p",[a._v("4）使用下载好的 repos 文件替换默认的 repos 文件 例如:用 CentOS7-Base-163.repo 替换 CentOS-Base.repo")]),a._v(" "),t("p",[t("code",[a._v("[root@hadoop101 yum.repos.d]# mv CentOS7-Base-163.repo CentOS-Base.repo")])]),a._v(" "),t("p",[a._v("5）清理旧缓存数据，缓存新数据")]),a._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("root@hadoop101 yum.repos.d"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("#yum clean all ")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("root@hadoop101 yum.repos.d"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("#yum makecache")]),a._v("\n")])])]),t("p",[a._v("yum makecache 就是把服务器的包信息下载到本地电脑缓存起来")]),a._v(" "),t("p",[a._v("6）测试")]),a._v(" "),t("div",{staticClass:"language-shell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-shell"}},[t("code",[t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("root@hadoop101 yum.repos.d"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("# yum list | grep firefox")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("[")]),a._v("root@hadoop101 ~"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("]")]),t("span",{pre:!0,attrs:{class:"token comment"}},[a._v("#yum -y install firefox")]),a._v("\n")])])])])}),[],!1,null,null,null);t.default=r.exports}}]);