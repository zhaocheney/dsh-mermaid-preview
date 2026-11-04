# dsh-mermaid-preview

为 DeepSeek Harness Web UI 中的 Mermaid 代码块增加图标预览按钮。点击后在独立窗口中用 Mermaid 官方渲染器绘制图表，支持缩放、拖拽、适应窗口，并自带浅色/深色主题适配。

## 功能

- 在 Mermaid 代码块标题栏右上角显示预览图标（不修改宿主 Markdown DOM）。
- 点击图标打开预览窗口，使用与 Mermaid 官网相同的官方 `mermaid` 渲染库。
- 滚轮缩放、拖拽平移、双指捏合缩放；工具栏提供放大、缩小、适应窗口。
- `Esc` 关闭；`+` / `-` 缩放；`0` 适应窗口。
- 预览窗口使用 Harness 主题 token，自动跟随明暗主题重新渲染。
- 中文 / 英文界面文案，跟随 Harness 语言设置。
- Mermaid 渲染器作为按需加载的独立 chunk，不增加启动时的首屏负担。

## 目录结构

```
.
├── client.js              # 构建产物：Client 插件入口（不要手改）
├── client.mermaid.js      # 构建产物：按需加载的 Mermaid 渲染 chunk（不要手改）
├── index.js               # Host 半端，无需注册任何 Host 资源
├── cordis.patch.yml       # bundle patch
├── locale/                # 插件标题/描述 + 界面文案
├── icon.svg               # 插件图标
├── src/
│   ├── client.jsx         # 插件主逻辑：触发层、预览窗口、缩放/拖拽
│   ├── icons.jsx          # 图标
│   ├── styles.js          # 样式（只使用宿主主题 token）
│   └── mermaid-entry.js   # Mermaid chunk 入口
└── scripts/build.mjs      # esbuild 构建脚本
```

## 安装

在 DeepSeek Harness 的插件管理中安装本目录（本地 bundle）。安装后打开包含 Mermaid 代码块的会话即可看到预览图标。

## 构建

需要 Node.js 22+ 与 pnpm：

```bash
pnpm install
pnpm build
```

`pnpm build` 会同时生成：

- `client.js`：主插件 bundle。
- `client.mermaid.js`：Mermaid 12 完整渲染器，首次点击预览时才由 DSH 的 Client 模块加载器按需拉取。

两个产物需要提交到仓库，DSH 直接加载它们。修改 `src/` 后必须重新构建。

## 升级 Mermaid

Mermaid 版本与官网能力保持一致。升级时：

1. 修改 `package.json` 中 `mermaid` 的版本。
2. 执行 `pnpm install && pnpm build`。
3. 提交 `package.json`、`pnpm-lock.yaml`、`client.js`、`client.mermaid.js`。

`client.mermaid.js` 顶部保留了 Mermaid 的 MIT 许可声明。第三方依赖的许可注释由 esbuild 的 `legalComments: 'eof'` 保留；完整 Mermaid 许可见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。

## 实现要点

- **不写宿主 DOM**：插件注册到 `shell.overlay`，用 `MutationObserver` / `ResizeObserver` / 滚动与尺寸事件读取代码块几何信息，把 React 图标按钮定位到代码块标题栏右上角。
- **稳定的锚点**：使用 Markdown 渲染器公开的 `[data-code-block-content]`、`[data-code-block-banner]` 属性定位，而不是依赖哈希 CSS 类名。
- **语言识别**：优先识别 `code.language-mermaid`；当前 DSH 对未高亮的代码块不会输出语言类名（标题栏也显示为通用文案），因此同时按源码首个 Mermaid 图表声明（如 `sequenceDiagram`、`graph`、`flowchart`）识别，并缓存判定结果避免滚动时重复解析。
- **命中测试**：通过 `document.elementFromPoint` 过滤被滚动容器、吸顶区域或弹窗遮挡的代码块，避免图标浮在错误位置。
- **安全渲染**：Mermaid 使用 `securityLevel: 'strict'` 与 `suppressErrorRendering: true`；渲染失败只在预览窗口内显示错误，不会向宿主页面注入错误图。
- **按需加载**：Mermaid 通过 DSH 的包内 chunk 机制（`require.async('./client.mermaid.js')`）加载，主 bundle 保持很小。
- **主题隔离**：预览窗口使用 `--dsw-alias-*` 等宿主 token；Mermaid 主题根据当前 `colorScheme` 在 `default` / `dark` 之间切换。

## 已知限制

- 预览内容是点击瞬间的代码快照；流式生成中的代码需要等生成完成后再点击。
- Mermaid 的 `click` 交互节点在预览窗口中与拖拽手势共用指针事件：拖动会优先平移；未拖动时点击仍可触发链接/交互。
- 依赖宿主 Markdown 代码块的上述 `data-*` 属性。DSH 大版本升级后如果这些属性变化，需要同步调整 `src/client.jsx` 中的选择器。
