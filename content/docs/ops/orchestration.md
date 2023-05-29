+++
title = "服务编排"
date = 2021-05-01T08:00:00+00:00
updated = 2021-05-01T08:00:00+00:00
draft = false
weight = 31
template = "docs/page.html"

[extra]
toc = false
top = false
+++

&emsp;FinClip后端服务编排以及服务的生命周期管理。其中包括业务服务务采用容器化部署，通过Kubernetes做服部 署上线、故障恢复、扩容/缩容、滚动更新等操作。借助Kubernetes提供的运维能力，我们可以实现业务的管理灵 活性、高可用性和可扩展性。



### Kubernetes

&emsp;Kubernetes是一款开源的容器管理引擎。它提供容器的部署、生命周期维护、高可用等功能。以下是 Kubernetes集群架构图，其中:

* etcd是集群存储，用于存储集群所有的状态数据 
* APIServer作为API总入口，接受所有其他组件的请求以操作
* etcd Scheduler用于评估调度策略
* Controller-Manager是集群对象管理器 
* Kubectl和Kube-Proxy部署在计算节点中，从而管理节点上运行的容器服务


<img src="/images/kubernetes-architecture.png"  width="800" />
