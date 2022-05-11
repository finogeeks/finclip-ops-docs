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

 <p></p>

 <p></p>

### 单节点

单节点模式部署没有故障转移能力，但能够提供一定程度的、软件层面的故障恢复能力。单节点的部署架构适合对容灾没有要求，或整体业务规模较小的客户使用。

单节点将采用 Docker-Compose 的方式部署，所需的配置可以参考下表▼：

| CPU  | 内存 | 储存空间 | 服务                                                |
| ---- | ---- | -------- | --------------------------------------------------- |
| 4 核 | 8 GB | 100 GB   | [[业务¹]](#explain1)、[[基建²]](#explain2) 混合部署 |

角色分配可以参考下图▼：

![role1](/img/role1.png)

该配置档的服务器所能承载的 [极限³](#explain3)  指标参见下表▼：

| 指标     | 数据      |
| -------- | --------- |
| 峰值并发 | 3,918 TPS |

1. 以上数据**供参考**，该数据为实验室数据，在真实业务场景中，根据版本更新情况、不同的服务器环境、裸机超售情况、网络延迟、自有中间件性能等不确定因素，实际性能可能会有所不同。
3. 完整的测试报告请参考：[POC 测试报告.docx](https://img-1251849568.cos.ap-guangzhou.myqcloud.com/finclip/doc/POC%20%E6%B5%8B%E8%AF%95%E6%8A%A5%E5%91%8A.docx)

 <p></p>

 <p></p>

### 小规模集群

集群模式部署能够提供一定程度的、软件层面的故障转移能力。小规模集群的部署架构适合绝大部分的、对高可用与故障隔离没有严格需求的客户使用。

小规模集群将采用 Kubernetes 的方式部署，所需的配置可以参考下表▼：

| CPU  | 内存  | 储存空间 | 服务                                            |
| ---- | ----- | -------- | ----------------------------------------------- |
| 8 核 | 16 GB | 200 GB   | [[业务¹]](#explain1)、[[基建²]](#explain2) 混合部署 |
| 8 核 | 16 GB | 200 GB   | [[业务¹]](#explain1)、[[基建²]](#explain2) 混合部署 |
| 8 核 | 16 GB | 200 GB   | [[业务¹]](#explain1)、[[基建²]](#explain2) 混合部署 |
| 8 核 | 16 GB | 200 GB   | [[业务¹]](#explain1)、[[基建²]](#explain2) 混合部署 |

角色分配可以参考下图▼：

![role2](/img/role2.png)

该配置档的服务器所能承载的 [极限³](#explain3)  指标参见下表▼：

| 指标     | 数据       |
| -------- | ---------- |
| 峰值并发 | 24,290 TPS |

1. 以上数据**供参考**，该数据为实验室数据，在真实业务场景中，根据版本更新情况、不同的服务器环境、裸机超售情况、网络延迟、自有中间件性能等不确定因素，实际性能可能会有所不同。
3. 完整的测试报告请参考：[小规模集群测试报告.docx](https://img-1251849568.cos.ap-guangzhou.myqcloud.com/finclip/doc/%E5%B0%8F%E8%A7%84%E6%A8%A1%E9%9B%86%E7%BE%A4%E6%B5%8B%E8%AF%95%E6%8A%A5%E5%91%8A.docx)

<p></p>

 <p></p>

### 大规模集群

集群模式部署能够提供一定程度的、软件层面的故障转移能力。大规模集群的部署架构适合对可扩展性、灾备等指标有要求的客户使用。该架构的集群设计上主要关注在于故障隔离、故障恢复、可拓展性等方面。

大规模集群的服务器数量没有上限，支持多活、多机房部署，可根据业务规模、灾备要求自定义。相比小规模集群，大规模集群会附带可选的日志系统与监控组件（需要独立占用服务器）。

大规模集群将采用 Kubernetes 的方式部署，所需的配置可以参考下表▼：

| CPU  | 内存  | 储存空间 | 用途                            | 数量 | 角色              |
| ----- | ----- | -------- | ------------------------------- | ---- | ----------------- |
| 8 核  | 16 GB | 300 GB   | [[业务¹]](#explain1)：微服务容器 | 3    | Kubernetes Worker |
| 8 核 | 16 GB | 500 GB   | [[基建²]](#explain2)： [中间件](#explain4) | 4    | 中间件独占        |
| 4 核  | 4 GB | 300 GB   | [[基建²]](#explain2)： [附加组件](#explain5) | 1    | 附加组件独占      |
| 4 核  | 4 GB  | 100 GB   | [[业务¹]](#explain1)：微服务网关容器 | 1   | Kubernetes Worker |
| —— | —— | ——— | ▼ ————  [选配服务](#explain7)  ———— ▼ | —— | ————————— |
| 4 核  | 4 GB  | 100 GB |[[选配]](#explain7)： Rancher 管理面板、网关 | 1   | Kubernetes Master |
| 8 核 | 16 GB | 500 GB | [[选配]](#explain7)： 日志系统、监控系统 | 1 | Kubernetes Worker |

角色分配可以参考下图▼：

![role3](/img/role3.png)

该配置档的服务器所能承载的 [极限³](#explain3)  指标参见下表▼：

| 指标     | 数据       |
| -------- | ---------- |
| 峰值并发 | 17,988 TPS |

1. 以上数据**供参考**，该数据为实验室数据，在真实业务场景中，根据版本更新情况、不同的服务器环境、裸机超售情况、网络延迟、自有中间件性能等不确定因素，实际性能可能会有所不同。
3. 完整的测试报告请参考：[大规模集群测试报告.docx](https://img-1251849568.cos.ap-guangzhou.myqcloud.com/finclip/doc/%E5%A4%A7%E8%A7%84%E6%A8%A1%E9%9B%86%E7%BE%A4%E6%B5%8B%E8%AF%95%E6%8A%A5%E5%91%8A.docx)

 

#### 名词说明：

<a id="explain1"></a> [业务¹]： 指 FinClip 微服务及相关联服务；<p></p>
<a id="explain2"></a> [基建²]： 指中间件、附加组件、Kubernetes 组件等；<p></p>
<a id="explain3"></a> [极限³]： 指 TPS 压力高于该值，会因负载压力过大，引起集群或服务器崩溃；<p></p>
<a id="explain7"></a> [选配]： 考虑到此类服务需要更多的独占服务器资源，因此默认情况下不进行部署，除非与客户有另行约定；<p></p>
<a id="explain4"></a> 中间件： MinIO、Kafka、Redis、ElasticSearch、Consul、Zookeeper、MySQL；<p></p>
<a id="explain5"></a> 附加组件： Registry、Tinygit；<p></p>
<a id="explain6"></a> Kubernetes 组件： Rancher Master 管理面板、Rancher Worker 组件。<p></p>


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

| 服务          | 版本          | 授权协议                    |
| ------------- | ------------- | -------------------------- |
| Docker CE     | 19.03         | Apache License 2.0        |
| Kubernetes    | 1.18.14       | Apache License 2.0        |
| Rancher       | 2.4.8         | Apache License 2.0        |
| Zookeeper     | 3.4.14        | Apache License 2.0         |
| Kafka         | 2.3.1         | Apache License 2.0         |
| MySQL   | 8.0.27 | GPL                     |
| Redis         | 6.0.9-buster  | BSD                        |
| ElasticSearch | 6.8.13        | Apache License 2.0         |
| Consul        | 1.9.1         | Mozilla Public License 1.1 |
| MinIO         | 2021-01-08    | GNU Affero GPL             |



---



## 网络

>用于部署 **[基建]** 标签的服务器，出于数据交换的需要，应优先选择 “端口全部放行” 的规则。如无法满足，请确保服务器对以下端口双向互通。

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
