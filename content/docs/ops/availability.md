+++
title = "可用性"
draft = false
weight = 34
template = "docs/page.html"

[extra]
toc = false
top = false
+++

&emsp;在互联网业务系统中，高可用是非常重要的一环。为了向用户提供长期稳定的服务，FinClip 在架构设计上便要求所有组件均满足高可用扩展的要求。

&emsp;首先，对于基础服务，我们选择业界主流的开源解决方案。在生产环境采用多节点部署，所有基础服务包括MySQL、Redis及其他基础服务均采用集群模式部署，以满足高可用要求，在实际运行中，这样的架构设计可以抵抗一定程度的服务器或网络故障。

&emsp;对于 FinClip 服务端程序，我们采用无状态微服务架构。因此，FinClip服务端程序可以采用微服务的高可用最佳实践。通常，我们将 FinClip服务端以多副本的形式运行在容器平台之上，借助容器平台的运维能力，可以实现后端服务的自动故障切换、多副本部署、服务器节点管理等高可用场景需求。


### 数据存储（MySQL）
&emsp;MySQL是一种广泛使用的关系数据库管理系统，它是开源的，用户可以免费使用。MySQL能够在各种操作系统（例如Linux，Windows和Mac OS）上运行，并通过SQL语言实现与其交互。MySQL被广泛用于Web应用程序和网站开发，以便在后台管理和存储数据。MySQL可以处理大量数据，具有高可靠性和高性能，并提供了许多工具和API，以方便开发人员进行数据库管理和查询。

&emsp;FinClip 数据存储支持多种数据库。通常，我们采用 MySQL 作为主要的存储方案，MongoDB 是一个基于分 布式文件存储的数据库，由 C++ 语言编写，旨在为 WEB 应用提供可扩展的高性能数据存储解决方案，且支持多机房部署。在实际部署中，我们使用 MongoDB 的副本集模式，以满足可扩展、高可用的运维需求。

&emsp;MySQL主从复制可以将数据从一台数据库服务器（主服务器）复制到一台或多台其他数据库服务器（从服务器）。Master记录更新，然后同步到Slave。Slave Node输出一条消息，表明它已成功接收到更新，从而允许发送后续更新。主从复制可以是同步的也可以是异步的。区别只是变化传播的时间。如果同时对master和slave进行修改，则为同步。如果更改排队并稍后写入，则它是异步的。

<img src="/images/mysql-replication.png"  width="800" />


### 数据缓存（Redis）

&emsp;FinClip采用 Redis 实现数据缓存。Redis 是一种开源(BSD 许可)、内存中数据结构存储的开源软件，通常 用作数据库、缓存和消息代理。 Redis 提供了诸如字符串、散列、列表、集合、带范围查询的排序集合、位图、 超级日志、地理空间索引和流等数据结构。

&emsp;通常，我们采用集群模式部署Redis，以确保系统实现高可用功能。在这种模式下，Redis存储空间会被分为多个区间，每个区间的数据将被存储在所属的主从实例中。例如：假设我们有 6 台服务器，我们可以部署一个由 3 主 3 从 组成的集群，Redis会将数据分成三个部分并存储其中。


<br>
<br>

<img src="/images/redis-cluster.png"  width="800" />

<br>
<br>

&emsp;当Reids集群中出现Slave节点宕机时，Redis集群访问不受影响，当集群中出现Master节点宕机时，其对应的从节点将提升为主节点，为业务提供访问，由此实现了Redis集群的高可用性。

### FinClip微服务

&emsp;Finclip后端业务服务采用了微服务框架，每个服务是一个可以独立多实例部署的模块，通常对应于一个工程项目。有以下特性：

&emsp; **服务发现与注册：** 微服务使用了consul组件进行注册与发现，通过consul，可以监控微服务活动状态。

&emsp; **负载均衡：** 结合k8s和consul技术，微服务之间的访问是负载均衡的调用。

&emsp; **可扩展：** 每个服务都是可以多实例部署。

&emsp; **高并发：** 采用了集群模式的redis缓存机制和grpc调用机制，同时技术上使得同一个key分布在多个redis槽，提高redis访问命中率，提高并发程度。

&emsp;finclip框架如下：


<img src="/images/finclip-arch.png"  width="800" />

&emsp;系统总体架构上分为网关层、业务服务层、数据层、基础设施层。


&emsp;**网关层：** 集成了流量控制、权限控制、负载均衡、网络隔离等功能。

&emsp;**业务服务层：** 是业务、需求的实现层。

&emsp;**数据层：** 业务或者非业务产生数据，需要落地到db(数据库)，同步到缓存(redis)，发送消息队列，文件存储(对象存储)等。

&emsp;**基础设施层：** 底层支撑，包括虚拟机操作系统、网络物理层、硬盘等。