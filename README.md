# 雨天面板

极核（ZEEHO）车主面板 H5 的安卓外壳。**APK 不内置面板**：启动时从本仓库的 GitHub Pages / jsDelivr 在线拉取，网页更新后不用重新装 APK。

- 应用名：**雨天面板**
- 包名：`com.yutian.panel`
- 面板在线地址：
  - jsdmirror（国内镜像）：`https://cdn.jsdmirror.com/gh/3107281840/yutian-panel@main/panel/index.html`
  - GitHub Pages：<https://3107281840.github.io/yutian-panel/panel/index.html>
  - jsDelivr gcore：`https://gcore.jsdelivr.net/gh/3107281840/yutian-panel@main/panel/index.html`
  - jsDelivr Fastly：`https://fastly.jsdelivr.net/gh/3107281840/yutian-panel@main/panel/index.html`
- 车模与网页源码：仓库根目录 `panel/`（与作者 H5 整包一致）

> 本项目只是个人自用的第三方壳，与极核官方无关；面板网页与车模的作者、版权归原各自所有者。

## 它是怎么跑起来的

```
MainActivity
  ├─ 依次尝试：jsdmirror → GitHub Pages → jsDelivr gcore → jsDelivr Fastly
  │     └─ PanelLoader 拉 index.html，注入桥脚本后交给 WebView
  │     └─ 车模 / 图片 / JSON 仍由 WebView 从同一个源直接加载（保持同源）
  └─ ZeehoNative（@JavascriptInterface）
        └─ BridgeScript 把它包装成面板要的 ZeehoShell / ZeehoShellTxn / ZeehoCast
```

面板是 PWA，靠 `fetch`、`localStorage` 和同源相对路径吃饭。平台闸门在 `<head>` 的内联脚本里就会执行，所以必须在它之前注入 `ZeehoShell`，否则会被当成普通浏览器跳到下载页。`PanelLoader` 拦下主文档请求、在 `<head>` 最前面插入 `BridgeScript`，其余请求不拦截——这样网页 origin 仍是自己的 GitHub 域名，登录态和接口 CORS 都正常。

首页会按 `ETag` 缓存到应用缓存目录：有更新才重新下载，离线时还能用上一次的 HTML 启动。


## 解混淆参考源码

`panel/index-readable.html` 和 `panel/readable/*.js` 是面板 10 个混淆 bundle 的反混淆结果（字符串已还原、`_0x` 变量已重命名），仅供阅读和改功能参考；**App 仍加载 `panel/index.html`**，不会用这个参考版。生成方式和限制见 `panel/readable/README.md`。

## 已经对接的能力

| 能力 | 状态 |
| --- | --- |
| 深浅色 / 状态栏、导航栏配色同步 | ✅ |
| 屏幕常亮 | ✅ |
| 系统分享、剪贴板读写、震动、Toast | ✅ |
| 打开系统设置、打开外链、退出 | ✅ |
| 网页文件选择（`<input type=file>`） | ✅ |
| http/https 下载（走系统 DownloadManager） | ✅ |
| 定位授权（网页 geolocation） | ✅ |
| GitHub Releases 应用内更新检查 | ✅ |
| GPS 实时速度（`begin/poll/endGpsSpeed`） | ✅ |
| 面板截图/图片导出到相册（`imageExport`） | ✅ |
| 应用日志落盘（`beginAppLog` / `appLogSession`） | ✅ |
| 通知渠道查询与开关（`notifyGroups` / `setNotifyGroup`） | ✅ |
| 前后台状态（`background` / `backgroundStatus`） | ✅ |

`ZeehoShell` 按原版 `ShellBridge` 注册了全部 **142 个方法名**（另加 `ZeehoCast` 投屏命名空间），页面探测方法存在性时不会再误判。真正实现的在上面这张表里；其余依赖厂商私有协议或系统级组件的调用统一返回 `{"ok":false,"error":"unsupported"}`，面板会明确降级，不会假装成功：蓝牙感应钥匙 / 车辆 P2P 投屏 / 车机壁纸直传 / 桌面小组件 / 仪表 OTA / AE4 控制器写入 / 骑行记录与自动抓拍 / 电池与充电历史 / 后台保活 / 网页热更新。

## 目录

```
panel/                        面板 H5 整包（index.html / models / icons ...）
index.html                    Pages 根入口，跳到 panel/
app/src/main/java/com/yutian/panel/
  MainActivity.java           WebView、三条线路回退、权限、文件选择、下载、返回键
  PanelLoader.java            在线拉取首页、ETag 缓存、注入桥脚本
  BridgeScript.java           ZeehoNative → ZeehoShell / ZeehoShellTxn / ZeehoCast
  ShellBridge.java            ZeehoNative 的方法分发（白名单）
  UpdateChecker.java          GitHub Releases 检查与下载
keystore/yutian.jks           固定签名，保证每次构建都能覆盖安装
.github/workflows/build.yml   自动构建 + 发 Release
```

## 换面板网页

把新的 H5 整包解压后覆盖 `panel/`（保留 `index.html` 这个名字），提交推送即可，手机上下次启动自动拉到新页面。

- GitHub Pages 推送后通常 1～2 分钟生效；
- jsDelivr 的 `@main` 有约 12 小时缓存，想立刻刷新可在 <https://purge.jsdelivr.net/> 填 `gh/3107281840/yutian-panel@main/panel/index.html` 清缓存；
- App 内的 ETag 缓存会在 Pages/jsDelivr 更新后自动失效。

## 改版本、发新版

编辑根目录 `gradle.properties`：

```properties
VERSION_CODE=4
VERSION_NAME=1.2.1
```

推到 `main` 后 Actions 会构建并发布 `v1.2.1` 的 Release，老版本 App 下次启动就能收到更新提示。

## 本地构建

需要 JDK 17 和 Android SDK（compileSdk 33、build-tools 33.0.2）：

```bash
echo "sdk.dir=/path/to/android-sdk" > local.properties
./gradlew assembleRelease
# 产物：app/build/outputs/apk/release/app-release.apk
```

## 签名说明

仓库里带了一份固定测试签名 `keystore/yutian.jks`，目的是让 CI 每次打出来的 APK 签名一致、能直接覆盖安装。它不适合上架，也不建议长期公开使用——换成自己的 keystore 后，记得同步修改 `gradle.properties` 里的四个签名配置，并且之后一直用同一份，否则老版本无法覆盖升级。

## 免责声明

本项目不包含极核官方 App 的任何代码或资源，仅把用户自有/公开的面板网页装进一个安卓 WebView 壳。车辆控制、账号与云端数据仍由面板网页和极核服务提供，使用风险自负。
