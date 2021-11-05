---
title: 数据存储
author: xulishan@finogeeks.com
---

#  数据存储

FinClip 数据存储支持多种数据库，通常我们采用 MongoDB 作为主要的存储方案，MongoDB 是一个基于分 布式文件存储的数据库，由 C++ 语言编写，旨在为 WEB 应用提供可扩展的高性能数据存储解决方案，且支持多 机房部署。 在实际部署中，我们推荐客户使用 MongoDB 的副本集、分片模式，以满足可扩展、高可用的运维需 求。



## 部署架构

MongoDB 的拓扑图如下


![mongo](/img/mongo.png)



### 服务配置

**节点（Replica）**：此中间件默认（最低）交付状态下为**三副本集**部署。

### 数据目录

| 服务器 | 设计用途                | 路径                          |
| ------ | ----------------------- | ----------------------------- |
| 节点 1 | 持久化数据目录          | /mnt/var/lib/container/mongo  |
|        | docker-compose 文件目录 | /mnt/opt/docker-compose/mongo |
|        |                         |                               |
| 节点 2 | 持久化数据目录          | /mnt/var/lib/container/mongo  |
|        | docker-compose 文件目录 | /mnt/opt/docker-compose/mongo |
|        |                         |                               |
| 节点 3 | 持久化数据目录          | /mnt/var/lib/container/mongo  |
|        | docker-compose 文件目录 | /mnt/opt/docker-compose/mongo |

### 网络

**底层**：此中间件基于 `docker-compose` 启动，`docker-compose` 基于 docker0 虚拟网卡进行通信，因此本中间件在所有服务器上的所有组件，均通过 docker0 网卡划分出的子网进行通信，并且通过 `--network=host`  配置运行。

> 子网网段可以通过 `ifconfig docker0` 进行确认。

**业务层**：

| 服务器 | 设计用途                                             | 端口  |
| ------ | ---------------------------------------------------- | ----- |
| 节点 1 | **[占用宿主机固定端口]** 对外服务                    | 27017 |
|        | **[占用宿主机固定端口]** Prometheus Metrics 信息提供 | 9216  |
|        |                                                      |       |
| 节点 2 | **[占用宿主机固定端口]** 对外服务                    | 27017 |
|        | **[占用宿主机固定端口]** Prometheus Metrics 信息提供 | 9216  |
|        |                                                      |       |
| 节点 3 | **[占用宿主机固定端口]** 对外服务                    | 27017 |
|        | **[占用宿主机固定端口]** Prometheus Metrics 信息提供 | 9216  |

## 状态检查

1. 登录到 MongoDB 所在的服务器上，执行 `docker exec -it mongo bash` 进入容器
2. 在容器中的 Shell 执行 mongo，确认命令行头为 `rs0:PROMARY> `，如果为 `rs0:SECONDARY> ` 则换另一台部署了 MongoDB 的服务器，重复步骤 1 与步骤 2，直到命令行头为 `rs0:PROMARY> `。
3. 执行 `use admin` 切换到 admin 库，然后执行 `db.auth('<用户名>','<密码>')` 使用高权限账号登录到数据库
4. 执行 `rs.status();` 确认集群状态

> 也可通过下列命令查询慢 SQL 或操作时间过长的动作
>
> `db.currentOp({"active" : true,"secs_running" : { "$gt" : 2000 }});`

## 节点增、删

​	**新增节点**：若需要新增节点，请依照下列步骤操作

1. 确认新节点已经安装好 Docker 19.03 或更高版本、已经安装好 docker-compose 1.27 或更高版本
2. 确认新节点对于当前 MongoDB 所在的**所有服务器**的 27017、9216 均为互相可达状态
3. 从旧服务器的 “持久化数据目录” 中复制 conf 文件夹的 mongo.conf 文件到新服务器的同名目录
4. 从旧服务器的 “docker-compose 文件目录“ 复制 docker-compose.yaml 到新服务器的同名目录
5. 执行 `docker-compose up -d` 启动新 MongoDB 实例
6. 在旧集群的 PRIMARY 节点上，执行命令 `rs.add("<新服务器IP>:<端口>");`
7. 稍等一会儿，再次执行 `rs.status();` 确认集群状态



​	**删除节点**：若需要移除节点，请依照下列步骤操作

1. 登录到集群的 PRIMARY 节点上，执行命令 `rs.remove("<需要移除的服务器IP>:<端口>");`
2. 稍等一会儿，再次执行 `rs.status();` 确认集群状态

## 数据导出、恢复

* 方法一：直接存档数据目录

  MongoDB 在启动时支持自动载入旧数据，当部署服务器的 IP 不存在变动的情况时，可以选择直接针对数据目录进行压缩存档的方式保存数据库；若存在 IP 变动、节点新增或减少，也仍然可按照此方法分别放置主库与从库的数据存档到相应目录，但需要重新针对数据库的集群信息进行修改。

* 方法二：`mongodump` 、`mongorestore`

  > `mongodump` 与 `mongorestore` 命令可能会随着版本变化存在差异，请以官方文档为准

  部署所使用到的 MongoDB 镜像中默认包含 `mongodump` 与 `mongorestore` 命令，可以使用以下命令对整个集群（包括从库）进行全量 dump 备份：

  ```
  mongodump -u <用户名> -p <密码> -h "rs0/<主库IP>:<端口>,<从库1IP>:<端口>,<从库2IP>:<端口>" --oplog -o /<文件>/<输出>/<路径>
  ```

  参数说明：

  `-u`：用户名

  `-p`：密码

  `-h`：数据库访问地址，因为是针对集群 dump，所以必须要带上 ReplicaSet Name 参数，默认为 `rs0`，但 `<库IP>:<端口>` 的具体参数请依据你当前的网络环境进行修改。如果是容器内 dump，则可以直接使用 DNS Name，比如 “mongo-cluster-0.storage.svc.cluster.local”，在容器外则需要使用具体的 “POD IP”。

  `--oplog`：是否启用 oplog 来对数据库做点对点的镜像

  `-o`：输出到文件，请注意容器内输出对写入目录有权限上的限制，只能输出到 log 文件夹

  

  可以使用以下命令对整个集群（包括从库）进行数据恢复：

  ```
  mongorestore -u <用户名> -p <密码> -h "rs0/<主库IP>:<端口>,<从库1IP>:<端口>,<从库2IP>:<端口>" --oplogReplay /<文件>/<输出>/<路径>
  ```

  



## 常见灾难场景

MongoDB 默认状态下为多点主从式部署，若其中主节点故障下线，心跳检测失败后会自动在从节点中选举出新的主节点，实现故障转移；当下线的主节点恢复上线时，会自动切换到从节点模式。只要保证提供一定数量的从节点，则集群就能拥有一定能力的故障转移能力。

若发生数据库所有节点全部瘫痪的情况，请按照以下步骤进行数据库重新部署流程：

1. 打包并存档数据库目录、数据库配置；

2. 此时业务服务已经无法对数据库进行任何写入了，可以暂停生产上的所有服务；

3. 严格按照路径、文件权限设置，将数据目录与必要文件上传并恢复到新的服务器上；

4. 在新服务器上重新执行 docker-compose 拉起数据库；

5. 数据库启动后，在所有 MongoDB 节点上，按照以下步骤进行 IP 变更：

   ```
   1. 登入 mongoCLI
   	# mongo -u <用户名> -p <密码>
   	
   2. 进入 local 库
   	> use local
   	
   3. 确认主从配置
   	> db.system.replset,find()
   | 如果此条命令报鉴权失败，请切换到 admin 库，执行 db.grantRolesToUser("admin(或任何用户)", [{role: "clusterAdmin", db: "admin"}])
   
   4. 更改集群 IP 配置
   	> db.system.replset.update({“host”: "${oldIP}:${port}"},{$set:{"${host}": "${newIP}:${port}"}})
   	
   5. 重启数据库
   ```

6. 核查启动日志，确保正常启动；

7. 修改业务服务中的 MongoDB 连接地址，指向到新的服务器上。
