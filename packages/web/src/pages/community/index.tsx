import React, { useMemo, useState } from 'react'
import ReactECharts from 'echarts-for-react';
import { useRequest } from 'ahooks';
import { getCommunity } from '../../apis/second-house';
import "./index.less";
import { COMMUNITY_LIST, COMMUNITY_TYPE } from './constant';
import { Button, Select } from 'antd';
import { Link } from 'react-router-dom';

const areaFieldNames = {
  label: "name",
  value: "name"
}


const CommunityPage = () => {

  const [type, setType] = useState('quoted')
  const [area, setArea] = useState('东原D7一期')
  const { data = {} } = useRequest(getCommunity)

  const option = useMemo(() => {
    return {
      title: {
        text: COMMUNITY_TYPE.find((item) => item.value === type)?.label
      },
      legend: {},
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          animation: false
        }
      },
      xAxis: {
        type: 'time',
        axisLabel: {
          formatter: "{yyyy}-{MM}-{dd}"
        },
      },
      yAxis: {
        type: 'value',
        min: (value: any) => {
          return value.min - 20
        },
      },
      series: data?.[type] || []
    }
  }, [data, type])

  const areaOption = useMemo(() => {
    const areaData: any = {}
    COMMUNITY_LIST.map((areatItem, index) => {
      areaData[areatItem.name] = []
      // { '重庆': [{type: 'line', name: 'quoted_price', data: []}]}
      COMMUNITY_TYPE.map((typeItem) => {
        areaData[areatItem.name].push({
          type: "line",
          name: typeItem.label,
          data: data[typeItem.value]?.[index]?.data
        })
      })
    })
    return {
      title: {
        text: area
      },
      legend: {},
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          animation: false
        }
      },
      xAxis: {
        type: 'time',
        axisLabel: {
          formatter: "{yyyy}-{MM}-{dd}"
        },
      },
      yAxis: {
        type: 'value',
        min: (value: any) => {
          return value.min - 20
        },
      },
      series: areaData?.[area] || []
    }
  }, [data, area])
  return (
    <div className='home-page'>
      <Link to="/" >查看区域数据</Link>
       { COMMUNITY_LIST.map((item) => (
        <Button
          key={item.id}
          type="link"
          target="_blank"
          href={`https://cq.ke.com/ershoufang/co32f2l3c${item.id}/?sug=${item.name}`}
        > {item.name} </Button>
       ))}
      <br />
      <Select options={COMMUNITY_TYPE} value={type} onChange={setType} />
      <ReactECharts option={option} />
      <br />
      <Select options={COMMUNITY_LIST} value={area} onChange={setArea} fieldNames={areaFieldNames} />
      <ReactECharts option={areaOption} />
    </div>
  )
}

export default CommunityPage