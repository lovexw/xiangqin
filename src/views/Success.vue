<template>
  <div class="success-container">
    <div class="success-content">
      <div class="header-actions">
        <a-button type="default" @click="goHome" class="home-btn">
          <home-outlined />
          返回主页
        </a-button>
      </div>
      
      <h1 class="title">幸福案例</h1>
      <p class="subtitle">每一段真挚的爱情都值得被铭记</p>
      
      <div class="success-stories">
        <a-row :gutter="[24, 24]">
          <a-col :xs="24" :sm="12" :md="8" v-for="story in successStories" :key="story.id">
            <a-card hoverable class="story-card">
              <template #cover>
                <div class="couple-image">
                  <img :alt="story.title" :src="story.image" />
                </div>
              </template>
              <a-card-meta :title="story.title">
                <template #description>
                  <div class="story-info">
                    <p class="couple-info">
                      <user-outlined /> {{ story.coupleInfo }}
                    </p>
                    <p class="match-date">
                      <calendar-outlined /> {{ story.matchDate }}
                    </p>
                    <p class="story-text">
                      <heart-outlined /> {{ story.story }}
                    </p>
                  </div>
                </template>
              </a-card-meta>
            </a-card>
          </a-col>
        </a-row>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { 
  HomeOutlined,
  UserOutlined,
  CalendarOutlined,
  HeartOutlined
} from '@ant-design/icons-vue';

const router = useRouter();

const goHome = () => {
  router.push('/');
};

const successStories = [
  {
    id: 1,
    title: '缘分天注定',
    coupleInfo: '小王 28岁 & 小李 26岁',
    matchDate: '2023年12月',
    story: '在平台相识两个月后，我们发现彼此是命中注定的另一半。共同的兴趣爱好和人生理想让我们越走越近。',
    image: '/image/10.jpeg'
  },
  {
    id: 2,
    title: '美好的相遇',
    coupleInfo: '小张 30岁 & 小陈 27岁',
    matchDate: '2023年10月',
    story: '参加平台举办的咖啡约会活动时，我们一见钟情。三个月后，我们决定携手共度余生。',
    image: '/image/11.jpeg'
  },
  {
    id: 3,
    title: '浪漫邂逅',
    coupleInfo: '小刘 29岁 & 小孙 28岁',
    matchDate: '2023年8月',
    story: '在平台的精准匹配下，我们发现对方就是自己一直在寻找的那个人。感谢平台带给我们这份幸福。',
    image: '/image/12.jpeg'
  },
  {
    id: 4,
    title: '甜蜜相知',
    coupleInfo: '小赵 31岁 & 小林 29岁',
    matchDate: '2023年7月',
    story: '共同的工作背景让我们有很多话题，经过两个月的了解，我们决定一起走下去。现在我们已经订婚了！',
    image: '/image/13.jpeg'
  },
  {
    id: 5,
    title: '幸福时光',
    coupleInfo: '小周 27岁 & 小吴 26岁',
    matchDate: '2023年5月',
    story: '在平台举办的户外活动中相识，共同的运动爱好让我们很快熟络起来。现在我们已经开始规划婚礼了。',
    image: '/image/14.jpeg'
  },
  {
    id: 6,
    title: '命中注定',
    coupleInfo: '小郑 32岁 & 小黄 30岁',
    matchDate: '2023年3月',
    story: '平台的智能匹配让我们相遇，共同的价值观和生活理念让我们决定携手共度余生。感谢平台！',
    image: '/image/15.jpeg'
  }
];
</script>

<style scoped>
.success-container {
  min-height: 100vh;
  padding: 40px 20px;
  background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%);
}

.success-content {
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
  margin-bottom: 10px;
}

.subtitle {
  text-align: center;
  color: #666;
  font-size: 1.2rem;
  margin-bottom: 30px;
}

.success-stories {
  margin-top: 20px;
}

.story-card {
  height: 100%;
  transition: transform 0.3s ease;
}

.story-card:hover {
  transform: translateY(-5px);
}

.couple-image {
  height: 200px;
  overflow: hidden;
}

.couple-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.story-info {
  margin-top: 16px;
}

.couple-info,
.match-date {
  margin-bottom: 8px;
  color: #666;
}

.story-text {
  color: #666;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .success-content {
    padding: 20px;
  }

  .title {
    font-size: 1.5rem;
  }

  .subtitle {
    font-size: 1rem;
  }
}
</style>