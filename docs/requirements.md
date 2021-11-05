---
id: requirements
title: 部署要求
---

# 部署要求

## 环境准备

### 硬件

以下内容为FinClip部署的推荐配置清单，通常我们建议主要组件尽可能分散部署，在资源有限且QPS规划考虑内适当合并组件所在节点。

需要注意的是，在很多情况下可以使用客户提供的自有服务，例如：

- 若已有负载均衡器，可省略gateway
- 条件允许情况下，存储服务推荐使用SSD磁盘
- 若已有容器镜像仓库，可省略Harbor/registry
- 若已有S3存储服务，可省略Minio
- 若客户已有Kubernetes，可省略k8s Master x 3
- 可根据实际用户数扩缩容

#### POC[#](https://devops.finclip.com/docs/requirements#poc)

poc环境主要提供给客户验证产品特性，做功能测试。

| CPU  | 内存  | 磁盘   | 服务                        |
| ---- | ----- | ------ | --------------------------- |
| 8 核 | 16 GB | 500 GB | **[业务]、[基建]** 混合部署 |
| 8 核 | 16 GB | 500 GB | **[业务]、[基建]** 混合部署 |
| 8 核 | 16 GB | 500 GB | **[业务]、[基建]** 混合部署 |
| 8 核 | 16 GB | 500 GB | **[业务]、[基建]** 混合部署 |



#### 日活 0~70w[#](https://devops.finclip.com/docs/requirements#日活-070w)

生产环境**推荐**配置（0 ~ 70万 QPS 档位）

| CPU  | 内存  | 储存空间 | 用途                                     | 数量 | 角色              |
| ---- | ----- | -------- | ---------------------------------------- | ---- | ----------------- |
| 8 核 | 16 GB | 300 GB   | **[业务]：**微服务容器                   | 3    | Kubernetes Worker |
| 8 核 | 16 GB | 500 GB   | ***[选配 - 基建]：*** 日志系统、监控系统 | *1*  | Kubernetes Worker |
| 8 核 | 16 GB | 500 GB   | **[基建]：** 中间件                      | 4    | 中间件独占        |
| 8 核 | 16 GB | 500 GB   | **[基建]：** 附加组件                    | 1    | 附加组件独占      |
| 8 核 | 8 GB  | 200 GB   | **[基建]：** Rancher 管理面板            | 1    | Kubernetes Master |
| 8 核 | 8 GB  | 200 GB   | ***[选配 - 基建 ]*** Rancher 管理面板    | *1*  | Kubernetes Master |

* 服务器配置可根据实际情况与沟通适当调整
* ***[选配 ]*** 标记的服务或服务器可根据需要选择是否需要配置，默认情况下不包含



#### 日活70~150w[#](https://devops.finclip.com/docs/requirements#日活70150w)

| CPU\  | 内存  | 储存空间 | 用途                            | 数量 | 角色              |
| ----- | ----- | -------- | ------------------------------- | ---- | ----------------- |
| 8 核  | 16 GB | 300 GB   | **[业务]：**微服务容器          | 5    | Kubernetes Worker |
| 8 核  | 16 GB | 500 GB   | **[基建]：** 日志系统、监控系统 | 1    | Kubernetes Worker |
| 12 核 | 24 GB | 500 GB   | **[基建]：** 中间件             | 6    | 中间件独占        |
| 8 核  | 16 GB | 500 GB   | **[基建]：** 附加组件           | 1    | 附加组件独占      |
| 4 核  | 8 GB  | 200 GB   | **[业务]：**微服务网关容器      | 2    | Kubernetes Worker |
| 4 核  | 8 GB  | 200 GB   | **[基建]：** Rancher 管理面板   | 3    | Kubernetes Master |

* 服务器配置可根据实际情况与沟通适当调整



#### 日活 ~= 500w[#](https://devops.finclip.com/docs/requirements#日活--500w)

| CPU   | 内存  | 磁盘       | 服务                           | 数量     | 备注                      |
| ----- | ----- | ---------- | ------------------------------ | -------- | ------------------------- |
| 16 核 | 32 GB | 300 GB     | **[业务]：**微服务容器         | 6        | 用于运行所有微服务        |
| 16 核 | 32 GB | 200 GB     | **[基建]：**Redis              | 3 或 6   | 缓存，加速服务读写速度    |
| 16 核 | 32 GB | 300 GB SSD | **[基建]：**Kafka              | 3        | 数据总线集群服务          |
| 16 核 | 32 GB | 700 GB ssd | **[基建]：**MongoDB            | 3        | 数据库集群服务            |
| 16 核 | 32 GB | 1000 GB    | **[基建]：**日志系统、监控系统 | 1 或 3   | 对服务性能、状态的监控    |
| 16 核 | 32 GB | 1000 GB    | **[基建]：**ElasticSearch      | 3        | 用户行为数据 、统计与搜索 |
| 8 核  | 16 GB | 200 GB     | **[基建]：**Consul             | 3        | 服务注册与发现            |
| 8 核  | 16 GB | 200 GB     | **[基建]：** Rancher 管理面板  | 1        | 容器管理平台              |
| 8 核  | 16 GB | 200GB SSD  | **[基建]：** Rancher Master    | 3        | 容器集群管理              |
| 8 核  | 16 GB | 500 GB     | 数据同步、git                  | 1        | 用于镜像、部署文件同步    |
| 8 核  | 16 GB | 500 GB     | Minio                          | 4 or S3  | 对象存储                  |
| 8 核  | 16 GB | 500 GB     | Harbor                         | 1 or Hub | 容器镜像仓库              |
| 8 核  | 16 GB | 300 GB     | gateway                        | 4 or N   | 入口网关                  |

#### 日活 ~= 1000W[#](https://devops.finclip.com/docs/requirements#日活--1000w)

| 规格    | 磁盘（数据盘） | 服务                    | 数量     | 备注                      |
| ------- | -------------- | ----------------------- | -------- | ------------------------- |
| 16核32G | 500G           | Kubernetes Worker       | 10       | 用于运行所有微服务        |
| 16核32G | 200G           | Redis                   | 6        | 缓存，加速服务读写速度    |
| 16核32G | 1T ssd         | Kafka                   | 3        | 数据总线集群服务          |
| 16核32G | 1T ssd         | MongoDB                 | 3        | 数据库集群服务            |
| 16核32G | 2TB            | Monitoring & Logging    | 3        | 对服务性能、状态的监控    |
| 16核32G | 1TB            | ElasticSearch           | 3        | 用户行为数据 、统计与搜索 |
| 8核16G  | 200G           | Consul                  | 3        | 服务注册与发现            |
| 8核16G  | 300G SSD       | Rancher                 | 3        | 容器管理平台              |
| 8核16G  | 300G SSD       | Kubernetes Controlplane | 3        | 容器集群管理              |
| 8核16G  | 500G           | DataSync                | 1        | 用于镜像、部署文件同步    |
| 8核16G  | 1T             | Minio                   | 4 or S3  | 对象存储                  |
| 8核16G  | 500G           | Harbor                  | 1 or Hub | 容器镜像仓库              |
| 8核16G  | 300G           | Gateway                 | 4 or N   | 入口网关                  |

*根据实际情况添加网络、带宽资源，以及短信等第三方服务*

### 软件

#### 系统

| 系统 [任选一个]     | 内核        | 附加说明                             |
| ------------------- | ----------- | ------------------------------------ |
| Ubuntu 18.04 或更高 | 4.15 或更高 | 需要全新安装，无其他服务占用系统端口 |
| CentOS 7.8 或更高   | 3.10 或更高 | 需要全新安装，无其他服务占用系统端口 |

> 请勿使用**无授权**的**非正版** RedHat Enterprise

**确认内核版本：**

* 登录服务器输入`uname -a`

**确认系统版本：**

- CentOS 可以执行 `cat /etc/redhat-release`
- Ubuntu 可以执行 `cat /etc/issue`



#### 基建

| 服务       | 版本    |
| ---------- | ------- |
| Docker     | 19.03   |
| Kubernetes | 1.18.14 |
| Rancher    | 2.4.8   |



### 网络

### 内网需求

* 用于部署 **[中间件]** 标记组件的服务器，出于数据交换的需要，要求服务器对以下端口双向互通

* 业务组件需要占用以下端口：

  | 端口  | 用途                  | 协议 |
  | ----- | --------------------- | ---- |
  | 27017 | MongoDB               | TCP  |
  | 8500  | Consul                | TCP  |
  | 6379  | Redis                 | TCP  |
  | 7000  | Redis                 | TCP  |
  | 7001  | Redis                 | TCP  |
  | 17000 | Redis Clueter BUS     | TCP  |
  | 17001 | Redis Cluster BUS     | TCP  |
  | 9000  | MinIO                 | TCP  |
  | 9092  | Kafka Broker Client   | TCP  |
  | 9093  | Kafka External        | TCP  |
  | 9200  | ElasticSearch         | TCP  |
  | 9300  | ElasticSearch Cluster | TCP  |
  | 9400  | ElasticSearch SSL     | TCP  |
  | 2181  | Zookeeper Client      | TCP  |
  | 2888  | Zookeeper Cluster     | TCP  |
  | 3888  | Zookeeper Cluster     | TCP  |

* 以及用于 Prometheus 收集数据的 Exporter 组件：

  | 端口 | 用途                   | 协议 |
  | ---- | ---------------------- | ---- |
  | 9216 | MongoDB Exporter       | TCP  |
  | 7200 | Redis Exporter         | TCP  |
  | 7201 | Redis Exporter         | TCP  |
  | 9308 | Kafka Exporter         | TCP  |
  | 9114 | ElasticSearch Exporter | TCP  |
  | 9107 | Consul Exporter        | TCP  |

* 以及用于 Rancher 组件通信的所需端口：

  | 端口  | 用途          | 协议    |
  | ----- | ------------- | ------- |
  | 2379  | Docker Socket | TCP     |
  | 2380  | Docker Socket | TCP     |
  | 6443  | ETCD          | TCP     |
  | 10250 | Rancher       | TCP     |
  | 8472  | Flannal CNI   | **UDP** |

  > 用于部署 **[基建]** 标记组件的服务器，出于架构设计上的需要，建议服务器之间的网络、端口全部互通