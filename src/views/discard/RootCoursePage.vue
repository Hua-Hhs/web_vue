<template>
    <div class="">    
      <div class="background"></div>

      <div class="table">
       
      <!--                                         班级教师              -->
      <div> 
        <el-table :data="courseTableData" ref='table' style="width: auto">
          <el-table-column prop="courseid" label="课程号" width="180"> </el-table-column>            
          <el-table-column prop="coursename" label="课程名称 " width="180" >
            <template slot-scope="scope" >
                  <template v-if="!scope.row.isEditing" >
                    {{ scope.row.coursename }}
                  </template>
                  <template v-else>
                    <el-input v-model="scope.row.coursename" ></el-input>
                  </template>
                </template>
          </el-table-column>          

          <el-table-column prop="teacherid" label="教师账号 " width="180">
            <template slot-scope="scope" >
                  <template v-if="!scope.row.isEditing" >
                    {{ scope.row.teacherid }}
                  </template>
                  <template v-else>
                    <el-select v-model="selectedUpdateValue" placeholder="添加该课程教师">
                    <el-option v-for="option in AllTeachers" :key="option.teacherid" :label="option.teacherid" :value="option.teacherid"></el-option>
                  </el-select>

                    <!-- <el-input v-model="scope.row.teacherid" ></el-input> -->
                  </template>
                </template>            
          </el-table-column>

          <el-table-column prop="teachername" label="教师姓名 " width="180">
            <template slot-scope="scope" >
                  <template v-if="true" >
                    {{ scope.row.teachername }}
                  </template>
                  
                </template>            
          </el-table-column>

    
          <el-table-column  label=" " width="150">            
            <template slot-scope="scope">      
            <el-button v-if="scope.row.courseid != 'null'" type="primary" @click="handleEditCourse(scope.row)" 
            v-text="scope.row.isEditing ? '保存' : '编辑'"  size="mini" ></el-button>
            <el-button v-if="scope.row.isEditing" type="primary" @click="handleEditCourseCancel(scope.row)" size="mini" >取消</el-button>
          </template>
          </el-table-column>
          <el-table-column  label=" " width="100">            
            <template slot-scope="scope">      
              <el-button v-if="scope.row.courseid != 'null'" type="danger" @click="handleDeleteCourse(scope.row)" 
            v-text="scope.row.isDeletingCourse ? '确定删除' : '删除'"  size="mini" ></el-button>

            <!-- <el-button v-if="scope.row.courseid != 'null'" type="primary" @click="handleDeleteCourse(scope.row)" size="mini" v-text="true ? '删除' : '错误'"></el-button> -->
          </template>
          </el-table-column>
          <el-table-column  label=" " width="100">            
            <template slot-scope="scope">      
             
            <el-button v-if="scope.row.isDeletingCourse == true" type="primary" @click="handleDeleteCourseCancle(scope.row)" size="mini" v-text="true ? '取消删除' : '错误'"></el-button>
          </template>
          </el-table-column>

         
          <el-table-column  label=" " width="170">            
            <template slot-scope="scope">      
            <el-button v-if="scope.row.courseid != 'null'" type="primary" @click="handleGotoCourseStudentPage(scope.row)" size="mini" v-text="true ? '查看选课学生' : '错误'"></el-button>
          </template>
          </el-table-column>
        </el-table>

        
        <el-table :data="newcourseTableData" ref='table' border :show-header="false" style="width: auto">
          <el-table-column prop="courseid" label="课程号" width="180">
            <template slot-scope="scope" >
                  <template v-if="!scope.row.isEditing" >
                    {{ scope.row.courseid }}
                  </template>
                  <template v-else>
                    <el-input v-model="scope.row.courseid" ></el-input>
                  </template>
                </template>
          </el-table-column>
            
          <el-table-column prop="coursename" label="课程名称 " width="180">
            <template slot-scope="scope" >
                  <template v-if="!scope.row.isEditing" >
                    {{ scope.row.coursename }}
                  </template>
                  <template v-else>
                    <el-input v-model="scope.row.coursename" ></el-input>
                  </template>
                </template>
          </el-table-column>

         

          <el-table-column prop="teacherid" label="教师 " width="180">
            <template slot-scope="scope" >
                  <template v-if="!scope.row.isEditing" >
                    {{ scope.row.teacherid }}
                  </template>
                  <template v-else>
                  <el-select v-model="selectedValue" placeholder="添加该课程教师">
                    <el-option v-for="option in AllTeachers" :key="option.teacherid" :label="option.teachername" :value="option.teacherid"></el-option>
                  </el-select>
                  </template>
                </template>            
          </el-table-column>
          
    
          <el-table-column  label=" " width="70">            
            <template slot-scope="scope">      
            <el-button  type="primary" @click="handleAddCourse(scope.row)" 
            v-text="scope.row.isEditing ? '确定' : '添加'"  size="mini" ></el-button>
            </template>            
          </el-table-column>
          <el-table-column  label=" " width="70">            
            <template slot-scope="scope">      
            <el-button v-if="scope.row.isEditing == true" type="primary" @click="handleAddCourseCancel(scope.row)" size="mini" >取消</el-button>
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
      </div>
      <div style="display: flex; margin-top: 3px; ">
      <div style="display: flex; margin-top: 3px; ">
              <el-upload
            class="upload-demo"
            action="uploadURL"            
            :before-upload="beforeUpload"
            :file-list="fileList"          
            >
            
            <el-button size="small" type="warning" style="height: 40px;width: 150px;">从Excel上传课程</el-button>             
            </el-upload>
           <el-button v-if="this.fileList.length > 0" size="small" type="warning" style="height: 40px;width: 100px; margin-left: 10px;" @click="upload">确认上传</el-button>
           <el-button v-if="this.fileList.length > 0" size="small" type="primary" style="height: 40px;width: 100px; margin-left: 10px;" @click="uploadCancel">取消上传</el-button>
            </div>

        
            <div style="display: flex; margin-top: 3px; margin-left: 10px; ">
            <el-button size="small" type="primary" style="height: 40px;width: 150px;" @click="downloadExcel">下载Excel文件模板</el-button>            
          </div>
        </div>

          
      <el-button type="primary" style="width:100;margin-top:5px;" @click.native.prevent="handleLogout">退出</el-button>
      </div>
    </div>
    
   
    
</template>

<script>

import'../mock'
import 'js-cookie'
import {Message} from 'element-ui'

import XLSX from 'xlsx';
export default{
    data() {
      return {
        selectedValue : '',
        selectedUpdateValue:'',
        selectedUpdateTeacherName:'',
        AllTeachers : [],
        courseTableData : [],
        
        newcourseTableData : [{courseid : '在此行添加课程',coursename : '', teacherid : '', isEditing : false} ],
        classes : [], //存储班级信息
        tableData: [], // 表格数据
        currentPage: 1, // 当前页码
        pageSize: 10, // 分页大小
        total: 100, // 总数据条数

        // isEditing: false,//是否正在编辑学生

        uploadURL : this.GLOBAL.URL + 'Course/upload',
        fileList: [], // 上传的文件列表

        CurrentClassButton : 0,
        deleteClasses : [], //要删除的班级数组

        originRow : [],

        editingRow : {},

        showingType : 0,//当前显示表格的的数据，0是班级学生，1是班级教师，2是全体教师
      };
    },
    mounted() {
      
      this.beginPlay();      
    },
    methods: {    
      downloadExcel() {
      const data = [
        { 课程号: 'XXXXX', 课程名称: 'XXXXX',教师职工号: 'XXXXX'}
      ];
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(data);
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      const excelData = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = '课程.xlsx'; // 设置下载文件的文件名
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
      // ****************************************************
        //页面加载数据 
      beginPlay() {       
          this.GetAllTeachers();
          this.handleShowCourse();
          
      },
      
      GetAllTeachers(){
        this.$http.post(this.GLOBAL.URL + 'Root/GetAllTeachers').then(res => {
                        const info = res.data
                        console.log(info.data)
                        this.AllTeachers = info.data
                        
                    }).catch(()=>{console.log('通过班级id查询教师失败')})  
      },
      handleSizeChange(newSize) {
        this.pageSize = newSize;        
        
      },
      handleCurrentChange(Page) {
      this.currentPage = Page     
      },
     
      // *********************************************教师
      handleEditCourse(row){
        if(this.editingRow != row){
          this.editingRow.isEditing = false;
          this.editingRow = row;
        }
        if(row.isEditing == false){       
          this.originRow.courseid = row.courseid;            
          this.originRow.coursename = row.coursename;
          this.originRow.teacherid = row.teacherid;   
          
          this.selectedUpdateValue = row.teacherid;    

        }
        else{
          
          if(row.coursename == '' || this.selectedUpdateValue == ''){
            Message({
                            message : '课程名称或教师不能为空',
                            type : 'error',
                            duration: 1 * 1000,
                            })
            return
          }
          const data = {
            courseid : row.courseid,
            coursename : row.coursename,
            teacherid : this.selectedUpdateValue,
          }
          this.$http.post(this.GLOBAL.URL + 'Course/UpdateCourse', data).then(res => { 
                        const info = res.data
                        // console.log(info);
                        if(info.code != 20000) {
                            Message({
                                message: 'Error',
                                type: 'error',
                                duration: 1 * 1000
                            })    
                                         
                        }else{  
                         this.handleShowCourse();  
                          Message({
                            message : '修改成功',
                            type : 'success',
                            duration: 1 * 1000,
                            })
                            
                        }
                    }).catch()
        }
        row.isEditing = ! row.isEditing;
      },
      handleEditCourseCancel(row){
        // console.log('取消修改')
        row.coursename = this.originRow.coursename;
        row.courseid = this.originRow.courseid;
        row.teacherid =   this.originRow.teacherid;     
        row.isEditing = ! row.isEditing;
      },
      handleDeleteCourse(row){ 
        if(row.isDeletingCourse){
          const data = {
          courseid : row.courseid,          
        }
        this.$http.post(this.GLOBAL.URL + 'Course/DeleteCourse', data).then(res => { 
                        const info = res.data
                        if(info.code != 20000) {
                            Message({
                                message: 'Error',
                                type: 'error',
                                duration: 1 * 1000
                            })      
                  
                        }else{
                          Message({
                            message : '删除成功',
                            type : 'success',
                            duration: 1 * 1000,
                            })
                            const index = this.courseTableData.findIndex(item => item.courseid === row.courseid);
                            if (index !== -1) {
                              this.courseTableData.splice(index, 1);
                            }    
                        }
                    }).catch()        
        
        }      
        row.isDeletingCourse = !row.isDeletingCourse;
        
      },
      handleDeleteCourseCancle(row){
        row.isDeletingCourse = !row.isDeletingCourse;
      },

      // 对后端返回的数据进行处理，便于显示
      reloadCourseTableData(){
      this.total = this.courseTableData.length

      const startIndex = (this.currentPage - 1) * this.pageSize
      const endIndex = startIndex + this.pageSize

      this.visibleData = this.courseTableData.slice(startIndex, endIndex)

      const count = this.pageSize-this.visibleData.length
      console.log(count);
      if(count != 0){
        for(let i=0;i<count;i++){          
          this.visibleData.push({courseid: 'null'})
        }
     
      }
        
      this.courseTableData = this.visibleData
      },

      
      handleAddCourse(row){
        if(row.isEditing){
          if(row.courseid.length == 0 || row.coursename.length == 0 || this.selectedValue == ''){
            Message({
                            message : '课程号和课程名和教师不能为空',
                            type : 'error',
                            duration: 1 * 1000,
                            })   
             return
            }

         
          const data = {
          courseid : row.courseid,
          coursename : row.coursename,          
          teacherid : this.selectedValue,                
          }
          console.log( data)
          this.$http.post(this.GLOBAL.URL + 'Course/InsertCourse', data).then(res => { 
                        const info = res.data
                        console.log(info);
                        if(info.code == 20000) {
                            Message({
                                message: '添加成功',
                                type: 'success',
                                duration: 1 * 1000
                            })        
                            
                          this.handleShowCourse();
                        }else{
                          Message({
                            message : 'Error教师账号可能已经存在',
                            type : 'error',
                            duration: 1 * 1000,
                            })                          
                        }
                    }).catch()
          }
          

        
        row.courseid = '在此行添加新课程'; 
        row.coursename = '';        
        row.teacherid = '';
        if(!row.isEditing){row.courseid = ''; }
        row.isEditing = !row.isEditing;
      },
      handleAddCourseCancel(row){
        row.courseid = '在此行添加新课程'; 
        row.name = '';        
        row.teacherid = '';
        row.isEditing = !row.isEditing;
      },

      handleShowCourse(){
        const data = {courseid : this.CurrentClassButton}
        this.$http.post(this.GLOBAL.URL + 'Course/GetAllCourse',data).then(res => {
                        const info = res.data
                        console.log(info.data)
                        this.courseTableData = info.data
                        // this.AllTeachers = info.data
                        this.courseTableData = info.data.map(item => {
                          return { ...item, isEditing: false , isDeletingCourse : false};
                        });
                        this.reloadCourseTableData()
                        
                    }).catch(()=>{console.log('通过班级id查询教师失败')})  
        this.showingType = 2;
      },


      handleGotoCourseStudentPage(row){
        this.$globalVariable.courseID = row.courseid;
        this.$router.replace('/courseStudentPage');
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
        // console.log(formData)
      });

      // 发送文件到后端
      // 使用axios或其他HTTP库发送POST请求
      // 注意要设置合适的请求头（Content-Type: multipart/form-data）
      const data = {classid : this.CurrentClassButton}
      // console.log(data)

      this.$http.post(this.GLOBAL.URL + 'Course/upload', formData)
      .then(response => {
        const info = response.data
        console.log(response.data.message)
        // 处理上传成功后的响应
        if(info.code != 20000){
          Message({
            message: response.data.message, 
            type: 'error',
            duration: 5 * 1000
          })
        }else{
          Message({
            message: response.data.message, 
            type: 'success',
            duration: 1 * 1000
          })
        }
        
        this.fileList = [];
        this.handleShowClasses();
      })
      .catch(error => {
        // Message({
        //       message: '!!!上传失败',
        //       type: 'error',
        //       duration: 1 * 1000
        //   })
        //   this.fileList = [];
      });
    

      
    },
    uploadCancel(){
      this.fileList = [];
    },
// 8***************************************************班级操作

       
      // 退出，返回教师总界面
      handleLogout(){
        this.$router.replace('/rootPage');
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