# generate-file-link-tree

## 为什么做这个插件

在写博客的时候每次都自己整理目录，手动维护太烦了，但是在找了一圈后没有支持一键生成 Markdown 文件目录页后还带有跳转链接的，就开发了这款插件。

这是一款专门为生成 Markdown 文件夹的目录页而设计的插件。

## 特点

1. 只处理 Markdown 文件
2. 自动生成 YAML front matter 配置
3. 在遍历文件时如果发现该 Markdown 文件的 YAML front matter 内配置有 title: *, 会自动用 title 内容替换掉目录页显示的文件名
4. 若目录的文件名称重复不会覆盖原文件，而是在后面加个序号

## 使用

在安装后右键左侧的文件夹即可生效。

<img src="https://img.picgo.net/2024/10/22/image-20241022023025674e470ca7c2f284084.png" width='80%'> </img>

<img src="https://img.picgo.net/2024/10/22/image-202410220232006101cf120b74814b1a5.png" width='80%'> </img>

