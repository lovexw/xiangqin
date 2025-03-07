<template>
  <div class="app-container">
    <router-view></router-view>
    <Disclaimer ref="disclaimerRef" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Disclaimer from './components/Disclaimer.vue';

const disclaimerRef = ref(null);

onMounted(() => {
  // 在页面加载时显示免责声明
  setTimeout(() => {
    disclaimerRef.value.showDisclaimer();
  }, 1000);
});
</script>

<style>
.app-container {
  min-height: 100vh;
  background-color: #f5f5f5;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
    'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
    'Noto Color Emoji';
}
</style>