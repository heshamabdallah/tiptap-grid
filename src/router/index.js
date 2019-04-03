import Vue from 'vue'
import Router from 'vue-router'
import RichTextEditor from '@/components/RichTextEditor/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'RichTextEditor',
      component: RichTextEditor
    }
  ]
})
