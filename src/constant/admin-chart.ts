import { getCurrentDate, getRandomCount } from "@/utils";

export const topCarts = [
  {
    title: '访问量',
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
        splitNumber: 10
      },
      series: [
        {
          data: getRandomCount(14, 600, 1000),
          type: 'line',
        }
      ]
    }
  },
  {
    title: '搜索趋势',
    span: 8,
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
            ['甜粽or咸粽', 821],
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
    title: '近14日总成交额（GMV）',
    span: 8,
    option: {
      tooltip: {
        trigger: 'item',
        formatter: '{b} : {c}元 ({d}%)'
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
            { value: 207910, name: '果蔬鲜花', itemStyle: { color: '#779fc6' } },
            { value: 86797.5, name: '粮油调味', itemStyle: { color: '#7fc6d3' } },
            { value: 216835.8, name: '海鲜水产', itemStyle: { color: '#aee0e4' } },
            { value: 103307, name: '乳品烘焙', itemStyle: { color: '#e3f5f6' } },
            { value: 73289.6, name: '休闲零食', itemStyle: { color: '#fff0dc' } },
            { value: 120476, name: '餐饮熟食', itemStyle: { color: '#fed297' } },
            { value: 96794, name: '酒水饮料', itemStyle: { color: '#fcb461' } },
            { value: 159805.5, name: '肉禽蛋品', itemStyle: { color: '#f7935a' } },
            { value: 156944.4, name: '预制菜面点', itemStyle: { color: '#e76254' } }
          ]
        }
      ]
    }
  },
]

export const bottomCharts = [
  {
    title: '全国RDC数量分布',
    span: 12,
    isMap: true,
    option:   {
      tooltip: {
        trigger: 'item',
        formatter: '{b} : {c}'
      },
      toolbox: {
        show: true,
        orient: "vertical",
        left: "right",
        top: "center",
        feature: {
          dataView: { readOnly: false },
          restore: {},
          saveAsImage: {},
        },
      },
      visualMap: {
        min: 0,
        max: 10,
        inRange: {
          color: ['#fff','#1ba784', '#428675'] // 配置颜色范围
        },
      },
      geo: [
        {
          type: 'map',
          map: 'china', 
          roam: true, // 开启地图缩放、平移漫游等功能
          zoom: 1.4, // 地图缩放级别
          top: 90,
          label: {
            show: true, // 是否显示地图区域名称
            fontSize: 10, // 地图区域名称字体大小
            color: '#333' // 地图区域名称字体颜色
          },
          emphasis: {
            focus: 'self',
            itemStyle: {
              color: '#bacf65'
            }
          }
        },
      ],
      series: [
        {
          type: 'map',
          geoIndex: 0,
          data: [
            { name: "北京市", value: "8" },
            { name: "天津市", value: '5' },
            { name: "上海市", value: '10' },
            { name: "重庆市", value: '4' },
            { name: "河北省", value: '1' },
            { name: "河南省", value: '1' },
            { name: "云南省", value: '3' },
            { name: "辽宁省", value: '2' },
            { name: "黑龙江省", value: '1' },
            { name: "湖南省", value: '2' },
            { name: "安徽省", value: '4' },
            { name: "山东省", value: '1' },
            { name: "新疆维吾尔自治区", value: '0' },
            { name: "江苏省", value: '7' },
            { name: "浙江省", value: '8' },
            { name: "江西省", value: '1' },
            { name: "湖北省", value: '2' },
            { name: "广西壮族自治区", value:'1' },
            { name: "甘肃省", value: '1' },
            { name: "山西省", value: '1' },
            { name: "内蒙古自治区", value: '0' },
            { name: "陕西省", value: '1' },
            { name: "吉林省", value: '0' },
            { name: "福建省", value: '3' },
            { name: "贵州省", value: '0' },
            { name: "广东省", value: '3' },
            { name: "青海省", value: '0' },
            { name: "西藏自治区", value: '0' },
            { name: "四川省", value: '2' },
            { name: "宁夏回族自治区", value: '0' },
            { name: "海南省", value: '2' },
            { name: "台湾省", value: '0' },
            { name: "香港特别行政区", value: '2' },
            { name: "澳门特别行政区", value: '3' }
          ] //数据
        }
      ]
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
          name: '果蔬鲜花',
          color: '#779fc6'
        },
        {
          data: [6289.5, 5567, 5455, 7680, 7923, 5045, 6167, 5289.5, 5411, 5533.5, 8655.5, 4778, 4801, 6735.6],
          type: 'bar',
          stack: 'total',
          barwidth: '60%',
          name: '粮油调味',
          color: '#7fc6d3'
        },
        {
          data: [12488, 13488, 14488, 16488, 14988, 13988, 16988, 12988, 14988, 16488, 17488, 13488, 11488, 10488, 14488],
          type: 'bar',
          stack: 'total',
          barwidth: '60%',
          name: '海鲜水产',
          color: '#aee0e4'
        },
        {
          data: [7292, 7961, 6293, 8628.6, 7965, 5962, 6960, 7630, 9294, 7959, 5626, 6295, 5237, 6297],
          type: 'bar',
          stack: 'total',
          barwidth: '60%',
          name: '乳品烘焙',
          color: '#e3f5f6'
        },
        {
          data: [7518.6, 7686.6, 4796, 5241.3, 6964, 5132, 6854.7, 6577.4, 4300.1, 4022.8, 5745.5, 5468.2, 3073.5, 4960],
          type: 'bar',
          stack: 'total',
          barwidth: '60%',
          name: '休闲零食',
          color: '#fff0dc'
        },
        {
          data: [8458, 6643, 7230, 6475, 9367, 9542, 7750, 9126, 8071, 6814, 10505, 7038, 9380, 7059],
          type: 'bar',
          stack: 'total',
          barwidth: '60%',
          name: '餐饮熟食',
          color: '#fed297'
        },
        {
          data: [7033, 8725.6, 7504, 8697.5, 6330, 6134, 7143, 5676.5, 8069, 7643.2, 9440, 6504.5, 7147, 1063.5],
          type: 'bar',
          stack: 'total',
          barwidth: '60%',
          name: '酒水饮料',
          color: '#fcb461'
        },
        {
          data: [8414, 9414, 10414, 12414, 13414, 14414, 10514, 12514, 13514, 12414, 10414, 9414, 8414, 11414],
          type: 'bar',
          stack: 'total',
          barwidth: '60%',
          name: '肉禽蛋品',
          color: '#f7935a'
        },
        {
          data: [9210, 10210, 12210, 10710, 12710, 11710, 10310, 11310, 12310, 13310, 12210, 11210, 9210, 8210],
          type: 'bar',
          stack: 'total',
          barwidth: '60%',
          name: '预制菜面点',
          color: '#e76254'
        },
      ]
    }
  },
]
