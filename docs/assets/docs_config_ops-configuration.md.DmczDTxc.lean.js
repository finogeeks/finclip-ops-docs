import{_ as i,c as e,a9 as a,o as t}from"./chunks/framework.BjXht68r.js";const d=JSON.parse('{"title":"运维配置","description":"运维配置管理","frontmatter":{"title":"运维配置","description":"运维配置管理"},"headers":[],"relativePath":"docs/config/ops-configuration.md","filePath":"docs/config/ops-configuration.md"}'),n={name:"docs/config/ops-configuration.md"};function l(o,s,r,p,h,g){return t(),e("div",null,s[0]||(s[0]=[a(`<p>  FinClip 数字化管理平台私有化部署中，运维配置主要围绕Docker 容器和 Kubernetes 相关的内容。我们采用业界常用的标准方式进行部署管理，因此您可以利用您的运维通用技能，对 FinClip 进行管理。以下是针对单机部署和集群部署的配置说明。</p><h3 id="单节点部署" tabindex="-1">单节点部署 <a class="header-anchor" href="#单节点部署" aria-label="Permalink to &quot;单节点部署&quot;">​</a></h3><p>  如前文所言，FinClip 采用 docker compose 进行单节点的部署和管理，因此，只需要根据 docker 官方的配置管理方式即可对 FinClip 系统进行运维管理。</p><p><strong>1. 定位配置目录</strong></p><p>通过查看任意一个正在运行的容器，可以定位到 Compose 配置所在的目录</p><div class="language-shell vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> ps</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">docker</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> inspect</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> [container_id] </span><span style="--shiki-light:#D73A49;--shiki-dark:#F97583;">|</span><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;"> grep</span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;"> -i</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> working_dir</span></span></code></pre></div><p><strong>2. Compose 目录文件</strong></p><ul><li><strong>docker-compose.yaml：</strong> Compose的主要配置文件，其中定义了容器启动的各种选项，包括文件挂载、端口配置和服务都环境变量等。</li><li><strong>init.bash：</strong> 用于初始化数据目录的脚本，主要用户创建特定权限的数据目录，用于容器挂载将数据写入宿主机。</li><li><strong>kong.yaml：</strong> gateway 服务的配置，用于配置访问路由。</li><li><strong>mysql_custom.cnf：</strong> 数据库的自定义配置，通用挂载提供给 mysql 容器</li><li><strong>purge_redeploy.sh：</strong> 工具脚本，用于清理数据并重新启动服务，请注意使用。</li></ul><p><strong>3. 自定义服务访问端口</strong></p><p>  可以通过修改 <em>docker-compose.yaml</em>中的 gateway 服务的 端口映射修改访问端口。</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" style="--shiki-light:#24292e;--shiki-dark:#e1e4e8;--shiki-light-bg:#fff;--shiki-dark-bg:#24292e;" tabindex="0"><code><span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">    ports</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">      - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;30001:8000&quot;</span><span style="--shiki-light:#6A737D;--shiki-dark:#6A737D;"> #例如30001</span></span></code></pre></div><h3 id="集群部署" tabindex="-1">集群部署 <a class="header-anchor" href="#集群部署" aria-label="Permalink to &quot;集群部署&quot;">​</a></h3><p>   FinClip支持使用Kubernetes以及兼容的容器平台进行部署，通过容器编排平台，你可以实现服务都高可用、自动化伸缩扩展、资源优化和高效管理等运维内容。FinClip服务采用docker进行打包，支持helm chart进行配置管理。</p><h4 id="kubernetes资源配置" tabindex="-1">Kubernetes资源配置 <a class="header-anchor" href="#kubernetes资源配置" aria-label="Permalink to &quot;Kubernetes资源配置&quot;">​</a></h4><p>在Kubernetes部署中，配置文件主要包括：</p><ul><li><strong>Deployment：</strong> FinClip服务运行的主要配置资源</li><li><strong>Services：</strong> 服务间访问的Service配置，在特定情况下，还会存在扩展的Services，用于访问外部服务。</li><li><strong>ConfigMap：</strong> FinClip 使用Kubernetes的ConfigMap来保存配置文件，其中包括服务配置和路由配置。</li><li><strong>Secret：</strong> 用于保存镜像仓库的认证内容</li><li><strong>Ingress：</strong> 通常，我们会使用 Ingress 为服务提供对外访问，这是可选的，也可以通过为gateway配置NodePort来对外提供访问。</li></ul><h4 id="helm配置" tabindex="-1">Helm配置 <a class="header-anchor" href="#helm配置" aria-label="Permalink to &quot;Helm配置&quot;">​</a></h4><p>在Helm Chart配置中，主要配置内容都编写在 Values.yaml中，你可以根据实际情况进行修改以生成Kubernetes配置文件。</p>`,18)]))}const c=i(n,[["render",l]]);export{d as __pageData,c as default};