<template>
    <div class="">    
      <div class="background"></div>
      
      <div class="table">
      <el-table :data="questionTableData" ref='table' style="width: 100%">
        <!-- <el-table-column prop="qid" label="题号"></el-table-column>
        <el-table-column prop="qtitle" label="题目名称 "></el-table-column>
        <el-table-column prop="content" label="题目内容"></el-table-column>
        <el-table-column prop="questiontype" label="题目类型"></el-table-column>
        <el-table-column prop="score" label="分值"></el-table-column>
        <el-table-column prop="trueanswer" label="正确答案"></el-table-column>
        <el-table-column prop="answer1" label="答案1/A"></el-table-column>
        <el-table-column prop="answer2" label="答案2/B"></el-table-column>
        <el-table-column prop="answer3" label="答案3/C"></el-table-column>
        <el-table-column prop="answer4" label="答案4/D"></el-table-column> -->

        <el-table-column prop="qid" label="题号"></el-table-column>            
          <el-table-column prop="qtitle" label="题目名称 ">
            <template slot-scope="scope" >
                  <template v-if="!scope.row.isEditing" >
                    {{ scope.row.qtitle }}
                  </template>
                  <template v-else>
                    <el-input v-model="scope.row.qtitle" ></el-input>
                  </template>
                </template>
          </el-table-column>         

          <el-table-column prop="content" label="题目内容 ">
            <template slot-scope="scope" >
                  <template v-if="!scope.row.isEditing" >
                    {{ scope.row.content }}
                  </template>
                  <template v-else>
                    <el-input v-model="scope.row.content" ></el-input>
                  </template>
                </template>            
          </el-table-column>
          <el-table-column prop="questiontype" label="题目类型">
            <template slot-scope="scope" >
                  <template v-if="!scope.row.isEditing" >
                    {{ scope.row.questiontype }}
                  </template>
                  <template v-else>
                    <el-input v-model="scope.row.questiontype" ></el-input>
                  </template>
                </template>            
          </el-table-column>
          <el-table-column prop="score" label="分值">
            <template slot-scope="scope" >
                  <template v-if="!scope.row.isEditing" >
                    {{ scope.row.score }}
                  </template>
                  <template v-else>
                    <el-input v-model="scope.row.score" ></el-input>
                  </template>
                </template>            
          </el-table-column>
          <el-table-column prop="trueanswer" label="正确答案 ">
            <template slot-scope="scope" >
                  <template v-if="!scope.row.isEditing" >
                    {{ scope.row.trueanswer }}
                  </template>
                  <template v-else>
                    <el-input v-model="scope.row.trueanswer" ></el-input>
                  </template>
                </template>            
          </el-table-column>

         
          <el-table-column prop="answer1" label="答案1/A">
            <template slot-scope="scope" >
                  <template v-if="!scope.row.isEditing" >
                    {{ scope.row.answer1 }}
                  </template>
                  <template v-else>
                    <el-input v-model="scope.row.answer1" ></el-input>
                  </template>
                </template>            
          </el-table-column>
          <el-table-column prop="answer2" label="答案2/B" >
            <template slot-scope="scope" >
                  <template v-if="!scope.row.isEditing" >
                    {{ scope.row.answer2 }}
                  </template>
                  <template v-else>
                    <el-input v-model="scope.row.answer2" ></el-input>
                  </template>
                </template>            
          </el-table-column>
          <el-table-column prop="answer3" label="答案3/C ">
            <template slot-scope="scope" >
                  <template v-if="!scope.row.isEditing" >
                    {{ scope.row.answer3 }}
                  </template>
                  <template v-else>
                    <el-input v-model="scope.row.answer3" ></el-input>
                  </template>
                </template>            
          </el-table-column>
          <el-table-column prop="answer4" label="答案4/D">
            <template slot-scope="scope" >
                  <template v-if="!scope.row.isEditing" >
                    {{ scope.row.answer4 }}
                  </template>
                  <template v-else>
                    <el-input v-model="scope.row.answer4" ></el-input>
                  </template>
                </template>            
          </el-table-column>
        <el-table-column  label=" " width="160px">            
            <template slot-scope="scope" >      
            <el-button v-if="scope.row.qid" type="primary" @click="handleEditQuestion(scope.row)" 
            v-text="scope.row.isEditing ? '保存' : '编辑'"  size="mini" ></el-button>
            <el-button v-if="scope.row.isEditing" type="primary" @click="handleQuestionCancel(scope.row)" size="mini" >取消</el-button>
          </template>
          </el-table-column>

         
          <el-table-column  label=" " width="100">            
          <template slot-scope="scope">      
            <el-button v-if="scope.row.qid" type="danger" @click="handleDeleteQuestion(scope.row)" 
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

   

        
        <el-table :data="newQuestionTableData" ref='table' border :show-header="false" style="width: auto">
          <el-table-column prop="qid" label="题号"></el-table-column>            
          <el-table-column prop="qtitle" label="题目名称 ">
            <template slot-scope="scope" >
                  <template v-if="!scope.row.isEditing" >
                    {{ scope.row.qtitle }}
                  </template>
                  <template v-else>
                    <el-input v-model="scope.row.qtitle" ></el-input>
                  </template>
                </template>
          </el-table-column>         

          <el-table-column prop="content" label="题目内容 ">
            <template slot-scope="scope" >
                  <template v-if="!scope.row.isEditing" >
                    {{ scope.row.content }}
                  </template>
                  <template v-else>
                    <el-input v-model="scope.row.content" ></el-input>
                  </template>
                </template>            
          </el-table-column>
          <el-table-column prop="questiontype" label="题目类型">
            <template slot-scope="scope" >
                  <template v-if="!scope.row.isEditing" >
                    {{ scope.row.questiontype }}
                  </template>
                  <template v-else>
                    <el-input v-model="scope.row.questiontype" ></el-input>
                  </template>
                </template>            
          </el-table-column>
          <el-table-column prop="score" label="分值">
            <template slot-scope="scope" >
                  <template v-if="!scope.row.isEditing" >
                    {{ scope.row.score }}
                  </template>
                  <template v-else>
                    <el-input v-model="scope.row.score" ></el-input>
                  </template>
                </template>            
          </el-table-column>
          <el-table-column prop="trueanswer" label="正确答案 ">
            <template slot-scope="scope" >
                  <template v-if="!scope.row.isEditing" >
                    {{ scope.row.trueanswer }}
                  </template>
                  <template v-else>
                    <el-input v-model="scope.row.trueanswer" ></el-input>
                  </template>
                </template>            
          </el-table-column>

         
          <el-table-column prop="answer1" label="答案1/A">
            <template slot-scope="scope" >
                  <template v-if="!scope.row.isEditing" >
                    {{ scope.row.answer1 }}
                  </template>
                  <template v-else>
                    <el-input v-model="scope.row.answer1" ></el-input>
                  </template>
                </template>            
          </el-table-column>
          <el-table-column prop="answer2" label="答案2/B" >
            <template slot-scope="scope" >
                  <template v-if="!scope.row.isEditing" >
                    {{ scope.row.answer2 }}
                  </template>
                  <template v-else>
                    <el-input v-model="scope.row.answer2" ></el-input>
                  </template>
                </template>            
          </el-table-column>
          <el-table-column prop="answer3" label="答案3/C ">
            <template slot-scope="scope" >
                  <template v-if="!scope.row.isEditing" >
                    {{ scope.row.answer3 }}
                  </template>
                  <template v-else>
                    <el-input v-model="scope.row.answer3" ></el-input>
                  </template>
                </template>            
          </el-table-column>
          <el-table-column prop="answer4" label="答案4/D">
            <template slot-scope="scope" >
                  <template v-if="!scope.row.isEditing" >
                    {{ scope.row.answer4 }}
                  </template>
                  <template v-else>
                    <el-input v-model="scope.row.answer4" ></el-input>
                  </template>
                </template>            
          </el-table-column>
          
         

          <el-table-column  label=" " width="160px">            
            <template slot-scope="scope" >      
            <el-button  type="primary" @click="handleAddQuestion(scope.row)" 
            v-text="scope.row.isEditing ? '确定' : '添加'"  size="mini" ></el-button>
            </template>            
          </el-table-column>
          <el-table-column  label=" ">            
            <template slot-scope="scope">      
            <el-button v-if="scope.row.isEditing == true" type="primary" @click="handleAddQuestionCancel(scope.row)" size="mini" >取消</el-button>
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
      <div>
          <el-button type="primary" v-for="item in course" :key="item.courseid"  @click="handleCourseButtonClick(item)">{{ item.coursename }}</el-button>        
        </div>
        <div style="display: flex; margin-top: 3px; ">
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

      <el-button type="primary" style="width:100;margin-top:5px;"
            @click.native.prevent="handleLogout">退出</el-button>
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
        course : [],//当前教师的课程
        currentCourseButton : 0,//当前课程按钮的值
        newQuestionTableData : [{qid:null,qtitle: '',isEditing: false}],
        questionTableData: [], // 表格数据
        currentPage: 1, // 当前页码
        pageSize: 10, // 分页大小
        total: 100, // 总数据条数
        editingRow:{},
        originRow : {},
        uploadURL : this.GLOBAL.URL + 'Classes/upload',
      fileList: [], // 上传的文件列表
      };
    },
    mounted() {
      if(this.$store.state.token != '')
      this.handleGetCourse();
      
      Message({
              message : '没有数据微信小程序数据资料所以未完善',
              type : 'success',
              duration: 5 * 1000,
              
            });  
    },
    methods: {
      downloadExcel() {
      const data = [
        { 题号: 'XXXXX', 题目名称: 'XXXXX', 题目内容: 'XXXXX', 题目类型: 'XXXXX', 分值: 'XXXXX', 正确答案: 'XXXXX', 答案1: 'XXXXX', 答案2: 'XXXXX',答案3: 'XXXXX', 答案4: 'XXXXX', }
      ];
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(data);
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      const excelData = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = '题目.xlsx'; // 设置下载文件的文件名
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },

      handleGetCourse(){
        const data = {teacherid : this.$globalVariable.teacherID} 
        this.$http.post(this.GLOBAL.URL + 'Course/GetCourseByTeacherID',data).then(res => {
          console.log()
          this.course = res.data.data;      
          this.currentCourseButton = this.course[0].courseid;          

          this.getMyQuestion();
         }).catch(()=>{console.log('查询课程失败')})  
      },

      getMyQuestion() {
      const data = {courseid : this.currentCourseButton}

      this.$http.post(this.GLOBAL.URL + 'Question/GetQuestionByCourseID',data).then(res => {
                      const info = res.data
                      console.log(info.data)
                      this.questionTableData = info.data
                      
                      this.questionTableData = info.data.map(item => {
                        return { ...item, isEditing: false ,isDeleting : false};
                      });
                      this.reloadData()
                      
                  }).catch(()=>{console.log('通过课程id查询题目失败')})  
      },

      reloadData(){
      this.total = this.questionTableData.length

      const startIndex = (this.currentPage - 1) * this.pageSize
      const endIndex = startIndex + this.pageSize

      this.visibleData = this.questionTableData.slice(startIndex, endIndex)

      const count = this.pageSize-this.visibleData.length
      if(count != 0){
        for(let i=0;i<count;i++){
          this.visibleData.push({ 
                            id: 'null',                           
                          })
        }
     
      }
        
      this.questionTableData = this.visibleData
      },
      handleSizeChange(newSize) {
        this.pageSize = newSize;
        this.getMyQuestion();
      },
      handleCurrentChange(Page) {
      this.currentPage = Page
      this.getMyQuestion()
      },
      handleCourseButtonClick(item){
        this.currentCourseButton =  item.courseid;

        this.questionTableData = this.questionTableData.map(item => {
          return { ...item, courseName: this.currentCourseButton };
        });
     
        this.getMyQuestion();
        this.handleCurrentChange(1);
      },
      handleEditQuestion(row){
        if(this.editingRow != row){
          this.editingRow.isEditing = false;
          this.editingRow = row;
        }
        if(row.isEditing){
          const data = {
          qid : row.qid,
          courseid : this.currentCourseButton,
          qtitle : row.qtitle,
          content : row.content,
          questiontype : row.questiontype,
          score : row.score,
          trueanswer : row.trueanswer,
          answer1 : row.answer1,
          answer2 : row.answer2,
          answer3 : row.answer3,
          answer4 : row.answer4,
        }
        console.log(data)
        
        this.$http.post(this.GLOBAL.URL + 'Question/UpdateCQuestion',data).then(res => {
                      const info = res.data
                      // console.log(info.data)                     
                      if(info.code != 20000) {
                          Message({
                              message: '修改错误',
                              type: 'error',
                              duration: 1 * 1000
                          })      
                         
                      }else{
                        Message({
                          message : '修改成功',
                          type : 'success',
                          duration: 1 * 1000,
                          })
                       this.getMyQuestion();
                      }
                      // this.getMyQuestion();
                      
                  }).catch(()=>{console.log('修改题目失败')})  
      
        }else{
          this.originRow.qid = row.qid;
          this.originRow.courseid = row.courseid;
          this.originRow.qtitle = row.qtitle;
          this.originRow.content = row.content;          
          this.originRow.score = row.score;
          this.originRow.questiontype = row.questiontype;
          this.originRow.trueanswer = row.trueanswer;
          this.originRow.answer1 = row.answer1;
          this.originRow.answer2 = row.answer2;
          this.originRow.answer3 = row.answer3;
          this.originRow.answer4 = row.answer4;
          
        }
        row.isEditing = !row.isEditing;
      },
      handleQuestionCancel(row){    
        row.qid = this.originRow.qid;
        row.courseid = this.originRow.courseid;
        row.qtitle =  this.originRow.qtitle;
        row.content = this.originRow.content;          
        row.score = this.originRow.score;
        row.questiontype = this.originRow.questiontype;
        row.trueanswer = this.originRow.trueanswer;
        row.answer1 = this.originRow.answer1;
        row.answer2 = this.originRow.answer2;
        row.answer3 = this.originRow.answer3;
        row.answer4 = this.originRow.answer4;    
        row.isEditing = !row.isEditing;
      },
      handleDeleteQuestion(row){
        if(this.editingRow != row){
          this.editingRow.isEditing = false;
          this.editingRow = row;
        }
        if(row.isDeleting){
        const data = {
          qid : row.qid,
          courseid : this.currentCourseButton,          
        }
        console.log(data)
        
        this.$http.post(this.GLOBAL.URL + 'Question/DeleteQuestion',data).then(res => {
                      const info = res.data
                      console.log(info.data)                     
                      if(info.code != 20000) {
                          Message({
                              message: '删除错误',
                              type: 'error',
                              duration: 1 * 1000
                          })      
                         
                      }else{
                        Message({
                          message : '删除成功',
                          type : 'success',
                          duration: 1 * 1000,
                          })
                       this.getMyQuestion();
                      }
                      
                      
                  }).catch(()=>{console.log('删除题目失败')})  
      
                }
                row.isDeleting = ! row.isDeleting; 
      },
      handleDeleteCancle(row){
      row.isDeleting = ! row.isDeleting;   
    },
      handleAddQuestion(row){
        if(row.isEditing){
          const data = {
          qid : null,
          courseid : this.currentCourseButton,
          qtitle : row.qtitle,
          content : row.content,
          questiontype : row.questiontype,
          score : row.score,
          trueanswer : row.trueanswer,
          answer1 : row.answer1,
          answer2 : row.answer2,
          answer3 : row.answer3,
          answer4 : row.answer4,
        }
        console.log(data)
        
        this.$http.post(this.GLOBAL.URL + 'Question/InsertQuestionByCourseID',data).then(res => {
                      const info = res.data
                      console.log(info.data)                     
                      if(info.code != 20000) {
                          Message({
                              message: '错误',
                              type: 'error',
                              duration: 1 * 1000
                          })      
                         
                      }else{
                        Message({
                          message : '添加成功',
                          type : 'success',
                          duration: 1 * 1000,
                          })
                       this.getMyQuestion();
                      }
                     
                      
                  }).catch(()=>{console.log('添加题目失败')})  
                  row.qid = this.originRow.qid;
        row.courseid = this.originRow.courseid;
        row.qtitle =  '';
        row.content = '';          
        row.score = '';
        row.questiontype = '';
        row.trueanswer = '';
        row.answer1 = '';
        row.answer2 = '';
        row.answer3 = '';
        row.answer4 = '';    
        }
        row.isEditing = !row.isEditing;    
      },
      handleAddQuestionCancel(row){
        row.qid = this.originRow.qid;
        row.courseid = this.originRow.courseid;
        row.qtitle =  '';
        row.content = '';          
        row.score = '';
        row.questiontype = '';
        row.trueanswer = '';
        row.answer1 = '';
        row.answer2 = '';
        row.answer3 = '';
        row.answer4 = '';    
        row.isEditing = !row.isEditing;      
      },
      handleLogout(){ 
        this.$router.replace('/teacherPage');
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

      this.$http.post(this.GLOBAL.URL + 'Question/upload', formData)
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

  </style>