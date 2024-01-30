import request from "../utils/request"

export const getSecondHouse = () => {
  return request.get(`/api/beike-area`)
}

export const beikeCommunityTaks = () => {
  return request.get(`/api/beike-community`)
}

export const getNewFlatsRecord = (params: any) => {
  return request.get(`/api/cq-building-record`, { params })
}