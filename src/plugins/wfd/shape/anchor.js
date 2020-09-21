import editorStyle from '../util/defaultStyle'
import { shapeBase } from '@antv/g6/lib/shape/shapeBase'
import Shape from '@antv/g6/lib/shape/shape'

export default function (G6) {
  Shape.registerFactory('anchor', {
    defaultShapeType: 'marker',
    getShape: (type) => {
      return Object.assign({}, shapeBase, {
        type: 'marker',
        itemType: type,
        drawShape (cfg, group) {
          const style = this.getShapeStyle(cfg)
          return group.addShape('marker', {
            attrs: style,
            name: 'anchor-shape',
            draggable: true
          })
        },
        setState (name, value, item) {
          if (name === 'active-anchor') {
            if (value) {
              this.update({ style: { ...editorStyle.anchorPointHoverStyle } }, item)
            } else {
              this.update({ style: { ...editorStyle.anchorPointStyle } }, item)
            }
          }
        }
      })
    }
  })
}
