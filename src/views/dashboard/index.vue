<template>
  <div class="dashboard">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card class="dashboard-card">
          <div class="card-content">
            <div class="card-icon">
              <el-icon size="40" color="#409eff"><House /></el-icon>
            </div>
            <div class="card-info">
              <div class="card-title">楼栋总数</div>
              <div class="card-value">{{ stats.buildingCount }}</div>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card class="dashboard-card">
          <div class="card-content">
            <div class="card-icon">
              <el-icon size="40" color="#67c23a"><HomeFilled /></el-icon>
            </div>
            <div class="card-info">
              <div class="card-title">房产总数</div>
              <div class="card-value">{{ stats.houseCount }}</div>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card class="dashboard-card">
          <div class="card-content">
            <div class="card-icon">
              <el-icon size="40" color="#e6a23c"><Avatar /></el-icon>
            </div>
            <div class="card-info">
              <div class="card-title">住户总数</div>
              <div class="card-value">{{ stats.residentCount }}</div>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card class="dashboard-card">
          <div class="card-content">
            <div class="card-icon">
              <el-icon size="40" color="#f56c6c"><Document /></el-icon>
            </div>
            <div class="card-info">
              <div class="card-title">待缴费账单</div>
              <div class="card-value">{{ stats.unpaidBillCount }}</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" style="margin-top: 20px;">
      <el-col :span="12">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>最新公告</span>
              <el-button type="text">查看更多</el-button>
            </div>
          </template>
          <el-empty description="暂无公告" />
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>待处理事项</span>
              <el-button type="text">查看更多</el-button>
            </div>
          </template>
          <el-empty description="暂无待处理事项" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'

const stats = reactive({
  buildingCount: 0,
  houseCount: 0,
  residentCount: 0,
  unpaidBillCount: 0
})

onMounted(() => {
  // 模拟数据
  stats.buildingCount = 12
  stats.houseCount = 486
  stats.residentCount = 352
  stats.unpaidBillCount = 28
})
</script>

<style lang="scss" scoped>
.dashboard {
  padding: 20px;

  .dashboard-card {
    .card-content {
      display: flex;
      align-items: center;
      padding: 10px 0;

      .card-icon {
        margin-right: 20px;
      }

      .card-info {
        .card-title {
          font-size: 14px;
          color: #666;
          margin-bottom: 8px;
        }

        .card-value {
          font-size: 24px;
          font-weight: bold;
          color: #333;
        }
      }
    }
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>