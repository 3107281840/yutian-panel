# 雨天面板

极核（ZEEHO）车主面板 H5 的安卓外壳。**H5 整包内置在 APK 里**，装上就能用，不依赖 GitHub / jsDelivr 在线拉取，断网也能启动。

- 应用名：**雨天面板**
- 包名：`com.yutian.panel`
- 版本：1.4.0
- 内置面板：`app/src/main/assets/panel/`（index.html + 车模 + 图标）
- 应用更新：GitHub Releases

> 本项目只是个人自用的第三方壳，与极核官方无关；面板网页与车模的作者、版权归原各自所有者。

## 它是怎么跑起来的

```
MainActivity
  └─ AssetServer（127.0.0.1 上的只读 HTTP 服务）
        └─ assets/panel/index.html
        └─ 注入 BridgeScript：ZeehoNative → ZeehoShell / ZeehoShellTxn / ZeehoCast
  └─ ShellBridge（@JavascriptInterface）
```

面板是 PWA，靠 `fetch`、`localStorage` 和同源相对路径吃饭，`file://` 会被 CORS 拦掉，所以壳里起一个只监听回环地址的小 HTTP 服务，把 APK 里的 `assets/panel` 原样吐给 WebView。网页的平台闸门只认真实的原生桥，因此启动前会注入 `ZeehoShell` 和 `ZeehoShellTxn`。

## 已对接的能力

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

`ZeehoShell` 按原版 `ShellBridge` 注册了全部 **142 个方法名**（另加 `ZeehoCast` 投屏命名空间）。真正实现的在上面这张表里；其余依赖厂商私有协议或系统级组件的调用统一返回 `{"ok":false,"error":"unsupported"}`，面板会明确降级。

## 目录

```
app/src/main/assets/panel/   内置面板 H5 整包（index.html / models / icons ...）
app/src/main/java/com/yutian/panel/
  MainActivity.java          WebView、权限、文件选择、下载、返回键
  AssetServer.java           回环 HTTP + 桥脚本注入 + Range 支持
  ShellBridge.java           ZeehoNative 的方法分发（白名单）
  UpdateChecker.java         GitHub Releases 检查与下载
keystore/yutian.jks          固定签名，保证每次构建都能覆盖安装
.github/workflows/build.yml  自动构建 + 发 Release
panel/                       面板源码备份 / GitHub Pages（App 不读取）
panel/readable/              解混淆参考源码（App 不读取）
```

## 改版本、发新版

编辑根目录 `gradle.properties`：

```properties
VERSION_CODE=8
VERSION_NAME=1.4.1
```

推到 `main` 后 Actions 会构建并发布 `v1.4.1` 的 Release，老版本 App 下次启动就能收到更新提示。

## 换内置面板

把新的 H5 整包覆盖 `app/src/main/assets/panel/`（保留 `index.html`），重新构建即可。桥脚本是运行时注入的，不需要改网页本身。

## 签名说明

仓库里带了一份固定测试签名 `keystore/yutian.jks`，目的是让 CI 每次打出来的 APK 签名一致、能直接覆盖安装。它不适合上架，也不建议长期公开使用——换成自己的 keystore 后，记得同步修改 `gradle.properties` 里的四个签名配置。

## 免责声明

本项目不包含极核官方 App 的任何代码或资源，仅把用户自有/公开的面板网页装进一个安卓 WebView 壳。车辆控制、账号与云端数据仍由面板网页和极核服务提供，使用风险自负。
