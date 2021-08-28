---
title: 服务治理
author: xulishan@finogeeks.com
---

### consul集群架构

&emsp;FinClip后端采用微服务架构开发模式，在微服务中，服务治理是非常重要的一环。服务通过注册到服务中心，以 供其他服务寻得接又调用地址，从而实现架构内部的服务间调用。FinClip采用Consul作为服务治理中心，在部分 场景，Consul还充当配置中心的作用。

Consul分为Server节点和Client节点，在我们使用的架构中，K8S集群中的每个节点会部署普通节点(client agent)， 在Kubernetes集群外的宿主机上部署的三个Server节点 (server节点是数据集群，普通agent只负责请求转发和心跳检测等)。

架构图如下所示：

![consul](/img/consul.png)

在这样的架构中， Consul服务端使用Raft选举，因此最少三个节点，且宕机数量不可超过半数，推荐单数节点，例如3、5、7。：

* Server节点部署在宿主机之中，使用docker-compose启动
* Client节点部署在Kubernetes中，使用DaemonSet部署。
* 集群必须 (N / 2) + 1个节点存活

### 高可用

* 当集群内LEADER节点宕机时，会发生选举，产生新的LEADER节点，集群可用
* 当节点宕机数量大于Server / 2 时，集群不可用
* 可扩容/缩容

### 扩容和缩容

#### 扩容

1. 对于普通节点，我们使用了Kubernetes的DaemonSet部署，当Kubernetes新增计算节点时，Consul客户端节点会自动部署。

2. 对于Server节点，启动时加上-server标签即可，且推荐保持总Server数是单数，例如：

   ```shell
   -server
   -retry-join=10.0.2.12
   -retry-join=10.0.2.3
   -retry-join=10.0.2.2
   ```

#### 缩容

1. 在节点中执行离开集群即可：

   ```shell
   consul level
   ```

### 故障和排错

1. 检查集群健康状态：

   ```shell
   consul info
   ```

2. 查看集群节点及健康状态：

   ```shell
   consul members
   ```

3. 查看consul日志

   ```shell
   docker logs consul
   ```

### 备份与恢复

无重要数据，只做服务协调功能，无需备份.



