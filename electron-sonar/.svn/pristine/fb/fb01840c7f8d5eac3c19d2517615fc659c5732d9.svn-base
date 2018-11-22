import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/landing-page',
      name: 'landing-page',
      component: require('@/components/LandingPage').default
    },
    {
      path: '/upload',
      name: 'upload',
      component: require('@/pages/Upload').default,
      children: [
        {
          path: '/listtab',
          name: 'listtab',
          component: require('@/components/ListTab').default,
          children: [
            {
              path: '/filewait',
              component: require('@/components/FileWait').default,
              name: 'filewait'
            },
            {
              path: '/filelist',
              component: require('@/components/FileList').default,
              name: 'filelist'
            },
            {
              path: '/fileunpass',
              component: require('@/components/FileUnpass').default,
              name: 'fileunpass'
            },
            {
              path: '/fileunusual',
              name: 'fileunusual',
              component: require('@/components/FileUnusual').default
            },
            {
              path: '/fileuploading',
              name: 'fileuploading',
              component: require('@/components/FileUploading').default
            }
          ]
        },
        {
          path: '/home',
          name: 'home',
          component: require('@/pages/Home').default
        }, {
          path: '/upload',
          name: 'home',
          component: require('@/pages/Home').default
        },
        {
          path: '/producerlist',
          name: 'producerlist',
          component: require('@/pages/producerList').default
        },
        {
          path: '/dataStatistics',
          name: 'dataStatistics',
          component: require('@/pages/dataStatistics').default
        },
        {
          path: '/myInformation',
          name: 'myInformation',
          component: require('@/pages/myInformation').default
        }
      ]
    },
    {
      path: '/uploaddemo',
      name: 'uploaddemo',
      component: require('@/pages/UploadDemo').default
    },
    {
      path: '/',
      name: 'login',
      component: require('@/pages/Login').default
    },
    {
      path: '/Renew',
      name: 'renew',
      component: require('@/pages/Renew').default
    },
    {
      path: '/updateprogress',
      name: 'updateprogress',
      component: require('@/pages/UpdateProgress').default
    },
    {// 路由重定向
      path: '*',
      redirect: '/'
    }
  ]
})
