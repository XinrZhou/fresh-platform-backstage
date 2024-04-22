import { getCurrentDate, getRandomCount } from "@/utils";

const remarkData = [
  { value: 90, name: "新鲜" },
  { value: 94, name: "纯天然" },
  { value: 65, name: "品质好" },
  { value: 80, name: "美味" },
  { value: 85, name: "有机" },
  { value: 72, name: "营养" },
  { value: 65, name: "健康" },
  { value: 60, name: "清爽" },
  { value: 68, name: "口感好" },
  { value: 78, name: "多汁" },
  { value: 65, name: "甜脆" },
  { value: 62, name: "色香味俱佳" }
];

const saleData = [
  { value: 108, name: '阳光玫瑰青提' },
  { value: 52, name: '印尼山竹' },
  { value: 65, name: '云南小樱油桃' },
  { value: 59, name: '智利西梅' },
  { value: 67, name: '苹果枣' },
  { value: 84, name: '云南高山枇杷' },
  { value: 112, name: '海南贵妃芒' },
  { value: 95, name: '泰国椰青' },
  { value: 79, name: '纯甜黄金百香果' }
]

export const topCarts = [
  {
    title: '近14日成交额',
    span: 8,
    option: {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'cross' }
      },
      grid: {
        left: 48,
        top: 20,
        right: 16,
        bottom: 40
      },
      xAxis: {
        data: getCurrentDate(14),
        axisLabel: {
          interval: 1, 
          rotate: 20 
        }
      },
      yAxis: {
        axisLabel: {
          interval: 0,
        },
        min: 0,
        minInterval: 50, 
        splitNumber: 8
      },
      series: [
        {
          data: [1286, 1379.5, 906, 1124.8, 1040, 1009.5, 1228, 965.5, 979, 1167.5, 1304, 1243.5, 1174, 964.5],
          type: 'line'
        }
      ]
    }
  },
  {
    title: '评论热词',
    span: 8,
    isMap: true,
    option: {
      tooltip: {
        show: false
      },
      series: [{
        type: 'wordCloud',
        shape: 'circle',
        keepAspect: false,
        left: 'center',
        top: 'center',
        width: '100%',
        height: '90%',
        right: null,
        bottom: null,
        sizeRange: [12, 60],
        rotationRange: [-90, 90],
        rotationStep: 45,
        gridSize: 8,
        drawOutOfBound: false,
        layoutAnimation: true,
        textStyle: {
            fontFamily: 'sans-serif',
            fontWeight: 'bold',
            color: function () {
                return 'rgb(' + [
                    Math.round(Math.random() * 160),
                    Math.round(Math.random() * 160),
                    Math.round(Math.random() * 160)
                ].join(',') + ')';
            }
        },
        emphasis: {
            textStyle: {
                textShadowBlur: 3,
                textShadowColor: '#333'
            }
        },
        data: remarkData
      }]
    }
  },
  {
    title: '近14日人气热卖榜',
    span: 8,
    option: {
      tooltip: {
        trigger: 'item',
        formatter: '{b} : {c}件 ({d}%)'
      },
      series: [
        {
          type: 'pie',
          radius: '80%',
          center: ['50%', '50%'],
          roseType: 'area',
          itemStyle: {
            borderRadius: 5
          },
          data: saleData
        }
      ]
    }
  },
]

const searchData = [
  ['谷雨茶', 936],
  ['轻食', 540],
  ['有机蔬菜', 594],
  ['粽子', 821],
  ['热带水果', 458],
  ['冰淇淋', 668],
  ['嫩笋', 798],
  ['火锅食材', 385],
  ['零糖零卡', 420],
  ['初夏水果', 615],
]

const marketingData = [
  { adCost: 1000, clicks: 500, conversionRate: 0.15, sales: 2000 },
  { adCost: 2000, clicks: 1000, conversionRate: 0.20, sales: 5000 },
  { adCost: 3000, clicks: 1500, conversionRate: 0.18, sales: 8000 },
  { adCost: 4000, clicks: 2000, conversionRate: 0.25, sales: 10000 },
  { adCost: 5000, clicks: 2500, conversionRate: 0.22, sales: 12000 },
  { adCost: 6000, clicks: 3000, conversionRate: 0.20, sales: 15000 }
];

export const bottomCharts = [
  {
    title: '搜索趋势',
    span: 12,
    option: {
      tooltip: {
        trigger: 'item'
      },
      grid: {
        left: 48,
        top: 20,
        right: 16,
        bottom: 40
      },
      dataset: [
        {
          dimensions: ['name', 'count'],
          source: searchData
        },
        {
          transform: {
            type: 'sort',
            config: { dimension: 'count', order: 'desc' }
          }
        }
      ],
      xAxis: {
        type: 'category',
        axisLabel: { interval: 0, rotate: 30 }
      },
      yAxis: {},
      series: {
        type: 'bar',
        encode: { x: 'name', y: 'score' },
        datasetIndex: 1
      }
    }
  },
  {
    title: '营销活动效果',
    span: 12,
    option: {
      tooltip: {
        trigger: 'item',
        formatter: params => {
        return `
          广告费：${params.value[0]}元<br>
          点击量：${params.value[1]}次<br>
          转化率：${params.value[2] * 100}%<br>
          销售额：${params.value[3]}元
        `;
        }
      },
      xAxis: {
        name: '广告投入（元）',
        type: 'value',
      },
      yAxis: {
        name: '点击量（次）',
        type: 'value'
      },
      visualMap: {
        show: false,
        min: 0,
        max: 10000,
        calculable: true,
        dimension: 3, // 根据销售额来映射颜色
        inRange: {
          color: ['#4CAF50', '#FFC107', '#F54242'] // 调整颜色范围
        },
        outOfRange: {
          color: '#999' // 超出范围的颜色
        },
        symbolSize: [9, 65] // 气泡大小范围，根据销售额动态调整
      },
      series: [{
        name: '营销活动',
        type: 'scatter',
        data: marketingData.map(({ adCost, clicks, conversionRate, sales }) => ({
          value: [adCost, clicks, conversionRate, sales],
          symbolSize: sales / 200 // 气泡大小与销售额成正比
        })),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }]
    }
  },
]
