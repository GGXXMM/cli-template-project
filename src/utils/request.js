import axios from 'axios'
import router from '/@/router'
// import { CURRENT_CONFIG } from '../config'
import { message } from 'element-plus'
import { ERouterName } from '/@/constants/router'
import { ELocalStorageKey } from '/@/constants/localStorage'
import { getErrorMsg } from '/@/utils/errorMsg'

// 常量定义
const REQUEST_ID = 'X-Request-Id'
const baseURL = import.meta.env.VITE_API_BASE_URL
const CANCEL_MESSAGE = '请求已取消（防重）'

// 存储正在进行的请求，用于防重
const pendingRequests = new Map()

/**
 * 生成请求唯一标识
 * @param {axios.AxiosRequestConfig} config 请求配置
 * @returns {string} 请求标识
 */
function generateRequestKey(config) {
  const { method, url, params, data } = config
  // 序列化参数，确保相同参数生成相同key
  const paramsStr = params ? JSON.stringify(params) : ''
  const dataStr = data ? JSON.stringify(data) : ''
  return `${method}-${url}-${paramsStr}-${dataStr}`
}

/**
 * 添加请求到 pending 列表（防重处理）
 * @param {axios.AxiosRequestConfig} config 请求配置
 */
function addPendingRequest(config) {
  // 如果配置了不开启防重提交，则直接返回
  if (config.isRepeatSubmit === false) return

  const requestKey = generateRequestKey(config)
  
  // 如果已有相同请求，则取消
  if (pendingRequests.has(requestKey)) {
    const source = pendingRequests.get(requestKey)
    source.cancel(CANCEL_MESSAGE)
  }
  
  // 创建新的取消令牌并存储
  const source = axios.CancelToken.source()
  config.cancelToken = config.cancelToken || source.token
  pendingRequests.set(requestKey, source)
}

/**
 * 从 pending 列表移除请求
 * @param {axios.AxiosRequestConfig} config 请求配置
 */
function removePendingRequest(config) {
  // 如果配置了不开启防重提交，则直接返回
  if (config.isRepeatSubmit === false) return
  
  const requestKey = generateRequestKey(config)
  if (pendingRequests.has(requestKey)) {
    pendingRequests.delete(requestKey)
  }
}

/**
 * 获取认证令牌
 * @returns {string} 令牌字符串
 */
function getAuthToken() {
  return localStorage.getItem(ELocalStorageKey.TOKEN) || ''
}

// 创建 axios 实例
const instance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 12000,
  baseURL,
  // 默认开启防重提交
  isRepeatSubmit: true
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 添加认证令牌
    config.headers[ELocalStorageKey.TOKEN] = getAuthToken()
    
    // 添加防重请求处理
    addPendingRequest(config)
    
    return config
  },
  (error) => {
    // 处理请求错误
    message.error('请求配置错误')
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 从pending列表移除请求
    removePendingRequest(response.config)
    
    // 打印响应日志（生产环境可移除）
    if (import.meta.env.DEV) {
      console.info(
        `%cURL: ${response.config.baseURL}${response.config.url}`,
        'color: #4CAF50; font-weight: bold',
        '\nData: ',
        response.data
      )
    }
    
    // 处理业务错误状态码
    const { status, data } = response
    if (status !== 200) {
      message.error(data?.message || getErrorMsg(status))
    }
    
    return data
  },
  (err) => {
    // 从pending列表移除请求（如果配置存在）
    if (err.config) {
      removePendingRequest(err.config)
    }
    
    // 处理取消请求（防重触发）
    if (axios.isCancel(err)) {
      console.log(CANCEL_MESSAGE, err.message)
      return Promise.reject({ isCancel: true, message: CANCEL_MESSAGE })
    }
    
    // 打印错误日志（生产环境可调整级别）
    console.error(
      `%cURL: ${err.config?.baseURL}${err.config?.url} [${err.config?.method}]`,
      'color: #f44336; font-weight: bold',
      '\nError: ',
      err
    )
    
    // 错误信息处理
    let errorMessage = '请求失败，请稍后重试'
    const status = err.response?.status
    
    // 提取错误信息
    if (err.response?.data) {
      errorMessage = err.response.data.message || 
                    err.response.data.result?.message || 
                    errorMessage
    } else if (!err.response) {
      errorMessage = '网络异常，请检查网络连接'
    }
    
    // 处理特定状态码
    switch (status) {
      case 401:
        errorMessage = '身份验证失败，请重新登录'
        // 清除token并跳转到登录页（防止重复跳转）
        if (router.currentRoute.value.name !== ERouterName.LOGIN) {
          localStorage.removeItem(ELocalStorageKey.TOKEN)
          router.push({ name: ERouterName.LOGIN })
        }
        break
      case 403:
        errorMessage = '没有权限执行此操作'
        break
      case 404:
        errorMessage = '请求的资源不存在'
        break
      case 500:
        errorMessage = '服务器内部错误'
        break
      default:
        errorMessage = `${errorMessage} (${status || ''})`
    }
    
    // 显示错误信息
    message.error(errorMessage)
    
    return Promise.reject({
      status,
      message: errorMessage,
      originalError: err
    })
  }
)

export default instance
