import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        // 左侧菜单栏数据
        menuItems: [
            {
                name: "home",
                size: 18,
                text: "主页",
                type: "md-home"},
                {hide: "false",
                level: 1,
                menu_id: 0,
                name: "teachermanger",
                size: 18,
                text: "老师管理",
                type: "md-home"},
                {hide: "false",
                level: 0,
                menu_id: 0,
                name: "usermanger",
                size: 18,
                text: "角色管理",
                type: "md-home"},
                {hide: "false",
                level: 0,
                menu_id: 0,
                name: "menumanger",
                size: 18,
                text: "菜单管理",
                type: "md-home"},
                {hide: "false",
                level: 0,
                menu_id: 0,
                name: "partyorgmanger",
                size: 18,
                text: "党组织管理",
                type: "md-home"},
                {hide: "false",
                level: 1,
                menu_id: 0,
                name: "thinkmanger",
                size: 18,
                text: "思想管理",
                type: "md-home"},
                {hide: "false",
                level: 1,
                menu_id: 0,
                name: "workmanger",
                size: 18,
                text: "工作管理",
                type: "md-home"},
                {hide: "false",
                level: 1,
                menu_id: 0,
                name: "paymanger",
                size: 18,
                text: "缴费管理",
                type: "md-home"},
                {hide: "false",
                level: 1,
                menu_id: 0,
                name: "userinfo",
                size: 18,
                text: "基本信息",
                type: "na"},
        ],
    },
    mutations: {
        setMenus(state, items) {
            state.menuItems = [...items]
        },
    }
})

export default store