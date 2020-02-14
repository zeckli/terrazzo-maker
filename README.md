<h1 align="center">
    terrazzo-maker
</h1>

<h4 align="center">
    A dummy tool for generating terrazzo pattern
</h4>

<p align="center">
    <img alt="terrazzo-maker" src="media/terrazzo-maker.png" />
</p>

<p align="center">
    <a href="https://cloud.drone.io">
        <img alt="Build Status" src="https://cloud.drone.io/api/badges/zeckli/terrazzo-maker/status.svg" />
    </a>
    <a href="https://codecov.io/gh/zeckli/terrazzo-maker">
        <img src="https://codecov.io/gh/zeckli/terrazzo-maker/branch/master/graph/badge.svg" />
    </a>
    <a href="https://github.com/prettier/prettier">
        <img alt="Code Style" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square" />
    </a>
</p>

## Description
`terrazzo-maker` is a dummy terrazzo pattern generator written in Typescript, and it's empowered by [D3](https://github.com/d3/d3). You can utilize it to creae a SVG element and embed it to your page. Or, just generate it in base64 string and use it as source of background image. Hope it helps. 🦊

## Install
```
npm i terrazzo-maker
```

## Run example up
Default web server port is `9000`, and you can change it in `package.json`.

```
npm run example
```
Then, check it by viewing `http://localhost:9000`.

## Usage
To make a terrazzo SVG:

```
import { makeSVG, makeSVGBase64 } from 'terrazzo-maker'

// crate a svg instance
const svg = makeSVG({
  blob: { min: 5, max: 20 },
  colors: [
    'rgba(239, 225, 240)',
    'rgba(204, 234, 240)',
    'rgba(247, 198, 203)',
    ...
  ],
  density: 300,
  terrazzo: {
    backgroundColor: '#fff',
    height: 500,
    width: 500
  }
})

// convert a svg into base64 string
const base64 = makeSVGBase64(svg.node())

```
