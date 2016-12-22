# 学习资料
* [汇总](http://www.runoob.com/w3cnote/all-vim-cheatsheat.html)
* [键位图－入门](http://www.runoob.com/wp-content/uploads/2015/10/entry1.png)
* [键位图－进阶](http://www.runoob.com/wp-content/uploads/2015/10/advanced1.png)
* [键位图－增强](http://www.runoob.com/wp-content/uploads/2015/10/morden1.png)
* [键位图－文字](http://www.runoob.com/wp-content/uploads/2015/10/text1.png)

# 常用命令
下载命令可直接在Vim的命令模式下输入，但只当次有效；也可以在配置文件`/etc/vimrc`（有些系统是：`/etc/vim/vimrc`）中设置，永久有效。

| 命令或参数 | 解释说明 |
| :--- | :--- |
| `"` | 单行注释 |
| `set nu` | 显示行号 |
| `set ai` 或 `set autoindent` | 自动缩进 |
| `set smartindent` | 智能缩进 |
| `set cindent` | 针对C语言的自动缩进 |
| `set tabstop=4` | 设置一个Tab键为4个空格 |
| `set shiftwidth=4` | 当行之间交错时使用4个空格 |
| `set showmatch` | 自动匹配，当输入一个左括号时会匹配相应的右括号 |
| `syntax on` | 语法高亮 |
| `set history=1000` | 历史记录行数 |
| `set background=dark` | 使用黑色背景 |
| `set nocompatible` | 去掉有关vi一致性模式，避免以前版本的bug和局限 |
| `set guioptions-=T` | 去除vim的GUI版本中得toolbar |
| `set ruler` | 在编辑过程中，在右下角显示光标位置的状态行 |


更多参数可以参见配置文件`vimrc`，或参考：[官方帮助文档](http://www.vim.org/docs.php)