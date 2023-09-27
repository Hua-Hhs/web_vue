<template>
    <div class="all">    
      <div class="background"></div>
      
      <div class="topBar">
        <el-button class="back-button" type="primary" @click.native.prevent="handleLogout">退出</el-button>
      </div>
      <el-form ref = "loginForm"  class="login-form" auto-complete="on" label-position="left">
        <div class="title-container">
                <h3 class="title">教师信息</h3>
            </div>
      <!-- <div class="leftBar">  -->
        <!-- <div class="infoTable"> -->
          <div >
            <el-table :data="tableData" border :show-header="false" class="table-container">
              <el-table-column  prop="header" width="100px" ></el-table-column>
              <el-table-column  prop="content" >


                <template slot-scope="scope" >
                  <template v-if="!isEditing" >
                    {{ scope.row.content }}
                  </template>
                  <template v-else>
                    <template v-if="scope.row.isName">
                      {{ scope.row.content }}
                    </template >
                    
                    <template v-else-if="scope.row.isShow">
                    <el-input v-model="scope.row.content" ></el-input>
                    </template >
                    <el-input v-else v-model="scope.row.content" show-password ></el-input>
                  </template>
                </template>               
              </el-table-column>
            </el-table>
            

            
          <div class="leftButton">
            <el-button type="primary" v-if="!isEditing" @click="startEditing">修改</el-button>
            <el-button type="primary" v-else @click="saveChanges">保存</el-button>
            <el-button type="primary" v-if="isEditing" @click="cancelEditing">取消</el-button>
          </div>



    <!-- </div> -->
      </div>
      <div class="rightBar"> 
        <div class="rightTable">
          <el-button type="primary"  @click="gotoClasses">我的授课班级</el-button>
          <el-button type="primary"  @click="gotoQuestions">题库信息</el-button>
          <el-button type="primary"  @click="gotoTests">我的考试</el-button>
        </div>
      </div>

 </el-form>
</div>
    
</template>

<script>

import { Message } from 'element-ui';
import'../mock'
import 'js-cookie'



export default{
  

  data() {
    return {
      tableData: [
        { header: "账号", content: "******" ,isEditing: false,isShow : true,isName : true},
        { header: "姓名", content: "张三" ,isEditing: false,isShow : true,isName : false},
        { header: "原密码", content: "" ,isEditing: false,isShow : false,isName : false},
        { header: "新密码", content: "" ,isEditing: false,isShow : false,isName : false},
        { header: "确认密码", content: "" ,isEditing: false,isShow : false,isName : false},
        
      ],
      isEditing: false,
      originalData: [],
  
    };
  },
  mounted() {
    if(this.$store.state.token != '')
    this.beginPlay();
  },

  methods: {
    beginPlay(){      
      this.tableData[0].content = this.$globalVariable.teacherID;
      this.getTeacherInfo();
      
    },
    getTeacherInfo(){
      const data = {id : this.$globalVariable.teacherID}       
      
      this.$http.post(this.GLOBAL.URL + 'Teacher/SelectTeacher', data).then(res => { 
                        const info = res.data
                        console.log(info);
                        this.tableData[1].content = info.data.teachername;

                    }).catch(()=>{this.loading = false})
      
      
    },
    startEditing() {
      this.tableData[2].content = '';
      this.tableData[3].content = '';
      this.tableData[4].content = '';
      this.isEditing = true;
      this.originalData = JSON.parse(JSON.stringify(this.tableData));
    },
    saveChanges() {
      // console.log(this.$globalVariable.teacherPassword)
      
      // console.log(this.tableData[2].content)
    
      
      if(this.tableData[3].content != this.tableData[4].content){
        Message({
          message : '两次密码不一样,请重新输入',
          type : 'error',
          duration: 5 * 1000,
         
        })
        // this.cancelEditing();
        return
      }
      if(this.tableData[3].content.length < 6 || this.tableData[4].content.length < 6){
        Message({
          message : '密码不能少于6位,请重新输入',
          type : 'error',
          duration: 5 * 1000,
         
        });
        // this.cancelEditing();
        return
      }
      if( this.$globalVariable.teacherPassword != this.tableData[2].content){
      Message({
          message : '原密码不正确,请重新输入',
          type : 'error',
          duration: 5 * 1000,
         
        })
        // this.cancelEditing();
        return
     }
      else{
        
        const data = {
          teacherid : this.tableData[0].content,          
          teachername : this.tableData[1].content,    
          teachertype : null,      
          teacherpassword : this.tableData[3].content,
        }
        const newpassword = this.tableData[4].content
        this.$http.post(this.GLOBAL.URL + 'Teacher/UpdateTeacher',data).then(res => {
          const info = res.data
          if(info.code == 20000) {
            this.$globalVariable.teacherPassword = newpassword;
            Message({
              message : '修改成功',
              type : 'success',
              duration: 5 * 1000,
              
            });
            
          }
         
    
         }).catch(error => { })  
        
         this.tableData[2].content = '';
            this.tableData[3].content = '';
            this.tableData[4].content = '';
        this.isEditing = false;
      }
      
    },
    cancelEditing() {      
      this.isEditing = false;
      this.tableData = JSON.parse(JSON.stringify(this.originalData));
    },
    gotoClasses(){
     
    this.$router.replace('/classesPage');
    },
    gotoQuestions(){
      this.$router.replace('/questionsPage');
    },
    gotoTests(){
      Message({
              message : '没有数据微信小程序数据资料还没写',
              type : 'success',
              duration: 5 * 1000,
              
            });
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
                  this.$globalVariable.loading = false;
      this.$router.replace('/');
      
      console.log(this.$store.state.token + '退出成功');
      
    },
    },
  };


</script>
<style>




.all{
  display: flex;
}
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
.topBar {
  position: absolute;
  left: 0px;
  /* margin-right: 0; */
  opacity: 0.9;
  background-color: blue;
  align-items: center;
}

.back-button {
  position: relative;
  width: 200px;
  height: 100px;
  margin-left: 0;
}



.leftBar {
  position: absolute;
  height: 100%;
  width: 400px;
  margin-top: 0;
  opacity: 0.9;
  background-color: rgba(255,255,255,0.6);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.header{
  
 
  background-color: rgb(221, 221, 221);
}
.element{

  background-color: rgb(228, 228, 228);
}
.infoTable{
  margin-left: 100px;
  width: auto;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  flex-direction: column;
 
  font-size: 40px;
  background-color: #aeafaf;
}
.leftButton{
  margin-top: 5px;
  margin-right: auto;
}
.table-container {
  background-color: transparent;
  width: 500px;
  /* height: 50vh; 设置相对于视口高度的百分比值 */
  font-size: 20px;
}

.rightBar{
  margin-top: 5px;
  /* position: absolute; */
  /* left: 50%; */
  /* top: 50%; */
  /* transform: translate(0, -50%); */
  /* height: 600px; */
  /* width: 400px; */
  
  /* opacity: 0.9; */
  /* background-color: rgba(120, 188, 209, 0.6); */
  /* display: flex; */
  
  align-items: center;
}

.login-form{
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 520px;
        max-width: 100%;
        padding: 35px 50px 10px;
        margin: 0 auto;
        overflow: hidden;
        background-color: #283443;
        border-radius: 8px;
        opacity: 0.9;
    }
    .el-form-item{
        border: 1px solid rgba(255,255,255,0.1);
        background: rgba(0,0,0,0.1);
        border-radius: 5px;
        color:#454545;
    }
    .title-container{
        position: relative;
    }
    .title{
        font: 26px;
        color:#eee;
        margin: 0px auto, 40px auto;
        text-align: center;
        font-weight: bold;
    }
  </style>