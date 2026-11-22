# 雨天面板

极核（ZEEHO）车主面板 H5 的安卓外壳。原作者的 App 已经从分发渠道撤掉，这个仓库重新做了一个原生容器，把完整的 H5 整包内置进 APK，装上就能用，不再依赖原作者的下载页。

- 应用名：**雨天面板**
- 包名：`com.yutian.panel`
- 内置面板：`app/src/main/assets/panel/`（H5 整包 + 车模资源）
- 更新方式：GitHub Actions 构建 → 发布 Release → App 启动时自动检查并提示更新

> 本项目只是个人自用的第三方壳，与极核官方无关；面板网页与车模的作者、版权归原各自所有者。

## 它是怎么跑起来的

```
MainActivity
  └─ AssetServer（127.0.0.1 上的只读 HTTP 服务）
        └─ assets/panel/index.html   ← 面板网页
  └─ ZeehoNative（@JavascriptInterface）
        └─ 注入的 ZeehoShell / ZeehoShellTxn 桥
```

面板是 PWA，靠 `fetch`、`localStorage` 和同源相对路径吃饭，`file://` 会被 CORS 拦掉，所以壳里起了一个只监听回环地址的小 HTTP 服务，把 APK 里的 `assets/panel` 原样吐给 WebView。网页里的平台闸门只认真实的原生桥，因此启动前会注入 `ZeehoShell` 和 `ZeehoShellTxn`，让面板按 Android 原生模式运行，而不是掉进「UI 测试预览」。

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

下面这些需要厂商私有协议或系统级组件，当前壳**没有实现**，面板会按「当前 App 未提供所需的原生能力」自己降级，不会假装成功：

蓝牙感应钥匙 / 车辆 P2P 投屏 / 车机壁纸直传 / 桌面小组件 / 仪表 OTA / 后台连续采样 / 原生码表。

## 目录

```
app/src/main/java/com/yutian/panel/
  MainActivity.java      WebView、权限、文件选择、下载、返回键
  AssetServer.java       回环 HTTP + 桥脚本注入 + Range 支持
  ShellBridge.java       ZeehoNative 的方法分发（白名单）
  UpdateChecker.java     GitHub Releases 检查与下载
app/src/main/assets/panel/   面板 H5 整包（index.html / models / icons ...）
keystore/yutian.jks          固定签名，保证每次构建都能覆盖安装
.github/workflows/build.yml  自动构建 + 发 Release
```

## 本地构建

需要 JDK 17 和 Android SDK（compileSdk 33、build-tools 33.0.2）：

```bash
echo "sdk.dir=/path/to/android-sdk" > local.properties
./gradlew assembleRelease
# 产物：app/build/outputs/apk/release/app-release.apk
```

## 用 GitHub Actions 构建（推荐）

推到 `main` 就会自动：

1. 用 Gradle 7.6.4 + JDK 17 构建 `assembleRelease`；
2. 把 APK 上传成 Actions artifact；
3. 以 `v{versionName}` 为 tag 建一个 Release，附上 `yutian-panel.apk`。

App 启动时会读 `https://api.github.com/repos/<GH_OWNER>/<GH_REPO>/releases/latest`，发现 tag 比当前版本新就弹窗提示下载，走系统下载器安装。

## 改版本、发新版

编辑根目录 `gradle.properties`：

```properties
VERSION_CODE=2
VERSION_NAME=1.0.1
```

提交推送即可，Actions 会发 `v1.0.1` 的 Release，老版本 App 下次启动就能收到更新提示。

## 换面板网页

把新的 H5 整包解压后覆盖 `app/src/main/assets/panel/`（保留 `index.html` 这个名字），重新构建即可。桥脚本是运行时注入的，不需要改网页本身。

## 换成你自己的仓库

`gradle.properties` 里改这两行，应用内更新就会指向你的仓库：

```properties
GH_OWNER=你的GitHub用户名
GH_REPO=你的仓库名
```

## 签名说明

仓库里带了一份固定测试签名 `keystore/yutian.jks`，目的是让 CI 每次打出来的 APK 签名一致、能直接覆盖安装。它不适合上架，也不建议长期公开使用——换成自己的 keystore 后，记得同步修改 `gradle.properties` 里的四个签名配置，并且之后一直用同一份，否则老版本无法覆盖升级。

## 免责声明

本项目不包含极核官方 App 的任何代码或资源，仅把用户自有/公开的面板网页装进一个安卓 WebView 壳。车辆控制、账号与云端数据仍由面板网页和极核服务提供，使用风险自负。
