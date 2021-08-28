---
title: 概述
author: xulishan@finogeeks.com
---

&emsp;FinClip后端服务构建于优秀的开源基础设施之上。这些基础组件用于实现必要的业务处理，其中包括数据存储、

缓存、消息队列、服务治理等等。

### 基础服务

Mop构建于部分优秀的开源组件之上，本章主要涵盖这些开源组件的维护与管理。目前组件主要包含：

|  组件名称        | 运行模式 | 功能                             |
|  --------------  | -------- | -------------------------------- |
|  Redis           | 集群模式 | 缓存，用于加速服务读写速度       |
|  Zookeeper       | 集群模式 | Kafka依赖的集群协调组件          |
|  Kafka           | 集群模式 | 数据总线集群，用于异步处理数据流 |
|  mongo           | 副本集   | 数据库集群，存储业务数据         |
|  consul          | 集群模式 | 用于服务注册、服务发现           |
|  elasticsearch   | 集群模式 | 存储用户行为数据、操作日志等     |
|  Kong            | 容器     | 网关和路由                       |
|  Nginx           | 容器     | 负载均衡                         |
|  Keepalived      | 容器     | VIP设置与自动切换                |
|  Rancher         | 容器     | 容器集群管理                     |
|  Kubernetes      | 集群模式 | 容器编排引擎                     |
|  Prometheus      | 容器     | 监控平台                         |
|  grafana         | 容器     | 监控平台-Web面板                 |
|  elasticsearch   | 容器     | 日志平台-日志存储                |
|  kibana          | 容器     | 日志平台-Web面板                 |
|  kafka           | 容器     | 日志平台-日志收集缓冲队列        |
|  envoy           | 容器     | 高性能代理                       |
|  docker          | 守护进程 | 容器运行时                       |
|  docker-compose  | CLI      | 容器管理                         |



#### 部署方式

基于生产服务稳定性考虑，我们将有状态服务直接部署在宿主机中，使用Docker-Compose部署进行容器配置管理，在多节点中实现集群(通常是 *3* 节点)，以下是相关信息：

* Compose配置目录： */mnt/data/compose/{service}*
* 数据目录： */mnt/data/dendrite/{service}*
* Docker目录：*/mnt/data/docker/*



####  管理方式

基于docker-compose的管理方式非常简单，你只需要进入到服务的compose目录，执行docker-compose命令即可进行服务管理，以mongo为例：

```shell
cd /mnt/data/compose/mongo/
docker-compose ps #查看服务状态
docker-compose up -d #启动
docner-compose stop  #关闭
#更多管理命令，请输入help查询 or参考 https://docs.docker.com/compose/
docker-compose help
```

而相应的数据卷，则对应着相应的目录，以mongo为例， 它们指向 */mnt/data/dendrite/{service}*：

```shell
docker volume ls
local               mongo_conf
local               mongo_data
local               mongo_logs
```



