# 集群管理

### rancher

我们使用Rancher进行Kubernetes集群管理，以下提供Rancher基本运维管理内容，更多rancher相关知识，请参考官网：

*https://rancher.com/*



### 部署

在我们的离线部署包中提供了全自动化的部署，执行前文的环境部署之后，我们的Rancher已经成功启动，以下是相关的信息：

* Docker-Compose配置所在目录 */mnt/data/compose/rancher/*
* 数据目录： */mnt/data/dendrite/rancher/data*
* 审核日志：*/mnt/data/dendrite/rancher/auditlog*

与其他Docker-Compose应用一样，我们只需要进入到rancher的docker-compose目录，即可进行服务管理。

```shell
cd /mnt/data/compose/rancher
docker-compose help
```

访问地址：

*https://rancher-host-ip*



### 创建Kubernetes集群

Rancher提供了目前主流的Kubernetes版本以及附属组件选择，在我们的离线部署包中，也提供了相应的版本，通常选择如下：

* Kubernetes： 选择稳定的主版本
* 容器网络： Flannel
* Ingress： Nginx

#### 创建步骤

1. 打开https://rancher-host-ip.点击 全局 - 添加集群 - 自定义

2. 设置集群名、Kubernetes版本和网络驱动

   ![rancher-0](/img/rancher-0.png)

3. 设置私有仓库，默认使用内部部署的 *docker.finogeeks.internal*，如果使用其他镜像仓库，请填写相应的地址和账号信息

4. 启用Ingress

5. NodePort设置为 *1-65535*

6. Docker根目录设置为 */mnt/data/docker*

   ![rancher-1](/img/rancher-1.png)

7. 点击下一步

   * 仅勾选Etcd、Control，复制命令，在**Master**服务器中运行 ![master](/img/rancher-master.png)

   * 仅勾选Worker，复制命令，在**计算节点**服务器中运行

     ![worker](/img/rancher-worker.png)

8. 完成以后，Rancher中的集群列表即可看到刚创建的集群

### 应用商店

#### 添加应用商店

1. 点击应用商店 -> 添加应用商店 -> 填写名称、商店URL地址。

2. 勾选使用私有应用商店，填入相应的git信息即可

   ![catalog](/img/rancher-catalog.png)

*ps: 当有变更时，需点击商店列表中的 "..."中的"刷新"*

#### 部署应用

1. 点击应用商店 -> 启动
2. 选择相应的应用启动即可

#### 升级应用

1. 提交新版本应用到git中
2. 在仓库列表中点击 *刷新*
3. 在应用列表中点击升级 即可

### 集群备份与恢复

#### 备份

1. 点击集群-编辑

2. 选择高级选项卡

3. 设置备份选项即可，支持本地备份和S3存储

   ![backup](/img/rancher-backup.png)

#### 恢复

1. 点击集群列表右边的按钮 -> 恢复
2. 选择相应的备份文件即可
