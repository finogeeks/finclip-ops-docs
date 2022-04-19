---
title: 数据存储
author: xulishan@finogeeks.com
---

#  数据存储

FinClip 数据存储支持多种数据库，通常我们采用 MySQL 作为主要的数据存储方案。在实际部署中，我们推荐小规模集群的客户使用 MySQL 的半同步 + GTID + 双主模式，满足高性能需求；对于大规模集群部署的客户，我们推荐 一主多从或 Galera 集群，以满足可扩展、高可用的运维需求。



## 部署架构

MongoDB 的拓扑图如下


![mysql](/img/mysql.png)



### 服务配置

**节点（node）**：此中间件默认（最低）交付状态下为**双主**部署。

### 数据目录

| 服务器 | 设计用途                | 路径                          |
| ------ | ----------------------- | ----------------------------- |
| 节点 1 | 持久化数据目录          | /mnt/var/lib/container/mysql  |
|        | docker-compose 文件目录 | /mnt/opt/docker-compose/mysql |
|        |                         |                               |
| 节点 2 | 持久化数据目录          | /mnt/var/lib/container/mysql  |
|        | docker-compose 文件目录 | /mnt/opt/docker-compose/mysql |

### 网络

**底层**：此中间件基于 `docker-compose` 启动，`docker-compose` 基于 docker0 虚拟网卡进行通信，因此本中间件在所有服务器上的所有组件，均通过 docker0 网卡划分出的子网进行通信，并且通过 `--network=host`  配置运行。

> 子网网段可以通过 `ifconfig docker0` 进行确认。

**业务层**：

| 服务器 | 设计用途                                             | 端口 |
| ------ | ---------------------------------------------------- | ---- |
| 节点 1 | **[占用宿主机固定端口]** 对外服务                    | 3306 |
|        | **[占用宿主机固定端口]** Prometheus Metrics 信息提供 | 9104 |
|        |                                                      |      |
| 节点 2 | **[占用宿主机固定端口]** 对外服务                    | 3306 |
|        | **[占用宿主机固定端口]** Prometheus Metrics 信息提供 | 9104 |

## 状态检查

1. 登录到 MySQL 所在的服务器上，执行 `docker exec -it mysql bash` 进入容器
2. 在容器中的 Shell 执行 `mysql -uroot -p` 命令，输入密码登录，
4. 执行 `show slave status\G` 确认主从状态，``IO_Running` 与 `SQL_Running` 需要均为 `YES`。

## 节点增、删

​	**新增节点**：若需要新增节点，请依照下列步骤操作

1. 确认新节点已经安装好 Docker 19.03 或更高版本、已经安装好 docker-compose 1.27 或更高版本；
2. 确认新节点对于当前 MySQL 所在的**所有服务器**的 3306、9104 均为互相可达状态；
3. 从旧服务器的 “持久化数据目录” 中复制 conf 文件夹的 mysql.cnf 文件到新服务器的同名目录，并修改 `server_id` 递增 1，同时初次启动需要暂时注释 `rpl` 开头的配置项；
4. 从旧服务器的 “docker-compose 文件目录“ 复制 docker-compose.yaml 到新服务器的同名目录
5. 执行 `docker-compose up -d` 启动新 MySQL 实例；
6. 观察日志，启动完成后，反注释掉 conf 文件夹中 mysql.cnf 文件里的 `#rpl` 开头的命令，然后执行 `docker-compose down && docker-compose up -d`；
7. 在新的节点上，登录进容器，执行主从创建命令，命令详情见下文；
8. 执行命令 `start slave;` 与 `unlock tables;` ，启用主从同步；
9. 稍等一会儿，再次执行 `show slave status\G` 确认集群状态



​	**删除节点**：若需要移除节点，请依照下列步骤操作

1. 登录到需要移除的节点上，进入 mysql，执行命令主从停止命令，命令详情见下文；
2. 进入 “docker-compose 文件目录“ ，执行 `docker-compose down`  关闭容器

```
主从创建命令
1. 锁表，防止数据不同步
flush tables with read lock;
2. 创建主从
change master to master_host='[主库地址]', master_port=3306, master_user='[主库的主从同步账户名]', master_password='[主库的主从同步密码]', master_auto_position=1;

主从停止命令，也可用于主从配置错误时，清空主从配置
1. 停止主从
stop slave;
2. 清空主从配置
reset slave;
```



## 数据导出、恢复

* 方法一：直接存档数据目录

  MySQL 在启动时支持自动载入旧数据，当部署服务器的 IP 不存在变动的情况时，可以选择直接针对数据目录进行压缩存档的方式保存数据库；若存在 IP 变动、节点新增或减少，也仍然可按照此方法分别放置主库与从库的数据存档到相应目录，但需要重新针对数据库的集群信息进行修改。

* 方法二： mysqldump 

  部署所使用到的 MySQL 镜像中默认包含 mysqldump 命令，可以使用以下命令对 finclip 业务库进行 dump 备份：

  ```
  mongodump  -u[用户名] -p[密码] --host=[主库IP] --database  finclip > /[文件]/[输出]/[路径].sql
  ```
  
    参数说明：

  `-u`： 用户名，用户名与 -u 之间不带空格

  `-p`： 密码，密码与 -p 之间不带空格

  `--host`： 数据库访问地址

  `--database`： 数据库，默认为 finclip

   

  可以使用以下命令对 finclip 库进行数据恢复：

    ```
    mysql  -u[用户名] -p[密码] --host=[主库IP] finclip < /[文件]/[输出]/[路径].sql
    ```

  

## 常见灾难场景

MySQL 默认状态下为双主-互为主从式部署，若其中主节点故障下线，另一个主库会挂起写入 30 秒，超时后会继续接受写入，但是与另一主库的同步会从半同步降级到非实时同步，实现一定程度上的故障转移；当下线的主节点恢复上线时，会自动恢复主从并从正在运行的主库里读取缺失的数据。只要保证提供一定数量的从节点，则集群就能拥有一定能力的故障转移能力。

若发生数据库所有节点全部瘫痪的情况，请按照以下步骤进行数据库重新部署流程：

1. 打包并存档数据库目录、数据库配置；

2. 此时业务服务已经无法对数据库进行任何写入了，可以暂停生产上的所有服务；

3. 严格按照路径、文件权限设置，将数据目录与必要文件上传并恢复到新的服务器上；

4. 注释掉 mysql.cnf 配置文件中关于 `rpl` 的配置后，在新服务器上重新执行 docker-compose 拉起数据库；

5. 观察日志，启动完成后，反注释掉 conf 文件夹中 mysql.cnf 文件里的 `#rpl` 开头的命令，然后执行 `docker-compose down && docker-compose up -d`；

6. 数据库启动后，在新的 MySQL 节点上，按照以下步骤进行 IP 变更：

   ```
   1. 登入 mysql
      mysql -u <用户名> -p<密码>
   
   2. 停止主从
      stop slave;
   
   3. 清空主从配置
      reset slave;
   
   4. 锁表，防止数据不同步
      flush tables with read lock;
   
   5. 创建主从
      change master to master_host='[主库地址]', master_port=3306, master_user='[主库的主从同步账户名]', master_password='[主库的主从同步密码]', master_auto_position=1;
   
   6. 启用主从
      start slave;
   
   7. 解锁表
      unlock tables;
   ```

7. 核查启动日志，确保正常启动；

8. 修改 Kubernetes Service 中的 exteral-mysql-server 解析的 IP 地址，指向到新的服务器上。
