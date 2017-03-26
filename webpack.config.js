module.exports = { 
  entry: {
    app: ['./index.js']
  },
  output: {
    filename: 'bundle.js',
    //publicPath: '/'
    publicPath: 'http://localhost:3000/built',
    path: './built'
  },  
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {   
        test: /\.js?|\.jsx$/,
        exclude: /node_modules/,
        loaders: ['babel-loader'] 
      },  
      {
        test: /\.(png|jpg|gif|ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        exclude: /node_modules/,
        loader: 'file-loader'
      },
      {   
        test: /\.css$/,
        loader: 'style-loader!css-loader' 
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  externals: [
    (function () {
      var IGNORES = [
        'electron'
      ];
      return function (context, request, callback) {
        if (IGNORES.indexOf(request) >= 0) {
          return callback(null, "require('" + request + "')");
        }
        return callback();
      };
    })()
  ]
};

