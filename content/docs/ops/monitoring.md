+++
title = "监控系统"
draft = false
weight = 32
template = "docs/page.html"

[extra]
toc = false
top = false
+++

&emsp;监控是运行维护中非常重要的一环，为了有效检测服务的健康状态，我们采用监控方案和日志方案，主备从三个 机房都将采用同样的方式部署， 用于监控和日志的服务器，会被添加相应的标签加入到Kubernetes集群中，以专 门用于运行监控系统和日志系统。

**监控流程：**

1. 针对不同的监控目标开启exporter程序，其提供接又(/metrics)输出指标数据 程序主动向pushgateway提 交指标数据。
2. Prometheus不断访问这些指标数据接又，抓取指标数据提供存储、查询等。
3. Grafana可以通过访问Prometheus的数据展示图表。
4. Alertmanager通过查询Prometheus以决定是否需要发送告警信息。


<img src="/images/monitor.png"  width="800" />

<br>
<br>

**监控面板：**

<img src="/images/grafana.png"  width="800" />

