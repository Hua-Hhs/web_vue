<template>
    <div class="">    
      <div class="background"></div>

      <div class="table">
        <el-table :data="courseStudenttableData" ref='table' style="width: auto">

          <el-table-column prop="stuid" label="学号" width="180"> </el-table-column>
            
          <el-table-column prop="name" label="姓名 " width="180" >
            <template slot-scope="scope" >
                  <template v-if="!scope.row.isEditing" >
                    {{ scope.row.name }}
                  </template>
                  <template v-else>
                    <el-input v-model="scope.row.name" ></el-input>
                  </template>
                </template>
          </el-table-column>

          <el-table-column prop="courseName" label="课程" width="180">
            <template slot-scope="scope" >
                  <template v-if="!scope.row.isEditing" >
                    {{ scope.row.courseName }}
                  </template>
                  <template v-else>
                    <el-input v-model="scope.row.courseName" ></el-input>
                  </template>
                </template>
          </el-table-column>

          <el-table-column prop="password" label="密码 " width="180">
            <template slot-scope="scope" >
                  <template v-if="!scope.row.isEditing" >
                    {{ scope.row.password }}
                  </template>
                  <template v-else>
                    <el-input v-model="scope.row.password" ></el-input>
                  </template>
                </template>            
          </el-table-column>
    
        </el-table>

        

      
      

        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          :total="total">
        </el-pagination>

      
        <div >
          <el-button type="primary" v-for="item in course" :key="item.courseid"  @click="handleCourseButtonClick(item)">{{ item.coursename }}</el-button>        
          
        </div>

      <el-button type="primary" style="width:100;margin-top:5px;" @click.native.prevent="handleLogout">退出</el-button>
      </div>
    </div>
    
   
    
</template>

<script>

import'../mock'
import 'js-cookie'
import {Message} from 'element-ui'


export default{
    data() {
      return {
        isEditingClass : false,
        newcourseStudenttableData : [{stuid : '在此行添加',name : '', classid : '', password : '', isEditing : false} ],
        course : [], //存储班级信息
        courseStudenttableData: [], // 表格数据
        currentPage: 1, // 当前页码
        pageSize: 10, // 分页大小
        total: 100, // 总数据条数

        isEditing: false,

        editingRowIds: [], // 存储处于编辑状态的行的 ID
        editingData: {}, // 存储编辑数据

        currentCourseButton : 0,

        originRow : [],

        newClassData : '', //用来暂时存储新添加班级的信息
        // isDeletingClass : true,
        isDeletingClass : false,

        uploadURL : this.GLOBAL.URL + 'Student/upload',
        fileList: [], // 上传的文件列表
      };
    },
    mounted() {
      if(this.$store.state.token != '')
      this.beginPlay();      
    },
    methods: {    
        //页面加载数据  
        
      beginPlay() {        
        this.handleGetCourse();
        Message({
              message : '没有数据微信小程序数据资料所以未完善',
              type : 'success',
              duration: 5 * 1000,
              
            });      
          
      },
      beforeUpload(file) {
      this.fileList = [];
      // 将上传的文件添加到文件列表中
      if(this.fileList.length<=1)
      this.fileList.push(file);

      // 阻止自动上传
      return false;
    },
    upload() {
      // 创建FormData对象
      const formData = new FormData();

      // 将文件列表中的文件添加到FormData对象中
      this.fileList.forEach(file => {
        formData.append('file', file);
        console.log(formData)
      });

      // 发送文件到后端
      // 使用axios或其他HTTP库发送POST请求
      // 注意要设置合适的请求头（Content-Type: multipart/form-data）
      this.$http.post(this.GLOBAL.URL + 'Student/upload', formData)
        .then(response => {
          // 处理上传成功后的响应
          this.fileList = [];
        })
        .catch(error => {
          // 处理上传失败的情况
        });
    },





      handleGetCourse(){
        const data = {teacherid : this.$globalVariable.teacherID} 
        this.$http.post(this.GLOBAL.URL + 'Course/GetCourseByTeacherID',data).then(res => {
          
          this.course = res.data.data;         
          console.log(this.course);
          this.currentCourseButton = this.course[0].courseid;
          // this.newcourseStudenttableData[0].classid = this.course[0].id

          this.handleGetStudentByClassID();
         }).catch(()=>{console.log('查询课程失败')})  
      },
      // 点击切换班级按钮
      handleCourseButtonClick(item){
        this.currentCourseButton =  item.courseid;

        // this.courseStudenttableData = this.courseStudenttableData.map(item => {
        //   return { ...item, courseName: this.currentCourseButton };
        // });
     
        this.handleGetStudentByClassID();
        this.handleCurrentChange(1);
      },
      // 获取当前班级学生数据
      handleGetStudentByClassID() {
        const data = {courseid : this.currentCourseButton}
        console.log(data);
        this.$http.post(this.GLOBAL.URL + 'Student/SelectStudentByCourseID',data).then(res => {
                        const info = res.data
                        console.log(info.data)
                        this.courseStudenttableData = info.data
                        
                        this.courseStudenttableData = info.data.map(item => {
                          return { ...item, isEditing: false };
                        });
                        this.courseStudenttableData = info.data.map(item => {
                          return { ...item, courseName: this.currentCourseButton };
                        });
                        this.reloadData()
                        
                    }).catch(()=>{console.log('通过班级id查询学生失败')})  
      },
      // 处理当前班级数据，只显示10条
      reloadData(){
      this.total = this.courseStudenttableData.length

      const startIndex = (this.currentPage - 1) * this.pageSize
      const endIndex = startIndex + this.pageSize

      this.visibleData = this.courseStudenttableData.slice(startIndex, endIndex)

      const count = this.pageSize-this.visibleData.length
      console.log(count);
      if(count != 0){
        for(let i=0;i<count;i++){          
          this.visibleData.push({stuid: 'null'})
        }
     
      }
        
      this.courseStudenttableData = this.visibleData
      },

      handleSizeChange(newSize) {
        this.pageSize = newSize;
        this.handleGetStudentByClassID();
      },
      handleCurrentChange(Page) {
      this.currentPage = Page
      this.handleGetStudentByClassID()
      },
  
      // 退出，返回教师总界面
      handleLogout(){
        this.$router.replace('/teacherPage');
      },

    },
  };


</script>
<style>
.table{
  opacity: 0.8;
}
.background{
  z-index: -1;
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
.el-table .el-table__row {
  height: 60px;
  line-height: 60px;
}

.custom-primary {
  background-color: rgb(96, 5, 5) !important;
  border-color: rgb(84, 4, 4) !important;
  color: #aa1717 !important;
}

  </style>