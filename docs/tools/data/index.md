### Word导出(带图片)
[word模板](./template.docx)
::: details 🍃点击查看
```ts
renderDoc([
  { img: '/demo.jpg', name: '图片1' },
  { img: '/demo.jpg', name: '图片2' }
])
```
```ts
import Docxtemplater from 'docxtemplater'
import PizZip from 'pizzip'
import PizZipUtils from 'pizzip/utils/index'
import { saveAs } from 'file-saver'
import ImageModule from 'docxtemplater-image-module-free'

const loadFile = (url, callback) => {
  PizZipUtils.getBinaryContent(url, callback)
}

export const renderDoc = (list) => {
  const mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  loadFile('/template.docx', (error, content) => {
    if (error) throw error
    const zip = new PizZip(content)
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      modules: [
        new ImageModule({
          centered: false,
          getImage: (tagValue) => {
            return new Promise((resolve, reject) => {
              PizZipUtils.getBinaryContent(tagValue, (error, content) =>
                error ? reject(error) : resolve(content)
              )
            })
          },
          getSize: () => [150, 150]
        })
      ]
    })
    doc.renderAsync({ list }).then(() => {
      const out = doc.getZip().generate({
        type: 'blob',
        mimeType
      })
      saveAs(out, '导出.docx')
    })
  })
}
```
:::