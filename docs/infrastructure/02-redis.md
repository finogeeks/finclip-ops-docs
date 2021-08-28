---
title: 数据缓存
author: xulishan@finogeeks.com
---

# 数据缓存

&emsp;FinClip采用Redis实现数据缓存功能，Redis 是一种开源(BSD 许可)、内存中数据结构存储的开源软件，通常 用作数据库、缓存和消息代理。 Redis 提供了诸如字符串、散列、列表、集合、带范围查询的排序集合、位图、 超级日志、地理空间索引和流等数据结构。 Redis 内置复制、Lua 脚本、LRU 驱逐、事务和不同级别的磁盘持久 化，并通过 Redis Sentinel 和自动提供高可用性，在实际部署中，我们推荐客户采用Redis的集群模式，以实现高 可用性和可扩展性。

### Redis集群架构

[Redis](https://redis.io/) 是一个高性能的key-value数据库。目前我们部署的Redis集群部署是这样的：

* 集群共 *6* 个redis实例
* 集群内部 *3* 主 *3* 从模式
* Redis版本：6.0

一般我们采用三台机服务器部署，每台服务器 2 个Redis实例，对于更高的QPS要求，我们推荐使用六台服务器部署，每个服务器一个Redis实例。在总共六个Redis实例里，其中三个Master节点，三个Slave节点，且默认情况下master与slave会自动避免部署在同一台机器中。

Redis的拓扑图如下：

![redis](/img/redis.png)

在这样的架构中：

* 当集群内一个主节点宕机时，其从节点会自动升级成为主节点
* 集群中从节点宕机不影响集群使用
* 可扩容/缩容

### 高可用

* 当集群内一个主节点宕机时，其从节点会自动升级成为主节点
* 集群中从节点宕机不影响集群使用
* 经测试，Redis从宕机不影响业务使用，Redis发生主从切换时，会有秒级影响。

### 扩容和缩容

#### 扩容

启动新的redis实例，然后把新实例加入到集群中，然后给新节点分配数据槽。

1. 假设我们要加入两个新的节点，首先启动连个新的节点，然后执行命令加入（建议成对加入，并使其成为主从(高可用)）

   ```shell
   redis-cli -p 7000 -a 'yourpassword' --cluster add-node 10.0.2.1:7000 10.0.2.3:7000
   ```

   如果你只是想增加slave节点

   ```shell
   redis-cli -p 7000 -a 'yourpassword' --cluster add-node 10.0.2.1:7000 10.0.2.3:7000 --cluster-slave
   ```

2. 查看节点加入成功， 登陆Redis并检查状态正常

   ```shell
   CLUSTER NODES
   ```

3. 给新加的节点分配数据槽，具体怎么分，不同环境不同分配数量，例如:

   我们之前是三对主从，所有数据槽分成了三份，接下来我们加入了一组主从，我们可以将数据槽位平均分配到这四组主从中（redis共有16384个数据槽，那么我们分成4份就是4096）：

   ```shell
   redis-cli --cluster reshard 127.0.0.1:7000
   #输入接受数据槽的节点id
   #输入需要转移数据槽的节点id(或者all)
   #输入yes确认
   ```

4. 迁移完成后，登陆redis中查看节点状态正常即可:

   ```shell
   CLUSTER NODES
   ```

#### 缩容

1. 对于从节点，直接删除即可:

   ```shell
   redis-cli --cluster del-node 127.0.0.1:7000 
   ```

2. 对于主节点，需要入前面步骤那样，把数据槽位移走，再删除即可

   ```shell
   redis-cli -p 7000 --cluster reshard  127.0.0.1:7000
   redis-cli --cluster del-node 127.0.0.1:7000 `<node-id>`
   ```

### 故障和排错

1. 查看节点和集群状态

   ```shell
   CLUSTER NODES
   CLUSTER INFO
   ```

2. 查看logs (in compose)

   ```shell
   docker logs redis_7000
   ```

   查看logs (in k8s)

   ```shell
   kubectl logs -n redis-cluster redis-pod-name
   ```

### 备份与恢复

Redis用于做数据缓存，无需备份.

