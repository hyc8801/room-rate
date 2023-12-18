import React, { useMemo, useState } from 'react'
import ReactECharts from 'echarts-for-react';
import { useRequest } from 'ahooks';
import { getCommunity, getNewFlatsRecord } from '../../apis/second-house';
import "./index.less";
import { COMMUNITY_LIST, COMMUNITY_TYPE } from '@room-rate/common/src/community';
import { Button, Select } from 'antd';
import { Link } from 'react-router-dom';
import { colors } from '../../utils/color';
import { getOption, getOption2 } from '../../utils/common';

const options = [
  { label: '网签数量', value: 'wangqian_num'},
  { label: '认购数量', value: 'rengou_num'},
  { label: '期房数量', value: 'qifang_num'},
  { label: '成交数量', value: 'dealed'},
]

const NewHousePage = () => {

  const [type, setType] = useState('qifang_num')
  const { data = [] } = useRequest(() => getNewFlatsRecord({ type }), {
    refreshDeps: [type]
  })

  return (
    <div className='home-page'>
      <Link to="/" >返回首页</Link><br />
      <Select options={options} value={type} onChange={setType} />
      <ReactECharts option={getOption2(data)} />
      <br />
    </div>
  )
}

export default NewHousePage