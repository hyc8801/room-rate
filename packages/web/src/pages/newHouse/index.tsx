import React, { useState } from 'react'
import ReactECharts from 'echarts-for-react';
import { useRequest } from 'ahooks';
import {  getNewFlatsRecord } from '../../apis/second-house';
import "./index.less";
import {  Button, Select } from 'antd';
import { Link } from 'react-router-dom';
import {  getOption2 } from '../../utils/common';

const options = [
  { label: '网签数量', value: 'wangqian_num'},
  { label: '认购数量', value: 'rengou_num'},
  { label: '期房/现房数量', value: 'qifang_num'},
  { label: '成交数量', value: 'dealed'},
]

const NewHousePage = () => {

  const [type, setType] = useState('qifang_num')
  const { data = [] } = useRequest(() => getNewFlatsRecord({ type }), {
    refreshDeps: [type]
  })

  return (
    <div className='home-page'>
      <Link to="/" >返回首页</Link>
      { data.map((item: any) => (
        <Button
          key={item.name}
          type="link"
          target="_blank"
          size="small"
          href={`https://www.cq315house.com/HtmlPage/serviceSeaList.html?projectname=${item.name}`}
        > {item.name} </Button>
      ))}
      <br />
      <Select options={options} value={type} onChange={setType} />
      <ReactECharts option={getOption2(data)} />
      <br />
    </div>
  )
}

export default NewHousePage