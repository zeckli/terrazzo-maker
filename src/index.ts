import * as d3 from 'd3'
import random from 'lodash.random'

import { TERRAZZO } from './enums'

/**
 * Make data for generating a blob.
 *
 */
export const makeBlobPoints = ({ position, radius }: MakeBlobPointsParams): BlobPointPosition[] => {
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
 * Make data of blobs.
 *
 */
export const makeBlobs = ({
  blob: { min, max },
  density,
  terrazzo: { width, height }
}: MakeBlobsParams) =>
  Array.from(Array(density).keys()).map(index =>
    makeBlobPoints({
      position: [random(0, width), random(0, height)],
      radius: random(min, max)
    })
  )

/**
 * Make the outline of a blob.
 *
 */
export const makeBlobOutline = d3
  .line()
  .x(([x, y]: BlobPointPosition) => x)
  .y(([x, y]: BlobPointPosition) => y)
  .curve(d3.curveBasisClosed)

/**
 * Make svg of a terrazzo.
 *
 */
export const makeTerrazzoSVG = ({
  blob,
  colors,
  density,
  terrazzo: { backgroundColor, width, height }
}: MakeTerrazzoParams) => {
  const blobs = makeBlobs({ blob, density, terrazzo: { width, height } })

  const svg = d3
    .create('svg')
    .attr('viewBox', `0 0 ${width} ${height}`)
    .attr('style', `background: ${backgroundColor}`)

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
export const makeTerrazzoSVGBase64 = (svg: SVGElement) => {
  const serialized = new XMLSerializer().serializeToString(svg)
  return `data:image/svg+xml;base64,${btoa(serialized)}`
}
