---
id: requirements
title: 推荐配置
---

# 推荐配置

  以下内容为FinClip部署的推荐配置清单，通常我们建议主要组件尽可能分散部署，在资源有限且QPS规划考虑内适当合并组件所在节点。

需要注意的是，在很多情况下可以使用客户提供的自有服务，例如：

* 若已有负载均衡器，可省略gateway
* 条件允许情况下，存储服务推荐使用SSD磁盘
* 若已有容器镜像仓库，可省略Harbor/registry
* 若已有S3存储服务，可省略Minio
* 若客户已有Kubernetes，可省略k8s Master x 3
* 可根据实际用户数扩缩容

### POC

poc环境主要提供给客户验证产品特性，做功能测试。

| 规格   | 磁盘 | 服务                 |
| ------ | ---- | -------------------- |
| 8核16G | 500G | all                  |
| 8核16G | 500G | all                  |
| 8核16G | 500G | all                  |
| 8核16G | 500G | all                  |
| 4核8G  | 200G | rancher git registry |



### 日活 0~70w

| 规格   | 磁盘      | 服务                                            |
| ------ | --------- | ----------------------------------------------- |
| 8核16G | 300G      | 微服务                                          |
| 8核16G | 300G      | 微服务                                          |
| 8核16G | 300G      | 微服务                                          |
| 8核16G | 300G      | 监控、日志、运维                                |
| 8核16G | 500G ~ 1T | minio  redis                  es  consul  mongo |
| 8核16G | 500G ~ 1T | minio  redis  zk-kafka  es  consul              |
| 8核16G | 500G ~ 1T | minio  redis  zk-kafka  es                mongo |
| 8核16G | 500G ~ 1T | minio             zk-kafka        consul  mongo |
| 8核16G | 500G ~ 1T | rancher + registry + git                        |
| 4核8G  | 200G      | gateway                                         |
| 4核8G  | 200G      | k8s master                                      |
| 4核8G  | 200G      | k8s master                                      |
| 4核8G  | 200G      | k8s master                                      |

*根据实际情况适当调整*

### 日活70~150w

| 规格    | 磁盘      | 服务                           |
| ------- | --------- | ------------------------------ |
| 8核16G  | 300G      | 计算节点                       |
| 8核16G  | 300G      | 计算节点                       |
| 8核16G  | 300G      | 计算节点                       |
| 8核16G  | 300G      | 计算节点                       |
| 8核16G  | 300G      | 计算节点                       |
| 8核16G  | 300G      | 监控、日志、运维               |
| 12核24G | 500G - 1T | es + zk-kafka                  |
| 12核24G | 500G - 1T | es + zk-kafka                  |
| 12核24G | 500G - 1T | es + zk-kafka + minio          |
| 12核24G | 500G - 1T | mongo + redis + consul + minio |
| 12核24G | 500G - 1T | mongo + redis + consul + minio |
| 12核24G | 500G - 1T | mongo + redis + consul + minio |
| 8核16G  | 500G      | rancher + registry + git       |
| 4核8G   | 200G      | gateway                        |
| 4核8G   | 200G      | gateway                        |
| 4核8G   | 200G      | k8s master                     |
| 4核8G   | 200G      | k8s master                     |
| 4核8G   | 200G      | k8s master                     |

*根据实际情况适当调整*

### 日活 ~= 500w

| 规格    | 磁盘（数据盘） | 服务           | 数量     | 备注                      |
| ------- | -------------- | -------------- | -------- | ------------------------- |
| 16核32G | 300G           | 微服务         | 6        | 用于运行所有微服务        |
| 16核32G | 200G           | redis          | 3 or 6   | 缓存，加速服务读写速度    |
| 16核32G | 300G ssd       | kafka          | 3        | 数据总线集群服务          |
| 16核32G | 700G ssd       | mongo          | 3        | 数据库集群服务            |
| 16核32G | 1TB            | 监控.日志.运维 | 1 or 3   | 对服务性能、状态的监控    |
| 16核32G | 1TB            | es             | 3        | 用户行为数据 、统计与搜索 |
| 8核16G  | 200G           | consul         | 3        | 服务注册与发现            |
| 8核16G  | 200G           | Rancher        | 1        | 容器管理平台              |
| 8核16G  | 200G SSD       | k8s master     | 3        | 容器集群管理              |
| 8核16G  | 500G           | 数据同步、git  | 1        | 用于镜像、部署文件同步    |
| 8核16G  | 500G           | Minio          | 4 or S3  | 对象存储                  |
| 8核16G  | 500G           | Harbor         | 1 or Hub | 容器镜像仓库              |
| 8核16G  | 300G           | gateway        | 4 or N   | 入口网关                  |



### 日活 ~= 1000W

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

