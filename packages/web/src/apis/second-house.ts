import request from "../utils/request"

export const getSecondHouse = () => {
  return request.get(`/api/second-house`)
}

export const beikeCommunityTaks = () => {
  return request.get(`/api/community`)
}

export const getNewFlatsRecord = (params: any) => {
  return request.get(`/api/new-flats-record`, { params })
}