# generate-file-link-tree

## 为什么做这个插件

在写博客的时候每次都自己整理目录，手动维护太烦了，但是在找了一圈后没有支持一键生成Markdown文件夹后还带有跳转链接的，就开发了这款插件，专门为生成Markdown文件夹的目录页而设计。

## 特点

1. 只处理Markdown文件
2. 自动生成YAML front matter配置
3. 在遍历文件时如果发现该Markdown文件的YAML front matter内配置有title: *,会自动用title内容替换掉目录页显示的文件名
4. 若目录的文件名称重复不会覆盖原文件，而是在后面加个序号

## 使用

在安装后右键左侧的文件夹即可生效。
