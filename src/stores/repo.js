import { createPinia } from 'pinia' //pinia独立维护
import persist from 'pinia-plugin-persistedstate'
const pinia = createPinia().use(persist) //使用pinia持久化插件
//pinia.use()
export default pinia
//import { useUserStore } from './modules/user'
//export { useUserStore } //暴露出方法给app.vue调用
export * from './modules/user'
