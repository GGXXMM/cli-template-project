import request from '/@/utils/request'

// 获取 token
export const getAuthTokenReq = async(params) => {
    const url = '/api/auth/token'
    const result = await request.post(url, params)
    return result
}