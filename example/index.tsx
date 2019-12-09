import random from 'lodash.random'
import * as React from 'react'
import { render } from 'react-dom'

import { makeTerrazzoSVG, makeTerrazzoSVGBase64 } from '../src'
import { BLOB, TERRAZZO } from '../src/enums'

export const ExampleApp = () => {
  const makeWidth = () =>
    window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth

  const makeHeight = () =>
    window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight

  const makeDensity = () => random(250, TERRAZZO.DENSITY)

  const [density, setDensity] = React.useState<number>(makeDensity())

  const [svg, setSvg] = React.useState<SVGElement>(null)

  const regenerate = () => setDensity(makeDensity())

  const downloadSVG = () => {
    if (!svg) {
      return false
    }
    const link = document.createElement('a')
    link.href = makeTerrazzoSVGBase64(svg)
    link.download = 'terrazzo.svg'
    link.click()
  }

  React.useEffect(() => {
    const svgInstance = makeTerrazzoSVG({
      blob: { min: 3, max: 33 },
      colors: BLOB.COLORS,
      density: density,
      terrazzo: {
        backgroundColor: TERRAZZO.BACKGROUND_COLOR,
        width: makeWidth(),
        height: makeHeight()
      }
    })

    const base64 = makeTerrazzoSVGBase64(svgInstance.node())

    document.getElementById('body').style.background = `url(${base64})`

    setSvg(svgInstance.node())
  }, [density])

  return (
    <>
      <h1>Terrazzo Maker</h1>
      <div id="info">
        <h5>
          <a href="https://github.com/zeckli/terrazzo-maker" target="_blank">
            Github Repo
          </a>
        </h5>
        ·<h5>Version 0.1.0</h5>
      </div>
      <div>
        <button onClick={event => regenerate()}>Regenerate</button>
        <button onClick={event => downloadSVG()}>Dwonload SVG</button>
      </div>
      <footer>Made with 🦞by Zeck Li in Taiwan</footer>
    </>
  )
}

render(<ExampleApp />, document.getElementById('example'))
