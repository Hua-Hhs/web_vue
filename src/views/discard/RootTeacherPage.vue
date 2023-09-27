<template>
    <div class="">    
      <div class="background"></div>

      <div class="table">
        
      <!--                                         班级教师              -->
      <div> 
        <el-table :data="teacherTableData" ref='table' style="width: auto">
          <el-table-column prop="teacherid" label="教师帐号" width="180"> </el-table-column>            
          <el-table-column prop="teachername" label="姓名 " width="180" >
            <template slot-scope="scope" >
                  <template v-if="!scope.row.isEditing" >
                    {{ scope.row.teachername }}
                  </template>
                  <template v-else>
                    <el-input v-model="scope.row.teachername" ></el-input>
                  </template>
                </template>
          </el-table-column>          

          <el-table-column prop="teacherpassword" label="密码 " width="180">
            <template slot-scope="scope" >
                  <template v-if="!scope.row.isEditing" >
                    {{ scope.row.teacherpassword }}
                  </template>
                  <template v-else>
                    <el-input v-model="scope.row.teacherpassword" ></el-input>
                  </template>
                </template>            
          </el-table-column>
    
          <el-table-column  label=" " width="150">            
            <template slot-scope="scope">      
            <el-button v-if="scope.row.teacherid != ''" type="primary" @click="handleEditTeacher(scope.row)" 
            v-text="scope.row.isEditing ? '保存' : '编辑'"  size="mini" ></el-button>
            <el-button v-if="scope.row.isEditing" type="primary" @click="handleTeacherCancel(scope.row)" size="mini" >取消</el-button>
          </template>
          </el-table-column>
          <el-table-column  label=" " width="100">            
            <template slot-scope="scope">   
              <el-button v-if="scope.row.teacherid != ''" type="danger" @click="handleDeleteTeacher(scope.row)" 
            v-text="scope.row.isdeletingTeacher ? '确定删除' : '删除'"  size="mini" ></el-button>   
            <!-- <el-button v-if="scope.row.teacherid != ''" type="primary" @click="handleDeleteTeacher(scope.row)" size="mini" v-text="true ? '删除' : '错误'"></el-button> -->
          </template>
          </el-table-column>

          <el-table-column  label=" " width="150">            
            <template slot-scope="scope">     
            
            <el-button v-if="scope.row.isdeletingTeacher" type="primary" @click="handleDeleteTeacherCancel(scope.row)" size="mini" >取消</el-button>
          </template>
          </el-table-column>
        </el-table>

        
        <el-table  :data="newTeacherTableData" ref='table' border :show-header="false" style="width: auto">
          <el-table-column prop="teacherid" label="教师账号" width="180">
            <template slot-scope="scope" >
                  <template v-if="!scope.row.isEditing" >
                    {{ scope.row.teacherid }}
                  </template>
                  <template v-else>
                    <el-input v-model="scope.row.teacherid" ></el-input>
                  </template>
                </template>
          </el-table-column>
            
          <el-table-column prop="teachername" label="教师姓名 " width="180">
            <template slot-scope="scope" >
                  <template v-if="!scope.row.isEditing" >
                    {{ scope.row.teachername }}
                  </template>
                  <template v-else>
                    <el-input v-model="scope.row.teachername" ></el-input>
                  </template>
                </template>
          </el-table-column>

         

          <el-table-column prop="teacherpassword" label="教师密码 " width="180">
            <template slot-scope="scope" >
                  <template v-if="!scope.row.isEditing" >
                    {{ scope.row.teacherpassword }}
                  </template>
                  <template v-else>
                    <el-input v-model="scope.row.teacherpassword" ></el-input>
                  </template>
                </template>            
          </el-table-column>
          
    
          <el-table-column  label=" " width="70">            
            <template slot-scope="scope">      
            <el-button  type="primary" @click="handleAddTeacher(scope.row)" 
            v-text="scope.row.isEditing ? '确定' : '添加'"  size="mini" ></el-button>
            </template>            
          </el-table-column>
          <el-table-column  label=" " width="70">            
            <template slot-scope="scope">      
            <el-button v-if="scope.row.isEditing == true" type="primary" @click="handleAddTeacherCancel(scope.row)" size="mini" >取消</el-button>
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
      <div style="display: flex; margin-top: 3px;">
         
      <div style="display: flex; margin-top: 3px; ">
              <el-upload
            class="upload-demo"
            action="uploadURL"            
            :before-upload="beforeUpload"
            :file-list="fileList"          
            >

           <el-button size="small" type="warning" style="height: 40px;width: 150px;">从Excel上传教师</el-button>             
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
               
        AllTeacherTableData : [],
        teacherTableData : [],
        isEditingClass : false,
        newtableData : [{stuid : '在此行添加新学生',className : '123', classid : '', password : '', isEditing : false} ],
        
        newTeacherTableData : [{teacherid : '在此行添加新教师',teachername : '', teacherpassword : '', isEditing : false} ],
        classes : [], //存储班级信息
        tableData: [], // 表格数据
        currentPage: 1, // 当前页码
        pageSize: 10, // 分页大小
        total: 100, // 总数据条数

        isEditing: false,//是否正在编辑学生

     
        editingRow: {}, // 存储编辑数据

        CurrentClassButton : 1,
        deleteClasses : [], //要删除的班级数组

        originRow : [],

        // newClassData : '', //用来暂时存储新添加班级的信息
        // isDeletingClass : false,


        // showingType : 0,//当前显示表格的的数据，0是班级学生，1是班级教师，2是全体教师
        uploadURL : this.GLOBAL.URL + 'Teacher/upload',
        fileList: [], // 上传的文件列表
      };
    },
    mounted() {
      if(this.$store.state.token != '')
      this.beginPlay();      
    },
    methods: {    

      downloadExcel() {
      const data = [
        { 教师账号: 'XXXXX', 教师姓名: 'XXXXX',密码: 'XXXXX', }
      ];
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(data);
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      const excelData = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = '教师.xlsx'; // 设置下载文件的文件名
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
      // ****************************************************
        //页面加载数据 
      beginPlay() {        
        const data = {          
        id: this.$globalVariable.teacherID ,
        }
          // 获取所有的class数据，在按钮上显示，包含班级号id，班级名字name
          // this.getClass();        
          this.handleShowAllTeachers();
          
      },
      

      handleSizeChange(newSize) {
        this.pageSize = newSize;
 
        
      },
      handleCurrentChange(Page) {
      this.currentPage = Page

      },

      handleEditTeacher(row){
        if(this.editingRow != row){
          this.editingRow.isEditing = false;
          this.editingRow = row;
        }
        if(row.isEditing == false){         
          this.originRow.teachername = row.teachername;
          this.originRow.teacherid = row.teacher;
          this.originRow.teacherpassword = row.teacherpassword;            
        }
        else{
          if(row.teachername.length == 0 || row.teacherpassword.length < 6){
            Message({
                        message: '姓名不能为空，密码不能少于6位',
                        type: 'error',
                        duration: 1 * 1000
                    })    
                    return
          }
          const data = {
            teacherid : row.teacherid,
            teachername : row.teachername,
            teachertype : row.teachertype,
            teacherpassword : row.teacherpassword,
          }
          this.$http.post(this.GLOBAL.URL + 'Teacher/UpdateTeacher', data).then(res => { 
                        const info = res.data
                        console.log(info);
                        if(info.code != 20000) {
                            Message({
                                message: 'Error',
                                type: 'error',
                                duration: 1 * 1000
                            })                            
                        }else{
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
      handleTeacherCancel(row){
        // console.log('取消修改')
        row.teachername = this.originRow.teachername;
        row.teacherid = this.originRow.teacherid;
        row.teacherpassword =   this.originRow.teacherpassword;     
        row.isEditing = ! row.isEditing;
      },
      handleDeleteTeacher(row){
        if(row.isdeletingTeacher){
        // if(this.showingType == 2){
          const data = {
            id : row.teacherid,          
          }
        this.$http.post(this.GLOBAL.URL + 'Teacher/DeleteTeacher', data).then(res => { 
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
                            // const index = this.teacherTableData.findIndex(item => item.id === row.id);
                            // if (index !== -1) {
                            //   this.teacherTableData.splice(index, 1);
                            // }    
                            this.handleShowAllTeachers();
                        }
                    }).catch()        

        }
      // }
      // console.log('isdeletingteacher' + row.isdeletingTeacher)
      row.isdeletingTeacher = !row.isdeletingTeacher;
      },
      handleDeleteTeacherCancel(row){
        row.isdeletingTeacher = !row.isdeletingTeacher;
      },
      handleShowTeachers(){
        
        
        const data = {classid : this.CurrentClassButton}
        this.$http.post(this.GLOBAL.URL + 'Root/SelectTeacherByClassID',data).then(res => {
                        const info = res.data
                        console.log(info.data)
                        this.teacherTableData = info.data
                        this.teacherTableData = info.data.map(item => {
                          return { ...item, isEditing: false,isDeletingStudent : false };
                        });
                      
                        this.reloadTeacherData()
                        
                    }).catch(()=>{console.log('通过班级id查询教师失败')})  
        // this.showingType = 1;
      },
      reloadTeacherData(){
      this.total = this.teacherTableData.length

      const startIndex = (this.currentPage - 1) * this.pageSize
      const endIndex = startIndex + this.pageSize

      this.visibleData = this.teacherTableData.slice(startIndex, endIndex)

      const count = this.pageSize-this.visibleData.length
      console.log(count);
      if(count != 0){
        for(let i=0;i<count;i++){          
          this.visibleData.push({teacherid: ''})
        }
     
      }
        
      this.teacherTableData = this.visibleData
      },

      
      handleAddTeacher(row){
        if(row.isEditing){
          if(row.teacherid.length == 0){console.log(0); return}

          // 如果是查看全体教师，则只添加教师的信息到teacher表，若是在查看班级教师，则添加teacherclass表,要先存在teacher，才能添加teacherclass，所以在查看班级教师时用一个下拉表选择，而不是手动添加
          // if(this.showingType == 2){
            const data = {
            teacherid : row.teacherid,
            teachername : row.teachername,
            teachertype : row.teachertype,
            teacherpassword : row.teacherpassword,                
          }
          // console.log( '111111111111 1' + data)
          this.$http.post(this.GLOBAL.URL + 'Teacher/InsertTeacher', data).then(res => { 
                        const info = res.data
                        console.log(info);
                        if(info.code == 20000) {
                            Message({
                                message: '添加成功',
                                type: 'success',
                                duration: 1 * 1000
                            })        
                            row.teacherid = '在此行添加新教师'; 
                            row.teachername = '';        
                            row.teacherpassword = '';
                          this.handleShowAllTeachers();
                        }else{
                          Message({
                            message : 'Error教师账号可能已经存在',
                            type : 'error',
                            duration: 3 * 1000,
                            })                          
                        }
                    }).catch()
          }
          

        // }
        
        if(!row.isEditing){row.teacherid = ''; }
        row.isEditing = !row.isEditing;
      },
      handleAddTeacherCancel(row){
        row.teacherid = '在此行添加新教师'; 
        row.teachername = '';        
        row.teacherpassword = '';
        row.isEditing = !row.isEditing;
      },

      handleShowAllTeachers(){
        console.log('Root/GetAllTeachers')
        this.$http.post(this.GLOBAL.URL + 'Root/GetAllTeachers').then(res => {
                        const info = res.data
                        
                        console.log(info.data)
                        this.teacherTableData = info.data
                        this.AllTeacherTableData = info.data
                        this.teacherTableData = info.data.map(item => {
                          return { ...item, isEditing: false , isdeletingTeacher : false};
                        });
                        this.reloadTeacherData()
                        console.log('查询所有教师成功')
                    }).catch(()=>{console.log('查询所有教师失败')})  
        // this.showingType = 2;
      },
 
// ***************************************************上传文件
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
      this.$http.post(this.uploadURL, formData)
        .then(response => {
          // 处理上传成功后的响应
          Message({
                    message: '从Excel添加教师成功',
                    type: 'success',
                    duration: 1 * 1000
                })     
          this.fileList = [];
          this.handleShowAllTeachers();
        })
        .catch(error => {
          // 处理上传失败的情况
        });
    },

    uploadCancel(){
      this.fileList = [];
    },




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