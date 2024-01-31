import { requestMiddleware } from './utils';
import axios from 'axios';
import { delay } from '../../utils';
import { BeikeAreaEntity } from 'src/beike-area/entities/beike-area.entity';
import { load } from 'cheerio';
import { BeikeCommunityEntity } from 'src/beike-community/entities/beike-community.entity';

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
  return supply as BeikeAreaEntity;
};

/** 获取贝壳小区数据 */
export const getBeikeCommunityData = async (item: any) => {
  const res = await axios.get(
    `https://cq.lianjia.com/ershoufang/co32f2l3c${item.id}`,
  );

  const $ = load(res?.data);
  const total_3room_south = $('.total span')?.text();
  let quoted = 0;
  const list = $('.sellListContent .followInfo');
  for (let i = 0; i < list.length; i++) {
    if (list?.eq(i)?.text()?.includes('今天发布')) {
      quoted++;
    }
  }
  const res2 = await axios.get(
    `https://cq.lianjia.com/api/listtop?semParams%5BsemResblockId%5D=${item.id}&semParams%5BsemType%5D=resblock&semParams%5BsemSource%5D=ershou_xiaoqu`,
  );

  const info2 = res2?.data?.data?.info || {};
  const data: BeikeCommunityEntity = {
    // 平局价格
    average_price: info2.unitPrice,
    // 小区总数
    total: info2.sellNum,
    // 90天成交数据
    dealed: info2['90saleCount'],
    // 30天带看数据
    showed: info2.day30See,
    // 小区名称
    name: item.name,
    // 三房朝南总数
    total_3room_south: total_3room_south ? Number(total_3room_south) : null,
    // 新增挂牌数量
    quoted,
    // 创建日期
    // create_time: dayjs().format('YYYY-MM-DD'),
  };
  return data;
};
