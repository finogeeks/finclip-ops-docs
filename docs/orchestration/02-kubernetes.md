### kubernetes

  Kubernetes (K8s) 是来自 Google 云平台的开源容器集群管理系统，用于自动部署、扩展和管理容器化应用程序 。

### 架构

  Kubernetes主要由Master节点和Work节点，通常我们是这样规划的：资源充足的情况下，部署3个Master节点，若干个计算节点，根据实际需求增减Worker节点，资源不那么充足的情况下，Master节点兼Worker节点。

![k0](/img/kubernetes-0.png)



### 增减节点

  我们使用Rancher进行集群管理，添加节点和删除节点直接在Rancher中执行即可：

1. 增加节点

   主机 -> 编辑集群 -> 复制命令在新节点中执行即可

    ![addnode](/img/add-node.png)

2. 删除节点

   在主机列表中的主机菜单中，选中主机，点击右边菜单“驱逐”，然后“删除即可”。

### 服务管理

![k1](/img/kubernetes-1.png)

### 连接到Kubernetes

在集群选项卡到右上角处，点击Kubeconfig文件即可获得相应的配置，保存后你可以通过Kubectl终端连接到集群。

![kubectl](/img/kubectl.png)

### 高可用

Kubernetes提供了强大的高可用特性和自恢复能力，通常我们关注的主要功能都可以实现：

* Master三台高可用，最多可允许宕机一台
* 计算节点宕机时，服务会在其他健康节点中恢复
* 服务容器不健康或出现故障时，Kubernetes会自动摘除相应流量并创建新的服务

#### 更新与回滚

1. 对于Apps，在应用商店页面中点击升级App，选择相应的版本即可
2. 对于服务版本，点击服务菜单中的“编辑”，设置版本已经其他需要升级的内容即可

![k2](/img/kubernetes-2.png)
