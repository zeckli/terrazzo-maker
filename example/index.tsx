import random from 'lodash.random'
import * as React from 'react'
import { render } from 'react-dom'

import { makeSVG, makeSVGBase64 } from '../src'
import { BLOB, TERRAZZO } from '../src/enums'

const DENSITY_MIN = 250

const DENSITY_MAX = 360

const RADIUS_MIN = 3

const RADIUS_MAX = 33

const makeDensity = () => random(DENSITY_MIN, DENSITY_MAX)

/**
 * Example app.
 *
 */
const App = () => {
  const makeWidth = () =>
    window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth

  const makeHeight = () =>
    window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight

  const [density, setDensity] = React.useState<number>(makeDensity())

  const [svg, setSvg] = React.useState<SVGElement>(null)

  const regenerate = () => setDensity(makeDensity())

  const download = () => {
    if (!svg) {
      return false
    }
    const link = document.createElement('a')
    link.href = makeSVGBase64(svg)
    link.download = 'terrazzo.svg'
    link.click()
  }

  React.useEffect(() => {
    const svgInstance = makeSVG({
      blob: { min: RADIUS_MIN, max: RADIUS_MAX },
      colors: BLOB.COLORS,
      density,
      terrazzo: {
        backgroundColor: TERRAZZO.BACKGROUND_COLOR,
        height: makeHeight(),
        width: makeWidth()
      }
    })

    const base64 = makeSVGBase64(svgInstance.node())

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
        <button onClick={event => download()}>Dwonload SVG</button>
      </div>
      <footer>Made with ⚡️by Zeck Li in Taiwan</footer>
    </>
  )
}

render(<App />, document.getElementById('example'))
