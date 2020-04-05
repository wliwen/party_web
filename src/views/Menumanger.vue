<template>
<div>
    <Tree :data="baseData" show-checkbox></Tree>
 </div>   
</template>
<script>
    export default {
        name: 'menugmanger',
        data () {
            return {
                baseData: [{
                    expand: false,
                    title: '菜单',
                    children: [ {
                        title: '主页',
                        expand: false,
                        checked: false,
                         disabled: true,
                        
                    },{
                        title: '老师管理',
                        expand: false,
                        checked: false,
                        
                    },{
                        title: '角色管理',
                        expand: false,
                        checked: false,
                        
                    },{
                        title: '菜单管理',
                        expand: false,
                        checked: false,
                        
                    },{
                        title: '党组织管理',
                        expand: false,
                        checked: false,
                        
                    },{
                        title: '思想管理',
                        expand: false,
                        checked: false,
                        
                    },{
                        title: '工作管理',
                        expand: false,
                        checked: false,
                        
                    },{
                        title: '缴费管理',
                        expand: false,
                        checked: false,
                        
                    },{
                        title: '基本信息',
                        expand: false,
                        checked: false,
                        
                    }
                    ]
                }]
            }
        }
    }
    </script>