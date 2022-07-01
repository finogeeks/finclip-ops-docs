# POC指导手册

## 一. 前言
&emsp;&emsp;POC测试，即Proof of Concept，是业界流行的针对客户具体应用的验证性测试，通常是企业进行产品选型时或开展外部实施项目前，进行的一种产品或供应商能力验证工作。其目的是证明企业选择的产品或供应商能够满足需求，并且提供的信息准确可靠。
<br />&emsp;&emsp;本手册为FinClip小程序开放平台POC测试的指导手册，旨在为企业开发者提供FinClip产品的POC指引，通过本文档，您可以快速的**将小程序运行在您的移动应用App**上。
## 二. POC 验证功能清单
 通过本指导手册，您可以验证的功能清单如下：

| **模块**| **功能**| **业务含义**| **验证要点**| **完成验证所需<br />投入资源**|
| --- | --- | --- | --- | --- |
| FinClip 平台 | 小程序上下架<br /> 全流程功能          | 通过验证小程序上下架<br />相关功能，可实现对本<br />平台基础能力的了解。<br /> 增强对 FinClip 产品的<br />了解： <br />** 了解小程序不同阶段<br />&emsp;. 版本的含义 <br />** 了解小程序如何上架 <br />** 了解小程序如何实现<br />&emsp;审核流 | 1. 创建小程序（名称. icon. 简 介等） <br />2. 小程序代码包上传. 云端编译 （Web 端上传 / IDE 上传） <br />3. 小程序体验版设置和使用 <br />4. 小程序提交审核版本，小程序 发布 <br />5. 小程序与应用关联关系管理 <br />6.  小程序上架. 回退. 下架 | 可视化界面 |
| FinClip SDK  | 小程序运行能<br /> 力. 安全性. <br /> 兼容性等 | 在App中真实打开小程<br />序， 感受小程序在<br />App上运行的效果：<br /> ** 能够在App中实际打<br />&emsp;开一个 小程序 <br />** 能够在App中动态管<br />&emsp;理一个 小程序 | 1. 小程序在宿主 APP 正常运行， 包括产品逻辑. 界面 UI 正常展示 <br />2. SDK API 接口调用正常，与系 统的兼容性正常 <br />3. 小程序常规功能验证（图片.  拍照. 视频播放. 同层渲染. 原 生交互等） <br />4. 小程序版本热更新. 缓存. 加 载. 多线程处理等逻辑体验 <br />5. 扫码查看. 预览 | 移动端<br />开发人员                                  |
| FinClip IDE  | 小程序开发.  <br />编译能力 | 体验 FinClip 完整<br />开发工具链能力  | 1. 在FIDE 中小程序项目的创建. 导入. 代码预览. 修改等功能 <br />2. 小程序离线编译  <br />3. 临时小程序二维码预览 <br />4. 小程序编译后的代码包导出 <br />5. 小程序代码包上传 <br />6. 导入本地基础库 | 前端<br />开发人员 |
## 三. POC验证方案
&emsp;&emsp;FinClip小程序开放平台基于云原生底层架构设计，拥有强大的容器技术研发能力，在安全保障稳定的产品体验外，还支持多种部署方式，比如私有云. 行业云. 混合云，都能够安装部署。
 <br />&emsp;&emsp;在POC阶段，我们也同样提供**公有云**验证和**私有云**验证两种方案,两种方案说明如下，您可以任意**选择一种验证方案**：

| **方案名称** | **方案描述** | **适用场景** | **推荐指数** | **方案优缺点**      |
| --- | --- | --- | --- | --- |
| **共有云** | 公有云环境为凡泰极客<br />的[SAAS环境](https://www.FinClip.com/)，通过账号<br />注册，即可体验第二章<br />POC功能清单的所有内容。 | 1. 验证SDK以及FIDE开发工具为主<br />，验证端侧能力以及开发支持能力。<br />2. 对环境要求不高，允许访问公网，允许将代码包上传至公有云环境。(**注意**：此处的代码包并非源码，而是经过FIDE编译后的二进制文件，是经过混淆和加密后的文件，无法破解，无法获取到该源码。)<br />3. 服务器申请周期长，短期内<br />无法就绪，影响POC验证计划 | **✭✭✭✭✭** | **优点**&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;<br />① 无需服务器资源<br />② 开箱即用<br />③ 验证周期短<br />④ 环境稳定<br />⑤ 实时体验到最新版<br /> **缺点**<br />① 无法验证运营端 | 
| **私有云** | 通过私有化部署方式将<br />FinClip平台部署到企业对<br />应的私有化服务器中进行<br />验证，需要提前申请服务<br />器资源及网络访问权限，凡泰将安排专属的运维工<br />程师通过远程的方式进行<br />安装部署； | 1. 体验产品全流程功能，包括运营 端能力。<br />2. 对代码安全性要求高，无法将代码 包上传至公有云环境。<br />3. 产品功能体验仅限内网体验，无法 连接外网。<br />4. 所有公有云无法验证的场景和功能 | **✭✭✭✭✩** | **优点**<br />① 私有云100%保障数据<br />&emsp;&emsp;安全<br />② 100%覆盖全功能<br /> **缺点**<br /> ① 需要申请服务<br />器资源配置如下:<br /> &emsp;** 数量：1台 <br /> &emsp;** CPU：4核 <br /> &emsp;** 内存：8G <br /> &emsp;** 硬盘：100G<br />② 成本高周期长。
## 四. POC准备
在开始POC之前，您可能需要准备以下内容：

| **序号** | **材料** | **材料说明** | **作用** | **备注** |
| --- | --- | --- | --- | --- |
| 1 | 小程序 | 业务应用小程序源代码，<br />为了能够快速的完成流<br />程验证，我们建议您采<br />用相对简易的微信小程<br />序进行验证，如果您采<br />用的uinapp或者是Taro<br />框架开发，需要先转成<br />微信小程序源代码 | 1. 将小程序在FinClip IDE上运行，体验FinClip的完整开发工具链能力。<br />2. 将小程序上传至FinClip小程序开<br />放平台，体验小程序创建、提交审 核、审核发布、版本管理等能力。<br />3. 将小程序运行在移动应用app上，体验小程序在宿主app的运行效果。 | 如果您没有小程序源码，<br />1. 您可以直接使用凡泰FIDE，通过小程序模板，生成一个小程序。<br />2. 您可以使用凡泰的官方<br />[小程序示例代码](https://github.com/finogeeks/miniprogram-demo) |
| 2 | FinClip IDE | 凡泰小程序开发工具 | 1. 小程序开发工具，代码编辑器。 | FinClip IDE下载地址：[FIDE](https://www.FinClip.com/downloads) |
| 3 | FinClip App | 凡泰小程序助手 | 1. 真机扫码调试小程序时需要用到。 | 下载地址：[Finclip App](https://www.FinClip.com/downloads) |
| 4 | 安卓应用App | 安卓端业务应用源代码。<br />** 可选项<br />** 体验安卓应用App集<br />&emsp;成SDK时需要 | 1.将FinClip SDK集成至应用App上，让App具备运行小程序的能力。 <br />2. 体验集成FinClip SDK 到应用App 的过程以及SDK的安全性、兼容性、SDK体积大小、SDK接口能力等。<br />3. 体验小程序运行在应用App上的 效果。 | 如果您没有安卓应用App源码<br />1. 您可以直接使用Android Studio创建一个示例工程。<br />2. 您可以使用凡泰官方的 [安卓App示例代码](https://github.com/finogeeks/FinClip-android-demo) |
| 5 | Android Studio | Android 移动应用开发工具。<br />** 可选项<br />** 体验安卓应用App集<br />&emsp;成SDK时需要 | 1. 安卓应用App开发工具，代码编辑器 | [Android Studio下载](https://developer.android.google.cn/studio) |
| 6 | iOS应用App | iOS端业务应用源代码。<br />** 可选项<br />** 体验iOS应用App集<br />&emsp;成SDK时需要 | 1.将FinClip SDK集成至应用App上，让App具备运行小程序的能力。<br />2. 体验集成FinClip SDK 到应用App的过程以及SDK的安全性. 兼容性. SDK体积大小. SDK接口能力等。<br />3. 体验小程序运行在应用App上的 视觉效果。 | 如果您没有iOS应用App源码<br />1. 您可以直接使用Xcode创 建工程。<br />2. 您可以使用凡泰官方的<br />[iOS App示例源代码](https://github.com/finogeeks/FinClip-ios-demo) |
| 7 | Xcode | iOS 移动应用开发工具<br />** 可选项<br />** 体验iOS应用App集<br />&emsp;成SDK时需要 | 1. iOS应用App开发工具，代码编辑器 | [Xcode下载](https://developer.apple.com/cn/xcode/resources/) |
| 8 | 服务器<br />（可选） | 一台 8核 16g  服务器<br />** 可选项<br />** 当您POC的验证方案<br />&emsp;选择私有云验证时需要 | 1. 私有化部署凡泰小程序开放平台。 | 凡泰可安排专属运维工程师<br />指导部署或远程部署 |
## 五. POC流程概览
本手册以**将小程序运行在您的移动应用App上**为目标，一共需要**4**个步骤和**17**个操作：<br />&emsp;&emsp;**1. 小程序开发调试**：将小程序在FinClip IDE中编译通过，并做好相关的代码调试和布局，确保能够在模拟器上正常展示。<br />&emsp;&emsp;**2. 发布小程序**：在FinClip小程序开放平台注册账号，登录平台，通过小程序模块创建小程序，填写小程序信息。步骤一调试好的小程序，提交小程序审核您将得到一个小程序 AppId  ，后续可通过AppId打开小程序。<br />&emsp;&emsp;**3. 创建应用**，关联小程序：在管理后台添加移动应用，关联小程序，此步骤您将会的获得SDK Key . SDK secret. apiServer三个参数，后续可用于初始化SDK。<br />&emsp;&emsp;**4. 集成SDK，打开小程序**：移动应用集成SDK，采用步骤五的信息进行SDK初始化，调用SDK打开小程序接口，将步骤4中的AppId传入，即可在App中打开小程序。<br />&emsp;&emsp;至此，app打开小程序步骤完成，下面是整个流程的时序图包含**17**个操作：
![](https://cdn.nlark.com/yuque/0/2022/png/2292957/1651914811656-13956723-c999-4626-8b6d-da8792a2abf0.png#crop=0&crop=0&crop=1&crop=1&id=hyjaJ&originHeight=1469&originWidth=1052&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
## 六. POC流程
### 步骤一 注册开发者账号
&emsp;&emsp;如果您采用的是凡泰**公有云方案**，可以通过浏览器打开页面 ：[注册地址](https://www.FinClip.com/login/) ，创建账号，即可完成账号的注册。<br />&emsp;&emsp;如果您采用的是**私有云的方案**，您需要在您的私有云环境，创建一个账号。账号注册流程参考文档：[平台注册及认证](https://www.FinClip.com/mop/document/introduce/accessGuide/saas-guidelines.html)，完成第1个步骤即可。

![](https://cdn.nlark.com/yuque/0/2022/png/2292957/1651914812501-bba3c302-2909-4820-b014-2777e102aee6.png#crop=0&crop=0&crop=1&crop=1&id=gWSIK&originHeight=1133&originWidth=1430&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)
### 步骤二 创建小程序
&emsp;&emsp;登录步骤一注册的账号后，您就可以进入到小程序开放平台管理后台，您可以通过左侧的菜单栏查看到整个开放平台的功能。<br />&emsp;&emsp;进入小程序管理，小程管理-我的小程序，点击页面上角新增小程序按钮，填写小程序的名称、 小程序分类、等信息，即可完成小程序的创建。<br />&emsp;&emsp;通过此步骤，您将得到小程序的**id**，即**AppId**。
&emsp;&emsp;创建小程序参考文档：[创建小程序](https://www.finclip.com/mop/document/introduce/accessGuide/enterprise-guidelines.html#_3-%E5%88%9B%E5%BB%BA%E5%B0%8F%E7%A8%8B%E5%BA%8F)。

**注**：如果您需要升级为企业账号，但是受限于企业的营业执照授权书等信息，您可以**先上传测试图片，后续通过修改操作变更为真实信息**，提交审核后联系交付经理处理

![](https://cdn.nlark.com/yuque/0/2022/png/2292957/1651914813256-1793236f-d6ba-4c35-ba55-8d92737701fd.png#crop=0&crop=0&crop=1&crop=1&id=gS730&originHeight=1187&originWidth=1430&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

### 步骤三 开发编译小程序
&emsp;&emsp;打开凡泰FIDE代码编辑器，登录步骤一注册的账号，通过FIDE创建一个小程序或者是打开现有的小程序。<br />&emsp;&emsp;如果您是通过Taro. uni-app框架开发的，请先转成微信小程序，再使用FIDE打开小程序路径下的小程序源代码。<br />&emsp;&emsp;如果您是是H5 的应用，想要内嵌到小程序的，可以使用web-view组件来进行嵌套，可以参考文档：[如何将H5工程转为小程序](https://www.finclip.com/mop/document/faq/miniProgram/developer.html#_6-%E5%A6%82%E4%BD%95%E5%B0%86h5%E5%B7%A5%E7%A8%8B%E8%BD%AC%E4%B8%BA%E5%B0%8F%E7%A8%8B%E5%BA%8F)。<br />&emsp;&emsp;您可以通过FIDE进行代码的编辑调试，直到您的小程序在FIDE上表现正常，包括UI展示和业务逻辑。开发调试可以参考小程序开发文档：[小程序开发](https://www.finclip.com/mop/document/introduce/accessGuide/enterprise-guidelines.html#_4-%E5%BC%80%E5%8F%91%E5%B0%8F%E7%A8%8B%E5%BA%8F)

![](https://cdn.nlark.com/yuque/0/2022/png/2292957/1651914814276-f57d0ac6-7119-4c69-8659-4d90bc177d9c.png#crop=0&crop=0&crop=1&crop=1&id=fq0ws&originHeight=1090&originWidth=1429&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

### 步骤四 真机预览
&emsp;&emsp;点击FIDE顶部菜单栏的预览按钮，FIDE经过编译后，会弹出小程序的预览二维码。<br />&emsp;&emsp;打开FinClip App，选择企业端登录，登录步骤一注册的账号。登录成功后，点击app右上角的扫一扫按钮，扫描小程序预览二维码，即可在真机上查看小程序真机运行的效果。<br />&emsp;&emsp;真机预览可参考开发文档：[FIDE功介绍](https://www.finclip.com/mop/document/develop/developer/fide-introduce.html#_2-%E5%8A%9F%E8%83%BD%E4%BB%8B%E7%BB%8D)

![](https://cdn.nlark.com/yuque/0/2022/png/2292957/1651914815273-39512a81-434e-49f9-9bea-d6828d859fa9.png#crop=0&crop=0&crop=1&crop=1&id=V3Qi9&originHeight=1202&originWidth=1429&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

### 步骤五 上架发布小程序
&emsp;&emsp;1. 从FIDE中导出小程序代码包，此时我们得到一个zip包，这个代码包是经过**编译并且加密混淆**过的，您**无需担心源代码安全**问题。<br />&emsp;&emsp;2. 我们再次打开小程序开放平台，进入到我们刚刚创建好的小程序，点击进入详情，点击顶部的代码包管理，上传代码包，填写相关信息即可，我们的小程序代码包是从IDE中导出的，所以我们选择无需编译，即可完成小程序代码包的上传。<br />&emsp;&emsp;3. 上传完成后，我们可以添加体验版. 审核版本。添加审核版本后，如果您是采用公有云方案，直接在小程序管理菜单下，小程序上架审核处查看到对应的小程序。<br />&emsp;&emsp;4. 如果您是私有云的方案，则需要登录运营端，进入小程序管理-小程序上架审核页面，查看待审核的小程序。点击小程序详情，您可以选择通过或者是拒绝小程序审核。审核通过后，您可以在我的小程序中，进行小程序的上架和发布。<br />&emsp;&emsp;小程序的上架文档参考：[小程序上下架](https://www.finclip.com/mop/document/introduce/accessGuide/enterprise-guidelines.html#_5-%E5%B0%8F%E7%A8%8B%E5%BA%8F%E6%8F%90%E4%BA%A4%E5%AE%A1%E6%A0%B8%E4%B8%8E%E4%B8%8A%E4%B8%8B%E6%9E%B6)

![](https://cdn.nlark.com/yuque/0/2022/png/2292957/1651914816446-7ba14562-ca93-45d4-9fdf-8acedfeeec1e.png#crop=0&crop=0&crop=1&crop=1&id=Uwa7e&originHeight=1079&originWidth=1429&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

### 步骤六  创建应用
&emsp;&emsp;到这个步骤，恭喜您已经将小程序开放编译调试. 上架. 发布的流程都已经完成。接下来您需要创建一个移动应用。<br />&emsp;&emsp;1. 首先我们通过移动应用开发工具（Android Studio或者是Xcode）创建一个应用或者是打开现有的应用，获取到应用的 BundleID（移动应用的唯一标识）。<br />&emsp;&emsp;2. 再次打开小程序开放平台，进入我们应用管理模块，点击新增合作应用按钮，填写应用名称和所属企业。<br />&emsp;&emsp;3. 创建应用后，点击右侧的关联小程序按钮，关联我们的刚刚上架的小程序即可。再次点击对应的应用，点击添加BundleID按钮，添加我们的应用BundleID即可。<br />&emsp;&emsp;通过此步骤，您将获得以下信息：SDK Key. SDK Secret. apiServer. apmServer. apiPrefix信息，该信息将用于移动应用集成SDK初始化时的参数。创建应用可以参考对应的文档：[关联移动应用](https://www.finclip.com/mop/document/introduce/accessGuide/enterprise-guidelines.html#_6-%E5%85%B3%E8%81%94%E7%A7%BB%E5%8A%A8%E5%BA%94%E7%94%A8)

![](https://cdn.nlark.com/yuque/0/2022/png/2292957/1651914817348-0801f1bd-830d-49eb-a50b-a0c5e9471fb6.pngcrop=0&crop=0&crop=1&crop=1&id=BnzBW&originHeight=1111&originWidth=1430&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)

### 步骤七  集成SDK
&emsp;&emsp;凡泰目前支持 iOS SDK .  Android SDK. Flutter . React Native. Windows SDK 的集成，相关的集成文档如下：

&emsp;&emsp;1. iOS SDK集成文档：[iOS SDK集成](https://www.FinClip.com/mop/document/runtime-sdk/ios/ios-integrate.html)<br />&emsp;&emsp;2. Android SDK集成文档：[Android SDK集成](https://www.FinClip.com/mop/document/runtime-sdk/android/android-integrate.html)<br />&emsp;&emsp;3. Flutter 集成文档：[Flutter 集成](https://www.FinClip.com/mop/document/runtime-sdk/flutter/flutter-integrate.html)<br />&emsp;&emsp;4. React Native集成文档：[React Native集成](https://www.FinClip.com/mop/document/runtime-sdk/reactNative/rn-integrate.html)<br />&emsp;&emsp;5. Windows SDK 集成文档：[Windows SDK 集成](https://www.FinClip.com/mop/document/runtime-sdk/windows/windows-integrate.html)

&emsp;&emsp;集成SDK后，编译代码通过，采用步骤六中的 SDK Key. SDK Secret. apiServer. apmServer. apiPrefix信息进行SDK的初始化。调用SDK初始化的接口，会有初始化成功和失败的回调，您可以通过该回调，判断是否初始化SDK成功。

### 步骤八  打开小程序
&emsp;&emsp;调用SDK打开小程序的接口，将步骤五上架得到的AppId传入SDK接口，即可打开小程序。

&emsp;&emsp;1. 安卓打开小程序的方式：[打开小程序](https://www.finclip.com/mop/document/runtime-sdk/android/android-integrate.html#_4-1-%E5%90%AF%E5%8A%A8%E5%B0%8F%E7%A8%8B%E5%BA%8F)<br />&emsp;&emsp;2. iOS 打开小程序的方式：[打开小程序](https://www.finclip.com/mop/document/runtime-sdk/ios/ios-api.html#_1-2-%E6%89%93%E5%BC%80%E5%B0%8F%E7%A8%8B%E5%BA%8F)

&emsp;&emsp;**恭喜您！**到此步骤之后，一个小程序已经能够完整的运行在您的App上了，接下来您就可以继续您的其他功能的验证。至此POC步骤流程结束。

## 八. 其他参考资料
&emsp;&emsp;1. 从0到1编写一个小程序：[从0到1编写一个小程序](https://www.FinClip.com/blog/cong-ling-dao-yi-kai-shi/)<br />&emsp;&emsp;2. 如何在在移动应用中集成FinClip SDK：[如何在在移动应用中集成FinClip SDK](https://www.FinClip.com/blog/first-app-ep11/)<br />&emsp;&emsp;3. 【视频】如何创建小程序与关联应用：[如何创建小程序与关联应用](https://nextcloud.finogeeks.club/s/rGaEt2wBN5fBYNB)<br />&emsp;&emsp;4. 【视频】ios如何集成sdk：[iOS如何集成sdk](https://nextcloud.finogeeks.club/s/HZQj4FmfF77sENG) <br />&emsp;&emsp;5. 【视频】Android如何集成sdk：[Android如何集成sdk](https://www.loom.com/share/31cf4196db0741a1a0bf2d2e0da041b8)

## 九. 结束语
&emsp;&emsp;非常感谢您的体验，我们诚邀您对本次的POC进行[评价](https://wj.qq.com/s2/10174953/dbda/)，我们将竭诚为您服务。<br />&emsp;&emsp;更多产品细节，可以访问我们的官网[凡泰极客](https://www.FinClip.com/)或者扫描下方二维码，获得更多详细信息。

![](https://cdn.nlark.com/yuque/0/2022/png/2292957/1651914817898-aa0e0187-7244-4bac-b191-500898c98b2c.png#crop=0&crop=0&crop=1&crop=1&id=ny7fn&originHeight=804&originWidth=1430&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)