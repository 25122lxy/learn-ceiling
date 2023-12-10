# VI、VIM 编辑器

## 1. vi、vm编辑器概述

VI 是 Unix 操作系统和类 Unix 操作系统中最通用的文本编辑器。

VIM 编辑器是从 VI 发展出来的一个性能更强大的文本编辑器。可以主动的以字体颜色辨别语法的正确性，方便程序设计。VIM 与 VI 编辑器完全兼容。

## 2. 一般模式

以 vi 打开一个档案就直接进入一般模式了（这是默认的模式）。

| 语法                                   | 功能描述                                                |
| -------------------------------------- | ------------------------------------------------------- |
| <font color=blue>**yy**</font>         | 复制光标当前一行                                        |
| y数字y 或 数字yy                       | 复制一段（从当前行复制到数字行）                        |
| p                                      | 箭头移动到目的行粘贴                                    |
| 数字pp                                 | 粘贴数字行                                              |
| <font color=blue>**u**</font>          | 撤销上一步                                              |
| <font color=blue>**dd**</font>         | 删除光标当前行                                          |
| d数字d 或 数字dd                       | 删除光标（含）后多少行                                  |
| <font color=blue>**x**</font>          | 剪切一个字母，相当于del                                 |
| <font color=blue>**X**</font>          | 剪切一个字母，相当于del X 剪切一个字母，相当于Backspace |
| yw                                     | 复制一个词                                              |
| dw                                     | 删除一个词                                              |
| shift+6（^）                           | 移动到行头                                              |
| shift+4（$）                           | 移动到行尾                                              |
| y^                                     | 从光标位置复制到行头                                    |
| y$                                     | 从光标位置复制到行尾                                    |
| d$                                     | 从光标位置删除到行尾                                    |
| d^                                     | 从光标位置删除到行头                                    |
| 1+shift+g                              | 移动到页头，数字                                        |
| shift+g                                | 移动到页尾                                              |
| 数字+shift+g                           | 移动到目标行                                            |
| <font color=blue>**r+替换字符**</font> | 替换当前字符                                            |
| <font color=blue>**R**</font>          | 相当于windows中insert，替换后面字符（插入模式）         |
| <font color=blue>**w**</font>          | 切换到下一个词头                                        |
| e                                      | 切换到下一个词尾                                        |
| b                                      | 切换到上一个词头                                        |
| <font color=blue>**gg、H** </font>     | 跳转到整篇文档首行开头                                  |
| 5gg                                    | 跳转到第5行                                             |
| <font color=blue>**G、L**</font>       | 跳转到整篇文档末行开头                                  |

vi/vim 键盘图，如图所示

![](https://qiniuyun.code-nav.cn/img/vi-vim-cheat-sheet-sch.gif)



## 3. 编辑模式

在一般模式中可以进行删除、复制、粘贴等的动作，但是却无法编辑文件内容的！

需要按下『i, I, o, O, a, A』等任何一个字母之后才会进入编辑模式。

注意了！通常在Linux中，按下这些按键时，在画面的左下方会出现『INSERT或REPLACE』的字样，此时才可以进行编辑。而如果要回到一般模式时，则必须要按下『Esc』这个按键即可退出编辑模式。

<font color=blue>**进入编辑模式**</font>

| 按键 | 功能描述           |
| ---- | ------------------ |
| i    | 当前光标前         |
| a    | 当前光标后         |
| o    | 当前光标行的下一行 |
| I    | 光标所在最行前     |
| A    | 光标所在行最后     |
| O    | 当前光标行的上一行 |

<font color=blue>**退出编辑模式**</font>

按『Esc』键 退出编辑模式，之后所在的模式为一般模式。



## 4. 指令模式

在一般模式当中，输入『 : / ?』3个中的任何一个按钮，就可以将光标移动到最底下那一行。

| 命令                                      | 功能                                   |
| ----------------------------------------- | -------------------------------------- |
| <font color=blue>**:w**</font>            | 保存                                   |
| <font color=blue>**!q**</font>            | 退出                                   |
| <font color=blue>**:!**</font>            | 强制执行                               |
| <font color=blue>**/要查找的词**</font>   | n 查找下一个，N 往上查找               |
| :noh                                      | 取消高亮显示                           |
| <font color=blue>**:set nu**</font>       | 显示行号                               |
| :set nonu                                 | 关闭行号                               |
| <font color=blue>**:%s/old/new/g**</font> | 替换文档中匹配到的所有old为new         |
| :s/old/new                                | 替换当前行匹配到的第一个old为new       |
| :s/old/new/g                              | 替换当前行匹配到的所有old为new         |
| :%s/old/new                               | 替换文档中每一行匹配到的第一个old为new |
| <font color=blue>**:wq!**</font>          | 强制保存退出                           |



## 5. 模式间的切换

![image-20231208213956813](https://gitee.com/tjlxy/img/raw/master/image-20231208213956813.png)