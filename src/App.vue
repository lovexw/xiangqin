<template>
  <div class="app-container">
    <router-view></router-view>
    <Footer />
  </div>
</template>

<script setup>
import Footer from './components/Footer.vue';
</script>

<style>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>