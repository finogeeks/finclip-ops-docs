### 容器编排与CI/CD

#### Docker & Kubernetes

  基于微服务的最佳实践，我们对服务做了全面的容器化支持，基于Kubernetes做服务编排，以实现服务的运行周期管理，包括且不限于

* 微服务部署、升级、回滚等日常维护
* 服务故障转移、自动恢复
* 服务扩容、缩容
* 计算资源管理

总之，我们会尽可能跟随前沿的最佳实践，以充分提高服务维护效率。



#### rancher

rancher是一套成熟的Kubernetes管理解决方案，作为战略合作伙伴，它也提供一键式部署[mop社区版](https://github.com/finogeeks/mop-chart)部署，在我们的私有化部署中，我们采用Rancher来进行:

* Kubernetes集群创建
* Kubernetes图形化管理
* 应用商店
* 多集群管理



#### 附属组件

基于Kubernetes的生态，有大量优秀的开源组件以实现服务的交付和管理，在我们的项目中也会不断探索，其中一些必须组件可提供更好的管理，在交付过程中我们提供自部署和直接对接客户系统的选择，其中主要有：

* Harbor or Docker registry *镜像仓库，可选客户已有服务*

* Gogs or Git Server   *git，用于编排资源存储和同步，可选客户已有服务*

* Helm *Kubernetes资源管理*

* Kustomize *Kubernetes资源管理*

* Jenkins X *持续发布*

* ...

  

