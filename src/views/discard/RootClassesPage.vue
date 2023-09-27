<template>
  <div class="">    
    <div class="background"></div>

    <div class="table">
      <!-- 如果要正在显示学生，则显示学生的表格 -->
      <div> 
      <el-table :data="tableData" ref='table' style="width: auto">

        <el-table-column prop="classid" label="班级号" width="180"> </el-table-column>
          
        <el-table-column prop="classname" label="班级名称 " width="180" >
          <template slot-scope="scope" >
                <template v-if="!scope.row.isEditing" >
                  {{ scope.row.classname }}
                </template>
                <template v-else>
                  <el-input v-model="scope.row.classname" ></el-input>
                </template>
              </template>
        </el-table-column>

        
        <el-table-column  label=" " width="150">            
            <template slot-scope="scope">      
            <el-button v-if="scope.row.classid != ''" type="primary" @click="handleEdit(scope.row)" 
            v-text="scope.row.isEditing ? '保存' : '编辑'"  size="mini" ></el-button>
            <el-button v-if="scope.row.isEditing" type="primary" @click="handleCancel(scope.row)" size="mini" >取消</el-button>
          </template>
          </el-table-column>

     
        <el-table-column  label=" " width="100">            
          <template slot-scope="scope">      
            <el-button v-if="scope.row.classid != ''" type="danger" @click="handleDelete(scope.row)" 
            v-text="scope.row.isDeleting ? '确定删除' : '删除'"  size="mini" ></el-button>
          <!-- <el-button v-if="scope.row.stuid != 'null'" type="primary" @click="handleDelete(scope.row)" size="mini" >删除</el-button> -->

        </template>
        </el-table-column>
        <el-table-column  label=" " width="100">            
            <template slot-scope="scope">      
             
            <el-button v-if="scope.row.isDeleting == true" type="primary" @click="handleDeleteCancle(scope.row)" size="mini" v-text="true ? '取消删除' : '错误'"></el-button>
          </template>
          </el-table-column>
      </el-table>

      
      <el-table :data="newtableData" ref='table' border :show-header="false" style="width: auto">
        <el-table-column prop="classid" label="学号" width="180">
          <template slot-scope="scope" >
                <template v-if="!scope.row.isEditing" >
                  {{ scope.row.classid }}
                </template>
                <template v-else>
                  <el-input v-model="scope.row.classid" ></el-input>
                </template>
              </template>
        </el-table-column>       
        <el-table-column prop="classname" label="学号" width="180">
          <template slot-scope="scope" >
                <template v-if="!scope.row.isEditing" >
                  {{ scope.row.classname }}
                </template>
                <template v-else>
                  <el-input v-model="scope.row.classname" ></el-input>
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
    <div style="display: flex;">

    
    <div style="display: flex; margin-top: 3px; ">
              <el-upload
            class="upload-demo"
            action="uploadURL"            
            :before-upload="beforeUpload"
            :file-list="fileList"          
            >
            
            <el-button size="small" type="warning" style="height: 40px;width: 150px;">从Excel上传新班级</el-button> 
           
            </el-upload>
           <el-button v-if="this.fileList.length > 0" size="small" type="warning" style="height: 40px;width: 100px; margin-left: 10px;" @click="upload">确认上传</el-button>
           <el-button v-if="this.fileList.length > 0" size="small" type="primary" style="height: 40px;width: 100px; margin-left: 10px;" @click="uploadCancel">取消上传</el-button>
            </div>
            <div style="display: flex; margin-top: 3px; margin-left: 10px; ">
            <el-button size="small" type="primary" style="height: 40px;width: 150px;" @click="downloadExcel">下载Excel文件模板</el-button>            
          </div>
          </div>
            <el-button type="primary" style="width:100;margin-top:5px;" @click.native.prevent="handleLogout">返回</el-button>
    </div>
    <template>
</template>

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
             
      newtableData : [{classid : '在此行添加新班级',name : ''} ],
      
      classes : [], //存储班级信息
      tableData: [], // 表格数据
      currentPage: 1, // 当前页码
      pageSize: 10, // 分页大小
      total: 100, // 总数据条数
      editingRow : {},
      originRow : {},
      isEditing: false,//是否正在编辑学生

      uploadURL : this.GLOBAL.URL + 'Classes/upload',
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
        { 班级号: 'XXXXX', 班级名称: 'XXXXX' }
      ];
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(data);
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      const excelData = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = '班级.xlsx'; // 设置下载文件的文件名
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },


    // ****************************************************
      //页面加载数据 
    beginPlay() {        
      

      this.handleShowClasses();
    },
    

    handleSizeChange(newSize) {
      this.pageSize = newSize;
    
      
    },
    handleCurrentChange(Page) {
    this.currentPage = Page
   
    },
    //************************************************************************学生数据********** */
    handleEdit(row) {
        //从不能编辑到能编辑
        
        if(this.editingRow != row){
          this.editingRow.isEditing = false;
          this.editingRow = row;
        }

        if(row.isEditing == false){         
          this.originRow.classid = row.classid;
          this.originRow.classname = row.classname;
                     
        }
        else{
          if(row.classid.length == 0 || row.classname.length == 0 ){
            Message({
                    message : '输入格式不正确，班级号不能为空，班级名称不能为空',
                    type : 'error',
                    duration: 3 * 1000,
                    })
            return
          }
          const data = {
            classid : row.classid,
            classname : row.classname,           
          }
          // console.log(data)
          // return
          this.$http.post(this.GLOBAL.URL + 'Classes/UpdateClasses', data).then(res => { 
                        const info = res.data
                        // console.log(info);
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
                            return
                        }
                    }).catch()
        }
        row.isEditing = ! row.isEditing;

        
      },
      // 取消修改某一行学生数据
      handleCancel(row){
        row.classid = this.originRow.classid;
        row.classname = this.originRow.classname;
        row.isEditing = ! row.isEditing;
      },
    // 获取当前班级学生数据
    handleShowClasses() {    
      const data = {courseid : this.$globalVariable.courseID}
      this.$http.post(this.GLOBAL.URL + 'Classes/GetAllClasses').then(res => {
                      const info = res.data
                      console.log(info.data)
                      this.tableData = info.data
                      this.tableData = info.data.map(item => {
                        return { ...item, isEditing: false ,isDeleting : false};
                      });
                      this.reloadData()
                      
                  }).catch(()=>{console.log('通过课程id查询学生失败')})  
         
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
        this.visibleData.push({classid: ''})
      }
   
    } 
    this.tableData = this.visibleData
    },

  
    // 删除一行学生数据
    handleDelete(row){
      if(row.isDeleting){
        const data = [{
        classid : row.classid,
        classname : row.classname,          
        }]
      this.$http.post(this.GLOBAL.URL + 'Classes/DeleteClasses', data).then(res => { 
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
                          this.handleShowClasses();
                       
                      }
                  }).catch()     
      }
      
      
      row.isDeleting = ! row.isDeleting;   
    },
    handleDeleteCancle(row){
      row.isDeleting = ! row.isDeleting;   
    },
    
    // 添加学生
    handleAdd(row){        
      //确定添加学生数据
      if(row.isEditing){
        if(row.classid.length == 0 || row.classname.length == 0){
          Message({
                    message : '班级号和班级名称不能为空',
                    type : 'error',
                    duration: 1 * 1000,
                    })
          return}
        const data = {
          classid : row.classid,
          classname : row.classname,
          
        }
        this.$http.post(this.GLOBAL.URL + 'Classes/InsertClasses', data).then(res => { 
                      const info = res.data
                      console.log(info);
                      if(info.code == 20000) {
                          Message({
                              message: '添加成功',
                              type: 'success',
                              duration: 1 * 1000
                          })        
                          
                          this.handleShowClasses();
                      }else{
                        Message({
                          message : 'Error添加失败，请检查班级号',
                          type : 'error',
                          duration: 1 * 1000,
                          })
                        
                      }
                  }).catch()

      }
      // 确定添加后，将默认显示改回'在此行添加新学生'，
      row.classid = '在此行添加新班级'; 
      // 若是要添加，则把输入框的文字置空
      if(!row.isEditing){row.classid = ''; }

      row.isEditing = !row.isEditing;
    },
    //取消添加学生
    handleAddCancel(row){
      row.classid = '在此行添加新班级'; 
      row.isEditing = ! row.isEditing;
    },
   
    // 退出，返回课程总界面
    handleLogout(){
      this.$router.replace('/RootPage');
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

      this.$http.post(this.GLOBAL.URL + 'Classes/upload', formData)
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
        Message({
              message: '上传失败',
              type: 'error',
              duration: 1 * 1000
          })
          this.fileList = [];
      });
    

      
    },
    uploadCancel(){
      this.fileList = [];
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