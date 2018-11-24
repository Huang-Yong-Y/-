import axios from "axios/index";
import qs from "qs";
axios.defaults.timeout =  10000;
export function get(url,param,call){
    let axiosUrl = param !== "" ? url+ "?" + initParam(param) : url;
    axios.get(axiosUrl)
        .then((res) => {
            if (res.data.code === 0 || res.data.code === 200 ) {
               call(res.data.data,null);
            }else {
                
               call(null,res.data.msg);
            }
        })
        .catch((error) => {
            call(null,"请求出错!");
        })
};
export function post(url,data,call){
    axios({
        method: 'post',
        url,
        data:qs.stringify(data),
        Accept:'application/json',
        contentType: "application/x-www-form-urlencoded", // http content type  
    })
        .then((res) => {
            console.log(res)
            if (res.data.status === 'success') {
                call(res.data.data,null);
            }else {
                call(null,res.data.msg)
            }
        })
        .catch((error) => {
            call(null,"请求出错!");
        })
};
export function initParam(param){
    let  result = [];
    for(let key in param){
        let ele = key + "=" + param[key];
        result.push(ele);
    }
    return result.join("&");
}