<template>
  <div class="home-container">
    <div class="home-content">
      <h1 class="title">同城交友相亲平台</h1>
      <p class="subtitle">安全可靠的本地婚恋交友服务</p>
      <div class="features">
        <div class="feature-item">
          <heart-outlined class="feature-icon" />
          <h3>同城匹配</h3>
          <p>智能推荐身边的优质单身，让缘分触手可及</p>
        </div>
        <div class="feature-item">
          <safety-outlined class="feature-icon" />
          <h3>真人认证</h3>
          <p>严格的实名认证体系，确保每个用户都是真实可靠</p>
        </div>
        <div class="feature-item">
          <smile-outlined class="feature-icon" />
          <h3>线下活动</h3>
          <p>定期举办同城交友活动，创造真实相遇的机会</p>
        </div>
      </div>
      <div class="action-buttons">
        <a-button type="primary" size="large" class="start-btn" @click="startMatching">
          开始寻找有缘人
        </a-button>
        <a-button type="primary" ghost size="large" class="activity-btn" @click="goToActivity">
          查看相亲活动
        </a-button>
        <a-button type="primary" ghost size="large" class="success-btn" @click="goToSuccess">
          幸福案例
        </a-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { HeartOutlined, SafetyOutlined, SmileOutlined } from '@ant-design/icons-vue';

const router = useRouter();

const startMatching = () => {
  router.push('/match');
};

const goToActivity = () => {
  router.push('/activity');
};

const goToSuccess = () => {
  router.push('/success');
};
</script>

<style scoped>
.home-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%);
}

.home-content {
  max-width: 900px;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 2.5rem;
  color: #ff4d4f;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 40px;
}

.features {
  display: flex;
  justify-content: space-around;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.feature-item {
  flex: 1;
  min-width: 200px;
  margin: 0 15px 20px;
  padding: 20px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
}

.feature-item:hover {
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 2rem;
  color: #ff4d4f;
  margin-bottom: 15px;
}

.feature-item h3 {
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: #333;
}

.feature-item p {
  color: #666;
  font-size: 0.9rem;
}

.start-btn {
  background-color: #ff4d4f;
  border-color: #ff4d4f;
  font-size: 1.1rem;
  height: 50px;
  padding: 0 30px;
  border-radius: 25px;
  box-shadow: 0 5px 15px rgba(255, 77, 79, 0.3);
  transition: all 0.3s ease;
  margin-right: 16px;
}

.activity-btn, .success-btn {
  font-size: 1.1rem;
  height: 50px;
  padding: 0 30px;
  border-radius: 25px;
  border-color: #ff4d4f;
  color: #ff4d4f;
  transition: all 0.3s ease;
}

.activity-btn:hover, .success-btn:hover {
  color: #ff7875;
  border-color: #ff7875;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(255, 77, 79, 0.1);
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.start-btn:hover {
  background-color: #ff7875;
  border-color: #ff7875;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(255, 77, 79, 0.4);
}

@media (max-width: 768px) {
  .features {
    flex-direction: column;
  }
  
  .feature-item {
    margin-bottom: 20px;
  }
  
  .title {
    font-size: 2rem;
  }
}
</style>