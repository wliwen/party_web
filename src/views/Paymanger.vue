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
                  <i-button type="primary" icon="ios-search" style="margin-left:8px" @click="getPaylist">搜索</i-button>
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

   
     <Modal v-model="auModel"  >
        <p slot="header" style="color:#2d8cf0;text-align:center">
            <Icon type="information-circled"></Icon>
            <span>{{this.modelText}}</span>
        </p>
        <div class='register_modal_content'>
            <i-form  :model="auModel_data" :rules="ruleInline" :label-width="80" >
                <Row>
                    <i-col span='11'>
                <Form-item prop="one" label="一月份:">
                    <i-input :disabled='one' name='one'  v-model="auModel_data.one"    />
                 </Form-item>
                    </i-col>
                
                    <i-col span='11'>
                <Form-item prop="two" label="二月份:">
                    <i-input :disabled='two' name='two'  v-model="auModel_data.two"    />
                 </Form-item>
                    </i-col>
                </Row>
                <Row>
                    <i-col span='11'>
                <Form-item prop="three" label="三月份:">
                    <i-input :disabled='three' name='three'  v-model="auModel_data.three"    />
                 </Form-item>
                    </i-col>
               
                    <i-col span='11'>
                <Form-item prop="four" label="四月份:">
                    <i-input :disabled='four' name='four'  v-model="auModel_data.four"    />
                 </Form-item>
                    </i-col>
                </Row>
                 <Row>
                    <i-col span='11'>
                <Form-item prop="five" label="五月份:">
                    <i-input :disabled='five' name='five'  v-model="auModel_data.five"    />
                 </Form-item>
                    </i-col>
                
                    <i-col span='11'>
                <Form-item prop="six" label="六月份:">
                    <i-input :disabled='six' name='six'  v-model="auModel_data.six"    />
                 </Form-item>
                    </i-col>
                </Row>
                <Row>
                    <i-col span='11'>
                <Form-item prop="seven" label="七月份:">
                    <i-input :disabled='seven' name='seven'  v-model="auModel_data.seven"    />
                 </Form-item>
                    </i-col>
                    <i-col span='11'>
                <Form-item prop="eight" label="八月份:">
                    <i-input :disabled='eight' name='eight'  v-model="auModel_data.eight"    />
                 </Form-item>
                    </i-col>
                </Row>
                 <Row>
                    <i-col span='11'>
                <Form-item prop="nine" label="九月份:">
                    <i-input :disabled='nine' name='nine'  v-model="auModel_data.nine"    />
                 </Form-item>
                    </i-col>
                
                    <i-col span='11'>
                <Form-item prop="twen" label="十月份:">
                    <i-input :disabled='twen' name='twen'   v-model="auModel_data.ten"    />
                 </Form-item>
                    </i-col>
                </Row>
                <Row>
                    <i-col span='11'>
                <Form-item prop="ele" label="十一月份:">
                    <i-input :disabled='ele' name='ele'  v-model="auModel_data.ele"    />
                 </Form-item>
                    </i-col>
               
                    <i-col span='11'>
                <Form-item prop="twof" label="十二月份:">
                    <i-input :disabled='twof' name='twof'  v-model="auModel_data.twof"    />
                 </Form-item>
                    </i-col>
                </Row>
            </i-form>
        </div>
        <div slot="footer">
             <i-button     @click="cancel">取消</i-button>
            <i-button type="primary"    @click="submit(auModel_data)">确定</i-button>
        </div>
    </Modal>
    </div>
 
   
</template>

<script>
import {v_axios} from '../utils'
import axios from 'axios'
export default {
    name: 'paymanger',
     data() {
         return{
           modelText:'',
           one:true,
           two:true,
           three:true,
           four:true,
           five:true,
           six:true,
           seven:true,
           eight:true,
           nine:true,
           twen:true,
           ele:true,
           twof:true,
           dateList:['one',
           'two',
           'three',
           'four',
           'five',
           'six',
           'seven',
           'eight',
           'nine',
           'twen',
           'ele',
           'twof'],
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
            auModel:false,
            auModel_data:{
                
            },
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
                "缴费"
              )
            ]);
          }

                   }
                ],
         }
     },
     created(){
         this.getPaylist()
     },
     methods:{
           handlePage(val) {
      (this.options.pageNum = val), (this.pageNum = val);
      this.getPaylist();
    },
    handlePageSize(val) {
      this.options.pageSize = val;
      this.pageSize = val;
      this.handlePage(1);
    },
   async edit(params){
        this.case_blen()
       this.modelText='缴费详情'
      this.auModel=true
    let res=await v_axios('party/getpaylist','post',params.row,"")
    this.auModel_data=res[0]

    },
    cancel(){
      this.auModel=false
       this.auModel_data={}
    },
    async  getPaylist(){
        this.options.name=this.name;
        this.options.number_no=this.number_no;
        let res= await v_axios('party/getpartylist','post',this.options,"")
        this.data=res
        this.total=res[0].total
    },
   async submit(param){
       let res= await v_axios('party/addpay','post',param,"")
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
            this.edit(param)
    },
    case_blen(){
     var index=new Date().getMonth();
     var mon=this.dateList[index];
     switch(mon){
            case 'one':
            this.one=false
            break;
           case 'two':   
           this.two=false
           break;
           case 'three':
           this.three=false
           break;
           case 'four':
           this.four=false
           break;
           case 'five':
           this.five=false
           break;
           case 'six':
           this.six=false
           break;
           case 'seven':
           this.seven=false
           break;
           case 'eight':
           this.eight=false
           break;
           case 'nine':
           this.nine=false
           break;
           case 'twen':
           this.twen=false
           break;
           case 'ele':
           this.ele=false
           break;
           case 'twof':
           this.twof=false
           break;
           default:
           break;    
     }
    }
     }
}
</script>

<style scoped>

</style>