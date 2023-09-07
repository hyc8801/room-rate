import { colors } from "./color";

export const getOption = ({ data, type}: any) => {
  const typeData = data?.[type] || [];
  const typeDataFirst: any = {};
  typeData?.forEach((item: any) => {
    typeDataFirst[item.name] = item.data?.find((val: any) => val !== undefined)?.[1] || 0
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
      },
      position: (...params: any[]) => {
        const [ pos, , el, elRect, size ] = params;
        let obj: any = { top: 10 };
        obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
        return obj;
      },
      formatter: (dataList: any) => {
        const content = dataList.map((item: any, index: number) => {
          const { seriesName } = item;
          const val = item.data?.[1] || '--';
          const color = colors[index % colors.length]
          const first = typeDataFirst[seriesName]
          const increment = val - first;
          const rate = !!increment ? `${((increment / val) * 100).toFixed(2)}%` : '--'
          return (
            `
            <div style="display: flex;justify-content: space-between;margin-botton:14px;">
              <span style="margin-right: 20px;">
                <span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${color};"></span>
                ${seriesName}</span>
                <span style="color: #333;font-weight: 900;font-size:14px">
                  ${val}
                  <span style="color: #666;font-weight: 500;font-size:12px"> [${rate} ${increment}]</span>
                </span>
            </div>
            `
          );
        }).join(``);
        return `<div style="font-size:14px;color:#666;font-weight:400;line-height:1;">${dataList[0]?.['axisValueLabel']}</div>${content}`;
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
}