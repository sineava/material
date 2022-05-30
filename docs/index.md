---
title: 前端物料
lang: zh-CN
---

<script setup>
import { ref } from 'vue'
import Fall from './components/Fall.vue'
const list = ref([
  { img: '/demo.png', link: '/vue/' }
])
</script>

<Fall :data="list"/>