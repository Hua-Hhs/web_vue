<template>
    <div class="">    
      <div class="background"></div>
      
      <div class="table">
      <el-table :data="tableData" ref='table' style="width: 100%">
        <el-table-column prop="id" label="用户id" width="180"></el-table-column>
        <el-table-column prop="username" label="用户名 " width="180"></el-table-column>
        <el-table-column prop="phone" label="手机号码" width="180"></el-table-column>
        <el-table-column prop="email" label="电子邮箱 " width="180"></el-table-column>
        <el-table-column prop="status" label="人员状态"></el-table-column>
        </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        :total="total">
      </el-pagination>
      <el-button type="primary" style="width:100;margin-bottom:30px;"
            @click.native.prevent="handleLogout">退出</el-button>
    </div>
    
    </div>
    
</template>

<script>

import'../mock'
import 'js-cookie'



export default{
    data() {
      return {
        tableData: [], // 表格数据
        currentPage: 1, // 当前页码
        pageSize: 10, // 分页大小
        total: 100, // 总数据条数
      };
    },
    mounted() {
      this.fetchData();
    },
    methods: {
      
      fetchData() {
        
        //this.$http.post('http://localhost:8899/userTable').then(res => {
        this.$http.post(this.GLOBAL.URL + 'user/all').then(res => {
                        const info = res.data
                        console.log(info)
                        this.tableData = info.data
                        
                        
                        this.reloadData()
                        
                    }).catch(()=>{console.log('连接失败')})  
      },
      reloadData(){
      this.total = this.tableData.length

      const startIndex = (this.currentPage - 1) * this.pageSize
      const endIndex = startIndex + this.pageSize

      this.visibleData = this.tableData.slice(startIndex, endIndex)

      const count = this.pageSize-this.visibleData.length
      if(count != 0){
        for(let i=0;i<count;i++){
          //console.log('push')
          this.visibleData.push({ 
                            id: 'null',
                            username: '',
                            phone:'',
                            email:'',
                            status:''
                          })
        }
     
      }
        
      this.tableData = this.visibleData
      },
      handleSizeChange(newSize) {
        this.pageSize = newSize;
        this.fetchData();
      },
      handleCurrentChange(Page) {
      this.currentPage = Page
      this.fetchData()
      },
      handleLogout(){

        let mytoken = this.$store.state.token
        console.log(this.$store.state.token + '退出开始');
        this.$http.post(this.GLOBAL.URL + 'user/logout',null,{headers : {
          'X-Token': mytoken
        }}).then(res => {
                        const info = res.data
                        console.log(info)
                        this.$store.commit('RESET_STATE');
                        
                    }).catch(()=>{console.log('退出失败')})  

        this.$router.replace('/');
        
        console.log(this.$store.state.token + '退出成功');
       
      },
    },
  };


</script>
<style>
.table{
  opacity: 0.8;
}
.background{
  position: absolute;
        min-height: 100%;
        width:100%;
        
        overflow: hidden;
        
        background-image: url('../assets/bg.png');
        background-color: rgba(255,255,255,0.8);
        
        
        background-size:cover;
        background-repeat: no-repeat;
        background-position: center;
        
        display: flex;
        align-items: center;
        opacity: 0.8;
        
        
  
}

  </style>