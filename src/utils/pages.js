const glob = require('glob')
const PAGE_PATH = '@/pages'
module.exports = {
  getPages: () => {
    const enterHtml = glob.sync(PAGE_PATH + '/*/*.html')
    const pages = {} // 对应vue.config.js中的pages选项的值
    enterHtml.forEach(filePath => {
      const fileName = filePath.substring(filePath.lastIndexOf('/') + 1, filePath.lastIndexOf('.'))
      pages[fileName] = {
        entry: `src/pages/${fileName}/${fileName}.js`,
        template: `src/pages/${fileName}/${fileName}.html`,
        filename: `${fileName}.html`
      }
    })
    return pages
  }
}
