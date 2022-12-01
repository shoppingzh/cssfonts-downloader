import { createWriteStream, PathLike } from 'fs'
import http from './http'

export async function writeFileFromUrl(url: string, filepath: PathLike) {
  return new Promise<void>(async(resolve, reject) => {
    try {
      const res = await http({
        url: url,
        method: 'get',
        responseType: 'stream',
        headers: {
          'accept-Encoding': 'deflate', // 解决请求大一点的内容会自动压缩的问题
        },
      })
      const stream = createWriteStream(filepath)
      res.data.pipe(stream)
      stream.on('finish', resolve)
      stream.on('error', reject)
    } catch (err) {
      reject(err)
    }
  })
}
