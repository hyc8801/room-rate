import React, { useMemo, useState } from 'react'
import ReactECharts from 'echarts-for-react';
import { useRequest } from 'ahooks';
import { getCommunity } from '../../apis/second-house';
import "./index.less";
import { COMMUNITY_LIST, COMMUNITY_TYPE } from '@room-rate/common/src/community';
import { Button, Select } from 'antd';
import { Link } from 'react-router-dom';
import { colors } from '../../utils/color';

const areaFieldNames = {
  label: "name",
  value: "name"
}


const CommunityPage = () => {

  const [type, setType] = useState('average_price')
  const [area, setArea] = useState('国奥村时光漫')
  const { data = {} } = useRequest(getCommunity)

  const option = useMemo(() => {
    return {
      color: colors,
      legend: {
        type: 'scroll',
        icon: 'roundRect'
      },
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
      series: (data?.[type] || []).map((item: any) => {
        return {
          ...item,
          symbol: 'none',
          sampling: 'lttb',
          emphasis: {
            focus: 'series',
            label: {
              show: true,
              formatter: (params: any) => {
                const { seriesName, value } = params;
                return `${seriesName}: ${value?.[1]}`
              }
            }
          }
        }
      })
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
      color: colors,
      legend: {
        type: 'scroll',
        icon: 'roundRect'
      },
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
      series: (areaData?.[area] || []).map((item: any) => {
        return {
          ...item,
          symbol: 'none',
          sampling: 'lttb',
          emphasis: {
            focus: 'series',
            label: {
              show: true,
              formatter: (params: any) => {
                const { seriesName, value } = params;
                return `${seriesName}: ${value?.[1]}`
              }
            }
          }
        }
      })
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
          size="small"
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