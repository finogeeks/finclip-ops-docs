---
id: finclip-ops-architecture
title: 运维架构
---

# 架构拓扑



### 说明

&emsp;FinClip后端服务采用Golang语言编写，系统架构采用微服务架构，每个服务经过编译之后会被打包成容器，我 们采用业界主流的容器管理平台进行服务编排。此外，FinClip还依赖部分成熟的开源组件作为基础设施，以实现 业务系统中的数据存储、缓存、消息队列、服务治理等基础功能。

### 架构拓扑：

![arch](/img/architecture.png)

