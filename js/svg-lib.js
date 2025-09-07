/**
 * @module svg-lib
 * @description This module provides utility functions for creating and
 * manipulating SVG elements in the DOM. It includes methods to construct
 * SVG elements such as `<svg>`, `<g>`, `<path>`, and `<circle>` with
 * chainable utility methods for setting attributes, rendering to a target
 * element, and adjusting dimensions. Additionally, it provides functions
 * for converting SVG elements to bitmaps and extracting point data
 */

/**
 * Constructs and renders SVG elements with utility functions
 *
 * @returns {SVGSVGElement} An SVG element with utility functions attached
 */
export const svg = () => {
	const elem = document.createElement('svg')
	let _rendered

	elem.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
	
	/**
	 * Sets the width of the SVG element
	 *
	 * @param {number} n - The width to set
	 * @returns {SVGSVGElement} The SVG element with utility functions attached
	 */
	elem.width = n => {
		elem.setAttribute('width', n)
		return elem
	}

	/**
	 * Sets the height of the SVG element
	 *
	 * @param {number} n - The height to set
	 * @returns {SVGSVGElement} The SVG element with utility functions attached
	 */
	elem.height = n => {
		elem.setAttribute('height', n)
		return elem
	}

	/**
	 * Appends shapes to the SVG element
	 *
	 * @param {SVGElement[]} s - An array of SVG elements to append
	 * @returns {SVGSVGElement} The SVG element with utility functions attached
	 */
	elem.shapes = s => {
		elem.append(...s)
		return elem
	}

	/**
	 * Renders the SVG element as a child of the specified target element
	 *
	 * @param {HTMLElement} targetElem - The target element to render into
	 * @returns {SVGSVGElement} The SVG element with utility functions attached
	 */
	elem.renderTo = targetElem => {
		targetElem.innerHTML = elem.outerHTML

		_rendered = targetElem.children[0]

		return elem
	}

	/**
	 * Adjusts the SVG's dimensions to fit its content
	 *
	 * @throws Will throw an error if `renderTo` has not been called
	 * @returns {SVGSVGElement} The SVG element with utility functions attached
	 */
	elem.fitContent = () => {
		if (!_rendered) throw 'Must invoke `renderTo` before `fitContent`'

		const { width, height } = _rendered.getBBox()

		elem.width(width)
		elem.height(height)
		_rendered.setAttribute('width', width)
		_rendered.setAttribute('height', height)
		_rendered.setAttribute('viewBox', `0 0 ${width} ${height}`)

		return elem
	}

	return elem
}

/**
 * Constructs SVG groups
 *
 * @returns {SVGGElement} An SVG group with utility functions attached
 */
export const group = () => {
	const elem = document.createElement('g')

	/**
	 * Adds shapes to the SVG group
	 *
	 * @param {SVGElement[]} s - An array of SVG elements to append
	 * @returns {SVGGElement} The SVG group with utility functions attached
	 */
	elem.shapes = s => {
		elem.append(...s)
		return elem
	}

	return elem
}

/**
 * Constructs SVG paths
 *
 * @returns {SVGPathElement} An SVG path with utility functions attached
 */
export const path = () => {
	const elem = document.createElement('path')

	/**
	 * Moves the path cursor to a global position
	 *
	 * @param {number} x - The x-coordinate
	 * @param {number} y - The y-coordinate
	 * @returns {SVGPathElement} The SVG path with utility functions attached
	 */
	elem.M = (x, y) => {
		const prev = elem.getAttribute('d') || ''
		elem.setAttribute('d', `${prev} M ${x} ${y}`)
		return elem
	}

	/**
	 * Moves the path cursor relative to its previous position
	 *
	 * @param {number} x - The relative x-coordinate
	 * @param {number} y - The relative y-coordinate
	 * @returns {SVGPathElement} The SVG path with utility functions attached
	 */
	elem.m = (x, y) => {
		const prev = elem.getAttribute('d') || ''
		elem.setAttribute('d', `${prev} m ${x} ${y}`)
		return elem
	}

	/**
	 * Draws a line relative to the path cursor's previous position
	 *
	 * @param {number} x - The relative x-coordinate
	 * @param {number} y - The relative y-coordinate
	 * @returns {SVGPathElement} The SVG path with utility functions attached
	 */
	elem.l = (x, y) => {
		const prev = elem.getAttribute('d') || ''
		elem.setAttribute('d', `${prev} l ${x} ${y}`)
		return elem
	}

	/**
	 * Draws an arc relative to the path cursor's previous position
	 *
	 * @param {number} rx - The x-radius of the arc
	 * @param {number} ry - The y-radius of the arc
	 * @param {number} x - The x-coordinate of the arc's end point
	 * @param {number} y - The y-coordinate of the arc's end point
	 * @param {number} [sweep=1] - The sweep flag
	 * @param {number} [xRot=0] - The x-axis rotation
	 * @param {number} [large=0] - The large-arc flag
	 * @returns {SVGPathElement} The SVG path with utility functions attached
	 */
	elem.a = (rx, ry, x, y, sweep=1, xRot=0, large=0) => {
		const prev = elem.getAttribute('d') || ''
		elem.setAttribute('d', `${prev} a ${rx} ${ry} ${xRot} ${large} ${sweep} ${x} ${y}`)
		return elem
	}

	/**
	 * Sets the fill color of the path
	 *
	 * @param {string} f - The fill color
	 * @returns {SVGPathElement} The SVG path with utility functions attached
	 */
	elem.fill = f => {
		elem.setAttribute('fill', f)
		return elem
	}

	return elem
}

/**
 * Constructs SVG circles
 *
 * @returns {SVGCircleElement} An SVG circle with utility functions attached
 */
export const circle = () => {
	const elem = document.createElement('circle')

	/**
	 * Sets the x-coordinate of the circle's center
	 *
	 * @param {number} n - The x-coordinate
	 * @returns {SVGCircleElement} The SVG circle with utility functions attached
	 */
	elem.cx = n => {
		elem.setAttribute('cx', n)
		return elem
	}

	/**
	 * Sets the y-coordinate of the circle's center
	 *
	 * @param {number} n - The y-coordinate
	 * @returns {SVGCircleElement} The SVG circle with utility functions attached
	 */
	elem.cy = n => {
		elem.setAttribute('cy', n)
		return elem
	}

	/**
	 * Sets the radius of the circle
	 *
	 * @param {number} n - The radius
	 * @returns {SVGCircleElement} The SVG circle with utility functions attached
	 */
	elem.r = n => {
		elem.setAttribute('r', n)
		return elem
	}

	/**
	 * Sets the fill color of the circle
	 *
	 * @param {string} f - The fill color
	 * @returns {SVGCircleElement} The SVG circle with utility functions attached
	 */
	elem.fill = f => {
		elem.setAttribute('fill', f)
		return elem
	}

	return elem
}

/**
 * Draws a concave triangle according to the provided parameters
 * 
 * @param {TriangleParams} params - The parameters for the triangle
 * @returns {SVGSVGElement} An SVG object representing the concave triangle
 */
export const concaveTriangle = ({
	position: {x, y},
	width: w,
	vertexRad: vr,
	sideRad: sr,
	extrusion: e,
}) => {
	const root3 = Math.sqrt(3)
	const root3_2 = root3 / 2
	const h = 0.5 * w * root3

	return group()
		.shapes([
			path()
			.M(x, y)
			.m(w / 2 - vr, vr)
			.a(vr, vr, 2 * vr, 0)
			.l(0, e)
			.a(
				sr, sr,
				w / 2 - vr - 0.5 * vr - root3_2 * e,
				h - 2 * vr - root3_2 * vr - 1.5 * e,
				0,
			)
			.l(root3_2 * e, 0.5 * e)
			.a(vr, vr, -vr, root3 * vr)
			.l(-root3_2 * e, -0.5 * e)
			.a(sr, sr, -w + 3 * vr + root3 * e, 0, 0)
			.l(-root3_2 * e, 0.5 * e)
			.a(vr, vr, -vr, -root3 * vr)
			.l(root3_2 * e, -0.5 * e)
			.a(
				sr, sr,
				w / 2 - 1.5 * vr - root3_2 * e,
				-h + (1 + root3_2) * vr + vr + 1.5 * e,
				0,
			)
			.l(0, -e)
		])
}
