+++
title = "License更新"
draft = false
weight = 42
template = "docs/page.html"

[extra]
lead = "本章内容主要介绍 FinClip小程序数字化管理系统 更新License操作。"
toc = false
top = false
+++

### 文件准备

上传凡泰提供的文件 license.txt

### K8S集群版本的更新

#### 访问rancher更新license

1. 密文里搜索finclip-license，点击右边升级

2. 更新secret操作；

   license内容更新为license.txt的内容

   organ_name 删除原来的，新增organ_name 内容为 文件名

#### rancher重启所有服务

####  1、先重启license-checker

####  2、再重启mop-private-init-server

####  3、最后重启全部服务

### Docker-compose版本的更新

 

#### 进到finclip目录

cd /root/finclip

#### 关闭服务

docker-compose down

#### 修改.env文件内容

LICENSE=替换为license.txt文件内容

ORGAN_NAME=文件名

#### 启动服务

docker-compose up -d mysql kafka && sleep 30

docker-compose up -d 

