# 面板解混淆参考源码

这些文件由 `webcrack` 对 `index.html` 里 10 个 `_0x` 混淆 bundle 做反混淆后生成，再用 Babel 把 `_0x` 变量按作用域重命名为 `v1`、`v2`……

- 字符串、对象键、常量已还原；
- 死代码、部分控制流平坦化、自保护代码已清理；
- 变量名只能变成序号，**原作者的命名、注释、模块边界无法还原**；
- 这是参考源码，不保证与原版逐行等价，也不建议直接替换线上 `../index.html`。

App 仍然使用 `../index.html`；可读版入口是同目录的 `index-readable.html`：

<https://3107281840.github.io/yutian-panel/panel/index-readable.html>

## 文件对应

| 文件 | 原脚本位置 | 原大小 |
| --- | --- | --- |
| `10.js` | 第 11 个 `<script>` | 44 KB |
| `12.js` | 第 13 个 | 321 KB |
| `14.js` | 第 15 个 | 330 KB |
| `16.js` | 第 17 个 | 203 KB |
| `18.js` | 第 19 个 | 664 KB |
| `20.js` | 第 21 个 | 272 KB |
| `22.js` | 第 23 个 | 370 KB |
| `24.js` | 第 25 个 | 398 KB |
| `26.js` | 第 27 个 | 578 KB |
| `28.js` | 第 29 个 | 432 KB |

其余脚本（WK 桥、平台闸门、three.js、lamejs 音频 Worker、mock JSON）本来就是明文或仅压缩，未做处理。

## 重新生成

```bash
npm i webcrack @babel/parser @babel/traverse @babel/generator
# 从 index.html 抽出脚本，对含 _0x 的块执行：
npx webcrack input.js -o out --no-unpack
node rename.js out/deobfuscated.js out/renamed.js
```
