# 语法
参见：

* [Markdown 语法说明 (简体中文版) ](http://wowubuntu.com/markdown/)
* [GitHub：Mastering Markdown](https://guides.github.com/features/mastering-markdown/)
* [维基百科：Markdown](https://zh.wikipedia.org/wiki/Markdown)
* [简书：Markdown——入门指南](http://www.jianshu.com/p/1e402922ee32#)

# 注意事项
## 转义字符

* 链接中包含** 圆括号**时，用**%28**和**%29**替代，实际上只替换右圆括号即可
* 在Hexo的数学公式中，有花括号***{***时，一般需要放在下面标记中
  ```
  {% raw %}
  ...
  {% endraw %}
  ```
* 另外，如果Hexo解析出错时，也许是由于下面的转义字符

### 转义字符列表
|字符|名称|
|:---|:---|
|\\|反斜线|
|\`|反引号|
|\*|星号|
|\_|底线|
|\{\}|花括号|
|\[\]|方括号|
|\(\)|括弧|
|\# |井字号|
|\+|加号|
|\-|减号|
|\.|英文句点|
|\!|惊叹号|

# 工具
## 本地工具
|工具|简介|
|:---|:---|
|[**Smark**](https://github.com/elerao/Smark)|本地编辑工具，可导出多种格式|
|[**Haroopad**](http://pad.haroopress.com/)|本地编辑工具，可导出：HTML|
|[**MarkDownPad**](http://markdownpad.com/)|本地编辑工具，可导出：HTML，PDF|
|[**Pandoc**](http://pandoc.org/)|本地格式转换工具，支持好多好多种文件格式的互转|


## 在线工具
|工具|简介|
|:---|:---|
|[**作业部落**](https://www.zybuluo.com)|本地编辑工具，可导出：HTML|
|[**马克飞象**](http://maxiang.info/)|本地编辑工具，可导出：HTML，PDF|

# 推荐三款Wiki程序
|程序|简介|
|:---|:---|
|[**TiddlyWiki**](http://tiddlywiki.com/)|本地+在线，适合个人使用，可导出：HTML，JSON，CSV，.tid|
|[**MediaWiki**](https://www.mediawiki.org)|合适做 Wiki 网站|
|[**DokuWiki**](https://www.dokuwiki.org)|合适做 Wiki 网站|
