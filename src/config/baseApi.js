/**
 * @description 基础API
 * @author yhuang@abcft.com
 * date: 2018.6.12
 */
// 根据ip地址的选择域名
const apiHost = {
    "localhost": "api.researchreport.cn",
    "auth.researchreport.cn": "api.researchreport.cn",
    "auth-dev.analyst.ai": "api-dev.analyst.ai",
    "auth.analyst.ai": "api.analyst.ai"
}
// const baseURL = apiHost[window.location.hostname]? `${window.location.protocol}//${apiHost[window.location.hostname]}`: 'http://api.researchreport.cn'
const protocol = window.location.hostname === "auth-dev.analyst.ai" || window.location.hostname === "auth.analyst.ai" ?
    "https:" : window.location.protocol;
const baseURL = apiHost[window.location.hostname]? `${protocol}//${apiHost[window.location.hostname]}`: 'http://api.researchreport.cn'

// 添加新应用服务器地址
export const ApplicationAdd_ser = baseURL+"application/insert";

//上传图片
export const ApplicationUploadImage = baseURL+"/application/uploadImage";

//应用列表
export const AplicationList = baseURL + "/api/auth/application/listByPageAndFilter";

// 导入用户列表
export const UserList = baseURL + "/api/auth/user/importUserFile";

// 导入功能权限列表
export const AccessList = baseURL + "/api/auth/access/importAccessFile";

