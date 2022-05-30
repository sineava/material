export default {
  title: '前端物料',
  description: 'Just playing around.',
  base: '/',
  themeConfig: {
    sidebar: [
      { text: '区块🍅', children: [
        { text: 'Vue', link: '/chain/vue/' },
        { text: 'React', link: '/chain/react/' }
      ]},
      { text: '组件库🍍', children: [
        { text: 'Vue', link: '/components/vue/' },
        { text: 'React', link: '/components/react/' }
      ]},
      { text: '工具类🍐', children: [
        { text: '日期', link: '/tools/date/' },
        { text: '正则', link: '/tools/regex/' },
        { text: '数据', link: '/tools/data/' }
      ]},
      { text: '笔记📘', children: [
        { text: 'docker打包', link: '/notes/docker/' },
        { text: 'android', link: '/notes/android/' }
      ] }
    ]
  }
}