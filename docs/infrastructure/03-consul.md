---
title: 服务治理
author: xulishan@finogeeks.com
---

# 服务治理

FinClip 后端采用微服务架构开发模式，在微服务中，服务治理是非常重要的一环。服务通过注册到服务中心，以 供其他服务寻得接又调用地址，从而实现架构内部的服务间调用。FinClip 采用Consul作为服务治理中心，在部分 场景，Consul 还充当配置中心的作用。

Consul 分为 Server 节点和 Client 节点，在我们使用的架构中，K8S集群中的每个节点会部署普通节点 (client agent)， 在 Kubernetes 集群外的宿主机上部署的三个 Server 节点 ( server 节点是数据集群，普通 agent 只负责请求转发和心跳检测等)。



## 部署架构

Consul 的拓扑图如下

![consul](/img/consul.png)



### 服务配置

**实例（Instance）**：此中间件默认（最低）交付状态下为**四实例**部署

### 数据目录

| 服务器 | 设计用途                | 路径                           |
| ------ | ----------------------- | ------------------------------ |
| 节点 1 | 持久化数据目录          | /mnt/var/lib/container/consul  |
|        | docker-compose 文件目录 | /mnt/opt/docker-compose/consul |
|        |                         |                                |
| 节点 2 | 持久化数据目录          | /mnt/var/lib/container/consul  |
|        | docker-compose 文件目录 | /mnt/opt/docker-compose/consul |
|        |                         |                                |
| 节点 3 | 持久化数据目录          | /mnt/var/lib/container/consul  |
|        | docker-compose 文件目录 | /mnt/opt/docker-compose/consul |
|        |                         |                                |
| 节点 4 | 持久化数据目录          | /mnt/var/lib/container/consul  |
|        | docker-compose 文件目录 | /mnt/opt/docker-compose/consul |

### 网络

**底层**：此中间件基于 `docker-compose` 启动，`docker-compose` 基于 docker0 虚拟网卡进行通信，因此本中间件在所有服务器上的所有组件，均通过 docker0 网卡划分出的子网进行通信，并且通过 `--network=host`  配置运行。

> 子网网段可以通过 `ifconfig docker0` 进行确认。

**业务层**：

| 服务器 | 设计用途                                             | 端口 |
| ------ | ---------------------------------------------------- | ---- |
| 节点 1 | **[占用宿主机固定端口]** 对外服务                    | 8500 |
|        | **[占用宿主机固定端口]** Prometheus Metrics 信息提供 | 9107 |
|        |                                                      |      |
| 节点 2 | **[占用宿主机固定端口]** 对外服务                    | 8500 |
|        | **[占用宿主机固定端口]** Prometheus Metrics 信息提供 | 9107 |
|        |                                                      |      |
| 节点 3 | **[占用宿主机固定端口]** 对外服务                    | 8500 |
|        | **[占用宿主机固定端口]** Prometheus Metrics 信息提供 | 9107 |
|        |                                                      |      |
| 节点 4 | **[占用宿主机固定端口]** 对外服务                    | 8500 |
|        | **[占用宿主机固定端口]** Prometheus Metrics 信息提供 | 9107 |



## 状态检查

执行命令 `docker exec -it consul sh` 进入 Consul 容器，再执行 `consul operator raft list-peers`，确认 Node 列表中列出了所有的、已经部署了 Consul 的服务器，且 State 列表存在且只存在 1 个 leader，则代表集群为健康状态。

## 节点增、删

节点由 `docker-compose` 启动时调用的 docker-compose.yaml 文件控制。配置位于于项 `services.consul.command` 中的 `-retry-join`。

​	**新增节点**：若需要新增节点，请依照下列步骤操作

1. 确认新节点已经安装好 Docker 19.03 或更高版本、已经安装好 docker-compose 1.27 或更高版本
2. 确认新节点的 IP 地址
3. 确认新节点对于当前 Consul 所在的**所有服务器**的 8500、9107 均为互相可达状态
4. 在 Consul 所在的**所有服务器**上，切换至 docker-compose.yaml 文件所在目录
5. 在 Consul 所在的**所有服务器**上执行 `docker-compose down` 停止所有 Consul 服务
6. 在 Consul 所在的**所有服务器**上，编辑 docker-compose.yaml 文件中上述的值，另起一行，以反斜线 `\` 分割，并新增一个可达的 IP 地址
7. 复制 docker-compose.yaml 文件到新节点上
8. 在 Consul 所在的**所有服务器**上执行 `docker-compose up -d` 启动所有 Consul 服务
9. 等待约 30 秒让集群启动
10. 执行 “状态检查” 中的步骤



​	**删除节点**：若要移除任一节点，请依照下列步骤操作

 	1. 在 Consul 所在的**所有服务器**上，切换至 docker-compose.yaml 文件所在目录
 	2. 在 Consul 所在的**所有服务器**上执行 `docker-compose down` 停止所有 Consul 服务
 	3. 在 Consul 所在的**所有服务器**上，编辑 docker-compose.yaml 文件中上述的值，找到需要移除的服务器，整行完整删除
 	4. 在需要移除 Consul 的节点上删除 docker-compose.yaml 文件
 	5. 在 Consul 所在的**所有服务器**上执行 `docker-compose up -d` 启动所有 Consul 服务
 	6. 等待约 30 秒让集群启动
 	7. 执行 “状态检查” 中的步骤



## 数据导出、恢复

Consul 用于做服务发现，无需备份



## 灾难场景

1. **Q**：Consul 无法启动，集群无法建立

   **A**：Consul 在设计以及逻辑上均为简单程序模型，执行 `docker logs --tail=100 -f consul` 查看日志，并根据对应日志的错误进行修改。

2. **Q**：Node name conflicts with another node at <节点IP>:<端口>. Names must be unique!

   **A**：节点与节点的 Hostname 重复了，通过 `hostname` 命令重设其中一个重复名称的服务器，再在所有 Consul 服务器上执行 `docker-compose down` 与 `docker-compose up -d` 令集群重新建立
