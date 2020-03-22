<template>
    <div>
        <Tree :data="baseData" show-checkbox></Tree>
    </div>
</template>

<script>
export default {
    name: 'menumanger',
     data () {
            return {
               baseData: [{
                    expand: true,
                    title: '菜单',
                    children:[{}]
                    }]
            }
        },
        created(){
            this.menuChangeTree()
        },
        methods: {
            menuChangeTree(){
                var items=JSON.parse(localStorage.getItem('menu'))
                var list=[]
                
                for (var i in items){
                    var item={}
                    if(items[i].level==0 || items[i].text=='主页' ){
                    item.title=items[i].text
                    item.disableCheckbox=true
                    }else{
                        item.title=items[i].text
                    }
                   list.push(item)
                }
               
                 this.baseData.children=list
                 console.log(this.baseData)
            }

        }
}
       
</script>

<style scoped>

</style>