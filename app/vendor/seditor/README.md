SEditor[v1.1.0]
=========

**SEditor 元素样式可视化编辑器**

SEditor是由机汇网web前端研发部开发所见即所得元素样式编辑器，具有轻量，可定制，注重用户体验等特点。

## 入门部署和体验 ##

### 第一步：下载编辑器 ###

下载seditor最新版: [[https://github.com/zjutwyj/seditor.git]](https://github.com/zjutwyj/seditor.git "https://github.com/zjutwyj/seditor.git")

### 第二步：创建demo文件 ###
解压下载的包，在解压后的目录创建demo.html文件，填入下面的html代码, 或查看example文件夹下的demo.html
本人使用的是art.dialog插件与contextmenu右键插件，用户可以按需自行加载

```html
<!DOCTYPE HTML>
<html lang="en-US">
<head>
	<meta charset="UTF-8">
	<title>seditor demo</title>
	<!--artDialog style-->
    <link rel="stylesheet" href="../vendor/artDialog_v6/css/ui-dialog.css" />
    <!--contextmenu style-->
    <link rel="stylesheet" href="vendor/contextmenu/contextmenu.css"/>
    <!--demo style-->
    <link rel="stylesheet" href="example/styles/style.css" />
    <!--jQuery javascript-->
    <script type="text/javascript" src="vendor/jquery/jquery.min.js"></script>
    <!--artDialog javascript-->
    <script type="text/javascript" src="../vendor/artDialog_v6/dialog.js"></script>
    <script type="text/javascript" src="../vendor/artDialog_v6/dialog-plus.js"></script>
    <script type="text/javascript" src="vendor/contextmenu/jquery.contextmenu.r2.js"></script>
</head>
<body>
    <div class="sEdit">点击我右键</div>
    <script type="text/javascript" src="example/scripts/demo.js"></script>
</body>
</html>
```

### 第三步：在浏览器打开demo.html ###

如果看到了下面这样的编辑器，恭喜你，初次部署成功！

![部署成功](http://h.hiphotos.bdimg.com/album/h%3D370%3Bq%3D90/sign=bfd0d40eb9a1cd111ab674278929b9c1/1b4c510fd9f9d72a27552023d72a2834349bbbde.jpg)


## 联系我们 ##

email: [zjut_wyj@163.com](mailto://email:zjut_wyj@163.com "发邮件给seditor开发组")