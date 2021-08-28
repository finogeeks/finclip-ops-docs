---
id: logging
title: 日志收集
author: xulishan@finogeeks.com
---

&emsp;日志系统部署在三台打了标签的运维机器中，和运维系统部署在一起。 我们的日志系统采用ElasticSearch及其

周边组件。

**日志收集过程：**

1. 使用Vector或者FluentBit在节点中运行，收集容器的日志文件提交到Kafka。
2. 部分程序支持直接将日志提交到Kafka，Kafka做缓冲管道，接受日志收集器的日志。
3. 同步工具(Vector/Filebeat)将Kafka的日志同步到ElasticSearch。
4. Kibana从ELasticSearch中读取日志数据完成日志分析。



![logging](/img/kibana.png)
