# FinClip运维文档项目

https://devops.finclip.com/

&emsp;[FinClip](https://www.finclip.com/) 是基于自研、领先的小程序容器技术，让任何企业的APP均获得嵌入该容器而瞬间运行小程序的能力，轻松实现移动应用的动态发布，与业务内容的跨端投放。

&emsp;FinClip提供私有化解决方案，本项目旨在提供FinClip私有化的运行维护的文档支持，由FinClip运维团队提供。当然，如果您有意与我们一同完善这个文档项目，也欢迎提交内容到本仓库。

## 安装

&emsp;仓库已配置GitHub Actions，当你提交内容到本仓库之后，可以直接访问 https://devops.finclip.com/ 查看新的内容。

&emsp;当然，你也可以在自己的电脑中运行此文档网站，通过以下命令可以进行安装，需要依赖Node运行环境：

```console
yarn install
```

## 本地开发

```console
yarn start
```

&emsp;这个命令将在你的本地环境启动一个Web服务器，你可以通过访问这个服务实时查看更改。

## 编译

```console
yarn build
```

该命令将文档构建生成静态网页，内容默认回报存在项目目录下的`build`目录。

