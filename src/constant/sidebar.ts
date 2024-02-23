export const SUPPLIER_SIDEBAR_LIST = [
  {
    name: '数据看板',
    path: '',
    icon: 'DataLine',
  },
  {
    name: '素材管理',
    path: 'material',
    icon: 'Picture',
    children: [
      {
        name: '素材库',
        path: '',
        icon: 'Picture',
      },
      {
        name: 'AI绘画',
        path: 'painting',
        icon: 'Picture',
      },
      {
        name: 'AI写作',
        path: 'writing',
        icon: 'Bell',
      }
    ]
  },
  {
    name: '品牌管理',
    path: 'brand',
    icon: 'Postcard',
  },
  {
    name: 'SPU管理',
    path: 'spu',
    icon: 'Goods',
  },
  {
    name: 'SKU管理',
    path: 'sku',
    icon: 'PriceTag',
  },
  {
    name: '商品管理',
    path: 'product',
    icon: 'Goods',
  },
  {
    name: '订单管理',
    path: 'order',
    icon: 'Tickets',
  },
  {
    name: '评价管理',
    path: 'comment',
    icon: 'ChatLineSquare',
  },
  {
    name: '商品推广',
    path: 'promotion',
    icon: 'Location',
  }
];

export const ADMIN_SIDEBAR_LIST = [
  {
    name: 'CDP数据管理',
    path: '',
    icon: 'DataLine',
  },
  {
    name: '素材管理',
    path: 'material',
    icon: 'Picture',
  },
  {
    name: '内容管理',
    path: 'content',
    icon: 'Document',
  },
  {
    name: '供应商管理',
    path: 'supplier',
    icon: 'User',
  },
  {
    name: '类目管理',
    path: 'category',
    icon: 'Operation',
  },
  {
    name: '属性管理',
    path: 'attribute',
    icon: 'CollectionTag',
  },
  {
    name: '品牌管理',
    path: 'brand',
    icon: 'Guide',
    children: [
      {
        name: '品牌列表',
        path: '',
        icon: 'Postcard',
      },
      {
        name: '品牌审核',
        path: 'list',
        icon: 'Bell',
      }
    ]
  },
  {
    name: 'SPU管理',
    path: 'spu',
    icon: 'Goods',
  },
  {
    name: 'SKU管理',
    path: 'sku',
    icon: 'PriceTag',
  },
  {
    name: 'RDC管理',
    path: 'rdc',
    icon: 'Location',
  },
  {
    name: '商品池',
    path: 'product',
    icon: 'ShoppingCartFull',
  },
  {
    name: '营销管理',
    path: 'marketing',
    icon: 'Coin',
  },
  {
    name: 'AI模型管理',
    path: 'model',
    icon: 'SetUp',
  },
  {
    name: '资源管理',
    path: 'resource',
    icon: 'Monitor',
  }
];