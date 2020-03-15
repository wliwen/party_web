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
                   <i-button type="primary" icon="ios-search" @click="add">新增</i-button>
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

   <!-- 新增--><!-- 修改-->
     <Modal v-model="auModel"  >
        <p slot="header" style="color:#2d8cf0;text-align:center">
            <Icon type="information-circled"></Icon>
            <span>{{this.modelText}}</span>
        </p>
        <div class='register_modal_content'>
            <i-form  :model="auModel_data" :rules="ruleInline" :label-width="80" >
                <Row>
                    <i-col span='23'>
                <Form-item prop="user_id" label="工号：">
                    <i-input :disabled="enable" name='user_id'  v-model="auModel_data.user_id" placeholder="请输入工号"   />
                 </Form-item>
                    </i-col>
                </Row>
                <Row>
                    <i-col span='23'>
                <Form-item prop="user_name" label="姓名：">
                    <i-input  v-model="auModel_data.user_name" placeholder="请输入姓名"/>
                 </Form-item>
                    </i-col>
                </Row>
                <Row>
                    <i-col span='23'>
                <Form-item prop="user_age" label="年龄：">
                    <i-input  v-model="auModel_data.user_age" placeholder="请输入年龄"/>
                 </Form-item>
                    </i-col>
                </Row>
                <Row>
                    <i-col span='23'>
                <Form-item prop="user_identity" label="身份证：">
                    <i-input  v-model="auModel_data.user_identity" placeholder="请输入年龄"/>
                 </Form-item>
                    </i-col>
                </Row>
                 <Row>
                    <i-col span='23'>
                <Form-item prop="email" label="邮箱：">
                    <i-input  v-model="auModel_data.email" placeholder="请输入邮箱"/>
                 </Form-item>
                    </i-col>
                </Row>
                 <Row>
                    <i-col span='23'>
                <Form-item prop="phone_num" label="手机号：">
                    <i-input  v-model="auModel_data.phone_num" placeholder="请输入手机号"/>
                 </Form-item>
                    </i-col>
                </Row>
                <Row>
                    <i-col span='23'>
                <Form-item prop="user_sex" label="性别：">
                   <i-select v-model="auModel_data.user_sex" >
                      <i-option v-for="item in sex_list" :value="item.value">{{ item.label }}</i-option>
                    </i-select>
                 </Form-item>
                    </i-col>
                </Row>
            </i-form>
        </div>
        <div slot="footer">
             <i-button     @click="cancel">取消</i-button>
            <i-button type="primary"    @click="submit(modelText)">确定</i-button>
        </div>
    </Modal>
    </div>
 
   
</template>

<script>
import {v_axios} from '../utils'
import axios from 'axios'
export default {
    name: 'teachermanger',
     data() {
         return{
           enable:true,
           modelText:'',
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
            sex_list:[
                 {value: 0,
                  label: '男'
                    },
                  {value: 1,
                  label: '女'
                    }
            ],
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
      this.getTeacherList();
    },
    handlePageSize(val) {
      this.options.pageSize = val;
      this.pageSize = val;
      this.handlePage(1);
    },
    edit(params){
       this.modelText='修改信息'
      this.auModel=true
      this.auModel_data=params.row
      this.enable=true
    },
    cancel(){
      this.auModel=false
       this.auModel_data={}
    },
    async  getTeacherList(){
        this.options.name=this.name;
        this.options.number_no=this.number_no;
        let res= await v_axios('/api/getteacherlist','post',this.options,"")
        this.data=res
        this.total=res[0].total
    },
    add(){
      this.modelText='新增用户'
      this.auModel=true
      this.enable=false
    },
   async submit(param){
     var options=this.auModel_data
      if(param=='新增用户'){
          let res1=await v_axios('/api/checkID?user_id='+options.user_id,'get',"","")
          if(res1){
            this.$Message.warning("该工号已经被使用！", 3)
            this.auModel_data.user_id=''
            return 
          }else{
            let res= await v_axios('/api/addteacherlist','post',options,"")
            if(res){
              this.$Notice.success({
                title:'成功',
                desc:'新增成功',
                duration:1
              })
            }else{
              this.$Notice.error({
                title:'失败',
                desc:'新增失败',
                duration:1
              })
              return
            }
          }
      }else if(param=='修改信息'){
        let res= await v_axios('/api/updateteacherlist','post',options,"")
            if(res){
              this.$Notice.success({
                title:'成功',
                desc:'修改成功',
                duration:1
              })
            }else{
              this.$Notice.error({
                title:'失败',
                desc:'修改失败',
                duration:1
              })
              return
            }
      }
      this.auModel=false
    this.auModel_data={}
    this.getTeacherList
    },
    
     }
}
</script>

<style scoped>

</style>