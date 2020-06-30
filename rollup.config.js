const packageJson = require('./package.json')

const packageName = packageJson.name
export default [
  {
    input: 'src/index.js',
    output: {
      file: `./lib/${packageName}.js`,
      format: 'umd',
      name: packageName,
      sourcemap: true
    }
  },
]