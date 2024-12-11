import {
  createApp,
} from 'vue';

import UploadComponentForVue3 from './Upload.Vue3.ts.vue';

const RootComponentInstance = createApp( UploadComponentForVue3 ).mount( '#app' );

console.log( `\n\n\n模块使用者：Vue3版本的“根组件”实例：` );
console.dir( RootComponentInstance );
console.log( `\n\n\n` );
