<style scoped></style>
<template>
  <main class = 'css-reset full-screen overflow-hidden-auto'>
    <RemoteUploadForMultipleComponent />
  </main>
</template>
<script
  setup
  type = 'module'>
'use strict';

import {
  defineAsyncComponent,
} from 'vue';

const RemoteUploadForMultipleComponent = defineAsyncComponent( () => import( 'RemoteUploadForMultiple/UploadForMultiple' ) );
</script>
