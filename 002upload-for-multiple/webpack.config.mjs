import {
  dirname,
  resolve,
  join,
} from 'node:path';

import {
  fileURLToPath,
} from 'node:url';

import {
  VueLoaderPlugin,
} from 'vue-loader';

import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import HtmlWebpackPlugin from 'html-webpack-plugin';

import {
  ModuleFederationPlugin,
} from '@module-federation/enhanced/webpack';

function Get__dirname( import_meta_url = import.meta.url ){
  return dirname( Get__filename( import_meta_url ) );
}

function Get__filename( import_meta_url = import.meta.url ){
  return fileURLToPath( import_meta_url );
}

const __dirname = Get__dirname( import.meta.url );

export default {
  mode: 'development',
  cache: false,
  devtool: 'source-map',
  optimization: {
    minimize: false,
  },
  target: [
    'web',
    'es2024',
  ],
  entry: resolve( __dirname, './src/index.js' ),
  output: {
    publicPath: 'auto',
  },
  resolve: {
    extensions: [
      '.vue',
      '.js',
      '.mjs',
      '.cjs',
      '.json',
    ],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          'css-loader',
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          // Translates CSS into CommonJS
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin( {
      filename: '[name].css',
    } ),

    new ModuleFederationPlugin( {
      /**
       * 模块联邦的模块名称，该名称必须是唯一的。必须。<br />
       * 1、模块联盟使用该名称进行运行时数据检索和全局块存储变量引用。<br />
       * 2、提供端、使用端都得设置该参数！<br />
       */
      name: 'Remote_Upload',
      /**
       * 远端模块提供者生成的remoteEntry的文件名。非必须。<br />
       * 1、默认值：'remoteEntry.js'。<br />
       * 2、作为“output.path”目录内的相对路径。<br />
       * 例如，可以设置为：'mf-js/RemoteEntry_UploadForMultiple.js'，表示生成的JS文件路径会是：'${ output.path }/mf-js/RemoteEntry_UploadForMultiple.js'。<br />
       * 3、一般来说，设置了该选项的，就表示其是一个远端模块提供者（也叫做：远端模块分享者之类的，当然远端模块提供者也是可以使用（消费）其他的远端模块提供者提供的远端模块）。<br />
       */
      filename: 'RemoteEntry_Upload.js',
      /**
       * 一般来说，设置了该选项的，就表示其是一个远端模块使用者（也叫做：远端模块消费者之类的）。<br />
       */
      /*
       remotes: {
       RemoteUploadForMultiple: 'Remote_UploadForMultiple@http://localhost:8101/RemoteEntry_UploadForMultiple.js',
       },
       */
      /**
       * 远端模块提供者所要导出的各个模块。<br />
       * 1、设置要导出的模块。<br />
       * 2、确保所有键都以'./'开头。<br />
       * 例如：<br />
       * <code>
       * exposes: {
       *   './button': './src/components/button.vue',
       * }
       * </code>
       */
      exposes: [
        {
          './UploadForSingle': {
            import: [
              './src/components/UploadForSingle.Vue3.ts.vue',
            ],
            // 外露模块的自定义块名称，可选。
            // name: '',
          },
          './UploadForMultiple': {
            import: [
              './src/components/UploadForMultiple.Vue3.ts.vue',
            ],
            // 外露模块的自定义块名称，可选。
            // name: '',
          },
        },
      ],
      shared: {
        vue: {
          /**
           * 应提供给共享作用域的模块。如果在共享作用域中找不到共享模块或版本无效，也可作为后备模块。默认为属性名称。<br />
           * 1、值类型为：false、string。<br />
           */
          import: 'vue',
          /**
           * 软件包名称，用于从描述文件中确定所需的版本。只有在无法从请求中自动确定软件包名称时才需要这样做。<br />
           * 2、值类型：string。<br />
           */
          packageName: 'vue',
          /**
           * 所提供模块的版本。将替换较低的匹配版本，但不会替换更高的版本。默认情况下，webpack使用依赖项的package.json文件中的版本。<br />
           * 1、值类型为：false、string。<br />
           */
          version: '3.5.13',
          /**
           * 此字段指定软件包所需的版本。值类型为：false、string。<br />
           * 1、它接受语义版本控制，例如："^1.2.3"。<br />
           * 2、此外，如果版本以URL形式提供，它会检索版本，例如："git+ssh://git@github.com:foo/bar.git#v1.0.0"。<br />
           * 3、所需的版本，可以是一个版本范围。默认值是当前应用程序的依赖关系版本。<br />
           * 4、当使用共享依赖关系时，它会检查依赖关系版本是否大于或等于requiredVersion。如果大于或等于，将正常使用。如果小于requiredVersion，控制台将发出警告，并将使用共享依赖项中可用的最小版本。<br />
           * 5、当一方设置了requiredVersion，另一方设置了singleton时，将加载具有requiredVersion的依赖项，singleton方将直接使用具有requiredVersion的依赖项，而不管其版本如何。<br />
           */
          requiredVersion: '3.5.13',
          /**
           * 在共享范围内只允许共享模块的一个版本（默认已禁用）。值类型为：boolean。<br />
           * 1、是否只允许在共享范围内使用一个版本的共享模块（单机模式）。如果设置为true，则启用单机模式；如果设置为false，则不启用单机模式。<br />
           * 2、如果启用单机模式，远程应用程序组件和主机应用程序之间的共享依赖项将只加载一次，如果版本不一致，将加载更高的版本。<br />
           * 3、如果未启用单机模式，且远程应用程序和主机应用程序之间的共享依赖项版本不同，则将分别加载各自的依赖项。<br />
           * 4、某些库使用全局内部状态（如：react、react-dom）。如果共享作用域中的同一依赖关系有多个版本，则使用语义最高的版本。<br />
           */
          singleton: true,
          /**
           * 此提示允许webpack在版本无效时拒绝共享模块（当本地回退模块可用且共享模块不是单例时，默认为true；否则为false；如果没有指定所需的版本，则此提示无效）。如果找不到所需的版本，则会抛出运行时错误。<br />
           * 1、值类型为：boolean。<br />
           */
          strictVersion: true,
          /**
           * 将eager设为true会将共享的依赖关系打包到入口文件中，这可能会导致入口文件较大。请谨慎使用。值类型：boolean。<br />
           * 1、此提示将允许webpack直接包含所提供的模块和回退模块，而不是通过异步请求获取库。换句话说，这允许在初始块中使用该共享模块。此外，需要注意的是，启用此提示后，所有提供的模块和备用模块都会被下载。<br />
           * 2、是否立即加载共享模块。在正常情况下，需要启用lazy entry，然后按需异步加载共享模块。如果想使用共享模块，但又不想启用lazy entry，可以将eager设为true。<br />
           */
          eager: false,
          // shareKey?: string;
          // shareScope?: string;
          // shareStrategy?: 'version-first'(默认) | 'loaded-first';
        },
      },
      /**
       * 表示其是一个远端模块提供者（也叫做：远端模块分享者之类的，当然远端模块提供者也是可以使用（消费）其他的远端模块提供者提供的远端模块）。<br />
       */
      /*
       manifest: {
       /!**
       * 作为“output.path”目录内的相对路径。一般不用设置，默认就直接输出在“output.path”下，跟“webpack_assets_manifest.json”同级目录。<br />
       * 1、如果设置了，那请求路径形如：<br />
       * https://localhost:8101/dev_server/mf-json/Remote_UploadForMultiple-manifest.json
       * https://localhost:8101/dev_server/mf-json/Remote_UploadForMultiple-manifest-stats.json
       *!/
       filePath: 'mf-json',
       /!**
       * 同时还会有一个名为：Remote_UploadForMultiple-manifest-stats.json的文件。<br />
       * 1、如果设置了，那请求路径形如：<br />
       * https://localhost:8101/dev_server/mf-json/Remote_UploadForMultiple-manifest.json
       * https://localhost:8101/dev_server/mf-json/Remote_UploadForMultiple-manifest-stats.json
       *!/
       fileName: 'Remote_UploadForMultiple-manifest.json',
       // additionalData( options ){},
       /!**
       * 值类型为boolean，默认值为undefined，非必要！<br />
       * 1、不建议设置此配置。设置后，预加载功能将被禁用！<br />
       * 2、在复杂项目中分析资产可能需要很长时间。如果将此选项设置为true，资产分析将被禁用，从而优化构建时间。<br />
       * 3、如果项目纯粹面向消费者，则在开发过程中默认设置为true。<br />
       * 4、如果设置为"true"，清单中将不会出现shared和exposes字段，远程中也不会出现assets。<br />
       *!/
       // disableAssetsAnalyze: undefined,
       },
       */
      experiments: {
        federationRuntime: 'hoisted',
      },
      /**
       * 开发模式、生产模式都试了一下！发现没啥效果，只是纯粹的执行所设置的函数，没函数参数，返回值也没被使用！而且还是被立即执行函数包起来执行的！
       * 倒是可以在里面编码修改一些webpack特有的局部变量之类的：
       * <code>
       *   // 直接写死修改webpack的配置“output.publicPath”的值。
       *   __webpack_public_path__ = process.env.PUBLIC_PATH || 'https://localhost:8100/';
       * </code>
       * 1、值类型：string，必须以'function'开头。<br />
       */
      // getPublicPath: `function(){}`,
      dev: {
        disableLiveReload: false,
        disableHotTypesReload: false,
        disableDynamicRemoteTypeHints: false,
      },
      /**
       * 使用场景：用于控制模块联盟生成/消耗类型行为。<br />
       * 1、配置完成后，生产者会在构建过程中自动生成一个压缩类型文件“@mf-types.zip”（默认名称），消费者会自动提取远程的类型文件并解压为“@mf-types”（默认名称）。<br />
       */
      dts: {
        tsConfigPath: join( __dirname, './tsconfig.webpack.json' ),
        /**
         * 用于控制模块联盟生成类型行为。<br />
         * 1、该选项设置为true时，等同于如下配置：<br />
         * <code>
         *   {
         *     generateAPITypes: true,
         *     abortOnError: false,
         *     extractThirdParty: true,
         *     extractRemoteTypes: true,
         *     compileInChildProcess: true,
         *   }
         * </code>
         * 2、
         */
        generateTypes: {
          extractRemoteTypes: true,
          extractThirdParty: true,
          generateAPITypes: true,
          compileInChildProcess: true,
          // 在类型生成过程中遇到问题时是否抛出错误，默认值为：false。
          abortOnError: true,
          // dts.generateTypes.tsConfigPath > dts.tsConfigPath
          tsConfigPath: join( __dirname, './tsconfig.webpack.json' ),
          // typesFolder: '@mf-types',
          // deleteTypesFolder: false,
          compilerInstance: 'tsc',
          // compiledTypesFolder: '@mf-types',
          // 附加文件到编译中。
          // additionalFilesToCompile: string[]
        },
        /**
         * 用于控制模块联邦消耗（加载）类型行为。<br />
         * 1、该选项设置为true时，等同于如下配置：<br />
         * <code>
         *   {
         *     abortOnError: false,
         *     consumeAPITypes: true,
         *   }
         * </code>
         */
        consumeTypes: {
          consumeAPITypes: true,
          maxRetries: 3,
          abortOnError: true,
          // typesFolder: '@mf-types',
          // deleteTypesFolder: false,
          // remoteTypesFolder: '@mf-types',
          // runtimePkgs?: string[],
        },
      },
      shareStrategy: 'version-first',
    } ),

    new HtmlWebpackPlugin( {
      template: resolve( __dirname, './index.html' ),
    } ),

    new VueLoaderPlugin(),
  ],
  devServer: {
    port: 8101,
    allowedHosts: 'all',
    bonjour: true,
    client: {
      logging: 'info',
      overlay: {
        runtimeErrors: true,
        errors: true,
        warnings: false,
      },
      progress: true,
      reconnect: true,
      webSocketTransport: 'ws',
    },
    host: '0.0.0.0',
    devMiddleware: {
      writeToDisk: true,
    },
    static: {
      directory: join( __dirname ),
    },
    compress: true,
    setupExitSignals: true,
    hot: true,
    liveReload: false,
    webSocketServer: 'ws',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  },
};
