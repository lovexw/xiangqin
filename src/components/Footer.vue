<template>
  <footer class="site-footer">
    <div class="footer-content">
      <div class="footer-section">
        <h4>关于我们</h4>
        <p>同城交友相亲平台致力于为单身人士提供安全、真实的线上交友服务</p>
      </div>
      <div class="footer-section">
        <h4>安全提示</h4>
        <ul>
          <li>首次见面请选择公共场所</li>
          <li>注意保护个人隐私信息</li>
          <li>谨防网络诈骗行为</li>
        </ul>
      </div>
      <div class="footer-section">
        <h4>联系我们</h4>
        <p>客服邮箱：support@example.com</p>
        <p>工作时间：周一至周五 9:00-18:00</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2024 同城交友相亲平台 版权所有</p>
      <p>本平台仅提供信息服务，请谨慎交友，注意人身安全</p>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background-color: #f8f9fa;
  padding: 40px 0 20px;
  color: #333;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 30px;
}

.footer-section {
  flex: 1;
  min-width: 250px;
}

.footer-section h4 {
  font-size: 18px;
  margin-bottom: 15px;
  color: #2c3e50;
}

.footer-section p {
  margin-bottom: 10px;
  line-height: 1.6;
}

.footer-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-section li {
  margin-bottom: 8px;
  line-height: 1.6;
}

.footer-bottom {
  max-width: 1200px;
  margin: 30px auto 0;
  padding: 20px;
  text-align: center;
  border-top: 1px solid #eee;
}

.footer-bottom p {
  margin: 5px 0;
  font-size: 14px;
  color: #666;
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    gap: 20px;
  }
  
  .footer-section {
    text-align: center;
  }
}
</style>