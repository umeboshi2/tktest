# webpack config module.loaders
module.exports =
  [
    {
      test: /\.coffee$/
      loader: 'coffee-loader'
    }
    {
      test: /\.css$/
      loader: 'style-loader!css-loader'
    }
    {
      test: /\.(gif|png|eot|ttf)?$/
      loader: 'url-loader'
    }
    {
      test: /\.(woff|woff2|eot|ttf|svg)(\?[\&0-9]+)?$/
      loader: 'url-loader'
    }
    {
      test: /\.(woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/
      loader: 'url-loader'
    }
    # This is for using packaged jquery
    #{
    #  test: require.resolve 'jquery'
    #  loader: "expose?$!expose?jQuery"
    #}
    #{
    #  test: require.resolve 'rangy'
    #  loader: "expose?rangy"
    #}
    {
      test: /jquery\/src\/selector\.js$/
      loader: 'amd-define-factory-patcher-loader'
    }
    {
      test: /jquery-ui\/ui\/selector\.js$/
      loader: 'amd-define-factory-patcher-loader'
    }
    {
      test: /pixi\.js/
      loader: 'expose?PIXI'
    }
    {
      test: /phaser-split\.js$/
      loader: 'expose?Phaser'
    }
    {
      test: /p2\.js/
      loader: 'expose?p2'
    }
    {
      test: /masonry-layout/,
      loader: 'imports-loader?define=>false&this=>window'
    }
  ]
