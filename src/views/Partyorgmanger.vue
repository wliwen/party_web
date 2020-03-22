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
                  <i-input placeholder="请输入党员id..." v-model='number_no'/>
                   </Form-item>
              </i-col>
              <i-col span="8">
                   <i-button type="primary" icon="ios-search" @click="add">新增</i-button>
                  <i-button type="primary" icon="ios-search" style="margin-left:8px" @click="getPartylist">搜索</i-button>
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
                <Form-item prop="t_user_id" label="党员号:">
                    <i-input disabled name='t_user_id'  v-model="auModel_data.t_user_id"    />
                 </Form-item>
                    </i-col>
                </Row>
                <Row>
                    <i-col span='23'>
                <Form-item prop="user_name" label="姓名">
                    <i-input  v-model="auModel_data.user_name" placeholder="请输入姓名"/>
                 </Form-item>
                    </i-col>
                </Row>
                <Row>
                    <i-col span='23'>
                <Form-item prop="in_party_dept" label="党支部">
                    <i-input  v-model="auModel_data.in_party_dept" placeholder="请输入党支部"/>
                 </Form-item>
                    </i-col>
                </Row>
                <Row>
                    <i-col span='23'>
                <Form-item prop="navite_place" label="籍贯：">
                    <i-input  v-model="auModel_data.navite_place" placeholder="请输入籍贯"/>
                 </Form-item>
                    </i-col>
                </Row>
                <Row>
                    <i-col span='23'>
                <Form-item prop="education" label="学历：">
                    <i-input  v-model="auModel_data.education" placeholder="请输入学历"/>
                 </Form-item>
                    </i-col>
                </Row>
                 <Row>
                    <i-col span='23'>
                <Form-item prop="in_date" label="入党时间：">
                     <Date-picker :disabled="enable" type="date" v-model="auModel_data.in_date" format="yyyy年MM月dd日" placeholder="选择入党时间" style="width: 100%" ></Date-picker>
                 </Form-item>
                    </i-col>
                </Row>
                 <Row>
                    <i-col span='23'>
                <Form-item prop="correction_date" label="转正时间：">
                    <Date-picker :disabled="enable" type="date" v-model="auModel_data.correction_date" format="yyyy年MM月dd日" placeholder="选择转正时间" style="width: 100%" ></Date-picker>
                 </Form-item>
                    </i-col>
                </Row>
                <Row>
                    <i-col span='23'>
                <Form-item prop="user_sex" label="本省外省：">
                   <i-select v-model="auModel_data.in_out" :disabled="enable" >
                      <i-option v-for="item in user_lcoal" :value="item.value">{{ item.label }}</i-option>
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
    name: 'partyorgmanger',
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
                       title: '姓名',
                        key: 'user_name',
                        width: 100,
                        fixed: 'left'
                   },
                   {
                       title: '党支部',
                        key: 'in_party_dept'
                   },
                    {
                       title: '籍贯',
                        key: 'navite_place'
                   },
                    {
                       title: '学历',
                        key: 'education'
                   },
                    {
                       title: '入党时间',
                        key: 'in_date'
                   },
                   {
                       title: '转正时间',
                        key: 'correction_date'
                   },
                   {
                       title: '是否外省',
                        key: 'in_out_val'
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
         this.getID()
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
       this.modelText='修改信息'
      this.auModel=true
      this.auModel_data=params.row
      this.enable=true
    },
    cancel(){
      this.auModel=false
       this.auModel_data={}
    },
    async  getPartylist(){
        this.options.name=this.name;
        this.options.number_no=this.number_no;
        let res= await v_axios('/api/getpartylist','post',this.options,"")
        this.data=res
        this.total=res[0].total
    },
     async  getID(){
        let res= await v_axios('/api/getautoid?time='+ Date.parse(new Date()),'get',"","")
       this.auModel_data.t_user_id=res
    },
    add(){
        this.getID()
      this.modelText='新增用户'
      this.auModel=true
      this.enable=false
    },
   async submit(param){
     var options=this.auModel_data
      if(param=='新增用户'){
            let res= await v_axios('/api/addpartylist','post',options,"")
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
          
      }else if(param=='修改信息'){
        let res= await v_axios('/api/updatepartylist','post',options,"")
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