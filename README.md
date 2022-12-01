# iconfont-download

iconfont字体包下载器，可以根据

## 安装

```bash
pnpm i iconfont-download
# yarn add iconfont-download
# npm i iconfont-download
```

## 使用

```ts
import { download } from 'iconfont-download'

// 将指定css文件及其引用的字体文件下载到fonts目录
download(
  'https://at.alicdn.com/t/c/example.css',
  './fonts'
)
```

