<template>
    <div id='content'>
      <div id="head">
          <i-form :model="options" :label-width="80">
          <Row :gutter="16">
              
              <i-col span="6"   >
                  <Form-item label="姓名：">
                  <i-input placeholder="请输入姓名..." v-model='options.name'/>
                  </Form-item>
              </i-col>
               <i-col span="6"   >
                   <Form-item label="工号：">
                  <i-input placeholder="请输入工号..." v-model='options.number_no'/>
                   </Form-item>
              </i-col>
              <i-col span="4"   >
                  <Form-item label="人员等级:">
         <i-switch style="margin-left:10px" size="large" @on-change="change">
               <span slot="open">所有</span>
                <span slot="close">党员</span>
         </i-switch>
                   </Form-item>
              </i-col>
              <i-col span="8">
                  <i-button type="primary" icon="ios-search" style="margin-left:8px" @click="getUserList">搜索</i-button>
              </i-col>
          </Row>
          </i-form>
      </div>
    <div id='table'>
         <i-table border :columns="columns" :data="data"></i-table>
    </div>
    <div id='navitor' style="margin:10px;float:right">
         <Page
          :total="total_num"
          :current="options.pageNum"
          :page-size="options.pageSize"
          show-elevator
          show-sizer
          show-total
          placement="top"
          @on-change="handlePage"
          @on-page-size-change="handlePageSize"
        ></Page>
        </div>

  
    </div>
 
   
</template>

<script>
import {v_axios} from '../utils'
import axios from 'axios'
export default {
    name: 'usermanger',
     data() {
         return{
           enable:true,
           modelText:'',
             name:'',
             number_no:'',
             model_update:false,
              total_num: 0,
              options: {
                  quey_power:'only',
                pageNum: 1, //当前页码
                pageSize: 10, //每页数据数
                 name:'',
            },
            auModel:false,
            auModel_data:{},
            ruleInline:{},
             data:[],
             columns: [
                   {
                       title: '用户',
                        key: 'user_name',
                        width: 100,
                        fixed: 'left'
                   },
                    {
                       title: '工号',
                        key: 'user_id',
                   },
                   {
                       title: '状态',
                        key: 'used'
                   },
                   {
                       title: '人员等级',
                        key: 'power_order'
                   },
                   {
                        title: '操作',
                         width: 100,
                        fixed: 'right',
                        render: (h, params) => {
                            var self=this;
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary"
                  },
                  on: {
                   click: () => {
                    self.fireUser(params);
                    }
                  }
                },
                "除去"
              )
            ]);
          }

                   }
                ],
         }
     },
     created(){
         this.getUserList()
     },
     methods:{
           handlePage(val) {
      (this.options.pageNum = val), (this.pageNum = val);
      this.getTeacherList();
    },
    handlePageSize(val) {
      this.options.pageSize = val;
      this.pageSize = val;
      this.handlePage(1);
    },
    change(e){
        if(e===true){
            this.options.quey_power=''
        }else{
            this.options.quey_power='only'
        }
        this.getUserList()
    },
  
    async  getUserList(){
        let res= await v_axios('/api/getuserlist','post',this.options,"")
        this.data=res
        this.total=res[0].total
    },
    async fireUser(e){
        if(e.row.is_used===0){
            this.$Message.info('该用户已解除', 3, "")
            return 
        }
       let res= await v_axios('/api/fireuser?user_id='+e.row.user_id,'get',"","")
       if(res){
           this.$Notice.success({
                title:'成功',
                desc:'解除权限成功',
                duration:1
              })
       }else{
           this.$Notice.error({
                title:'失败',
                desc:'解除权限失败',
                duration:1
              })
       }
    }
    
     }
}
</script>

<style scoped>

</style>