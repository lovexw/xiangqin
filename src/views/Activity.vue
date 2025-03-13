<template>
  <div class="activity-container">
    <div class="activity-content">
      <div class="header-actions">
        <a-button type="default" @click="goHome" class="home-btn">
          <home-outlined />
          返回主页
        </a-button>
      </div>
      
      <h1 class="title">相亲活动</h1>
      
      <!-- 已结束活动列表 -->
      <div class="past-activities">
        <h2 class="section-title">往期活动回顾</h2>
        <div class="activities-grid">
          <a-card v-for="activity in pastActivities" :key="activity.id" class="activity-card">
            <template #cover>
              <img :alt="activity.title" :src="activity.image" class="activity-image" />
            </template>
            <a-card-meta :title="activity.title">
              <template #description>
                <div class="activity-info">
                  <p><calendar-outlined /> {{ activity.date }}</p>
                  <p><team-outlined /> 参与人数：{{ activity.participants }}</p>
                  <p><heart-outlined /> 成功配对：{{ activity.matches }}</p>
                  <p><environment-outlined /> {{ activity.location }}</p>
                </div>
              </template>
            </a-card-meta>
            <div class="activity-tag success">圆满结束</div>
          </a-card>
        </div>
      </div>

      <!-- 活动报名表单 -->
      <div class="registration-form">
        <h2 class="section-title">最新活动报名</h2>
        <a-form
          :model="formState"
          name="activityForm"
          @finish="onFinish"
          class="form"
        >
          <a-form-item
            label="姓名"
            name="name"
            :rules="[{ required: true, message: '请输入姓名' }]"
          >
            <a-input v-model:value="formState.name" />
          </a-form-item>

          <a-form-item
            label="性别"
            name="gender"
            :rules="[{ required: true, message: '请选择性别' }]"
          >
            <a-radio-group v-model:value="formState.gender">
              <a-radio value="female">女</a-radio>
              <a-radio value="male">男</a-radio>
            </a-radio-group>
          </a-form-item>

          <a-form-item
            label="年龄"
            name="age"
            :rules="[{ required: true, message: '请输入年龄' }]"
          >
            <a-input-number v-model:value="formState.age" :min="18" :max="60" />
          </a-form-item>

          <a-form-item
            label="联系电话"
            name="phone"
            :rules="[{ required: true, message: '请输入联系电话' }]"
          >
            <a-input v-model:value="formState.phone" />
          </a-form-item>

          <a-form-item
            label="职业"
            name="occupation"
            :rules="[{ required: true, message: '请选择职业' }]"
          >
            <a-select v-model:value="formState.occupation">
              <a-select-option value="it">IT/互联网</a-select-option>
              <a-select-option value="finance">金融/银行</a-select-option>
              <a-select-option value="education">教育/培训</a-select-option>
              <a-select-option value="medical">医疗/卫生</a-select-option>
              <a-select-option value="gov">公务员/事业单位</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item class="form-buttons">
            <a-button type="primary" html-type="submit" class="submit-btn">提交报名</a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { 
  HomeOutlined,
  CalendarOutlined,
  TeamOutlined,
  HeartOutlined,
  EnvironmentOutlined
} from '@ant-design/icons-vue';

const router = useRouter();

const goHome = () => {
  router.push('/');
};

const pastActivities = [
  {
    id: 1,
    title: '春日樱花联谊会',
    date: '2024-03-15',
    location: '市中心公园',
    participants: 50,
    matches: 8,
    image: '/image/1.jpeg'
  },
  {
    id: 2,
    title: '咖啡香遇见你',
    date: '2024-02-20',
    location: '星巴克旗舰店',
    participants: 30,
    matches: 5,
    image: '/image/2.jpeg'
  },
  {
    id: 3,
    title: '冬日温泉派对',
    date: '2024-01-10',
    location: '温泉度假村',
    participants: 40,
    matches: 6,
    image: '/image/3.jpeg'
  }
];

const formState = reactive({
  name: '',
  gender: 'female',
  age: 25,
  phone: '',
  occupation: ''
});

const onFinish = values => {
  console.log('Success:', values);
  // TODO: 处理表单提交
};
</script>

<style scoped>
.activity-container {
  min-height: 100vh;
  padding: 40px 20px;
  background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%);
}

.activity-content {
  max-width: 1200px;
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

.section-title {
  color: #333;
  font-size: 1.5rem;
  margin: 30px 0 20px;
}

.activities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.activity-card {
  position: relative;
  transition: transform 0.3s ease;
}

.activity-card:hover {
  transform: translateY(-5px);
}

.activity-image {
  height: 200px;
  object-fit: cover;
}

.activity-info {
  margin-top: 10px;
}

.activity-info p {
  margin: 5px 0;
  color: #666;
}

.activity-tag {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.activity-tag.success {
  background-color: #52c41a;
  color: white;
}

.registration-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

:deep(.ant-form-item) {
  margin-bottom: 0;
}

:deep(.ant-form-item-label) {
  width: 80px;
  text-align: right;
}

:deep(.ant-input),
:deep(.ant-input-number),
:deep(.ant-select) {
  width: 100%;
  max-width: 300px;
}

:deep(.ant-radio-group) {
  margin-left: 0;
}

.form-buttons {
  text-align: center;
  margin-top: 24px;
}

.submit-btn {
  min-width: 120px;
  height: 40px;
  font-size: 16px;
  border-radius: 20px;
}

@media (max-width: 768px) {
  .activities-grid {
    grid-template-columns: 1fr;
  }

  .activity-content {
    padding: 20px;
  }

  .title {
    font-size: 1.5rem;
  }
}
</style>