import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'fs'
import config from './config'
import { resolve } from 'path'
import { writeFileFromUrl } from './util'
import { parseCssRefs } from './regExp'

function getFixedUrl(url: string) {
  if (/^\/\//.test(url)) return `https:${url}`
  if (/^https?:\/\//.test(url)) return url
  return `http://${url}`
}


const REF_FORMAT_FILE_EXT: Record<string, string> = {
  woff2: 'woff2',
  woff: 'woff',
  truetype: 'ttf',
  svg: 'svg',
}

export async function download(url: string, destDir: string) {
  if (!url) throw new Error('url is blank!')
  if (!destDir) throw new Error('destDir is blank!')
  if (existsSync(config.TEMP_PATH)) {
    rmSync(config.TEMP_PATH, { recursive: true, force: true })
  }
  mkdirSync(config.TEMP_PATH)
  if (!existsSync(destDir)) {
    mkdirSync(destDir)
  }

  const tmpCssFile = resolve(config.TEMP_PATH, 'font.css')
  await writeFileFromUrl(url as string, tmpCssFile)

  let cssContent = readFileSync(tmpCssFile, { encoding: 'utf-8' })
  const cssRefs = parseCssRefs(cssContent)
  cssRefs.forEach((ref) => {
    const extname = REF_FORMAT_FILE_EXT[ref.format]
    const filename = `font.${extname}`
    cssContent = cssContent.replace(ref.url, `${filename}?t=${+new Date()}`)
    writeFileFromUrl(getFixedUrl(ref.url), resolve(destDir, filename))
  })
  writeFileSync(resolve(destDir, 'font.css'), cssContent)
}
