---
id: scalability
title: 可扩展性
author: xulishan@finogeeks.com
---

&emsp;FinClip 应用服务基于 Rancher 部署，Rancher 为 Kubernetes 的第三方发行版。Kubernetes 自身具有扩编、 缩容等特性，在可扩展性上存在良好的支持。 FinClip 的基础服务基于 Docker-Compose 部署，Docker- Compose 为 Docker 官方的应用编排工具。所有基础服务均以集群形式进行部署，在可扩展性上存在良好的支 持。

&emsp;部署默认情况下应用服务通过 Rancher 进行管理，Rancher 能够动态对应用服务进行扩编、缩容、重新部署等操作。

### 计算节点扩容/缩容:

&emsp;部署默认情况下通过 Ansible 调用 RKE 部署，RKE(Rancher Kubernetes Engine)为 Rancher 的官方命

令行部署工具。该工具支持根据配置文件对整个集群的计算节点进行扩编、缩容管理。

### 基础服务扩容/缩容:
&emsp;FinClip 所用到的所有基础服务均以集群方式部署，所有集群均支持节点的扩编、缩容管理。
