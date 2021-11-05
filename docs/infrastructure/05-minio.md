---
title: 文件存储
author: xulishan@finogeeks.com
---

# 文件存储

FinClip 还用到对象存储，用于存储小程序包、图片等静态资源文件。对象存储是业界非常成熟的存储方案，在客 户的实际部署中，我们支持使用第三方对象存储，例如腾讯云 COS、阿里云OSS、AWS S3 等等。除此之外，在私 有化部署中，我们可以使用 MinIO 进行部署对象存储服务服务器。



## 部署架构

MinIO 的拓扑图如下

![minio](/img/minio.png)

### 服务配置

**实例（Instance）**：此中间件默认（最低）交付状态下为**四实例**部署，启用纠删码，启用数据分片，启用鉴权

### 数据目录

| 服务器 | 设计用途                | 路径                          |
| ------ | ----------------------- | ----------------------------- |
| 节点 1 | 持久化数据目录          | /mnt/var/lib/container/minio  |
|        | docker-compose 文件目录 | /mnt/opt/docker-compose/minio |
|        |                         |                               |
| 节点 2 | 持久化数据目录          | /mnt/var/lib/container/minio  |
|        | docker-compose 文件目录 | /mnt/opt/docker-compose/minio |
|        |                         |                               |
| 节点 3 | 持久化数据目录          | /mnt/var/lib/container/minio  |
|        | docker-compose 文件目录 | /mnt/opt/docker-compose/minio |
|        |                         |                               |
| 节点 4 | 持久化数据目录          | /mnt/var/lib/container/minio  |
|        | docker-compose 文件目录 | /mnt/opt/docker-compose/minio |

### 网络

**底层**：此中间件基于 `docker-compose` 启动，`docker-compose` 基于 docker0 虚拟网卡进行通信，因此本中间件在所有服务器上的所有组件，均通过 docker0 网卡划分出的子网进行通信，并且通过 `--network=host`  配置运行。

> 子网网段可以通过 `ifconfig docker0` 进行确认。

**业务层**：

| 服务器 | 设计用途                          | 端口 |
| ------ | --------------------------------- | ---- |
| 节点 1 | **[占用宿主机固定端口]** 对外服务 | 9000 |
| 节点 2 | **[占用宿主机固定端口]** 对外服务 | 9000 |
| 节点 3 | **[占用宿主机固定端口]** 对外服务 | 9000 |
| 节点 4 | **[占用宿主机固定端口]** 对外服务 | 9000 |



## 状态检查

节点启动后会自动探测可用的访问 IP，若日志中没有持续出现（或者停止出现）connect: connection refused 字样，且出现 Browser Access 字样并附带大量 URL 地址，则判断启动成功



## 节点增、删

此实例禁止手动增删节点。若有需要请联系技术支持



## 数据导出、恢复

数据均落盘存在本地，若因迁移需要可以拷贝整个数据目录打包。

针对导出、恢复等常见，MinIO 没有设置对应场景的工具，如果有需要可以使用 `mc` 工具，参考 https://www.jianshu.com/p/5c6bc2e3b886

## 灾难场景

**Q**：MinIO 集群拉起失败

**A**：首先确认所有 4 个节点是否已经正常启动，再判断 9000 端口是否正常可达

