<style
  scoped
  lang = 'scss'>
main {

  > .title {
    width: 100%;
    height: auto;

    color: green;

    line-height: 1;
    text-align: center;

    margin-bottom: 20px;
  }

  > .upload {
    box-sizing: border-box;

    width: 100%;
    height: auto;

    padding-left: 20px;
    margin-bottom: 40px;

    > h3 {
      width: 100%;
      height: auto;

      color: blue;

      line-height: 1;
      text-align: left;

      margin-bottom: 20px;
    }

    > section {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;

      width: 100%;
      height: 50px;

      > input[type='file'] {
        width: 200px;
        height: 100%;
      }

      > input[type='file' i] {
        display: inline-block !important;
        height: 100% !important;
        color: red;

        &::-webkit-file-upload-button {
          display: inline-block !important;
          width: 80px !important;
          height: 100% !important;
          color: green;

          padding: 0;
          border: 1px solid palevioletred;
          border-radius: 5px;
          margin: 0 20px 0 0;
          outline: none;

          background-color: white;
        }
      }

      > button {
        box-sizing: border-box;

        width: 100px;
        height: 100%;

        color: black;
        font-size: 20px;

        line-height: 48px;
        text-align: center;

        border: 1px solid palevioletred;
        border-radius: 10px;
        margin-left: 40px;

        background-color: white;
      }

    }

  }

}
</style>
<template>
  <!--*********弹窗、悬浮一类节点的书写区域 Start*********-->
  <!--
  说明：
  1、这些弹窗、悬浮一类节点的最外层节点的定位建议使用“position: absolute”。
  2、这样就算这些节点中有可滚动的内容，也不会出现滚动穿透BUG！
  -->
  <!--<dialog style = 'position: absolute;'>例子：可以滚动的内容。</dialog>-->
  <!--*********弹窗、悬浮一类节点的书写区域 End*********-->
  <!--在main这个节点里写主体HTML。-->
  <main class = 'css-reset full-screen overflow-hidden-auto'>
    <h1 class = 'css-reset title'>{{ state.titleText }}</h1>
    <article class = 'css-reset upload'>
      <h3 class = 'css-reset'>单个二进制文件流上传（uploadType=binary）：</h3>
      <section class = 'css-reset'>
        <input
          id = 'UploadForBinary'
          class = 'css-reset'
          type = 'file' />
        <button
          class = 'css-reset'
          type = 'button'
          @click.prevent = 'UploadForBinary'>上传
        </button>
      </section>
    </article>
    <RemoteUploadForSingleComponent />
    <RemoteUploadForMultipleComponent />
  </main>
</template>
<script
  setup
  type = 'module'>
'use strict';

import {
  sha512,
} from 'js-sha512';

import {
  Mime,
} from 'mime';

import {
  init as MF_v2_Init,
  loadRemote as MF_v2_LoadRemote,
} from '@module-federation/enhanced/runtime';

import {
  defineAsyncComponent,
  reactive,
  onMounted,
} from 'vue';

MF_v2_Init( {
  name: 'MF2_Main_Upload',
  remotes: [
    {
      name: 'Remote_UploadForMultiple',
      entry: mode === 'development'
             ? 'http://localhost:8102/RemoteEntry_UploadForMultiple.js'
             : './003/RemoteEntry_UploadForMultiple.js',
      alias: 'RemoteUploadForMultiple',
    }
  ],
} );

const RemoteUploadForSingleComponent = defineAsyncComponent( () => import( 'RemoteUploadForSingle/UploadForSingle' ) );
const RemoteUploadForMultipleComponent = defineAsyncComponent( () => MF_v2_LoadRemote( 'RemoteUploadForMultiple/UploadForMultiple' ) );

function FileSRI( data ){
  return sha512.create().update( data ).hex();
}

function GetFileMIME( file ){
  return new Mime().getType( file.name ) ?? 'application/octet-stream';
}

async function UploadForBinary( event ){
  const uploadForBinary = document.querySelector( '#UploadForBinary' ),
    files = uploadForBinary.files;

  if( files.length !== 0 ){
    const file = files[ 0 ];

    console.dir( file );

    fetch( `https://localhost:9200/simulation_servers_deno/upload?uploadType=binary&fileName=${ file.name }&isForcedWrite=true`, {
      body: file.slice(),
      cache: 'no-cache',
      headers: {
        Accept: 'application/json',
        'content-type': GetFileMIME( file ),
        'deno-custom-file-sri': `${ FileSRI( new Uint8Array( await file.arrayBuffer() ) ) }`,
        ...{
          /**
           * Cache-Control：https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control
           */
          'Cache-Control': 'no-cache',
          /**
           * Access-Control-Request-Headers：https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Request-Headers
           * 1、浏览器在发出预检请求时使用Access-Control-Request-Headers请求标头，让服务器知道在发出实际请求时客户端可能发送哪些HTTP标头（例如使用setRequestHeader()）。
           * 2、Access-Control-Allow-Headers的补充服务器端标头将回答此浏览器端标头。
           * 3、该标头系用于客户端发起的请求中的标头，而不是用于服务器的响应中的标头。
           */
          'Access-Control-Request-Headers': 'deno-custom-file-sri, Authorization, Accept, Content-Type, Content-Language, Accept-Language, Cache-Control',
          /**
           * Access-Control-Request-Method：https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Access-Control-Request-Method
           * 1、浏览器在发出预检请求时使用Access-Control-Request-Method请求标头，让服务器知道在发出实际请求时将使用哪种HTTP方法。
           * 2、这个标头是必需的，因为预检请求始终是一个选项，并且不使用与实际请求相同的方法。
           * 3、该标头系用于客户端发起的请求中的标头，而不是用于服务器的响应中的标头。
           */
          'Access-Control-Request-Method': 'GET, HEAD, POST, PUT, DELETE, CONNECT, OPTIONS, TRACE, PATCH',
        },
      },
      method: 'POST',
      credentials: 'omit',
      mode: 'cors',
    } ).then(
      async ( res ) => {
        console.dir( await res.clone().json() );

        return res;
      },
      ( reject ) => {
        console.error( reject );
      },
    ).catch( ( error ) => {
      console.error( error );
    } );
  }
}

const state = reactive( {
  titleText: `测试DIY的Deno服务器的文件上传`,
} );

onMounted( () => {
  console.log( `\n\n
模块使用者：Vue3版本的“文件上传组件”的DOM已挂载。
\n\n` );
} );
</script>
