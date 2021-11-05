---
id: requirements
title: 部署要求
---

# 部署要求
## 硬件

以下内容为FinClip部署的推荐配置清单，通常我们建议主要组件尽可能分散部署，在资源有限且QPS规划考虑内适当合并组件所在节点。

需要注意的是，在很多情况下可以使用客户提供的自有服务，例如：
- 条件允许情况下，存储服务推荐使用 SSD 磁盘；
- 若已有容器镜像仓库，可省略 Harbor/registry；
- 若已有 S3 存储或类似的对象存储服务，且无兼容性冲突，可省略 Minio；
- 若客户已有 Kubernetes，可省略 Kubernetess Master x 3；
- 可根据实际用户数扩缩容。

#### POC[#](https://devops.finclip.com/docs/requirements#poc)
主要提供给客户验证产品特性、做功能测试，或作为测试环境。
| CPU  | 内存  | 磁盘   | 服务                        |
| ---- | ----- | ------ | --------------------------- |
| 8 核 | 16 GB | 500 GB | **[业务]、[基建]** 混合部署 |
| 8 核 | 16 GB | 500 GB | **[业务]、[基建]** 混合部署 |
| 8 核 | 16 GB | 500 GB | **[业务]、[基建]** 混合部署 |
| 8 核 | 16 GB | 500 GB | **[业务]、[基建]** 混合部署 |

#### 日活 0~70w[#](https://devops.finclip.com/docs/requirements#日活-070w)
适用于（0 ~ 70万 QPS 档位）生产环境的配置
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
适用于（70 ~ 150万 QPS 档位）生产环境的配置
| CPU\  | 内存  | 储存空间 | 用途                            | 数量 | 角色              |
| ----- | ----- | -------- | ------------------------------- | ---- | ----------------- |
| 8 核  | 16 GB | 300 GB   | **[业务]：**微服务容器          | 5    | Kubernetes Worker |
| 8 核  | 16 GB | 500 GB   | **[基建]：** 日志系统、监控系统 | 1    | Kubernetes Worker |
| 12 核 | 24 GB | 500 GB   | **[基建]：** 中间件             | 6    | 中间件独占        |
| 8 核  | 16 GB | 500 GB   | **[基建]：** 附加组件           | 1    | 附加组件独占      |
| 4 核  | 8 GB  | 200 GB   | **[业务]：** 微服务网关容器      | 2    | Kubernetes Worker |
| 4 核  | 8 GB  | 200 GB   | **[基建]：** Rancher 管理面板   | 3    | Kubernetes Master |
* 服务器配置可根据实际情况与沟通适当调整

----

## 软件

#### 系统

| 系统 [任选一个]     | 内核        | 附加说明                             |
| ------------------- | ----------- | ------------------------------------ |
| Ubuntu 18.04 或更高 | 4.15 或更高 | 需要全新安装，无其他服务占用系统端口 |
| CentOS 7.8 或更高   | 3.10 或更高 | 需要全新安装，无其他服务占用系统端口 |

> 请勿使用**无授权**的**非正版** RedHat Enterprise

>**确认内核版本：**
>* 登录服务器输入`uname -a`

>**确认系统版本：**
>- CentOS 可以执行 `cat /etc/redhat-release`
>- Ubuntu 可以执行 `cat /etc/issue`



#### 基建
若您决定自行提供部分基建服务，请确保版本不低于该要求

| 服务          | 版本          |
| ------------- | ------------- |
| Docker CE     | 19.03         |
| Kubernetes    | 1.18.14       |
| Rancher       | 2.4.8         |
| Zookeeper     | 3.4.14        |
| Kafka         | 2.3.1         |
| MongoDB       | 4.2.11-bionic |
| Redis         | 6.0.9-buster  |
| ElasticSearch | 6.8.13        |
| Consul        | 1.9.1         |
| MinIO         | 2021-01-08    |

----

## 网络
>用于部署 **[基建]** 标签的服务器，出于数据交换的需要，应优先选择 “端口全部放行” 的规则。如无法满足，请确保服务器对以下端口双向互通。

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
