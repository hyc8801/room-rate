import request from "../utils/request"

export const getSecondHouse = () => {
  return request.get(`/api/second-house`)
}

export const getCommunity = () => {
  return request.get(`/api/community`)
}