import React, { useMemo, useState } from 'react'
import ReactECharts from 'echarts-for-react';
import { useRequest } from 'ahooks';
import { getSecondHouse } from '../../apis/second-house';
import "./index.less";
import { AREA_LIST, SECOND_HOUSE_TYPE } from '@room-rate/common/src/area';
import { Select, Space } from 'antd';
import { Link } from 'react-router-dom';
import { colors } from '../../utils/color';
import { getOption } from '../../utils/common';

const areaFieldNames = {
  label: "name",
  value: "name"
}


const HomePage = () => {

  const [type, setType] = useState('total')
  const [area, setArea] = useState('重庆')
  const { data = {} } = useRequest(getSecondHouse)

  const option = useMemo(() => {
    return getOption({data, type})
  }, [data, type])

  const areaOption = useMemo(() => {
    const areaData: any = {}
    AREA_LIST.map((areatItem, index) => {
      areaData[areatItem.name] = []
      // { '重庆': [{type: 'line', name: 'quoted_price', data: []}]}
      SECOND_HOUSE_TYPE.map((typeItem) => {
        areaData[areatItem.name].push({
          type: "line",
          name: typeItem.label,
          data: data[typeItem.value]?.[index]?.data
        })
      })
    })
    return getOption({ data: areaData, type: area})
  }, [data, area])
  return (
    <div className='home-page'>
      <Space>
        <Link to="/newHouse" >新房数据</Link>
        <Link to="/community" >二手数据</Link>
      </Space>
      <br />
      <Select options={SECOND_HOUSE_TYPE} value={type} onChange={setType} />
      <ReactECharts option={option} />
      <br />
      <Select options={AREA_LIST} value={area} onChange={setArea} fieldNames={areaFieldNames} />
      <ReactECharts option={areaOption} />
    </div>
  )
}

export default HomePage