import { requestMiddleware } from './utils';
import axios from 'axios';
import dayjs = require('dayjs');
import { delay } from '../../utils';

const BEIKE_URL = `https://m.ke.com/archer/api/apiProxy/channelApiProxy/api/index/secondhouse`;

const TOTAL_BEIKE_URL = `https://m.ke.com/liverpool/api/ershoufang/getList`;

const cityId = 500000;

const condition = [
  { name: '总套数', value: '', key: 'total' },
  { name: '3房总套数', value: 'l3', key: 'total_3room' },
  { name: '2房总套数', value: 'l2', key: 'total_2room' },
  { name: '朝南总套数', value: 'f2', key: 'total_south' },
  { name: '近地铁总套数', value: 'su1', key: 'total_subway' },
  {
    name: '综合1（3房朝南近地铁总套数）',
    value: 'l3f2su1',
    key: 'total_3room_south_subway',
  },
  { name: '综合2（3房朝南总套数）', value: 'l3f2', key: 'total_3room_south' },
];

/**
 * 二手房数据
 * 成交价，贝壳价，当日挂牌数，当日成交数，当日新增顾客，当日带看次数，
 * 总套数，3房总套数，2房总套数，朝南总套数，近地铁总套数，综合1（3房朝南近地铁总套数）,综合2（3房朝南总套数）
 * @param district_id
 * @param district_name
 * @returns
 */
export const getDataByErshou = async (
  district_id?: number | string | null,
  district_name?: string,
  district_pinyin?: string,
) => {
  const params = {
    city_id: cityId,
    ucid: 2000000065385062,
    district_id,
  };
  const data = await requestMiddleware(axios.get(BEIKE_URL, { params }));
  const { supply_index } = data;
  const supply: { [x: string]: any } = {
    quoted_price: data?.price_plot?.[-1]?.series?.[0].data.at(-1) || null,
    beike_price: data?.price_plot?.[-1]?.series?.[1].data.at(-1) || null,
    district_name,
    create_time: dayjs().add(-1, 'day').format('YYYY-MM-DD'),
  };
  supply_index?.map((item: { key: string; num: any }) => {
    supply[item.key.replace('yd_', '')] = item.num;
  });

  delay(2000);

  for (let index = 0; index < condition.length; index++) {
    const item = condition[index];
    const url = `${TOTAL_BEIKE_URL}?cityId=${cityId}&condition=%252F${district_pinyin}%252F${item.value}`;
    const data2 = await requestMiddleware(axios.get(url));
    delay(1000);
    const { totalCount } = data2?.getErShouFangList || {};
    supply[item.key] = totalCount;
  }
  return supply;
};
