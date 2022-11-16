---
id: docker-offline-install
title: docker离线安装
author: xulishan@finogeeks.com
---



1. 下载Docker二进制文件并上传至服务器安装
   
   https://download.dcker.com/linux/static/stable/x86_64/docker-20.10.9.tgz
   https://download.docker.com/linux/static/stable/x86_64/docker-rootless-extras-20.10.9.tgz
   https://github.com/docker/compose/releases/download/v2.7.0/docker-compose-linux-x86_64


   ```shell
   
   tar xvf docker-20.10.9.tgz
   tar xvf docker-rootless-extras-20.10.9.tgz
   
   mv docker/*                 /usr/bin
   mv docker-rootless-extras/* /usr/bin
   
   mkdir -p /usr/local/lib/docker/cli-plugins/
   cp docker-compose-linux-x86_64 /usr/local/bin/docker-compose-linux
   mv docker-compose-linux-x86_64 /usr/local/lib/docker/cli-plugins/docker-compose
   chmod +x /usr/local/lib/docker/cli-plugins/docker-compose
   chmod +x /usr/local/bin/docker-compose
   
   ```

2. 创建docker服务配置文件

```shell
cat > /etc/systemd/system/docker.service <<EOF
[Unit]
Description=Docker Application Container Engine
Documentation=https://docs.docker.com
After=network-online.target firewalld.service
Wants=network-online.target

[Service]
Type=notify
ExecStart=/usr/bin/dockerd -H unix://var/run/docker.sock
ExecReload=/bin/kill -s HUP $MAINPID
LimitNOFILE=infinity
LimitNPROC=infinity
LimitCORE=infinity
TimeoutStartSec=0
Delegate=yes
KillMode=process
Restart=on-failure
StartLimitBurst=3
StartLimitInterval=60s

[Install]
WantedBy=multi-user.target
EOF

systemctl stop firewalld
setenforce 0
systemctl disable firewalld

```
3. 启动docker并检查docker

```shell
systemctl start  docker
systemctl enable docker
docker info
docker ps
```
