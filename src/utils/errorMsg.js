const ERROR_CODE = [
    {
        code: 400,
        msg: '请求资源不存在',
    },
    {
        code: 401,
        msg: '未授权，请登录'
    }, 
    {
        code: 403,
        msg: '拒绝访问，无权限'   
    },
    {
        code: 404,
        msg: '请求资源不存在'
    },
    {
        code: 408,
        msg: '请求超时'
    },
    {
        code: 500,
        msg: '服务器内部错误'
    },
    {
        code: 501,
        msg: '服务未实现'
    },
    {
        code: 502,
        msg: '网关错误'
    },
    {
        code: 503,
        msg: '服务不可用'
    },
    {
        code: 504,
        msg: '网关超时'
    }
]
// 获取错误信息 
export function getErrorMsg(code) {
    const errorInfo = ERROR_CODE.find(item => item.code === code)
    return errorInfo ? errorInfo.msg : '未知错误，请稍后重试'
}
