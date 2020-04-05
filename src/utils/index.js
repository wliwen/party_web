import { asyncRoutes, resetRouter } from '../router'
import axios from 'axios'
import Vue from '../main.js'
// 将菜单信息转成对应的路由信息 动态添加
export function menusToRoutes(data) {
    const result = []
    const children = []

    result.push({
        path: '/',
        component: () => import('../components/Index.vue'),
        children,
    })

    data.forEach(item => {
        generateRoutes(children, item)
    })

    children.push({
        path: 'error',
        name: 'error',
        component: () => import('../components/Error.vue')
    })

    // 最后添加404页面 否则会在登陆成功后跳到404页面
    result.push(
        {path: '*', redirect: '/error'},
    )

    return result
}

function generateRoutes(children, item) {
    if (item.name) {
        children.push(asyncRoutes[item.name])
    } else if (item.children) {
        item.children.forEach(e => {
            generateRoutes(children, e)
        })
    }
}

export function resetTokenAndClearUser() {
    // 退出登陆 清除用户资料
    localStorage.setItem('token', '')
    localStorage.setItem('userImg', '')
    localStorage.setItem('userName', '')
    // 重设路由
    resetRouter()
}
//封装axios,添加自定义  返回 promise供调用自定义数据
export   function  v_axios(url,method,param,headers){
    return new Promise((resolve, reject) => { axios({
        url:url,
        method:method,
        data:param,
        headers:{"token":localStorage.getItem("token")?localStorage.getItem("token"):"",headers},
    }).then(res=>{
        //过期处理
        if(res.code===4396){
            resetTokenAndClearUser()
            Vue.$router.push({path:"/login",query: {
                code: res.code,
                content:res.content,
                flag:res.flag
              }})
        }else{
            resolve(res)
        }
    }).catch(err=>{
        reject(err)
    })

})
}

export function changeDate(dateA) {

    var dateee = new Date(dateA).toJSON();
    
    var date = new Date(+new Date(dateee)+8*3600*1000).toISOString().replace(/T/g,' ').replace(/\.[\d]{3}Z/,'');
    
    return date;
    };

    export function exportExcel(url, options,filename) {
        return new Promise((resolve, reject) => {
          console.log(`${url} 请求数据，参数=>`, JSON.stringify(options))
          axios.defaults.headers['content-type'] = 'application/json;charset=UTF-8;'
          axios({
            method: 'post',
            url: url, // 请求地址
            data: options, // 参数
            responseType: 'blob' // 表明返回二进制对象便于接受
          }).then(
            response => {
              resolve(response)
              console.log(response)
              let blob = new Blob([response], {
                type: 'application/vnd.ms-excel'
              })
              let fileName = filename 
              if (window.navigator.msSaveOrOpenBlob) {
                // console.log(2)
                navigator.msSaveBlob(blob, fileName)
              } else {
                // console.log(3)
                var link = document.createElement('a')
                link.href = window.URL.createObjectURL(blob)
                link.download = fileName
                link.click()
                //释放内存
                window.URL.revokeObjectURL(link.href)
              }            
            },
            )})
          }