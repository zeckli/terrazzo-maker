import { random } from 'lodash'

import { BLOB, TERRAZZO } from '../enums'
import { makeBlobs, makePoints, makeSVG } from '../index'

const min = 5

const max = 15

const density = 20

const width = 200

const height = 200

describe('Generating terrazzo svg', () => {
  test('Make points for forming a blob', () => {
    const points = makePoints({
      position: [random(0, width), random(0, height)],
      radius: random(min, max)
    })
    expect(points).toHaveLength(4)
    points.map(point => expect(points[0]).toHaveLength(2))
  })

  test('Make an array of blobs', () => {
    const blobs = makeBlobs({
      blob: { min, max },
      density,
      size: { width, height }
    })
    expect(blobs).toHaveLength(20)
    blobs.map(blob => expect(blob).toHaveLength(4))
  })

  test('Make svg of a terrazzo', () => {
    const svg = makeSVG({
      blob: { min, max },
      colors: BLOB.COLORS,
      density,
      terrazzo: {
        backgroundColor: TERRAZZO.BACKGROUND_COLOR,
        height,
        width
      }
    })
    expect(svg).toEqual(
      expect.objectContaining({
        _groups: expect.any(Array),
        _parents: expect.any(Array)
      })
    )
  })
})
