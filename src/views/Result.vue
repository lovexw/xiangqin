<template>
  <div class="result-container">
    <div class="result-header">
      <h1 class="title">为您找到的匹配结果</h1>
      <p class="subtitle">根据您的择偶条件，我们为您推荐以下人选</p>
      <a-button type="primary" @click="backToMatch" class="back-btn">
        <left-outlined /> 重新筛选
      </a-button>
    </div>

    <div class="result-content">
      <a-spin :spinning="loading">
        <template v-if="matchedProfiles.length > 0">
          <div class="profiles-grid">
            <a-card 
              v-for="profile in matchedProfiles" 
              :key="profile.id"
              class="profile-card"
              :hoverable="true"
              @click="showProfileDetail(profile)"
            >
              <template #cover>
                <div class="card-cover">
                  <img :alt="profile.name" :src="profile.avatar" class="profile-avatar" />
                </div>
              </template>
              <template #title>
                <div class="card-title">
                  <span>{{ profile.name }}</span>
                  <span class="age">{{ profile.age }}岁</span>
                </div>
              </template>
              <template #extra>
                <heart-outlined class="like-icon" />
              </template>
              <div class="card-info">
                <p><span class="info-label">身高:</span> {{ profile.height }}cm</p>
                <p><span class="info-label">职业:</span> {{ getOccupationLabel(profile.occupation) }}</p>
                <p><span class="info-label">收入:</span> {{ formatIncome(profile.income) }}</p>
                <p class="card-tags">
                  <a-tag v-if="profile.hasCar" color="#87d068">有车</a-tag>
                  <a-tag v-if="profile.hasHouse" color="#108ee9">有房</a-tag>
                </p>
              </div>
            </a-card>
          </div>
        </template>
        <a-empty v-else description="没有找到符合条件的匹配" />
      </a-spin>
    </div>

    <a-modal
      v-model:visible="detailVisible"
      :title="selectedProfile ? selectedProfile.name + '的详细资料' : ''"
      width="700px"
      :footer="null"
      class="profile-modal"
    >
      <template v-if="selectedProfile">
        <div class="profile-detail">
          <div class="profile-header">
            <div class="profile-avatar-large">
              <img :src="selectedProfile.avatar" :alt="selectedProfile.name" />
            </div>
            <div class="profile-basic-info">
              <h2>{{ selectedProfile.name }} <span class="age">{{ selectedProfile.age }}岁</span></h2>
              <p><span class="info-label">身高:</span> {{ selectedProfile.height }}cm</p>
              <p><span class="info-label">体重:</span> {{ selectedProfile.weight }}kg</p>
              <p><span class="info-label">职业:</span> {{ getOccupationLabel(selectedProfile.occupation) }}</p>
              <p><span class="info-label">月收入:</span> {{ formatIncome(selectedProfile.income) }}</p>
              <p>
                <a-tag v-if="selectedProfile.hasCar" color="#87d068">有车</a-tag>
                <a-tag v-if="selectedProfile.hasHouse" color="#108ee9">有房</a-tag>
              </p>
            </div>
          </div>

          <a-divider />

          <div class="profile-details">
            <h3>个人介绍</h3>
            <p class="intro">{{ selectedProfile.introduction }}</p>

            <h3>家庭情况</h3>
            <p>{{ selectedProfile.familyInfo }}</p>

            <h3>择偶要求</h3>
            <p>{{ selectedProfile.requirements }}</p>

            <div class="requirements-details">
              <p><span class="info-label">彩礼要求:</span> {{ formatDowry(selectedProfile.dowryRequirement) }}</p>
              <p><span class="info-label">住房要求:</span> {{ selectedProfile.housingRequirement }}</p>
            </div>
          </div>

          <div class="contact-actions">
            <a-button type="primary" size="large">
              <message-outlined /> 发送消息
            </a-button>
            <a-button size="large">
              <phone-outlined /> 请求联系方式
            </a-button>
          </div>
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { HeartOutlined, LeftOutlined, MessageOutlined, PhoneOutlined } from '@ant-design/icons-vue';

const router = useRouter();
const route = useRoute();

const loading = ref(true);
const detailVisible = ref(false);
const selectedProfile = ref(null);

// 解析路由参数中的筛选条件
const filters = computed(() => {
  if (route.query.filters) {
    return JSON.parse(route.query.filters);
  }
  return {};
});

// 格式化职业显示
const getOccupationLabel = (occupation) => {
  const occupationMap = {
    'it': 'IT/互联网',
    'finance': '金融/银行',
    'education': '教育/培训',
    'medical': '医疗/卫生',
    'gov': '公务员/事业单位'
  };
  return occupationMap[occupation] || occupation;
};

// 格式化收入显示
const formatIncome = (income) => {
  if (income >= 10000) {
    return (income / 10000).toFixed(1) + '万/月';
  }
  return income + '元/月';
};

// 格式化彩礼显示
const formatDowry = (dowry) => {
  if (dowry >= 10000) {
    return (dowry / 10000).toFixed(1) + '万';
  }
  return dowry + '元';
};

// 显示详细资料
const showProfileDetail = (profile) => {
  selectedProfile.value = profile;
  detailVisible.value = true;
};

// 返回匹配页面
const backToMatch = () => {
  router.push('/match');
};

// 模拟的女性资料数据
const profiles = [
  {
    id: 1,
    name: '张雨晴',
    age: 26,
    height: 165,
    weight: 48,
    income: 15000,
    hasCar: true,
    hasHouse: false,
    occupation: 'finance',
    familyInfo: '独生女，父母都是教师，家庭和睦，父母开明，不干涉子女婚姻。',
    dowryRequirement: 150000,
    housingRequirement: '婚后希望有自己的小窝，可以共同购买。',
    requirements: '希望对方有上进心，性格温和，有责任感，年龄相仿。',
    introduction: '性格开朗，喜欢旅行和美食，工作认真负责，生活中也很会照顾人。希望找到能一起成长的伴侣。',
    avatar: '/src/image/1.jpg'
  },
  {
    id: 2,
    name: '李梦琪',
    age: 28,
    height: 160,
    weight: 45,
    income: 20000,
    hasCar: false,
    hasHouse: true,
    occupation: 'it',
    familyInfo: '有一个弟弟，父亲是工程师，母亲是会计，家庭氛围民主。',
    dowryRequirement: 100000,
    housingRequirement: '已有一套小房子，希望婚后能一起生活。',
    requirements: '希望对方诚实守信，有稳定工作，不酗酒不赌博，有共同话题。',
    introduction: '程序员一枚，热爱编程和阅读，性格安静但不内向，喜欢简单的生活，向往稳定的家庭。',
    avatar: '/src/image/2.jpg'
  },
  {
    id: 3,
    name: '王思颖',
    age: 25,
    height: 168,
    weight: 52,
    income: 12000,
    hasCar: false,
    hasHouse: false,
    occupation: 'education',
    familyInfo: '家中有一个姐姐，父母都是普通工人，家庭关系融洽。',
    dowryRequirement: 80000,
    housingRequirement: '希望男方有房或有购房能力，可以共同还贷。',
    requirements: '希望对方孝顺，有责任心，性格开朗，喜欢小孩。',
    introduction: '幼儿园老师，喜欢小朋友，性格温柔体贴，会做饭，喜欢养花和手工艺，希望组建一个温馨的家。',
    avatar: '/src/image/3.jpg'
  },
  {
    id: 4,
    name: '陈佳怡',
    age: 30,
    height: 163,
    weight: 50,
    income: 25000,
    hasCar: true,
    hasHouse: true,
    occupation: 'medical',
    familyInfo: '独生女，父母都是医生，家庭条件优越，受过良好教育。',
    dowryRequirement: 200000,
    housingRequirement: '已有房产，希望男方也有自己的住所或有共同置业的能力。',
    requirements: '希望对方有良好的教育背景，稳定的事业，有共同的价值观和生活目标。',
    introduction: '医生，工作忙碌但充实，生活自律，喜欢健身和烹饪，希望找到能互相理解、共同进步的伴侣。',
    avatar: '/src/image/4.JPG'
  },
  {
    id: 5,
    name: '刘雅婷',
    age: 27,
    height: 158,
    weight: 46,
    income: 18000,
    hasCar: true,
    hasHouse: false,
    occupation: 'finance',
    familyInfo: '有一个哥哥，父亲是企业管理人员，母亲是家庭主妇，家庭和睦。',
    dowryRequirement: 120000,
    housingRequirement: '希望婚后有自己的住所，可以共同努力购买。',
    requirements: '希望对方有上进心，性格温和，有幽默感，喜欢旅行。',
    introduction: '银行职员，性格活泼开朗，喜欢交朋友，热爱生活，擅长沟通，希望找到能一起享受生活的伴侣。',
    avatar: '/src/image/5.jpg'
  },
  {
    id: 6,
    name: '赵悦然',
    age: 24,
    height: 170,
    weight: 53,
    income: 10000,
    hasCar: false,
    hasHouse: false,
    occupation: 'education',
    familyInfo: '有一个妹妹，父母是普通职员，家庭氛围温馨。',
    dowryRequirement: 50000,
    housingRequirement: '希望男方有稳定住所或有购房计划。',
    requirements: '希望对方真诚善良，有责任感，愿意共同经营家庭。',
    introduction: '刚毕业的大学老师，热爱教育事业，性格温和，喜欢读书和音乐，希望找到志同道合的伴侣一起成长。',
    avatar: '/src/image/6.jpg'
  },
  {
    id: 7,
    name: '孙美琳',
    age: 29,
    height: 162,
    weight: 49,
    income: 30000,
    hasCar: true,
    hasHouse: true,
    occupation: 'it',
    familyInfo: '独生女，父母是大学教授，家庭氛围开明自由。',
    dowryRequirement: 300000,
    housingRequirement: '已有两套房产，希望男方也有自己的事业和资产。',
    requirements: '希望对方有良好的教育背景和家庭背景，事业有成，有共同语言。',
    introduction: '互联网公司高管，工作能力强，生活品质高，喜欢艺术和高雅活动，希望找到能力相当、志趣相投的伴侣。',
    avatar: '/src/image/7.JPG'
  },
  {
    id: 8,
    name: '吴婉婷',
    age: 26,
    height: 166,
    weight: 51,
    income: 16000,
    hasCar: false,
    hasHouse: true,
    occupation: 'gov',
    familyInfo: '有一个弟弟，父亲是公务员，母亲是教师，家庭和睦。',
    dowryRequirement: 150000,
    housingRequirement: '父母已购置婚房，希望男方家庭能理解并尊重。',
    requirements: '希望对方有稳定工作，性格温和，有责任心，最好是公务员或事业单位。',
    introduction: '事业单位工作人员，性格温柔贤惠，善解人意，喜欢烹饪和家居布置，向往简单幸福的生活。',
    avatar: '/src/image/8.jpg'
  },
  {
    id: 9,
    name: '郑小雨',
    age: 25,
    height: 159,
    weight: 44,
    income: 14000,
    hasCar: true,
    hasHouse: false,
    occupation: 'finance',
    familyInfo: '有一个哥哥，父母是公司职员，家庭关系和谐。',
    dowryRequirement: 100000,
    housingRequirement: '希望男方有房或有购房能力，婚后可以一起生活。',
    requirements: '希望对方性格开朗，有爱心，喜欢小动物，能接受我养宠物。',
    introduction: '金融分析师，工作认真负责，生活中喜欢养猫，喜欢看电影和旅行，希望找到能一起分享生活的伴侣。',
    avatar: '/src/image/9.jpg'
  },
  {
    id: 10,
    name: '杨晓晓',
    age: 27,
    height: 164,
    weight: 47,
    income: 22000,
    hasCar: false,
    hasHouse: true,
    occupation: 'gov',
    familyInfo: '独生女，父母都是事业单位工作人员，家庭和睦。',
    dowryRequirement: 180000,
    housingRequirement: '已有一套小房子，希望婚后能一起生活。',
    requirements: '希望对方有稳定工作，性格温和，有责任心，最好是公务员或事业单位。',
    introduction: '公务员，性格温和，做事认真负责，喜欢烹饪和旅行，希望找到能一起经营生活的伴侣。',
    avatar: '/src/image/10.jpg'
  }
];

// 根据筛选条件匹配合适的人选
const matchedProfiles = computed(() => {
  return profiles.filter(profile => {
    // 年龄范围匹配
    if (filters.value.ageRange && (profile.age < filters.value.ageRange[0] || profile.age > filters.value.ageRange[1])) {
      return false;
    }
    // 身高范围匹配
    if (filters.value.heightRange && (profile.height < filters.value.heightRange[0] || profile.height > filters.value.heightRange[1])) {
      return false;
    }
    // 最低月收入匹配
    if (filters.value.minIncome && profile.income < parseInt(filters.value.minIncome)) {
      return false;
    }
    // 是否有车匹配
    if (filters.value.hasCar && !profile.hasCar) {
      return false;
    }
    // 是否有房匹配
    if (filters.value.hasHouse && !profile.hasHouse) {
      return false;
    }
    // 职业类型匹配
    if (filters.value.occupation && filters.value.occupation.length > 0 && !filters.value.occupation.includes(profile.occupation)) {
      return false;
    }
    // 彩礼范围匹配
    const dowryMap = {
      '10': 100000,
      '20': 200000,
      '30': 300000,
      '31': 310000
    };
    if (filters.value.dowryRange && profile.dowryRequirement > dowryMap[filters.value.dowryRange]) {
      return false;
    }
    return true;
  });
});

// 模拟加载效果
onMounted(() => {
  setTimeout(() => {
    loading.value = false;
  }, 1000);
});
</script>

<style scoped>
.result-container {
  min-height: 100vh;
  padding: 40px 20px;
  background: linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%);
}

.result-header {
  text-align: center;
  margin-bottom: 40px;
  position: relative;
}

.title {
  font-size: 2rem;
  color: #ff4d4f;
  margin-bottom: 10px;
}

.subtitle {
  color: #666;
  margin-bottom: 20px;
}

.back-btn {
  position: absolute;
  left: 20px;
  top: 0;
}

.result-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.profiles-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.profile-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.profile-card:hover {
  transform: translateY(-5px);
}

.card-cover {
  height: 200px;
  overflow: hidden;
  background: #f5f5f5;
}

.profile-avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.age {
  color: #999;
  font-size: 0.9em;
}

.card-info {
  color: #666;
}

.info-label {
  color: #999;
  margin-right: 8px;
}

.card-tags {
  margin-top: 12px;
}

.like-icon {
  color: #ff4d4f;
  font-size: 1.2em;
  cursor: pointer;
}

.like-icon:hover {
  color: #ff7875;
}

/* 详情模态框样式 */
.profile-detail {
  padding: 20px;
}

.profile-header {
  display: flex;
  gap: 30px;
  margin-bottom: 30px;
}

.profile-avatar-large {
  width: 200px;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
}

.profile-avatar-large img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-basic-info {
  flex: 1;
}

.profile-basic-info h2 {
  margin-bottom: 20px;
  color: #333;
}

.profile-details h3 {
  color: #333;
  margin: 20px 0 10px;
}

.intro {
  color: #666;
  line-height: 1.6;
}

.requirements-details {
  margin-top: 20px;
  padding: 15px;
  background: #f5f5f5;
  border-radius: 8px;
}

.contact-actions {
  margin-top: 30px;
  display: flex;
  gap: 15px;
  justify-content: center;
}

@media (max-width: 768px) {
  .profiles-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }

  .profile-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .title {
    font-size: 1.5rem;
  }

  .back-btn {
    position: static;
    margin-bottom: 20px;
  }
}
</style>