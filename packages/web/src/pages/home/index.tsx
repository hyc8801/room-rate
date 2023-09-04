import React, { useMemo, useState } from 'react'
import ReactECharts from 'echarts-for-react';
import { useRequest } from 'ahooks';
import { getSecondHouse } from '../../apis/second-house';
import "./index.less";
import { AREA_LIST, SECOND_HOUSE_TYPE } from '@room-rate/common/src/area';
import { Select } from 'antd';
import { Link } from 'react-router-dom';
import { colors } from '../../utils/color';

const areaFieldNames = {
  label: "name",
  value: "name"
}


const HomePage = () => {

  const [type, setType] = useState('total')
  const [area, setArea] = useState('重庆')
  const { data = {} } = useRequest(getSecondHouse)

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
        },
        position: (...params: any[]) => {
          const [ pos, , el, elRect, size ] = params;
          let obj: any = { top: 10 };
          obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
          return obj;
        },
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
      <Link to="/community" >查看小区数据</Link>
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