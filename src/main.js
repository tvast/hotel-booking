import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
// import 'vue-material/dist/theme/default-dark.css'

Vue.use(VueMaterial)
Vue.config.productionTip = false
Vue.mixin({
  data: function(){
    return {
      // showLoader : false,
    }
  },
  computed: {
  },/* eslint-disable no-mixed-spaces-and-tabs */
  methods: {
    showLoader: bool => {
      document.getElementById("loading").style.display = bool ? "block" : "none";
    },
    getTime(input) {
      // window.console.log(input)
      var getTImeHour = input.split("T")
      // window.console.log(getTImeHour)
      return getTImeHour[1]
    }, getduration(input) {
      // window.console.log(input)
      var getdurationtime = input.split("PT")
      // window.console.log(getTImeHour)
      return getdurationtime[0]
    }

    
   }
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
