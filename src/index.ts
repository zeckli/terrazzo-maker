import * as d3Selection from 'd3-selection'
import * as d3Shape from 'd3-shape'
import random from 'lodash.random'

import { TERRAZZO } from './enums'
import { range } from './utils'

/**
 * Make points for forming a blob.
 *
 */
export const makePoints = ({ position, radius }: MakePointsParams): PointPosition[] => {
  const [x, y] = position

  // Point 1
  const x1 = random(x - radius, x)
  const y1 = random(y - radius, y)

  // Point 2
  const x2 = random(x, x + radius)
  const y2 = random(y - radius, y)

  // Point 3
  const x3 = random(x, x + radius)
  const y3 = random(y, y + radius)

  // Point 4
  const x4 = random(x - radius, x)
  const y4 = random(y, y + radius)

  return [
    [x1, y1],
    [x2, y2],
    [x3, y3],
    [x4, y4]
  ]
}

/**
 * Make required data for forming a blob.
 *
 */
export const makePointData = ({
  min,
  max,
  width,
  height
}: MakePointDataParams): MakePointsParams => ({
  position: [random(0, width), random(0, height)],
  radius: random(min, max)
})

/**
 * Make a blob.
 *
 */
export const makeBlob = (params: MakePointDataParams): PointPosition[] =>
  makePoints(makePointData(params))

/**
 * Make an array of blobs.
 *
 */
export const makeBlobs = ({
  blob: { min, max },
  density,
  size: { width, height }
}: MakeBlobsParams) => range(density).map(index => makeBlob({ min, max, width, height }))

/**
 * Make the outline of a blob using D3.
 *
 */
export const makeBlobOutline = d3Shape
  .line()
  .x(([x, y]: PointPosition) => x)
  .y(([x, y]: PointPosition) => y)
  .curve(d3Shape.curveBasisClosed)

/**
 * Make svg of a terrazzo.
 *
 */
export const makeSVG = ({ blob, colors, density, terrazzo }: MakeSVGParams) => {
  const { backgroundColor, width, height } = terrazzo

  if (!backgroundColor || !width || !height) {
    throw new Error('terrazzo setting is invalid')
  }
  if (!backgroundColor.startsWith('#')) {
    throw new Error('background color is invalid. for example: #DDDDDD')
  }
  if (!blob || !blob.min || !blob.max) {
    throw new Error('blob setting is invalid')
  }
  if (!density) {
    throw new Error('density is invalid')
  }

  // make an array of blob data
  const blobs = makeBlobs({ blob, density, size: { width, height } })

  // make the svg container
  const svg = d3Selection
    .create('svg')
    .attr('viewBox', `0 0 ${width} ${height}`)
    .attr('style', `background: ${backgroundColor}`)

  // append blobs
  for (const item of blobs) {
    svg
      .append('path')
      .datum(item)
      .attr('d', makeBlobOutline)
      .attr('fill', colors[random(0, colors.length - 1)])
  }
  return svg
}

/**
 * Make the base64 string of a terrazzo svg.
 *
 */
export const makeSVGBase64 = (svg: SVGElement) => {
  const serialized = new XMLSerializer().serializeToString(svg)
  return `data:image/svg+xml;base64,${btoa(serialized)}`
}
