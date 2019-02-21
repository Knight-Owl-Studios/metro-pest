module.exports = () => ({
  plugins: [
    require('postcss-import'),
    require('postcss-nested'),
    require('postcss-extend-rule'),
    require('postcss-preset-env')({
      stage: 0
    })
  ]
})
