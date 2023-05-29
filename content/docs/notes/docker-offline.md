+++
title = "Docker离线安装"
draft = false
weight = 41
template = "docs/page.html"

[extra]
toc = false
top = false
+++

#### 1. 下载Docker二进制文件并上传至服务器安装

**下载地址：**
   
   https://download.docker.com/linux/static/stable/x86_64/docker-20.10.9.tgz
   https://download.docker.com/linux/static/stable/x86_64/docker-rootless-extras-20.10.9.tgz
   https://github.com/docker/compose/releases/download/v2.7.0/docker-compose-linux-x86_64

<br>

**上传到服务器中解压并安装：**

   ```shell
   
   tar xvf docker-20.10.9.tgz
   tar xvf docker-rootless-extras-20.10.9.tgz
   
   mv docker/*                 /usr/bin
   mv docker-rootless-extras/* /usr/bin
   
   mkdir -p /usr/local/lib/docker/cli-plugins/
   cp docker-compose-linux-x86_64 /usr/local/bin/docker-compose
   mv docker-compose-linux-x86_64 /usr/local/lib/docker/cli-plugins/docker-compose
   chmod +x /usr/local/lib/docker/cli-plugins/docker-compose
   chmod +x /usr/local/bin/docker-compose
   
   ```

#### 2. 创建docker服务配置文件

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
```
#### 3. 启动docker并检查docker

```shell
systemctl stop    firewalld
systemctl disable firewalld

systemctl start  docker
systemctl enable docker

docker info
docker ps
```
