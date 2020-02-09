interface BlobRadiusRange {
  min: number
  max: number
}

interface MakePointsParams {
  position: PointPosition
  radius: number
}

type MakePointDataParams = BlobRadiusRange & SVGSize

interface MakeBlobsParams {
  blob: BlobRadiusRange
  density: number
  size: SVGSize
}

interface MakeSVGParams {
  blob: BlobRadiusRange
  colors: string[]
  density: number
  terrazzo: SVGSettings
}

type PointPosition = [number, number]

type SVGSettings = { backgroundColor: string } & SVGSize

interface SVGSize {
  width: number
  height: number
}
