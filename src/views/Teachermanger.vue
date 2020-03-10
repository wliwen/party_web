<template>
    <div id='content'>
      <div id="head">
          <i-form :model="options" :label-width="80">
          <Row :gutter="16">
              
              <i-col span="8"   >
                  <Form-item label="姓名：">
                  <i-input placeholder="请输入姓名..." v-model='name'/>
                  </Form-item>
              </i-col>
               <i-col span="8"   >
                   <Form-item label="工号：">
                  <i-input placeholder="请输入工号..." v-model='number_no'/>
                   </Form-item>
              </i-col>
              <i-col span="8">
                   <i-button type="primary" icon="ios-search">新增</i-button>
                  <i-button type="primary" icon="ios-search" style="margin-left:8px" @click="getTeacherList">搜索</i-button>
                   <i-button type="primary" icon="ios-search"  style="margin-left:8px">导出</i-button>
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
          :current="pageNum"
          :page-size="pageSize"
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
    name: 'teachermanger',
     data() {
         return{
             name:'',
             number_no:'',
             model_update:false,
              total_num: 0,
              pageNum: 1, //当前页码
             pageSize: 10, //每页数据数
              options: {
                pageNum: 1, //当前页码
                pageSize: 10, //每页数据数
                 name:'',
                number_no:'',
            },
             data:[],
             columns: [
                   {
                       title: '用户',
                        key: 'user_name',
                        width: 100,
                        fixed: 'left'
                   },
                   {
                       title: '邮箱',
                        key: 'email'
                   },
                    {
                       title: '性别',
                        key: 'sex'
                   },
                    {
                       title: '年龄',
                        key: 'user_age'
                   },
                    {
                       title: '身份证号',
                        key: 'user_identity'
                   },
                   {
                       title: '手机',
                        key: 'phone_num'
                   },
                   {
                       title: '状态',
                        key: 'used'
                   },
                   {
                        title: '操作',
                         width: 150,
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
                    self.edit(params);
                    }
                  }
                },
                "修改"
              )
            ]);
          }

                   }
                ],
         }
     },
     created(){
         this.getTeacherList()
     },
     methods:{
           handlePage(val) {
      (this.options.pageNum = val), (this.pageNum = val);
    //   this.getList();
    },
    handlePageSize(val) {
      this.options.pageSize = val;
      this.pageSize = val;
      this.handlePage(1);
    },
    edit(params){

    },
    async  getTeacherList(){
        this.options.name=this.name;
        this.options.number_no=this.number_no;
        let res= await v_axios('/api/getteacherlist','post',this.options,"")
        this.data=res
        this.total=res[0].total
        console.log(res)
    }
     }
}
</script>

<style scoped>

</style>