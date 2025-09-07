import { svg, concaveTriangle } from './svg-lib.js'

const $ = query => document.querySelector(query)
const $$ = query => document.querySelectorAll(query)

const getParam = paramId => Number($(`#${paramId}`).value)

const download = () => {
	const width = getParam('width')
	const vertexRad = getParam('vertex-radius')
	const sideRad = getParam('side-radius')
	const extrusion = getParam('extrusion')
	const filename = `${width}w-${vertexRad}vr-${sideRad}sr-${extrusion}ex.svg`
	const data = encodeURIComponent($('#render').innerHTML)
	const link = document.createElement('a')
	
	link.setAttribute('download', filename)
	link.setAttribute('href', `data:image/svg+xml; charset=utf-8,${data}`)
	document.body.append(link)
	link.click()
	document.body.removeChild(link)
}

const renderTriangle = () => {
	const width = getParam('width')
	const vertexRad = getParam('vertex-radius')
	const sideRad = getParam('side-radius')
	const extrusion = getParam('extrusion')

	svg()
	.shapes([
		concaveTriangle({
			position: { x: 0, y: 0 },
			width,
			vertexRad,
			sideRad,
			extrusion,
		})
	])
	.renderTo($('#render'))
	.fitContent()
}

// Attatch events

$$('input').forEach(
	input => input.onchange = renderTriangle
)

$('#download').onclick = download

// Main

renderTriangle()
