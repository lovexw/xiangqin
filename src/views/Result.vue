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
            <a-button type="primary" size="large" @click="handleSendMessage">
              <message-outlined /> 发送消息
            </a-button>
            <a-button size="large" @click="requestContact">
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
import { message, Modal } from 'ant-design-vue';

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

// 请求联系方式
const requestContact = () => {
  Modal.info({
    title: '联系方式请求',
    content: '请添加红娘微信联系方式，为您尽快匹配另一半。',
    okText: '我知道了'
  });
};

// 发送消息
const handleSendMessage = () => {
  message.info('功能正在完善中，请耐心等待');
};

// 模拟的女性资料数据
const profiles = [
  {
    id: 1,
    name: '张雨晴',
    gender: 'female',
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
    avatar: '/image/1.jpeg'
  },
  {
    id: 2,
    name: '李梦琪',
    gender: 'female',
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
    avatar: '/image/2.jpeg'
  },
  {
    id: 3,
    name: '王思颖',
    gender: 'female',
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
    avatar: '/image/3.jpeg'
  },
  {
    id: 4,
    name: '陈佳怡',
    gender: 'female',
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
    avatar: '/image/4.jpeg'
  },
  {
    id: 5,
    name: '刘雅婷',
    gender: 'female',
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
    avatar: '/image/5.jpeg'
  },
  {
    id: 6,
    name: '赵悦然',
    gender: 'female',
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
    avatar: '/image/6.jpeg'
  },
  {
    id: 7,
    name: '孙美琳',
    gender: 'female',
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
    avatar: '/image/7.jpeg'
  },
  {
    id: 8,
    name: '吴婉婷',
    gender: 'female',
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
    avatar: '/image/8.jpeg'
  },
  {
    id: 9,
    name: '郑小雨',
    gender: 'female',
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
    avatar: '/image/9.jpeg'
  },
  {
    id: 10,
    name: '陈雅静',
    gender: 'female',
    age: 27,
    height: 163,
    weight: 48,
    income: 18000,
    hasCar: true,
    hasHouse: false,
    occupation: 'finance',
    familyInfo: '有一个妹妹，父母经商，家庭条件优越。',
    dowryRequirement: 200000,
    housingRequirement: '希望男方有房，或者能共同购房。',
    requirements: '希望对方有上进心，经济条件良好，性格开朗大方。',
    introduction: '金融分析师，工作稳定，性格活泼开朗，会理财，喜欢旅游和美食，希望找到一个能互相扶持的伴侣。',
    avatar: '/image/10.jpeg'
  },
  {
    id: 11,
    name: '王俊杰',
    gender: 'male',
    age: 28,
    height: 180,
    weight: 70,
    income: 25000,
    hasCar: true,
    hasHouse: true,
    occupation: 'it',
    familyInfo: '独生子，父母都是教师，家庭和睦。',
    dowryRequirement: 100000,
    housingRequirement: '已有一套房，希望未来另一半能一起生活。',
    requirements: '希望对方温柔贤惠，有一定的经济基础，性格开朗。',
    introduction: '程序员，热爱技术，生活规律，喜欢运动和阅读，希望找到一个能互相理解、共同成长的伴侣。',
    avatar: '/image/11.jpeg'
  },
  {
    id: 12,
    name: '李明阳',
    gender: 'male',
    age: 32,
    height: 178,
    weight: 75,
    income: 35000,
    hasCar: true,
    hasHouse: true,
    occupation: 'finance',
    familyInfo: '有一个妹妹，父母是企业高管，家庭关系和谐。',
    dowryRequirement: 150000,
    housingRequirement: '已有两套房产，希望对方也有自己的事业追求。',
    requirements: '希望对方有良好的教育背景，善解人意，能互相支持。',
    introduction: '投资经理，事业有成，生活品质讲究，喜欢健身和旅行，寻找一位知性优雅的伴侣。',
    avatar: '/image/12.jpeg'
  },
  {
    id: 13,
    name: '张志远',
    gender: 'male',
    age: 29,
    height: 162,
    weight: 72,
    income: 28000,
    hasCar: true,
    hasHouse: false,
    occupation: 'medical',
    familyInfo: '独生子，父母都是医生，家庭氛围开明。',
    dowryRequirement: 120000,
    housingRequirement: '计划明年购房，希望能和另一半共同打造温馨的家。',
    requirements: '希望对方善良温和，最好是医护相关工作，能理解医生的工作特点。',
    introduction: '外科医生，工作认真负责，生活中也很会照顾人，期待遇到能互相理解、共同进步的另一半。',
    avatar: '/image/13.jpeg'
  },
  {
    id: 14,
    name: '陈浩然',
    gender: 'male',
    age: 30,
    height: 165,
    weight: 68,
    income: 22000,
    hasCar: false,
    hasHouse: true,
    occupation: 'education',
    familyInfo: '有一个哥哥，父母是大学教授，家庭和睦。',
    dowryRequirement: 80000,
    housingRequirement: '已有一套学区房，希望未来的生活能安定温馨。',
    requirements: '希望对方有爱心，性格温和，最好是教师或相关职业。',
    introduction: '高中教师，性格儒雅，爱好文学和音乐，希望找到一个志同道合的伴侣共度余生。',
    avatar: '/image/14.jpeg'
  },
  {
    id: 15,
    name: '刘子豪',
    gender: 'male',
    age: 27,
    height: 183,
    weight: 76,
    income: 30000,
    hasCar: true,
    hasHouse: true,
    occupation: 'it',
    familyInfo: '有一个姐姐，父母经商，家庭条件优越。',
    dowryRequirement: 200000,
    housingRequirement: '已有房产，希望对方也有自己的追求和规划。',
    requirements: '希望对方有自己的事业，性格开朗，能互相成就。',
    introduction: '互联网公司技术主管，热爱创新，工作能力强，生活中喜欢健身和摄影，寻找一位能互相欣赏的伴侣。',
    avatar: '/image/15.jpeg'
  },
  {
    id: 16,
    name: '赵伟东',
    gender: 'male',
    age: 31,
    height: 169,
    weight: 74,
    income: 26000,
    hasCar: true,
    hasHouse: true,
    occupation: 'gov',
    familyInfo: '独生子，父亲是公务员，母亲是教师，家庭关系和谐。',
    dowryRequirement: 120000,
    housingRequirement: '已有一套政府分配的住房，环境优美，交通便利。',
    requirements: '希望对方性格温和，有一定文化素养，最好是事业单位或公务员。',
    introduction: '公务员，工作稳定，生活规律，喜欢读书和旅行，希望找到一位志同道合的伴侣共建温馨家庭。',
    avatar: '/image/16.jpeg'
  },
  {
    id: 17,
    name: '孙宇航',
    gender: 'male',
    age: 29,
    height: 185,
    weight: 78,
    income: 32000,
    hasCar: true,
    hasHouse: false,
    occupation: 'it',
    familyInfo: '有一个妹妹，父母都是工程师，家庭氛围开明自由。',
    dowryRequirement: 100000,
    housingRequirement: '正在购买新房，希望未来的伴侣能一起规划家居生活。',
    requirements: '希望对方有独立思考能力，性格开朗，最好是从事创意或技术工作。',
    introduction: '人工智能工程师，热爱科技创新，生活中喜欢探索新事物，希望找到一位能共同成长、彼此支持的伴侣。',
    avatar: '/image/17.jpeg'
  },
  {
    id: 18,
    name: '吴志强',
    gender: 'male',
    age: 33,
    height: 177,
    weight: 73,
    income: 40000,
    hasCar: true,
    hasHouse: true,
    occupation: 'finance',
    familyInfo: '独生子，父母都是企业家，家庭条件优越。',
    dowryRequirement: 250000,
    housingRequirement: '已有多套房产，希望对方也有自己的事业和追求。',
    requirements: '希望对方有良好的家庭背景，受过高等教育，有自己的事业追求。',
    introduction: '金融投资总监，事业有成，生活品质高，喜欢高尔夫和收藏艺术品，寻找一位气质优雅、见多识广的伴侣。',
    avatar: '/image/18.jpeg'
  },
  {
    id: 19,
    name: '郑阳光',
    gender: 'male',
    age: 26,
    height: 181,
    weight: 71,
    income: 18000,
    hasCar: false,
    hasHouse: false,
    occupation: 'education',
    familyInfo: '有一个哥哥，父母都是普通工人，家庭和睦。',
    dowryRequirement: 50000,
    housingRequirement: '计划两年内购房，希望能和伴侣共同努力。',
    requirements: '希望对方善良真诚，不过分看重物质条件，能一起奋斗成长。',
    introduction: '大学助教，正在攻读博士学位，热爱教育事业，性格阳光开朗，喜欢运动和音乐，希望找到能互相鼓励、共同进步的伴侣。',
    avatar: '/image/19.jpeg'
  },
  {
    id: 20,
    name: '马天宇',
    gender: 'male',
    age: 34,
    height: 166,
    weight: 69,
    income: 38000,
    hasCar: true,
    hasHouse: true,
    occupation: 'medical',
    familyInfo: '有一个姐姐，父母都是医生，家庭氛围严谨但温暖。',
    dowryRequirement: 180000,
    housingRequirement: '已有一套医院附近的住房，环境安静，适合长期居住。',
    requirements: '希望对方性格温和，有爱心，能理解医生工作的特殊性。',
    introduction: '主任医师，专业能力强，工作认真负责，生活中细心体贴，喜欢烹饪和园艺，希望找到一位能互相照顾、共度一生的伴侣。',
    avatar: '/image/20.jpeg'
  }
];

// 根据筛选条件匹配合适的人选
const matchedProfiles = computed(() => {
  // 如果是随机匹配
  if (filters.value.isRandom) {
    const genderProfiles = profiles.filter(profile => {
      // 根据性别筛选
      if (filters.value.gender === 'female') {
        return profile.id <= 10; // 女性资料 id 1-10
      } else {
        return profile.id > 10; // 男性资料 id 11-20
      }
    });
    // 从筛选后的资料中随机选择一个
    const randomIndex = Math.floor(Math.random() * genderProfiles.length);
    return [genderProfiles[randomIndex]];
  }

  return profiles.filter(profile => {
    // 性别匹配（为男性资料添加gender属性）
    const profileGender = profile.id <= 10 ? 'female' : 'male';
    if (filters.value.gender && profileGender !== filters.value.gender) {
      return false;
    }
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
  width: 100%;
  height: 300px;
  overflow: hidden;
}

.profile-avatar {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.profile-avatar-large {
  width: 100%;
  height: 400px;
  overflow: hidden;
}

.profile-avatar-large img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.profile-title {
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
  object-fit: contain;
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