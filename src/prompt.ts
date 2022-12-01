import prompt from 'prompt'
import { download } from './index'

(async function() {
  prompt.start({
    colors: true,
  })
  const { url, dest } = await prompt.get({
    properties: {
      url: {
        message: '请输入图标库的在线访问链接',
      },
      dest: {
        message: '请输入生成到的目录'
      }
    }
  })
  download(url as string, dest as string)
})()
