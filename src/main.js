import { createApp } from "vue";
import track from "./ui.vue";
import Router from '../routers/index.js' 

createApp(track).use(Router).mount("#app")