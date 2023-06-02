+++
title = "运维架构"
draft = false
weight = 21
template = "docs/page.html"

[extra]
lead = "本节主要介绍部署 FinClip小程序数字化管理系统 架构概览。"
toc = false
top = false
+++

# 架构拓扑

FinClip 后端服务采用 Golang 语言编写，系统架构采用微服务架构，每个服务经过编译之后会被打包成容器，我 们采用业界主流的容器管理平台进行服务编排。此外，FinClip 还依赖部分成熟的开源组件作为基础设施，以实现 业务系统中的数据存储、缓存、消息队列、服务治理等基础功能。

### 架构拓扑：


<img src="/images/finclip-arch.png"  width="800" />
