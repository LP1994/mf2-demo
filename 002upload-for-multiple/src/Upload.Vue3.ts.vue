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
    <UploadForSingle />
    <UploadForMultiple />
  </main>
</template>
<script
  setup
  type = 'module'>
'use strict';

import {
  reactive,
  onMounted,
} from 'vue';

import UploadForSingle from './components/UploadForSingle.Vue3.ts.vue';
import UploadForMultiple from './components/UploadForMultiple.Vue3.ts.vue';

async function UploadForBinary( event ){
  const uploadForBinary = document.querySelector( '#UploadForBinary' ),
    files = uploadForBinary.files;

  if( files.length !== 0 ){
    const file = files[ 0 ];

    console.dir( file );
  }
}

const state = reactive( {
  titleText: `测试DIY的Deno服务器的文件上传`,
} );

onMounted( () => {
  console.log( `\n\n
模块提供者：Vue3版本的“文件上传组件”的DOM已挂载。
\n\n` );
} );
</script>
