export const chartList = [
  {
    title: '营销热词',
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
        data: [
          { value: 90, name: "超级年货节" },
          { value: 94, name: "棕情端午" },
          { value: 65, name: "龙虾节" },
          { value: 80, name: "鲜果节" },
          { value: 85, name: "五一大促" },
          { value: 72, name: "清明雨上" }
        ]
      }]
    }
  },
  {
    title: '参与商家数',
    span: 8,
    option: {
      tooltip: {
        trigger: 'item',
        formatter: '{b} : {c}位 ({d}%)'
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
            { value: 65, name: '母亲节' },
            { value: 46, name: '龙虾节' },
            { value: 76, name: '鲜果' },
            { value: 38, name: '冷饮' },
            { value: 100, name: '五一大促' },
          ]
        }
      ]
    }
  },
  {
    title: '广告营销效益',
    span: 8,
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
      grid: {
        left: 48,
        right: 36,
        bottom: 40
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
        data: ['投入', '点击量']
      },
      xAxis: [
        {
          type: 'category',
          data: ['商品Feeds模块', '胶囊Banner', '购物车推荐', '搜索推荐'],
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
          name: '投入',
          min: 0,
          max: 1500,
          interval: 300,
        },
        {
          type: 'value',
          name: '点击量',
          min: 0,
          max: 1000,
          interval: 200,
        }
      ],
      series: [
        {
          name: '活动热度',
          type: 'bar',
          data: [ 800, 1400, 452, 397 ]
        },
        {
          name: '点击量',
          type: 'line',
          yAxisIndex: 1,
          data: [ 704, 996, 365, 341 ]
        }
      ]
    }
  },
]