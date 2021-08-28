---
title: 业务数据存储
author: xulishan@finogeeks.com
---

### mongo

&emsp;FinClip业务数据存储支持多种数据库，通常我们采用MongoDB作为主要的存储方案，MongoDB 是一个基于分 布式文件存储的数据库，由 C++ 语言编写，旨在为 WEB 应用提供可扩展的高性能数据存储解决方案，且支持多 机房部署。 在实际部署中，我们推荐客户使用MongoDB的副本集、分片模式，以满足可扩展、高可用的运维需 求。

### mongo副本集


![mongo](/img/mongo.png)

副本集是一组维护相同数据集合的 mongod实例。副本集包含多个数据承载节点和一个可选的仲裁节点。在数据承载节点中，有且仅有一个成员为主节点，其他节点为从节点。


### mongo运维
查看集群状态
```
rs.status();
```
查看执行操作时间较长的动作
```
db.currentOp({"active" : true,"secs_running" : { "$gt" : 2000 }});
```

### 扩容缩容
进入复制集的主节点，执行添加新的节点命令

```shell
rs.add("hostNameNew:portNew"); 
```

等待所有成员恢复正常,检测成员状态

```shell
rs.status();
```

移除原来的节点

```shell
rs.remove("hostNameOld>:portOld"); 
```

### 备份恢复
备份：mongodump --d ${db} -o ./backup/
恢复：mongorestore  -d ${db} ./${db}/${db}
