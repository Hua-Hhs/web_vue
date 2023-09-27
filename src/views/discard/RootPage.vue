<template>
    <div class="">    
      <div class="background"></div>

      <div class="table">
        <div style="margin-top:5px;" v-if="!this.isDeletingClass">
          <template v-for="item in classes" >
            <el-button v-if="item.isSelected" type="success" :key="item.id"  @click="handleClassButtonClick(item)">{{ item.classname }}</el-button>  
            <el-button v-else type="primary" :key="item.id"  @click="handleClassButtonClick(item)">{{ item.classname }}</el-button>
          </template>
          <!-- <el-button type="primary" v-for="item in classes" :key="item.id"  @click="handleClassButtonClick(item)">{{ item.classname }}</el-button> -->
          <el-input  v-if="this.isEditingClass" placeholder="请输入班级号" v-model="newClassid" style="width: 150px;" ></el-input>
          <el-input  v-if="this.isEditingClass" placeholder="请输入班级名称" v-model="newClassName" style="width: 150px;" ></el-input>
          <el-button type="primary"   @click="handleAddClass"  v-text="!this.isEditingClass ? '添加班级' : '确定'" ></el-button> 
          <el-button type="primary"   v-if="this.isEditingClass"  @click="handleAddClassCancle" >取消添加</el-button> 
          <el-button type="primary"   @click="handleBeginDeleteClass" >删除班级</el-button> 
        </div>

        <div v-if="this.isDeletingClass">
          <el-button type="danger" v-for="item in classes" :key="item.id"  @click="handleDeleteClass(item)">{{ '删除' + item.classname }}</el-button>
          <el-button type="warning"   @click="handleDeleteClassConfirm"  v-text="!this.isEditingClass ? '保存删除' : '确定'" ></el-button> 
          <el-button type="primary"    @click="handleDeleteClassCancle" >取消删除</el-button> 
        </div>
        <!-- 如果要正在显示学生，则显示学生的表格 -->

        <div v-if="showingType == 0"> 
        <el-table :data="tableData" ref='table' style="width: auto">

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
          <el-table-column prop="className" label="班级" width="180">
            <template slot-scope="scope" >
                  <template  >
                    {{ scope.row.className }}
                  </template>
                  
                </template>
          </el-table-column>
          <el-table-column prop="classid" label="班级号" width="180">
            <template slot-scope="scope" >
                  <template  >
                    {{ scope.row.classid }}
                  </template>
                  
                </template>
          </el-table-column>

         
    
          <el-table-column  label=" " width="150">            
            <template slot-scope="scope">      
            <el-button v-if="scope.row.stuid != ''" type="primary" @click="handleEdit(scope.row)" 
            v-text="scope.row.isEditing ? '保存' : '编辑'"  size="mini" ></el-button>
            <el-button v-if="scope.row.isEditing" type="primary" @click="handleCancel(scope.row)" size="mini" >取消</el-button>
          </template>
          </el-table-column>

          <el-table-column  label=" " width="100">   
                 
            <template slot-scope="scope">   
                 <el-button v-if="scope.row.stuid != ''" type="danger" @click="handleDeleteStudent(scope.row)" 
            v-text="scope.row.isDeletingStudent ? '确定删除' : '删除'"  size="mini" ></el-button>    
            <!-- <el-button v-if="scope.row.stuid != ''" type="primary" @click="handleDelete(scope.row)" size="mini" >删除</el-button> -->
          </template>
        </el-table-column>

          <el-table-column  label=" " width="100">            
            <template slot-scope="scope">      
            <el-button v-if="scope.row.isDeletingStudent == true" type="primary" @click="handleDeleteStudentCancle(scope.row)" size="mini" >取消删除</el-button>
          </template>
          </el-table-column>
        </el-table>

        
        <el-table :data="newtableData" ref='table' border :show-header="false" style="width: auto">
          <el-table-column prop="stuid" label="学号" width="180">
            <template slot-scope="scope" >
                  <template v-if="!scope.row.isEditing" >
                    {{ scope.row.stuid }}
                  </template>
                  <template v-else>
                    <el-input v-model="scope.row.stuid" ></el-input>
                  </template>
                </template>
          </el-table-column>
            
          <el-table-column prop="name" label="姓名 " width="180">
            <template slot-scope="scope" >
                  <template v-if="!scope.row.isEditing" >
                    {{ scope.row.name }}
                  </template>
                  <template v-else>
                    <el-input v-model="scope.row.name" ></el-input>
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

          <el-table-column prop="className" label="班级" width="180">  
            <template slot-scope="scope" >
                  <template  >
                    {{ scope.row.className }}
                  </template>
                 
                </template>       
          </el-table-column>
          <el-table-column prop="classid" label="班级号" width="180">
            <template slot-scope="scope" >
                  <template  >
                    {{ scope.row.classid }}
                  </template>
                  
                </template>
          </el-table-column>

          
          
    
          <el-table-column  label=" " width="70">            
            <template slot-scope="scope">      
            <el-button  type="primary" @click="handleAdd(scope.row)" 
            v-text="scope.row.isEditing ? '确定' : '添加'"  size="mini" ></el-button>
            </template>            
          </el-table-column>
          <el-table-column  label=" " width="70">            
            <template slot-scope="scope">      
            <el-button v-if="scope.row.isEditing == true" type="primary" @click="handleAddCancel(scope.row)" size="mini" >取消</el-button>
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
            
            <el-button size="small" type="warning" style="height: 40px;width: 150px;">从Excel上传本班学生</el-button>             
            </el-upload>
           <el-button v-if="this.fileList.length > 0" size="small" type="warning" style="height: 40px;width: 100px; margin-left: 10px;" @click="upload">确认上传</el-button>
           <el-button v-if="this.fileList.length > 0" size="small" type="primary" style="height: 40px;width: 100px; margin-left: 10px;" @click="uploadCancel">取消上传</el-button>
            </div>
            <div style="display: flex; margin-top: 3px; margin-left: 10px; ">
            <el-button size="small" type="primary" style="height: 40px;width: 150px;" @click="downloadExcel">下载Excel文件模板</el-button>            
          </div>
        </div>
        <div style="margin-top: 3px;">
          <el-button type="primary"   @click="handleShowAllTeachers" >查看全体教师</el-button> 
          <el-button type="primary"   @click="handleShowCourse" >查看课程</el-button>
          <el-button type="primary"   @click="handleShowClasses" >查看班级</el-button>
        </div>
       
        
        <div style="display: flex; margin-top: 3px; ">
      <el-button type="primary" style="width:100;margin-top:5px;" @click.native.prevent="handleupdatePassword">修改密码</el-button>
      <el-button type="primary" style="width:100;margin-top:5px;" @click.native.prevent="handleLogout">退出</el-button>
      </div>
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
        
        classes : [], //存储班级信息
        tableData: [], // 表格数据
        currentPage: 1, // 当前页码
        pageSize: 10, // 分页大小
        total: 100, // 总数据条数

        isEditing: false,//是否正在编辑学生

     
        editingRow: {}, // 存储编辑数据

        CurrentClassButton : '1',
        deleteClasses : [], //要删除的班级数组

        originRow : [],
        lastItem:{},//上一个被选中的班级按钮
        newClassName : '', //用来暂时存储新添加班级名称
        newClassid: '', //用来暂时存储新添加班级名称
        isDeletingClass : false,


        showingType : 0,//当前显示表格的的数据，0是班级学生，1是班级教师，2是全体教师
        uploadURL : this.GLOBAL.URL + 'Student/upload',
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
        { 学号: 'XXXXX', 姓名: 'XXXXX',密码: 'XXXXX', }
      ];
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(data);
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      const excelData = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = '学生.xlsx'; // 设置下载文件的文件名
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
        this.$http.post(this.GLOBAL.URL + 'Classes/GetAllClasses').then(res => {
          console.log('Classes/GetAllClasses');
          
          console.log(res.data);
          // this.classes = res.data.data;         
          this.classes = res.data.data.map(item => {
                            return { ...item, isSelected: false};
                          });
          this.classes[0].isSelected = true;
          this.CurrentClassButton = this.classes[0].classid;
          this.newtableData[0].classid = this.classes[0].classid
          this.newtableData[0].className = this.classes[0].classname
          
          console.log( this.CurrentClassButton);
          console.log('getClass OK!')
          this.handleShowStudents();
         }).catch(error => {
          Message({
                message: 'error',
                type: 'error',
                duration: 1 * 1000
            })
            this.fileList = [];
        })  
          
      },
      

      handleSizeChange(newSize) {
        this.pageSize = newSize;
        if(this.showingType == 0){
          console.log('显示学生');
          this.handleShowStudents();
        }
       
        
      },
      handleCurrentChange(Page) {
      this.currentPage = Page
      if(this.showingType == 0){
          this.handleShowStudents();
      }
      
      },
      //************************************************************************学生数据********** */
      // 获取当前班级学生数据
      handleShowStudents() {    
        const data = {classid : this.CurrentClassButton}
        
        console.log('Student/SelectStudentByClassID')
        // console.log(data)
        this.$http.post(this.GLOBAL.URL + 'Student/SelectStudentByClassID',data).then(res => {
                        const info = res.data
                        // console.log(info.data)
                        if(info.code != 20000) {
                          this.tableData = []
                            // Message({
                            //     message: info.message || 'Error',
                            //     type: 'error',
                            //     duration: 1 * 1000
                            // })
                        }else{
                          this.tableData = info.data
                          this.tableData = info.data.map(item => {
                            return { ...item, isEditing: false , isDeletingStudent : false};
                          });
                          this.reloadData()                        
                          
                        }

                    }).catch(
        
        )  
        this.showingType = 0;       
      },
      reloadData(){
      this.total = this.tableData.length

      const startIndex = (this.currentPage - 1) * this.pageSize
      const endIndex = startIndex + this.pageSize

      this.visibleData = this.tableData.slice(startIndex, endIndex)

      const count = this.pageSize-this.visibleData.length
      console.log(count);
      if(count != 0){
        for(let i=0;i<count;i++){          
          this.visibleData.push({stuid: ''})
        }
     
      } 
      this.tableData = this.visibleData
      },

      // 学生数据行修改
      handleEdit(row) {
        //从不能编辑到能编辑
        
        if(this.editingRow != row){
          this.editingRow.isEditing = false;
          this.editingRow = row;
        }

        if(row.isEditing == false){         
          this.originRow.name = row.name;
          this.originRow.className = row.className;
          this.originRow.password = row.password;            
        }
        else{
          if(row.stuid.length == 0 || row.name.length == 0 || row.password.length < 6){
            Message({
                    message : '输入格式不正确，学号不能为空，姓名不能为空，密码不少于6位',
                    type : 'error',
                    duration: 3 * 1000,
                    })
            return
          }
          const data = {
            stuid : row.stuid,
            name : row.name,
            classid : row.classid,
            password : row.password,
          }
          console.log(data)
          // return
          this.$http.post(this.GLOBAL.URL + 'Student/UpdateStudent', data).then(res => { 
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
                            this.handleCancel();
                        }
                    }).catch(error => {
          Message({
                message: '错误',
                type: 'error',
                duration: 1 * 1000
            })
            this.fileList = [];
        })
        }
        row.isEditing = ! row.isEditing;

        
      },
      // 取消修改某一行学生数据
      handleCancel(row){
        row.name = this.originRow.name;
        row.className = this.originRow.className;
        row.password = this.originRow.password;
        row.isEditing = ! row.isEditing;
      },
      // 删除一行学生数据
      handleDeleteStudent(row){
        if(row.isDeletingStudent){
        const data = {
            stuid : row.stuid,          
          }
        this.$http.post(this.GLOBAL.URL + 'Student/DeleteStudent', data).then(res => { 
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
                            this.handleShowStudents();
                            
                        }
                    }).catch(error => {
          Message({
                message: '错误',
                type: 'error',
                duration: 1 * 1000
            })
            this.fileList = [];
        })       
        } 
        row.isDeletingStudent = ! this.isDeletingClass;
      },
      handleDeleteStudentCancle(row){
        row.isDeletingStudent = !row.isDeletingStudent;
      },
      // 添加学生
      handleAdd(row){        
        //确定添加学生数据
        if(row.isEditing){
          if(row.stuid.length == 0 || row.name.length == 0 || row.password.length < 6){
            Message({
                    message : '输入格式不正确，学号不能为空，姓名不能为空，密码不少于6位',
                    type : 'error',
                    duration: 3 * 1000,
                    })
            return
          }
          const data = {
            stuid : row.stuid,
            name : row.name,
            classid : row.classid,
            password : row.password,     
          }
          this.$http.post(this.GLOBAL.URL + 'Student/InsertStudent', data).then(res => { 
                        const info = res.data
                        console.log(info);
                        if(info.code == 20000) {
                            Message({
                                message: '添加成功',
                                type: 'success',
                                duration: 1 * 1000
                            })        
                            
                            this.handleShowStudents();
                          row.stuid = '在此行添加新学生'; 
                          row.name = ' ';        
                          row.password = '';
                        }else{
                          Message({
                            message : 'Error学号可能已经存在',
                            type : 'error',
                            duration: 1 * 1000,
                            })
                          
                        }
                    }).catch(error => {
          Message({
                message: '错误',
                type: 'error',
                duration: 1 * 1000
            })
            this.fileList = [];
        })

        }
        
        if(!row.isEditing){row.stuid = ''; }
        row.isEditing = !row.isEditing;
      },
      //取消添加学生
      handleAddCancel(row){
        row.stuid = '在此行添加新学生'; 
        row.name = '';        
        row.password = '';
        row.isEditing = ! row.isEditing;
      },
      
     

// 8***************************************************班级操作
      getClass(){
        this.$http.post(this.GLOBAL.URL + 'Classes/GetAllClasses').then(res => {
          console.log('Classes/GetAllClasses');
          
          console.log(res.data);
          // this.classes = res.data.data;         
          this.classes = res.data.data.map(item => {
                            return { ...item, isSelected: false};
                          });
          this.classes[0].isSelected = true;
          this.CurrentClassButton = this.classes[0].classid;
          this.newtableData[0].classid = this.classes[0].classid
          this.newtableData[0].className = this.classes[0].classname
          
          console.log( this.CurrentClassButton);
          console.log('getClass OK!')
          // this.handleShowStudents();
         }).catch(error => {
          Message({
                message: 'error',
                type: 'error',
                duration: 1 * 1000
            })
            this.fileList = [];
        })  
      },
      // 添加班级
      handleAddClass(){
       
        if(this.isEditingClass){
          if(this.newClassid.length == 0 || this.newClassName.length == 0){
            Message({
                message: info.message || 'Error',
                type: 'error',
                duration: 1 * 1000
            })
            return
          }
        const data = {
          classid : this.newClassid,
          classname : this.newClassName
        };      
        
        this.$http.post(this.GLOBAL.URL + 'Classes/InsertClasses', data).then(res => { 
                        const info = res.data
                        // console.log(info);
                        if(info.code != 20000) {
                            Message({
                                message: info.message || 'Error',
                                type: 'error',
                                duration: 1 * 1000
                            })
                        }else{
                          Message({
                                message: '添加成功', 
                                type: 'success',
                                duration: 1 * 1000
                            })
                           this.classes.push(info.data)
                          //  console.log(info.data)
                        }
                    }).catch(error => {
          Message({
                message: '错误',
                type: 'error',
                duration: 1 * 1000
            })
            this.fileList = [];
        })
        }
        

        this.handleAddClassCancle();
      },
      handleAddClassCancle(){
        this.newClassName = '',
        this.isEditingClass = !this.isEditingClass;
      },
      handleBeginDeleteClass(){this.isDeletingClass = true},
      handleDeleteClass(row){
        this.deleteClasses.push({classid : row.classid, classname : row.classname});
        const index = this.classes.findIndex(item => item.classid === row.classid);
                            if (index !== -1) {
                              this.classes.splice(index, 1);
                            }  
        console.log(this.deleteClasses)
      },
      handleDeleteClassCancle(){
        this.deleteClasses = [];
        this.getClass();
        this.isDeletingClass = false},
      handleDeleteClassConfirm(){
        const data = this.deleteClasses;
        this.$http.post(this.GLOBAL.URL + 'Classes/DeleteClasses',data).then(res => {
          const info = res.data
                        if(info.code != 20000) {
                            Message({
                                message: 'Error',
                                type: 'error',
                                duration: 1 * 1000
                            })      
                  
                        }else{
                          Message({
                            message : '删除班级成功',
                            type : 'success',
                            duration: 1 * 1000,
                            })
                            this.getClass();
                        }
         }).catch(error => {
          Message({
                message: '错误',
                type: 'error',
                duration: 1 * 1000
            })
            this.fileList = [];
        })  
         this.deleteClasses = [];
        this.isDeletingClass = false
      },
      // 点击切换班级按钮
      handleClassButtonClick(item){
        // if(this.lastItem == null)
        this.classes[0].isSelected = false;
        if(this.lastItem != item){
          
          this.lastItem.isSelected = false;
          this.lastItem = item;
        }
        item.isSelected = true;
        this.CurrentClassButton =  item.classid;
        this.newtableData[0].classid = item.classid;
        this.newtableData[0].className = item.classname;
        this.handleCurrentChange(1);
        this.handleShowStudents();
        
       
        
      },
      handleShowCourse(){
        this.$router.replace('/coursePage');
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
        // console.log(formData)
      });

      // 发送文件到后端
      // 使用axios或其他HTTP库发送POST请求
      // 注意要设置合适的请求头（Content-Type: multipart/form-data）
      const data = {classid : this.CurrentClassButton}
      // console.log(data)
      this.$http.post(this.GLOBAL.URL + 'Student/setCurrentClassid', data) .then(response => {
        const classid = response.data
        // console.log(classid)
        if(classid.code == 20000)
        this.$http.post(this.GLOBAL.URL + 'Student/upload', formData)
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
          this.handleShowStudents();
        })
        .catch(error => {
          Message({
                message: '上传失败',
                type: 'error',
                duration: 1 * 1000
            })
            this.fileList = [];
        });
      })

      
    },
    uploadCancel(){
      this.fileList = [];
    },

    handleupdatePassword(){
      
      this.$router.replace('/UpdatePassword');
    },

    handleShowAllTeachers(){
      this.$router.replace('/RootTeacherPage');
    },
    handleShowClasses(){this.$router.replace('/RootClassesPage');},
      // 退出，返回教师总界面
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
                  // this.$globalVariable.loading = false;
        this.$globalVariable.loading = false;
        this.$router.replace('/');
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