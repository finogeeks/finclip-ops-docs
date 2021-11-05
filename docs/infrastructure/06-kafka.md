---
title: 消息队列
author: xulishan@finogeeks.com
---

# 消息队列

在高并发系统中，使用消息队列进行异步处理是惯用的模式。FinClip 采用 Kafka 作为消息队列中间件，基于 Kafka 的多分区设计，可以实现高吞吐量消息队列管理。Apache Kafka 是一个开源分布式事件流平台，被数千家 公司用于高性能数据管道、流分析、数据集成和关键任务应用程序。

同样地，在生产系统中，我们推荐使用多节点部署Kafka集群，从而实现高吞吐量、高可用已经可扩展的运维功 能:



## 部署架构

Kafka 的拓扑图如下

![kafka](/img/kafka.png)



### 服务配置

​	**节点（Broker）**：此中间件默认（最低）交付状态下为**三节点集群**部署。

​	**分区（Partition）**：此中间件默认（最低）分区为 **2**。

​	**备份（replication）**：此中间件默认（最低）备份 factor 为 **2**。

### 数据目录

| 服务器 | 设计用途                | 路径                          |
| ------ | ----------------------- | ----------------------------- |
| 节点 1 | 持久化数据目录          | /mnt/var/lib/container/kafka  |
|        | docker-compose 文件目录 | /mnt/opt/docker-compose/kafka |
|        |                         |                               |
| 节点 2 | 持久化数据目录          | /mnt/var/lib/container/kafka  |
|        | docker-compose 文件目录 | /mnt/opt/docker-compose/kafka |
|        |                         |                               |
| 节点 3 | 持久化数据目录          | /mnt/var/lib/container/kafka  |
|        | docker-compose 文件目录 | /mnt/opt/docker-compose/kafka |

### 网络

​	**底层**：此中间件基于 `docker-compose` 启动，`docker-compose` 基于 docker0 虚拟网卡进行通信，因此本中间件在所有服务器上的所有组件，均通过 docker0 网卡划分出的子网进行通信，并且通过 `--network=host`  配置运行。

> 子网网段可以通过 `ifconfig docker0` 进行确认。

​	**业务层**：

| 服务器 | 设计用途                                             | 端口 |
| ------ | ---------------------------------------------------- | ---- |
| 节点 1 | **[占用宿主机固定端口]** 对外服务                    | 9092 |
|        | **[占用宿主机固定端口]** 集群内部通信                | 9093 |
|        | **[占用宿主机固定端口]** Prometheus Metrics 信息提供 | 9308 |
|        |                                                      |      |
| 节点 2 | **[占用宿主机固定端口]** 对外服务                    | 9092 |
|        | **[占用宿主机固定端口]** 集群内部通信                | 9093 |
|        | **[占用宿主机固定端口]** Prometheus Metrics 信息提供 | 9308 |
|        |                                                      |      |
| 节点 3 | **[占用宿主机固定端口]** 对外服务                    | 9092 |
|        | **[占用宿主机固定端口]** 集群内部通信                | 9093 |
|        | **[占用宿主机固定端口]** Prometheus Metrics 信息提供 | 9308 |



## 状态检查

正常情况下 Kafka 不会有启动问题，若日志中存在下列字样且没有任何报错，即可判断为启动成功。

```
……
Connecting to zookeeper on <Zookeeper服务器1 IP>:2181,<Zookeeper服务器2 IP>:2181,<Zookeeper服务器3 IP>:2181 (kafka.server.KafkaServer)
[ZooKeeperClient Kafka server] Initializing a new session to <Zookeeper服务器1 IP>:2181,<Zookeeper服务器2 IP>:2181,<Zookeeper服务器3 IP>:2181. (kafka.zookeeper.ZooKeeperClient)
……
Initiating client connection, connectString=<Zookeeper服务器1 IP>:2181,<Zookeeper服务器2 IP>:2181,<Zookeeper服务器3 IP>:2181 sessionTimeout=6000 watcher=kafka.zookeeper.ZooKeeperClient$ZooKeeperClientWatcher$@1aafa419 (org.apache.zookeeper.ZooKeeper)
[KafkaServer id=2] started (kafka.server.KafkaServer)
```



## 节点增、删

​	节点由 Zookeeper 进行控制，Zookeeper 根据 `docker-compose` 启动时调用的 docker-compose.yaml 文件中声明的 `service.kafka.environment` 中的 `KAFKA_BROKER_ID` 自动创建。

​	**新增节点**：若需要新增节点，请依照下列步骤操作

1. 确认新节点已经安装好 Docker 19.03 或更高版本、已经安装好 docker-compose 1.27 或更高版本
2. 确认新节点对于当前 Kafka 所在的**所有服务器**的 9092、9093、9308 均为互相可达状态
3. 在 Kafka 所在的**所有服务器**上，切换至 docker-compose.yaml 文件所在目录
4. 在 Kafka 所在的**所有服务器**上执行 `docker-compose down` 停止所有 Kafka 服务
5. 复制 docker-compose.yaml 文件到新节点上
6. 在新增的节点上修改 docker-compose.yaml 文件，为 `service.kafka.environment` 中的 `KAFKA_BROKER_ID` 分配一个新的、与其他节点不重复的数字，通常建议为旧 Broker 数量+1
7. 在 Kafka 所在的**所有服务器**上执行 `docker-compose up -d` 启动所有 Kafka 服务
8. 等待约 2 分钟让集群启动。若 Partition 数据较多可能会需要更长的时间以同步数据
9. 执行 “状态检查” 中的步骤，确保 Kafka 正确启动。



​	**删除节点**：若需要移除节点，请依照下列步骤操作

1. 登录到希望移除 Kafka 的宿主机上
2. 执行 `docker exec -it kafka bash` 进入容器
3. 执行 `./kafka-reassign-partitions.sh`  移除 Partition 记录
4. 进入 docker-compose 文件目录，执行 `docker-compose down` 关闭 Kafka 服务



## 数据导出、恢复

Kafka 依托于 Zookeeper 运行，同时 Topic 数据直接写入宿主机目录，因此备份通常与 Zookeeper 一并进行，且两者的备份均通过打包、迁移数据目录完成，恢复同理。



## 常见灾难场景

1. **Q**：连不上 Zookeeper 导致 Broker 无法选举 Master

   **A**：检查 Zookeeper 启动状态、确保 2181 端口未被占用或可达

2. **Q**：Configured broker.id × doesn't match stored broker.id ×

   **A**：此情况通常出现在手动迁移节点后出现，docker-compose.yaml 文件中的 Broker ID 与宿主机上储存的文件的 Broker ID 无法对应，修改对应服务器的 /mnt/var/lib/container/kafka/meta.properties 或 docker-compose.yaml 文件 `service.environment` 中的 `KAFKA_BROKER_ID` 即可，修改完毕后分别执行 `docker-compose down` 与 `docker-compose up -d`。
