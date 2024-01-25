import axios from 'axios';
import { httpsAgent } from 'src/utils';

/** 根据项目名称获取项目列表 */
export const getProjectList = async (projectname: string) => {
  const res = await axios.post(
    `https://www.cq315house.com/WebService/WebFormService.aspx/getParamDatas`,
    {
      siteid: '',
      useType: '',
      areaType: '',
      projectname,
      entName: '',
      location: '',
      minrow: '1',
      maxrow: '1000',
    },
    {
      httpsAgent,
    },
  );
  const datalist: any[] = JSON.parse(res?.data.d);
  const resList: any[] = [];
  datalist.forEach((item) => {
    const ids = item.buildingid.split(',');
    ids.forEach((buildingid: any) => {
      resList.push({ ...item, buildingid });
    });
  });
  return resList;
};

/** 根据buildingid获取楼盘数据 */
export const getRoomData = async (info: any) => {
  const { buildingid } = info;
  const res = await axios.post(
    `https://www.cq315house.com/WebService/WebFormService.aspx/GetRoomJson`,
    { buildingid },
    {
      httpsAgent,
    },
  );
  const dataList = JSON.parse(res?.data.d);
  return dataList;
};
