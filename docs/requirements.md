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
- 可根据实际用户数进行扩缩容。

 <p></p>

 <p></p>

### 单节点

单节点模式部署没有故障转移能力，但能够提供一定程度的、软件层面的故障恢复能力。单节点的部署架构适合对容灾没有要求，或整体业务规模较小的客户使用。

单节点将采用 Docker-Compose 的方式部署，所需的配置可以参考下表▼：

| 环境 | CPU  | 内存  | 储存空间 | 服务                                                |
| ---  | ---- | ----- | -------- | --------------------------------------------------- |
| 测试 | 4 核 | 8 GB  | 100 GB   | MySQL、Kafka、Redis、Minio、FinClip微服务、Gateway  |
| 生产 | 8 核 | 16 GB | 300 GB   | MySQL、Kafka、Redis、Minio、FinClip微服务、Gateway  |

角色分配如下图所示：

![role1](/img/finclip-docker-compose.png)

该配置的服务器所能承载的 TPS 指标参见下表▼：

| 配置  | 指标     | 数据      |
| ----- | -------- | --------- |
| 4核8G | 峰值并发 | 1w TPS    |
| 8核16G | 峰值并发 | 1.6w TPS    |


1. 以上数据**供参考**，该数据为实验压测数据，在真实业务场景中，根据版本更新情况、不同的服务器环境、裸机超售情况、网络延迟、自有中间件性能以及https证书加解密等不确定因素，实际性能可能会有所不同。

 <p></p>

 <p></p>

### 小规模集群

集群模式部署能够提供一定程度的、软件层面的故障转移能力。小规模集群的部署架构提供最小规模的高可用，其中四台服务器只能宕机一台，适合绝大部分的、没有高可用与故障隔离没有严格需求的客户使用。

小规模集群将采用 Kubernetes 的方式部署，所需的配置可以参考下表▼：

| 用途  | CPU  | 内存  | 储存空间 | 数量     | 参考 TPS |
| ---- | ---- | ----- | -------- | ----- |--------|
| 业务服务 | 8 核 | 16 GB | 500 GB   | 4 台 | 5w |
| 监控与日志(可选)   | 8 核 | 16 GB | 500 GB   | 1 台 | -  |

角色分配可以参考下图▼：

![role2](/img/small-cluster.png)


1. TPS数据**仅供参考**，该数据为实验室数据，在真实业务场景中，根据版本更新情况、不同的服务器环境、裸机超售情况、网络延迟、自有中间件性能等不确定因素，实际性能可能会有所不同。

3. 完整的测试报告请参考(2021.12)：[小规模集群测试报告.docx](https://img-1251849568.cos.ap-guangzhou.myqcloud.com/finclip/doc/%E5%B0%8F%E8%A7%84%E6%A8%A1%E9%9B%86%E7%BE%A4%E6%B5%8B%E8%AF%95%E6%8A%A5%E5%91%8A.docx)

<p></p>

 <p></p>

### 大规模集群

集群模式部署能够提供一定程度的、软件层面的故障转移能力。大规模集群的部署架构适合对可扩展性、灾备等指标有要求的客户使用。该架构的集群设计上主要关注在于故障隔离、故障恢复、可拓展性等方面。

大规模集群的服务器数量没有上限，支持多活、多机房部署，可根据业务规模、灾备要求自定义。相比小规模集群，大规模集群可以提供更高的QPS，更好的性能以及更好的扩展性。

大规模集群将采用 Kubernetes 的方式部署，所需的配置可以参考下表(磁盘建议使用SSD)▼：

| 用途  | CPU  | 内存  | 储存空间 | 数量     | 参考 TPS |
| ---- | ---- | ----- | -------- | ----- |--------|
| 业务服务 | 8 核 | 16 GB | 500 GB   | 8 台 | 9w |
| 运维管理   | 8 核 | 16 GB | 500 GB   | 1 台 | -  |

角色分配可以参考下图▼：

![role3](/img/standalone-cluster.png)


1. 以上TPS数据**供参考**，该数据为实验室数据，在真实业务场景中，根据版本更新情况、不同的服务器环境、裸机超售情况、网络延迟、自有中间件性能等不确定因素，实际性能可能会有所不同。
3. 完整的测试报告请参考(2021.12)：[大规模集群测试报告.docx](https://img-1251849568.cos.ap-guangzhou.myqcloud.com/finclip/doc/%E5%A4%A7%E8%A7%84%E6%A8%A1%E9%9B%86%E7%BE%A4%E6%B5%8B%E8%AF%95%E6%8A%A5%E5%91%8A.docx)


## 软件

#### 系统

| 系统 [任选一个]     | 内核        | 附加说明                             |
| ------------------- | ----------- | ------------------------------------ |
| Ubuntu 18.04 或更高 | 4.15 或更高 | 需要全新安装，无其他服务占用系统端口 |
| CentOS 7.9 或更高   | 3.10 或更高 | 需要全新安装，无其他服务占用系统端口 |


>**确认内核版本：**
>* 登录服务器输入`uname -a`

>**确认系统版本：**
>- CentOS 可以执行 `cat /etc/redhat-release`
>- Ubuntu 可以执行 `cat /etc/issue`

#### 基建
若您决定自行提供部分基建服务，请确保版本不低于该要求

| 服务          | 版本          | 授权协议                   |
| ------------- | ------------- | -------------------------- |
| Docker CE     | >= 19.03      | Apache License 2.0      |
| Kubernetes    | 1.18.14       | Apache License 2.0         |
| Zookeeper     | 3.6.3         | Apache License 2.0         |
| Kafka         | 2.8.1         | Apache License 2.0         |
| MySQL         | 8.0.30        | GPL                        |
| Redis         | 6.0.16        | BSD                        |
| ElasticSearch | 6.8.13        | Apache License 2.0         |
| MinIO         | 2021-01-08    | GNU Affero GPL             |

---


## 网络

>用于部署基础服务的服务器，出于数据交换的需要，应优先选择 “端口全部放行” 的规则。如无法满足，请确保服务器对以下端口双向互通。

* 业务组件需要占用以下端口：

  | 端口  | 用途                  | 协议 |
  | ----- | --------------------- | ---- |
  | 3306  | MySQL                 | TCP  |
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
  | 9104 | MySQL Exporter         | TCP  |
  | 7200 | Redis Exporter         | TCP  |
  | 7201 | Redis Exporter         | TCP  |
  | 9308 | Kafka Exporter         | TCP  |
  | 9114 | ElasticSearch Exporter | TCP  |
  | 9107 | Consul Exporter        | TCP  |

* 以及用于 Rancher 组件通信的所需端口：

  | 端口  | 用途        | 协议    |
  | ----- | ----------- | ------- |
  | 2379  | ETCD        | TCP     |
  | 2380  | ETCD        | TCP     |
  | 6443  | API Server  | TCP     |
  | 10250 | Rancher     | TCP     |
  | 8472  | Flannal CNI | **UDP** |
