import {$} from '@core/dom';

export function resizeHandler(root, event) {
  const resizer = $(event.target)
  const parent = resizer.closest('[data-type="resizable"]')
  const coords = parent.getCoords()
  const type = event.target.dataset.resize

  const sideProp = type === 'col' ? 'bottom' : 'right'

  const valueSideProp = type === 'col'
  ? -(root.getCoords().height) + 'px'
  : -(root.getCoords().right) + 'px'

  let widthAfterResize
  let heightAfterResize

  resizer.css({
    opacity: 1,
    [sideProp]: valueSideProp,
  })

  if (type === 'col') {
    const handleMouseMove = (e) => {
      const delta = e.pageX - coords.right
      widthAfterResize = coords.width + delta

      resizer.css({
        right: -delta + 'px',
      })
    }

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)

      $(parent.el).css({width: widthAfterResize + 'px'})

      root
          .findAll(`[data-col="${parent.data.col}"]`)
          .forEach(el => {
            $(el).css({width: widthAfterResize + 'px'})
          })

      resizer.css({
        opacity: 0,
        bottom: 0,
        right: 0,
      })
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  } else {
    const handleMouseMove = (e) => {
      const delta = e.pageY - coords.bottom
      heightAfterResize = coords.height + delta

      resizer.css({
        bottom: -delta + 'px',
      })
    }

    const handleMouseUp = (e) => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)

      const delta = e.pageY - coords.bottom
      heightAfterResize = coords.height + delta

      $(parent.el).css({height: heightAfterResize + 'px'})

      resizer.css({
        bottom: 0,
        opacity: 0,
        right: 0,
      })
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }
}
