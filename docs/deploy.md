---
id: deploy
title: 运维部署
---

# 部署

*由于私有化环境千变万化，标准部署方式需做相应适配，我们会持续简化部署流程*

  本节提供FinClip私有化部署的标准化方式讲解。

  FinClip基于容器化发布，大大减低了交付成本。首先我们基于下图这样的架构：



其中，我们的服务主要有三种运行模式：

* 基础服务使用 *docker-compose* 部署在宿主机中
* 无状态服务、微服务、监控、日志和一些运维组件部署在Kubernetes集群中
* 对接的外部服务(S3、镜像仓库、Harbor等)



### 机器初始化

*支持系统 CentOS 7/8*

1. 系统信息确认

   ```shell
   cat /etc/centos-release
   uname -a
   lscpu
   free -m
   ```

2. 磁盘初始化

   通常我们提倡使用独立的分区保存数据，以避免数据影响系统分区的读写和容量。数据分区会被格式化为 **XFS** 文件系统，并挂载在 **/mnt/data**路径。

   *例如数据分区路径为 /dev/vdc*

   ```shell
   sudo mkfs.xfs  -n ftype=1 /dev/vdc
   cp  -f /etc/fstab /tmp/
   echo `sudo blkid /dev/vdc | awk '{print $2}' | sed 's/"//g'` /mnt/data xfs defaults 0 0 >> /tmp/fstab
   sudo cp -f /tmp/fstab  /etc/
   sudo mkdir -p /mnt/data
   sudo mount -a
   sudo df -h | grep vdc
   ```

   *注：若是使用物理磁盘，需先执行分区操作*

3. 操作服务器的免密登陆

   批量部署时，我们需要使得一台部署机能使用SSH连接到所有服务器中

   ```shell
   ssh-keygen
   #将id_rsa.pub放到所有服务器相应用户的 ~/.ssh/authorized_keys中
   ```

   *处于安全，部署完成后请清理相关私钥*

### Ansible部署

*由于在无网络环境，所以我们在一台服务器上开启一个HttpServer，上面放置RPM私有仓库和 Docker-compose文件，以及PIP离线部署文件(如果需要部署pip的话)*

1. 在部署服务器中，解压部署包

   ```shell
   tar xJf mop.tar.xz
   ```

2. 导入离线包中的ansible docker镜像

   ```shell
   docker load -i ansible.tar
   ```

3. 配置Ansible证书之后，执行部署

   ```shell
   ansible-playbook --become-method sudo --become-user root -i inventory/mop/hosts.yml mop.yml
   ```

**Ansible执行过程说明**

```shell
---
- hosts: all
  vars:
    offline: true
  roles:
    - preinstall #部署docker、docker-compose、pip等
    - base       #设置内核参数、时区、配置设置等
    - docker     #docker相关配置
    - infra      #部署基础服务(es、consul、redis、mongo、kafka)
    - ops        #部署运维相关的配置
```

### 基础服务说明

Ansible部署完成之后，以下组件使用 *docker-compose* 在相应的节点中启动，其中：

* compose配置目录： - */mnt/data/compose/{service}*
* 数据目录: - */mnt/data/dendrite/{service}*

其中以下服务都是以这种方式部署:

1. elasticsearch *3节点*
2. mongodb *3节点 副本集*
3. consul *3节点 raft*
4. kafka *3节点*
5. redis *3节点6实例 3主3从*
6. Minio 4节点
7. rancher 

它们的维护方式都是使用docker-compose操作：

**启动**

```shell
docker-compose up -d
```

**查看日志**

```shell
docker-compose logs
```

**关闭**

```shell
docker-compose stop
```

详情请参考 `docker-compose help`

### 创建Kubernetes集群

我们采用Rancher进行Kubernetes集群的创建和维护，接下来我们直接访问Rancher主机的IP地址即可访问Rancher界面：

https://rancher-host-ip

1. 点击 添加集群

   * 设置集群名称
   * Kubernetes版本选择**v1.18.6-rancher1-2**
   * 选择网络驱动 **flannel**  *calico需要特定环境匹配*
   * 设置私有仓库
     * 仓库地址： hub.finogeeks.internal:5000
     * 填写由凡泰运维提供的 *用户名*
     * 填写由凡泰运维提供的 *密码*
   * Nginx Ingress **启用**
   * NodePort 范围 **1-65535**
   * Docker 根目录 **/mnt/data/docker/**
   * Etc备份存储，可根据实际情况做选择，支持 **本地备份** 和 **S3**
   * 勾选 **etcd** 和 **Control** 复制命令在Master机器中执行
   * 勾选 **Worker** 复制命令在 Worker节点中执行

   ![aw](/img/rancher-add-work.png)

2. 检查

   在Ranher中查看集群状态即可

3. 为监控节点设置标签和污点

   为了避免监控服务和日志服务影响业务性能，通常我们推荐使用独立的服务器做为日志和监控节点，实现方法是为节点打上标签和污点，使得监控、日志和部分运维服务部署在特定服务器中:

   1. 编辑节点，添加即可

      ![labels](/img/rancher-labels.png)

### 部署服务

#### 部署Mop服务

1. 添加应用商店

   rancher 集群页面 - 管理 - 添加应用商店 设置:

   * 填写名称
   * 商店URL: *git.finogeeks.internal*
   * 填入运维提供的账号密码

2. 应用商店 - 启动 - 选择 **mop-finstore** 启动即可

#### 部署网关服务

1. 应用商店 - 启动 - 选择 **gateway** 启动即可

#### 监控与日志

应用商店 - 启动 - 选择 **logging** 启动日志系统

应用商店 - 启动 - 选择 **monitor** 启动监控系统
