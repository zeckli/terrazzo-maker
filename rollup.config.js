import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'

import pkg from './package.json'

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: pkg.main,
        format: 'cjs'
      },
      {
        file: pkg.module,
        format: 'es'
      }
    ],
    plugins: [
      commonjs({
        include: 'node_modules/**',
        namedExports: {
          'node_modules/lodash/lodash.js': ['random']
        }
      }),
      resolve(),
      typescript({ clean: true })
    ]
  }
]
