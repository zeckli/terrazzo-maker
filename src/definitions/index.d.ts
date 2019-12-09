type BlobPointPosition = [number, number]

interface MakeBlobPointsParams {
  position: BlobPointPosition
  radius: number
}

interface MakeBlobsParams {
  blob: BlobRadiusRange
  density: number
  terrazzo: { width: number; height: number }
}

interface BlobRadiusRange {
  min: number
  max: number
}

interface MakeTerrazzoParams {
  blob: BlobRadiusRange
  colors: string[]
  density: number
  terrazzo: TerrazzoSettings
}

interface TerrazzoSettings {
  backgroundColor: string
  width: number
  height: number
}
