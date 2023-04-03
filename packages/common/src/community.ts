export const COMMUNITY_LIST = [
  { name: '东原D7一期', id: '3611099957604' },
  { name: '东原D7二期', id: '3611099957561' },
  { name: '东原D7四期', id: '3611100483006' },
  { name: '华润中央公园', id: '3611099881015' },
  { name: '协信星都会', id: '3611063489844' },
  { name: '世茂茂悦府三期', id: '3620027923379149' },
  { name: '龙湖九里峰景', id: '36000000004155' },
  { name: '国奥村时光漫', id: '3611063905450' },
  { name: '中粮天悦壹号', id: '3620049918044242' },
  { name: '盈田金开里', id: '3611063698088' },
  { name: '奥林匹克花园十五期', id: '367559011905007' },
  { name: '万科悦峰', id: '367559011905007'},
  { name: '中亿阳明山水', id: '3611057477805' },
  { name: '世茂璀璨天城星斓', id: '3620074949154399' },
  { name: '龙湖三千庭北区', id: '3620068693195749' },
  { name: '保利香雪', id: '3611057649739' },
  { name: '恒大翡翠华庭', id: '3616843544234698' },
];


export const COMMUNITY_TYPE = [
  { label: '总数', value: 'total'},
  { label: '三房朝南总数', value: 'total_3room_south'},
  { label: '今日挂牌总数', value: 'quoted'},
  { label: '平均价格', value: 'average_price'},
  { label: '90天成交数据', value: 'dealed'},
  { label: '30天带看数据', value: 'showed'},
];

export const COMMUNITY_KEY: string[] = COMMUNITY_TYPE.map(({value}) => value)