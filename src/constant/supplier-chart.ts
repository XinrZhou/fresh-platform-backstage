import { getCurrentDate, getRandomCount } from "@/utils";

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
        data: [
          { "value": 90, "name": "新鲜" },
          { "value": 94, "name": "纯天然" },
          { "value": 65, "name": "品质好" },
          { "value": 80, "name": "美味" },
          { "value": 85, "name": "有机" },
          { "value": 72, "name": "营养" },
          { "value": 65, "name": "健康" },
          { "value": 60, "name": "清爽" },
          { "value": 68, "name": "口感好" },
          { "value": 78, "name": "多汁" },
          { "value": 65, "name": "甜脆" },
          { "value": 62, "name": "色香味俱佳" }
        ]
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
          data: [
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
        }
      ]
    }
  },
]

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
          source: [
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
    title: '近14日类目成交额',
    span: 12,
    option: {
      tooltip: {
        trigger: 'item',
        formatter: '{b} : {c}元'
      },
      legend: {
        selectedMode: false
      },
      xAxis: {
        data: getCurrentDate(14)
      },
      yAxis: {},
      series: [
        {
          data: [11050, 13650, 10850, 15850, 13350, 15359, 16350, 15896.5, 12850, 16850, 12850, 10850, 11850, 13850],
          type: 'bar',
          stack: 'total',
          barwidth: '60%',
          name: '果蔬鲜花'
        },
        {
          data: [6289.5, 5567, 5455, 7680, 7923, 5045, 6167, 5289.5, 5411, 5533.5, 8655.5, 4778, 4801, 6735.6],
          type: 'bar',
          stack: 'total',
          barwidth: '60%',
          name: '粮油调味'
        },
        {
          data: [12488, 13488, 14488, 16488, 14988, 13988, 16988, 12988, 14988, 16488, 17488, 13488, 11488, 10488, 14488],
          type: 'bar',
          stack: 'total',
          barwidth: '60%',
          name: '海鲜水产'
        },
        {
          data: [7292, 7961, 6293, 8628.6, 7965, 5962, 6960, 7630, 9294, 7959, 5626, 6295, 5237, 6297],
          type: 'bar',
          stack: 'total',
          barwidth: '60%',
          name: '乳品烘焙'
        },
        {
          data: [7518.6, 7686.6, 4796, 5241.3, 6964, 5132, 6854.7, 6577.4, 4300.1, 4022.8, 5745.5, 5468.2, 3073.5, 4960],
          type: 'bar',
          stack: 'total',
          barwidth: '60%',
          name: '休闲零食'
        },
        {
          data: [8458, 6643, 7230, 6475, 9367, 9542, 7750, 9126, 8071, 6814, 10505, 7038, 9380, 7059],
          type: 'bar',
          stack: 'total',
          barwidth: '60%',
          name: '餐饮熟食'
        },
        {
          data: [7033, 8725.6, 7504, 8697.5, 6330, 6134, 7143, 5676.5, 8069, 7643.2, 9440, 6504.5, 7147, 1063.5],
          type: 'bar',
          stack: 'total',
          barwidth: '60%',
          name: '酒水饮料'
        },
        {
          data: [8414, 9414, 10414, 12414, 13414, 14414, 10514, 12514, 13514, 12414, 10414, 9414, 8414, 11414],
          type: 'bar',
          stack: 'total',
          barwidth: '60%',
          name: '肉禽蛋品'
        },
        {
          data: [9210, 10210, 12210, 10710, 12710, 11710, 10310, 11310, 12310, 13310, 12210, 11210, 9210, 8210],
          type: 'bar',
          stack: 'total',
          barwidth: '60%',
          name: '预制菜面点'
        },
      ]
    }
  },
]
