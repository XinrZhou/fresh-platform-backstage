export const activityList = [
  {
    title: '挚爱献礼·母爱无疆',
    tag: '母亲节',
    content: '一枝鲜花，满载真情，愿母亲节更添温暖与美好。鲜花活动预热进行中，欢迎前来打Call!',
    startTime: '2024-04-27 00:00:00',
    endTime: '2024-05-12 23:59:59'
  },
  {
    title: '龙虾盛宴，欢乐聚会',
    tag: '龙虾节',
    content: '龙虾盛宴，百味俱全，清蒸、香辣，尽在此处。与亲友共享美食盛宴，欢乐无限！',
    startTime: '2024-04-25 00:00:00',
    endTime: '2024-05-07 23:59:59'
  },
  {
    title: '清凉节·鲜果季',
    tag: '鲜果',
    content: '清凉节·鲜果季，水果狂欢来袭！多款新鲜水果，满足你的口腹之欲。清新水果，品味夏日清凉，让你的夏天更加美好。',
    startTime: '2024-04-25 00:00:00',
    endTime: '2024-05-05 23:59:59'
  },
  {
    title: '盛夏狂欢·冰爽一夏',
    tag: '冷饮',
    content: '盛夏狂欢，冰爽一夏！各类冷饮冰品，清凉来袭。夏日特惠，乐享冰凉美味。快来加入我们的夏日派对，让清凉从这里开始！',
    startTime: '2024-04-22 00:00:00',
    endTime: '2024-04-30 23:59:59'
  },
  {
    title: '五一放价·生鲜大狂欢',
    tag: '五一大促',
    content: '五一放价，生鲜大狂欢！百款生鲜特惠，鲜活食材直降，好物齐聚，价美物廉。让你的五一假期更有味道，尽情享受美食与欢乐！',
    startTime: '2024-04-25 00:00:00',
    endTime: '2024-05-05 23:59:59'
  }
];

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