---
id: availability
title: 可用性
author: xulishan@finogeeks.com
---



&emsp;通常，FinClip 应用服务运行在Kubernetes平台之上，借助Kubernetes的故障自动恢复能力，可以实现后端服

务的自动故障转移，以及多副本部署实现服务高可用。

&emsp;Kubernetes支持管理计算节点，当计算节点发生故障时，集群会自动进行节点排除故障节点，同时当新节点加入 时，可以实现平滑加入集群。

&emsp;对于基础服务，我们在生产环境采用多节点集群模式部署，所有基础服务包括Kafka、Mongo、Redis、 Consul、ElasticSearch等服务都是采用集群模式，因此可以抵抗一定程度的节点宕机情况。

&emsp;Rancher 平台默认情况下拥有出色的容灾能力，默认情况下最小规模集群为 4 节点部署，集群最小可运行状态为 (部署节点 - 失效节点)÷ 2 ≥ 1。基于此，应用服务也享有同样出色的自动迁移、容灾能力。

&emsp;所有基础服务均通过 Docker-Compose 进行部署，Docker-Compose 会为每一个基础服务容器分配守护进程， 当基础服务报错退出后会被严格按照约定数量重新拉起一个或多个基础服务，保证基础服务集群中的节点数量恒 定、保障基础服务集群稳定。
