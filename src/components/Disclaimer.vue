<template>
  <div class="disclaimer">
    <a-modal
      v-model:visible="visible"
      title="免责声明"
      :footer="null"
      width="600px"
    >
      <div class="disclaimer-content">
        <h3>使用条款</h3>
        <p>欢迎使用AI相亲平台。使用本平台即表示您同意以下条款：</p>
        <ul>
          <li>本平台仅提供相亲信息匹配服务，不对用户提供的信息真实性负责</li>
          <li>用户应对自己提供的信息真实性负责，不得提供虚假信息</li>
          <li>平台不对用户间的交往结果承担责任</li>
        </ul>

        <h3>隐私政策</h3>
        <ul>
          <li>我们会严格保护用户的个人信息</li>
          <li>未经用户同意，不会向第三方透露用户信息</li>
          <li>用户照片仅用于平台匹配功能，不会用于其他用途</li>
        </ul>

        <h3>免责声明</h3>
        <ul>
          <li>本平台不承担因用户信息不实导致的任何纠纷</li>
          <li>用户间的线下见面安全由用户自行负责</li>
          <li>平台保留随时修改服务内容的权利</li>
        </ul>
      </div>
      <div class="disclaimer-footer">
        <a-button type="primary" @click="closeDisclaimer">我已阅读并同意</a-button>
      </div>
    </a-modal>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const visible = ref(false);

const showDisclaimer = () => {
  visible.value = true;
};

const closeDisclaimer = () => {
  visible.value = false;
};

defineExpose({
  showDisclaimer
});
</script>

<style scoped>
.disclaimer-content {
  max-height: 60vh;
  overflow-y: auto;
  padding: 0 20px;
}

.disclaimer-content h3 {
  color: #1890ff;
  margin-top: 20px;
  margin-bottom: 10px;
}

.disclaimer-content ul {
  padding-left: 20px;
  margin-bottom: 15px;
}

.disclaimer-content li {
  margin-bottom: 8px;
  color: #666;
}

.disclaimer-footer {
  text-align: center;
  margin-top: 20px;
}
</style>