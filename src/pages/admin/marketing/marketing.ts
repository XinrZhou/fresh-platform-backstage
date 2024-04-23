export const chartList = [
  {
    title: '参与商家数',
    span: 8,
    option: {
      tooltip: {
        trigger: 'item',
        formatter: '{b} : {c}位 ({d}%)'
      },
      legend: {
        left: 'center'
      },
      series: [
        {
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          labelLine: {
            show: false
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
    title: '营销效果🔥',
    span: 16,
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
        data: ['活动热度', '推广力度', '点击量']
      },
      xAxis: [
        {
          type: 'category',
          data: ['母亲节', '龙虾节', '鲜果', '冷饮', '五一大促'],
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
          name: '热度',
          min: 0,
          max: 600,
          interval: 100,
        },
        {
          type: 'value',
          name: '点击量',
          min: 0,
          max: 900,
          interval: 150,
        }
      ],
      series: [
        {
          name: '活动热度',
          type: 'bar',
          data: [ 450, 415, 333, 198, 566 ]
        },
        {
          name: '推广力度',
          type: 'bar',
          data: [ 465, 436, 340, 206, 600 ]
        },
        {
          name: '点击量',
          type: 'line',
          yAxisIndex: 1,
          data: [ 854, 825, 628, 560, 898 ]
        }
      ]
    }
  },
]