<template>
    <div id='content'>
      <div id="head">
          <i-form :model="options" :label-width="80">
          <Row :gutter="16">
              
              <i-col span="8"   >
                  <Form-item label="标题">
                  <i-input placeholder="请输入标题..." v-model='title'/>
                  </Form-item>
              </i-col>
               <i-col span="8"   >
                   <Form-item label="党员id">
                  <i-input placeholder="请输入党员id..." v-model='number_no'/>
                   </Form-item>
              </i-col>
              <i-col span="8">
                   <i-button type="primary" icon="ios-search" @click="add">新增</i-button>
                  <i-button type="primary" icon="ios-search" style="margin-left:8px" @click="getPartylist">搜索</i-button>
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
                <Form-item prop="id" label="党员号:">
                    <i-input  name='id'  v-model="auModel_data.id"    />
                 </Form-item>
                    </i-col>
                </Row>
                <Row>
                    <i-col span='23'>
                <Form-item prop="title" label="标题">
                    <i-input  v-model="auModel_data.title" placeholder="请输入标题"/>
                 </Form-item>
                    </i-col>
                </Row>
                <Row>
                    <i-col span='23'>
                <Form-item prop="content" label="内容">
                    <i-input  v-model="auModel_data.content" placeholder="请输入内容"/>
                 </Form-item>
                    </i-col>
                </Row>
                <Row>
                    <i-col span='23'>
                <Form-item prop="member" label="人数">
                    <i-input  v-model="auModel_data.member" placeholder="请输入内容"/>
                 </Form-item>
                    </i-col>
                </Row>
               
                    <i-col span='23'>
                <Form-item prop="gmttime" label="汇报时间：">
                     <Date-picker :disabled="enable" type="date" @on-change="changeE(auModel_data.gmttime)" v-model="auModel_data.gmttime" format="yyyy年MM月dd日" placeholder="选择入党时间" style="width: 100%" ></Date-picker>
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
import {v_axios, changeDate} from '../utils'
import axios from 'axios'
export default {
    name: 'workmanger',
     data() {
         return{
           enable:true,
           modelText:'',
             title:'',
             number_no:'',
             model_update:false,
              total_num: 0,
              pageNum: 1, //当前页码
             pageSize: 10, //每页数据数
              options: {
                pageNum: 1, //当前页码
                pageSize: 10, //每页数据数
                 title:'',
                number_no:'',
            },
            user_lcoal:[
                 {value: 0,
                  label: '本省'
                    },
                  {value: 1,
                  label: '外省'
                    }
            ],
            auModel:false,
            auModel_data:{},
            ruleInline:{},
             data:[],
             columns: [
                   {
                       title: '编号',
                        key: 'id',
                        width: 100,
                        fixed: 'left'
                   },
                   {
                       title: '标题',
                        key: 'title'
                   },
                    {
                       title: '内容',
                        key: 'content'
                   },
                    {
                       title: '人数',
                        key: 'member'
                   },
                    {
                       title: '汇报时间',
                        key: 'gmttime'
                   },
                   
                   {
                        title: '操作',
                         width: 180,
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
              ),
              h(
                "Button",
                {
                  on: {
                   click: () => {
                    self.del(params);
                    }
                  }
                },
                "删除"
              )
            ]);
          },
          

                   }
                ],
         }
     },
     created(){
         this.getPartylist()
     },
     methods:{
           handlePage(val) {
      (this.options.pageNum = val), (this.pageNum = val);
      this.getPartylist();
    },
    handlePageSize(val) {
      this.options.pageSize = val;
      this.pageSize = val;
      this.handlePage(1);
    },
    edit(params){
       this.modelText='修改工作'
      this.auModel=true
      this.auModel_data=params.row
      this.enable=true
    },
    async del(params){
        let res= await v_axios('party/delalist','post',params.row,"")
        if(res){
             this.$Notice.success({
                title:'成功',
                desc:'删除成功',
                duration:1
              })
        }else{
             this.$Notice.error({
                title:'失败',
                desc:'删除失败',
                duration:1
              })
                return
        }
        this.getPartylist()
    },
    cancel(){
      this.auModel=false
       this.auModel_data={}
    },
    async  getPartylist(){
        this.options.name=this.name;
        this.options.number_no=this.number_no;
        let res= await v_axios('party/getalist','post',this.options,"")
        this.data=res
        this.total=res[0].total
    },
    add(){
      this.modelText='新增工作'
      this.auModel=true
      this.enable=false
    },
    changeE(e){
      this.auModel_data.gmttime=changeDate(e)
    },
   async submit(param){
     var options=this.auModel_data
      if(param=='新增工作'){
            let res= await v_axios('party/addalist','post',options,"")
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
          
      }else if(param=='修改工作'){
        let res= await v_axios('party/updatealist','post',options,"")
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
    this.getPartylist()
    },
    
     }
}
</script>

<style scoped>

</style>