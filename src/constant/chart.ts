import { getCurrentDate, getRandomCount } from "@/utils";

export const headerCarts = [
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
          interval: 0, 
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
          data: getRandomCount(14, 200, 1000),
          type: 'line',
          smooth: true
        }
      ]
    }
  },
  {
    title: '类目总成交额（近15日）',
    span: 8,
    option: {
      tooltip: {
        trigger: 'item',
        formatter: '{b} : {c} ({d}%)'
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
            { value: 11, name: '果蔬鲜花' },
            { value: 5, name: '海鲜水产' },
            { value: 6, name: '粮油调味' },
            { value: 6, name: '肉禽蛋品' },
            { value: 6, name: '乳品烘焙' },
            { value: 5, name: '休闲零食' },
            { value: 7, name: '餐饮熟食' },
            { value: 10, name: '酒水饮料' },
            { value: 5, name: '预制菜面点' }
          ]
        }
      ]
    }
  },
]

export const middleCharts = [
  {
    title: '全国RDC数量分布',
    span: 14,
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
        // text: ['高', '低'],
        inRange: {
          color: ['#fff', '#79bbff','#d9ecff', '#337ecc'] // 配置颜色范围
        },
      },
      geo: [
        {
          type: 'map',
          map: 'china', 
          roam: true, // 开启地图缩放、平移漫游等功能
          zoom: 1.3, // 地图缩放级别
          label: {
            show: true, // 是否显示地图区域名称
            fontSize: 10, // 地图区域名称字体大小
            color: '#333' // 地图区域名称字体颜色
          },
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
    title: '类目库',
    span: 10,
    option: {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        }
      },
      toolbox: {
        feature: {
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ['line', 'bar'] },
          restore: { show: true },
          saveAsImage: { show: true }
        }
      },
      legend: {
        data: ['商品数', '成交额']
      },
      xAxis: [
        {
          type: 'category',
          data: [
            '果蔬鲜花', '海鲜水产','粮油调味', '肉禽蛋品', '乳品烘焙', '休闲零食', '餐饮熟食', '酒水饮料', '预制菜面点'
          ],
          axisPointer: {
            type: 'shadow'
          },
          axisLabel: {
            interval: 0, 
            rotate: 20 
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '商品数',
          min: 0,
          max: 200,
          interval: 40,
          axisLabel: {
            formatter: '{value}'
          }
        },
        {
          type: 'value',
          name: '成交额',
          min: 0,
          max: 10000,
          interval: 500,
          axisLabel: {
            formatter: '{value}'
          }
        }
      ],
      series: [
        {
          name: '商品数',
          type: 'bar',
          tooltip: {
            valueFormatter: function (value) {
              return value + '件';
            }
          },
          data: [
            188, 164, 120, 136, 144, 65, 109, 43, 57
          ]
        },
        {
          name: '成交额',
          type: 'line',
          yAxisIndex: 1,
          tooltip: {
            valueFormatter: function (value) {
              return value + '元';
            }
          },
          data: [
            9736.8, 8200, 5500.3, 9765.4, 3784.2, 2400, 5932.7, 4253, 4892.1
          ]
        }
      ]
    }
  },
]
