---
title: 数据缓存
author: xulishan@finogeeks.com
---

# 数据缓存

FinClip采用Redis实现数据缓存功能，Redis 是一种开源(BSD 许可)、内存中数据结构存储的开源软件，通常 用作数据库、缓存和消息代理。 Redis 提供了诸如字符串、散列、列表、集合、带范围查询的排序集合、位图、 超级日志、地理空间索引和流等数据结构。 Redis 内置复制、Lua 脚本、LRU 驱逐、事务和不同级别的磁盘持久 化，并通过 Redis Sentinel 和自动提供高可用性，在实际部署中，我们推荐客户采用Redis的集群模式，以实现高 可用性和可扩展性。



## 部署架构

Redis 的拓扑图如下

![redis](/img/redis.png)

### 服务配置

**实例（Instance）**：此中间件默认（最低）交付状态下为**六实例**部署，互为主从，且从节点宕机不影响主节点使用

**Slot**：16384

> 若 REDIS 发生主从切换，会存在秒级的影响

### 数据目录

| 服务器 | 设计用途                | 路径                          |
| ------ | ----------------------- | ----------------------------- |
| 节点 1 | 持久化数据目录          | /mnt/var/lib/container/redis  |
|        | docker-compose 文件目录 | /mnt/opt/docker-compose/redis |
|        |                         |                               |
| 节点 2 | 持久化数据目录          | /mnt/var/lib/container/redis  |
|        | docker-compose 文件目录 | /mnt/opt/docker-compose/redis |
|        |                         |                               |
| 节点 3 | 持久化数据目录          | /mnt/var/lib/container/redis  |
|        | docker-compose 文件目录 | /mnt/opt/docker-compose/redis |

### 网络

**底层**：此中间件基于 `docker-compose` 启动，`docker-compose` 基于 docker0 虚拟网卡进行通信，因此本中间件在所有服务器上的所有组件，均通过 docker0 网卡划分出的子网进行通信，并且通过 `--network=host`  配置运行。

> 子网网段可以通过 `ifconfig docker0` 进行确认。

**业务层**：

| 服务器 | 设计用途                                                     | 端口  |
| ------ | ------------------------------------------------------------ | ----- |
| 节点 1 | **[占用宿主机固定端口]** Redis 实例 1 对外服务               | 7000  |
|        | **[占用宿主机固定端口]** Redis 实例 2 对外服务               | 7001  |
|        | **[占用宿主机固定端口]** Redis 实例 1 集群 BUS               | 17000 |
|        | **[占用宿主机固定端口]** Redis 实例 2 集群 BUS               | 17001 |
|        | **[占用宿主机固定端口]** Redis 实例 1 Prometheus Metrics 信息提供 | 7200  |
|        | **[占用宿主机固定端口]** Redis 实例 2 Prometheus Metrics 信息提供 | 7201  |
|        |                                                              |       |
| 节点 2 | **[占用宿主机固定端口]** Redis 实例 1 对外服务               | 7000  |
|        | **[占用宿主机固定端口]** Redis 实例 2 对外服务               | 7001  |
|        | **[占用宿主机固定端口]** Redis 实例 1 集群 BUS               | 17000 |
|        | **[占用宿主机固定端口]** Redis 实例 2 集群 BUS               | 17001 |
|        | **[占用宿主机固定端口]** Redis 实例 1 Prometheus Metrics 信息提供 | 7200  |
|        | **[占用宿主机固定端口]** Redis 实例 2 Prometheus Metrics 信息提供 | 7201  |
|        |                                                              |       |
| 节点 3 | **[占用宿主机固定端口]** Redis 实例 1 对外服务               | 7000  |
|        | **[占用宿主机固定端口]** Redis 实例 2 对外服务               | 7001  |
|        | **[占用宿主机固定端口]** Redis 实例 1 集群 BUS               | 17000 |
|        | **[占用宿主机固定端口]** Redis 实例 2 集群 BUS               | 17001 |
|        | **[占用宿主机固定端口]** Redis 实例 1 Prometheus Metrics 信息提供 | 7200  |
|        | **[占用宿主机固定端口]** Redis 实例 2 Prometheus Metrics 信息提供 | 7201  |

## 状态检查

1. 登录到 REDIS 所在的服务器上，执行 `docker exec -it redis-7000 bash` 进入容器

2. 执行`redis-cli -h 127.0.0.1 -p 7000`，并通过命令 `auth <密码>` 登录后，执行`CLUSTER NODES`，确认 6 个节点均已被加入到集群中，并且主节点（Master）、从节点（Slave）应该为同等数量

   > 如有必要，可以检查所有 3 台服务器上的 6 个容器确保集群正常



## 节点增、删

​	**新增节点**：若需要新增节点，请依照下列步骤操作

1. 确认新节点已经安装好 Docker 19.03 或更高版本、已经安装好 docker-compose 1.27 或更高版本
2. 确认新节点对于当前 REDIS 所在的**所有服务器**的 7000、7001、17000、17001、7200、7201 均为互相可达状态
3. 从旧服务器的 “持久化数据目录” 中复制 conf 文件夹的 redis.conf 文件到新服务器的同名目录
4. 从旧服务器的 “docker-compose 文件目录“ 复制 docker-compose.yaml 到新服务器的同名目录
5. 执行 `docker-compose up -d` 启动新 REDIS 实例 1 与实例 2
6. 进入 REDIS 任一实例容器，执行命令 `redis-cli -p 7000 -a '<密码>' --cluster add-node <新节点IP>:<端口> <新节点IP>:<端口>`
7. 登录到 REDIS 命令行并使用密码鉴权后，执行`CLUSTER NODES`，确认新节点均已被加入到集群中，并且主节点（Master）、从节点（Slave）应该为同等数量



​	**删除节点**：若要删除节点，请依照下列步骤操作

1. 主从节点需要分别操作。进入 REDIS 任一实例容器，执行命令 `redis-cli -p 7000 -a '<密码>' --cluster del-node <从节点IP>:<端口>`
2. 执行命令 `redis-cli -p 7000 -a '<密码>' --cluster reshard <主节点IP>:<端口>`，再执行 `redis-cli -p 7000 -a '<密码>' --cluster del-node <主节点IP>:<端口>`
3. 登录到 REDIS 命令行并使用密码鉴权后，执行`CLUSTER NODES`，确认需要移除的节点已被踢出集群，并且主节点（Master）、从节点（Slave）应该为同等数量



## 数据导出、恢复

REDIS 用于做数据缓存，无需备份

