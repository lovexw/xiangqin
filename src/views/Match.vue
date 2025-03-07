<template>
  <div class="match-container">
    <div class="match-content">
      <h1 class="title">选择您的择偶条件</h1>
      <a-form
        :model="formState"
        name="matchForm"
        @finish="onFinish"
        class="match-form"
      >
        <a-form-item
          label="年龄范围"
          name="ageRange"
        >
          <a-slider
            v-model:value="formState.ageRange"
            range
            :min="18"
            :max="60"
          />
        </a-form-item>

        <a-form-item
          label="身高范围(cm)"
          name="heightRange"
        >
          <a-slider
            v-model:value="formState.heightRange"
            range
            :min="150"
            :max="180"
          />
        </a-form-item>

        <a-form-item
          label="最低月收入"
          name="minIncome"
        >
          <a-select v-model:value="formState.minIncome">
            <a-select-option value="5000">5000元以上</a-select-option>
            <a-select-option value="10000">1万以上</a-select-option>
            <a-select-option value="20000">2万以上</a-select-option>
            <a-select-option value="30000">3万以上</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          label="是否要求有车"
          name="hasCar"
        >
          <a-radio-group v-model:value="formState.hasCar">
            <a-radio :value="true">是</a-radio>
            <a-radio :value="false">否</a-radio>
          </a-radio-group>
        </a-form-item>

        <a-form-item
          label="是否要求有房"
          name="hasHouse"
        >
          <a-radio-group v-model:value="formState.hasHouse">
            <a-radio :value="true">是</a-radio>
            <a-radio :value="false">否</a-radio>
          </a-radio-group>
        </a-form-item>

        <a-form-item
          label="职业类型"
          name="occupation"
        >
          <a-select
            v-model:value="formState.occupation"
            mode="multiple"
            placeholder="可多选"
          >
            <a-select-option value="it">IT/互联网</a-select-option>
            <a-select-option value="finance">金融/银行</a-select-option>
            <a-select-option value="education">教育/培训</a-select-option>
            <a-select-option value="medical">医疗/卫生</a-select-option>
            <a-select-option value="gov">公务员/事业单位</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item
          label="可接受的彩礼范围"
          name="dowryRange"
        >
          <a-select v-model:value="formState.dowryRange">
            <a-select-option value="10">10万以下</a-select-option>
            <a-select-option value="20">10-20万</a-select-option>
            <a-select-option value="30">20-30万</a-select-option>
            <a-select-option value="31">30万以上</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item class="form-buttons">
          <a-button type="default" @click="onReset">重置</a-button>
          <a-button type="primary" html-type="submit">开始匹配</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const formState = reactive({
  ageRange: [25, 35],
  heightRange: [155, 170],
  minIncome: '10000',
  hasCar: false,
  hasHouse: false,
  occupation: [],
  dowryRange: '20'
});

const onFinish = values => {
  console.log('Success:', values);
  // 将筛选条件传递给结果页面
  router.push({
    path: '/result',
    query: {
      filters: JSON.stringify(formState)
    }
  });
};

const onReset = () => {
  formState.ageRange = [25, 35];
  formState.heightRange = [155, 170];
  formState.minIncome = '10000';
  formState.hasCar = false;
  formState.hasHouse = false;
  formState.occupation = [];
  formState.dowryRange = '20';
};
</script>

<style scoped>
.match-container {
  min-height: 100vh;
  padding: 40px 20px;
  background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%);
}

.match-content {
  max-width: 600px;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  color: #ff4d4f;
  font-size: 2rem;
  margin-bottom: 30px;
}

.match-form {
  max-width: 500px;
  margin: 0 auto;
}

.form-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
}

:deep(.ant-form-item) {
  margin-bottom: 24px;
}

:deep(.ant-slider) {
  margin: 10px 0;
}

:deep(.ant-form-item-label > label) {
  color: #333;
  font-size: 1rem;
}

@media (max-width: 576px) {
  .match-content {
    padding: 20px;
  }

  .title {
    font-size: 1.5rem;
  }
}
</style>