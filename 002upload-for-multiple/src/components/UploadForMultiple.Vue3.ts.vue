<style scoped>
.upload {
  box-sizing: border-box;

  width: 100%;
  height: auto;

  padding-left: 20px;
  margin-bottom: 40px;
}

.upload > h3 {
  width: 100%;
  height: auto;

  color: blue;

  line-height: 1;
  text-align: left;

  margin-bottom: 20px;
}

.upload > section {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;

  width: 100%;
  height: 50px;
}

.upload > section > button {
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
</style>
<template>
  <article class = 'css-reset upload'>
    <h3 class = 'css-reset'>FormData的多文件上传（uploadType=multiple）：</h3>
    <section class = 'css-reset'>
      <input
        id = 'UploadForMultiple'
        class = 'css-reset'
        type = 'file'
        multiple />
      <button
        class = 'css-reset'
        type = 'button'
        @click.prevent = 'UploadForMultiple'>上传
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

function UploadForMultiple( event ){
  const uploadForMultiple = document.querySelector( '#UploadForMultiple' ),
    files = uploadForMultiple.files;

  if( files.length !== 0 ){
    console.dir( files );

    const formData = new FormData();

    formData.append( 'uploadType', 'multiple' );

    Array.from( files ).forEach( ( file ) => {
      formData.append( 'files', file, file.name );
    } );

    console.dir( formData );
  }
}

onMounted( () => {
  console.log( `\n\n
远端的Vue3组件“UploadForMultiple”的DOM已挂载。
\n\n` );
} );
</script>
