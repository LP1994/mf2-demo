<style
  scoped
  lang = 'scss'>
.upload {
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
</style>
<template>
  <article class = 'css-reset upload'>
    <h3 class = 'css-reset'>FormData的单文件上传（uploadType=single）：</h3>
    <section class = 'css-reset'>
      <input
        id = 'UploadForSingle'
        class = 'css-reset'
        type = 'file' />
      <button
        class = 'css-reset'
        type = 'button'
        @click.prevent = 'UploadForSingle'>上传
      </button>
    </section>
  </article>
</template>
<script
  setup
  type = 'module'>
'use strict';

import {
  onMounted,
} from 'vue';

function UploadForSingle( event ){
  const uploadForSingle = document.querySelector( '#UploadForSingle' ),
    files = uploadForSingle.files;

  if( files.length !== 0 ){
    const file = files[ 0 ];

    console.dir( file );

    const formData = new FormData();

    formData.append( 'uploadType', 'single' );
    formData.append( 'file', file, file.name );
    formData.append( 'fileName', `${ file.name }` );

    console.dir( formData );
  }
}

onMounted( () => {
  console.log( `\n\n
模块提供者：Vue3版本的“UploadForSingle”的DOM已挂载。
\n\n` );
} );
</script>
