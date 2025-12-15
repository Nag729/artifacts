<template>
  <Diagram>
    <div class="space-y-6 md:space-y-8">
      <!-- 軸ライン（デスクトップ: 横、モバイル: 縦） -->
      <div class="flex md:hidden flex-col items-center">
        <span class="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">抽象</span>
        <div class="w-0.5 h-12 bg-gray-300 dark:bg-gray-600"></div>
        <span class="text-xs font-medium text-gray-600 dark:text-gray-400 mt-2">具体</span>
      </div>
      <div class="hidden md:flex items-center justify-between">
        <span class="text-sm font-medium text-gray-600 dark:text-gray-400">抽象</span>
        <div class="flex-1 h-0.5 bg-gray-300 dark:bg-gray-600 mx-4"></div>
        <span class="text-sm font-medium text-gray-600 dark:text-gray-400">具体</span>
      </div>

      <!-- 3つのゾーン -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- 種 -->
        <div class="text-center">
          <div
            class="bg-red-50 dark:bg-red-900/30 rounded-lg p-4 border-2 border-red-200 dark:border-red-800 mb-3"
          >
            <p class="text-3xl mb-2">🌱</p>
            <p class="font-bold text-red-900 dark:text-red-200 mb-1">種</p>
            <p class="text-xs text-red-700 dark:text-red-300">制約が少なすぎる</p>
          </div>
          <div class="text-xs md:text-sm text-gray-700 dark:text-gray-300 mb-2">
            方向性はあるが、解釈の余地が大きすぎる。
          </div>
          <div class="text-xs md:text-xs text-gray-500 dark:text-gray-400 italic">
            「わかりやすく」「いい感じに」
          </div>
        </div>

        <!-- 幹 -->
        <div class="text-center">
          <div
            class="bg-green-50 dark:bg-green-900/30 rounded-lg p-4 border-2 border-green-500 shadow-lg mb-3"
          >
            <p class="text-3xl mb-2">🌳</p>
            <p class="font-bold text-green-900 dark:text-green-200 mb-1">幹</p>
            <p class="text-xs text-green-700 dark:text-green-300">最適な制約</p>
          </div>
          <div class="text-xs md:text-sm text-gray-700 dark:text-gray-300 mb-2">
            判断の分岐点を規定する。これがあれば、残りは論理的に導出できる。
          </div>
          <div class="text-xs md:text-xs text-gray-500 dark:text-gray-400 italic">
            「技術知識のない決裁者が、5分で投資判断できる資料」
          </div>
        </div>

        <!-- 枝葉 -->
        <div class="text-center">
          <div
            class="bg-orange-50 dark:bg-orange-900/30 rounded-lg p-4 border-2 border-orange-200 dark:border-orange-800 mb-3"
          >
            <p class="text-3xl mb-2">🍃</p>
            <p class="font-bold text-orange-900 dark:text-orange-200 mb-1">枝葉</p>
            <p class="text-xs text-orange-700 dark:text-orange-300">制約が多すぎる</p>
          </div>
          <div class="text-xs md:text-sm text-gray-700 dark:text-gray-300 mb-2">
            幹から論理的に導ける情報や、AIが学習済みの慣習。
          </div>
          <div class="text-xs md:text-xs text-gray-500 dark:text-gray-400 italic">
            「箇条書きは5項目で」「グラフは棒グラフで」
          </div>
        </div>
      </div>

      <!-- Chart.js グラフ -->
      <div class="pt-4">
        <div class="w-full max-w-[640px] mx-auto">
          <Line :data="chartData" :options="chartOptions" />
        </div>

        <!-- 説明 -->
        <div class="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            <strong class="text-green-600 dark:text-green-400">幹</strong
            >は、制約と品質のスイートスポット
          </p>
        </div>
      </div>
    </div>
  </Diagram>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  type ChartOptions,
  type ChartData,
} from 'chart.js'

// Chart.js コンポーネント登録
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

// シグモイド関数でデータポイント生成（変曲点を左にシフト・急勾配）
const generateSigmoidData = () => {
  const points = []
  for (let x = 0; x <= 100; x += 2) {
    // シグモイド関数: 1 / (1 + e^(-(x-35)/8))
    // 変曲点を x=35、勾配を急に（係数を12→8に）
    const y = 100 / (1 + Math.exp(-(x - 35) / 8))
    points.push({ x, y })
  }
  return points
}

const sigmoidData = generateSigmoidData()

// Chart.js データ
const chartData = computed<ChartData<'line'>>(() => ({
  datasets: [
    // 曲線を先に描画
    {
      label: '品質',
      data: sigmoidData,
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      borderWidth: 3,
      pointRadius: 0,
      tension: 0,
      fill: false,
      order: 2, // 後ろに描画
    },
    // マーカーを後から描画（前面に来る）
    // 種のポイント
    {
      label: '種',
      data: [{ x: 15, y: 100 / (1 + Math.exp(-(15 - 35) / 8)) }],
      borderColor: '#f43f5e',
      backgroundColor: '#f43f5e',
      pointRadius: 8,
      pointHoverRadius: 10,
      showLine: false,
      order: 1, // 前面に描画
    },
    // 幹のポイント（中心に配置）
    {
      label: '幹（変曲点）',
      data: [{ x: 50, y: 100 / (1 + Math.exp(-(50 - 35) / 8)) }],
      borderColor: '#10b981',
      backgroundColor: '#10b981',
      pointRadius: 10,
      pointHoverRadius: 12,
      showLine: false,
      order: 1, // 前面に描画
    },
    // 枝葉のポイント（右に配置）
    {
      label: '枝葉',
      data: [{ x: 85, y: 100 / (1 + Math.exp(-(85 - 35) / 8)) }],
      borderColor: '#f59e0b',
      backgroundColor: '#f59e0b',
      pointRadius: 8,
      pointHoverRadius: 10,
      showLine: false,
      order: 1, // 前面に描画
    },
  ],
}))

// Chart.js オプション
const chartOptions = computed<ChartOptions<'line'>>(() => ({
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        color: 'rgb(107, 114, 128)',
        usePointStyle: true,
        padding: 12,
        font: {
          size: 12,
        },
        filter: (item) => {
          // 「品質」ラベルを除外
          return item.text !== '品質'
        },
      },
    },
    tooltip: {
      enabled: false, // ツールチップ無効化
    },
  },
  scales: {
    x: {
      type: 'linear',
      title: {
        display: true,
        text: 'AIに与える制約の量',
        color: 'rgb(107, 114, 128)',
        font: {
          size: 13,
        },
      },
      ticks: {
        display: false,
      },
      grid: {
        color: 'rgba(156, 163, 175, 0.1)',
        drawTicks: false,
      },
      border: {
        color: 'rgba(156, 163, 175, 0.3)',
      },
    },
    y: {
      title: {
        display: true,
        text: '品質',
        color: 'rgb(107, 114, 128)',
        font: {
          size: 13,
        },
      },
      ticks: {
        display: false,
      },
      grid: {
        color: 'rgba(156, 163, 175, 0.1)',
        drawTicks: false,
      },
      border: {
        color: 'rgba(156, 163, 175, 0.3)',
      },
    },
  },
  interaction: {
    intersect: false,
    mode: 'index',
  },
}))
</script>
