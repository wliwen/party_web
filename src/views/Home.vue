<template>
<Row :gutter="16">
     <i-col span="8">
    <Card >
        <p slot="title">
            <Icon type="ios-film-outline"></Icon>
            最近添加党员
        </p>
        <a href="#" slot="extra" @click.prevent="gotoPage">
            <Icon type="ios-arrow-thin-right"></Icon>
            去看看
        </a>
        <ul>
            <li v-for="item in nearList ">
                <a :href="item.url" target="_blank">{{ item.user_name }}</a>
                <span style="float: right;">
                    {{ item.party_type }}
                </span>
            </li>
        </ul>
    </Card>
     </i-col>
     <i-col span="4">
     </i-col>
      <i-col span="12">
          <div id="chart1" style="width:100%;height:376px"></div>
      </i-col>
</Row>
</template>
<script>
import {v_axios} from '../utils'
    export default {
        data () {
            return {
                limitNum: 5,
                limitFrom: 0,
               nearList:[
                  
               ]
            }
        },
        mounted(){
    this.drawLine();
    this.getNearUser()
  },
        methods: {
            gotoPage () {
                this.$router.push({path:'partyorgmanger'})
            },
         async   getNearUser(){
            this.nearList=await v_axios('party/getnearuser','get',"","")

            },
             drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('chart1'))
        // 绘制图表
        myChart.setOption({
            title: { text: '新增党员报表' },
            tooltip: {},
            xAxis: {
                data: ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20,5, 20, 36, 10, 10, 20],
                color:'#2d8cf0'
            }]
        });
    }}}
</script>