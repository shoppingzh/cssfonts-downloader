const FONT_FACE_RE = /\@font\-face\s*\{\s*.*?src\s*:\s*(.+?);\s*\}/
const FONT_ITEM_RE = /url\(['"](.*?)['"]\)\s+format\(['"](\w+)['"]\)/

interface CssRef {
  url: string,
  format: string,
}

/**
 * 解析CSS文件中的引用
 * @param content 
 */
export function parseCssRefs(content: string): CssRef[] {
  const result = new RegExp(FONT_FACE_RE, 'g').exec(content.replace(/\r?\n/g, ''))
  if (!result) return []
  const fontFace = result[1]
  const re = new RegExp(FONT_ITEM_RE, 'g')
  let r: RegExpExecArray
  const list: CssRef[] = []
  // eslint-disable-next-line no-cond-assign
  while (r = re.exec(fontFace)) {
    list.push({
      url: r[1],
      format: r[2],
    })
  }
  return list
}
