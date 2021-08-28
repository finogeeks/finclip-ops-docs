---
title: 消息队列
author: xulishan@finogeeks.com
---

# kafka

&emsp;在高并发系统中，使用消息队列进行异步处理是惯用的模式。FinClip采用Kafka作为消息队列中间件，基于 Kafka的多分区设计，可以实现高吞吐量消息队列管理。Apache Kafka 是一个开源分布式事件流平台，被数千家 公司用于高性能数据管道、流分析、数据集成和关键任务应用程序。

&emsp;同样地，在生产系统中，我们推荐使用多节点部署Kafka集群，从而实现高吞吐量、高可用已经可扩展的运维功 能:



![kafka](/img/kafka.png)
