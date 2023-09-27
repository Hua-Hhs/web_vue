<template>
    <div class="home-container">
       
       
            <el-scrollbar style="height: 100%"> 
            
        
        <h1>MyFiles:</h1>
        <ul>
            ..{{current_path}}\              
                   
        </ul>        
        <el-scrollbar style="height: 200px; width: 500px;">  
             <!-- 要包裹的内容 -->  
              <div class="container">
                <ul>                 
                    <li>
                        <a v-if="current_path != ''" @click="handleBackClick('m')">..</a>
                    </li>    
                    <li v-for="file_info in file_info_list" :key="file_info.file_name"> 
                        <a v-if="file_info.is_directory" @click="handleEnterFloderClick(file_info,'m')">{{ file_info.title}}</a>  
                        <a v-else :href="''+file_info.link">{{file_info.title}}</a> 
                    </li>  
                </ul> 
              </div>


             </el-scrollbar>
        

        <h2>上传文件：</h2>
        <div>  
            <el-upload  
            class="upload-demo"  
            :action="upload_action"  
            :on-success="handle_Success"             
            :file-list="fileList"  
            :data="extraParams"
            :before-upload="beforeUpload"
            :auto-upload="true">  
            <el-button size="small" type="primary">点击上传文件</el-button>  
            </el-upload>  
        </div>  
        <h2>创建文件夹：</h2>
        <el-input v-model="create_forlder_name" style="width: 200px;" placeholder="请输入文件夹名称"></el-input>  
        <el-button size="small" type="primary" @click="on_create_folder_click">点击创建</el-button> 
        <h1>SpecialFiles:</h1>
        <ul>
            ..{{special_current_path}}\
        </ul>  
        <el-scrollbar style="height: 200px; width: 500px;">  
             <!-- 要包裹的内容 -->  
              <div class="container">
                <ul>
                                
                    <li>
                        <a v-if="special_current_path != ''" @click="handleBackClick('s')">..</a>
                    </li>
                    <li v-for="file_info in special_file_info_list" :key="special_file_info_list.file_name"> 
                        <a v-if="file_info.is_directory" @click="handleEnterFloderClick(file_info,'s')">{{ file_info.title}}</a>  
                        <a v-else :href="''+file_info.link">{{file_info.title}}</a> 
                    </li>  
                </ul> 
            </div>


        </el-scrollbar>
    </el-scrollbar>
        </div>  
        
        

       
         <!-- <div class="background"></div> -->
    
</template>

<script>
import {Message} from 'element-ui'
import'../mock'
import 'js-cookie'

export default{    
    data(){    
        return{
            current_path:'',
            file_info_list:[],
            my_text:'',
            special_current_path:'',
            special_file_info_list:[], 
            //加密路径，用于点击超链接下载文件，避免字符被转换
    
            
            
            global_url:this.GLOBAL.URL,

            fileList: [],  
            extraParams:{},
            upload_action : this.GLOBAL.URL + 'upload',
            create_forlder_name : '',




            playerOptions: {  
                autoplay: false,  
                muted: false,  
                language: 'en',  
                playbackRates: [0.7, 1.0, 1.5, 2.0],  
                sources: [  
                {  
                    type: 'video/mp4',  
                    src: '' // 从后端获取视频资源的URL  
                }  
                ],  
                poster: '', // 视频封面图片的URL，可以从后端获取  
                fluid: true,  
                width: '600',  
                height: '300'  
            },  
        videoUrl: '' // 从后端获取的视频资源URL 
        }
    },
    mounted() {
        this.beginPlay()
        this.fetchVideoData()
      
    },
    
    methods: {   
        process_file_info_list(res){
            // console.log(res)
            this.current_path = res.data.current_path
            this.file_info_list = res.data.file_info_list
            this.special_current_path = res.data.special_current_path
            this.special_file_info_list = res.data.special_file_info_list
            this.my_text = res.data.my_text
            for(var file_info of this.file_info_list){                    
                    if (file_info.is_directory   ){
                        file_info.title = file_info.file_name + "\\";
                    }else{
                        file_info.title = file_info.file_name + '---' + file_info.size_mb;
                        let quoted_current_path = encodeURIComponent(this.current_path);  
                        let quoted_file_name = encodeURIComponent(file_info.file_name);
                        file_info.link = this.GLOBAL.URL + "download?current_path="+ quoted_current_path +"&file_name="+quoted_file_name
                    }
            }
            for(var file_info of this.special_file_info_list){                    
                if (file_info.is_directory){
                    file_info.title = file_info.file_name + "\\";
                }else{
                    file_info.title = file_info.file_name + '---' + file_info.size_mb;
                    let quoted_special_current_path = encodeURIComponent(this.special_current_path);  
                    let quoted_special_file_name = encodeURIComponent(file_info.file_name);
                    file_info.link = this.GLOBAL.URL + "download_special_file?special_current_path="+ quoted_special_current_path +"&special_file_name="+quoted_special_file_name+"&special_file_size="+file_info.size_int
                }
            }
        },
        // 进入根目录
        beginPlay() {       
            this.$http.get(this.GLOBAL.URL).then(res => {

                this.process_file_info_list(res)                
            })
        },
        refresh_file_infos(){     
            var data={
                'current_path': this.current_path,
                'folder_name' : '-1',
                'special_current_path' : this.special_current_path,
                'special_folder_name' : '-1'
            }
            
            this.$http.post(this.GLOBAL.URL+"list",data).then(res => {
                this.process_file_info_list(res)
            })
        },
        // 回退到当前的父级文件夹
        handleBackClick(e){
            var  data = {}
            if(e=='m'){
                data={
                'current_path': this.current_path,
                'folder_name' : '',
                'special_current_path' : this.special_current_path,
                'special_folder_name' : '-1'
                }
            }else{
                data={
                    'current_path': this.current_path,
                    'folder_name' : '-1',
                    'special_current_path' : this.special_current_path,
                    'special_folder_name' : ''
                }
            }
            this.$http.post(this.GLOBAL.URL+"list",data).then(res => {
                this.process_file_info_list(res)
            })
        },
        // 点击进入文件夹
        handleEnterFloderClick(file_info,e) {
            var  data={}
            if(e=="m"){
                data={
                'current_path': this.current_path,
                'folder_name' : file_info.file_name,
                'special_current_path' : this.special_current_path,
                'special_folder_name' : '',
                }
            }else{
                data={
                'current_path': this.current_path,
                'folder_name' : '',
                'special_current_path' : this.special_current_path,
                'special_folder_name' : file_info.file_name,
                }
            }
            
            this.$http.post(this.GLOBAL.URL+"list",data).then(res => {               

                this.process_file_info_list(res)
            })
            
        },
        
        beforeUpload(file) {  
            console.log('1'+this.current_path)
            this.extraParams = {
                'current_path' : this.current_path,
            }
        },  
        handle_Success(response, file, fileList) {  
            this.fileList=[file]
            this.refresh_file_infos();
            this.$message.success('上传成功');  
        },  
        on_create_folder_click(){
            var data={
                'folder_name':this.create_forlder_name,
                'current_path':this.current_path,
            }
            // console.log(data)
            this.$http.post(this.GLOBAL.URL+'createfolder',data).then(res => {                
                this.refresh_file_infos();  
            })
        },

       
    }
}
</script>

<style>

  
    /* ::v-deep .el-scrollbar__wrap {   overflow-x: hidden; } */
            /* Scroll bar stylings */ 
            ::-webkit-scrollbar {   width: 10px;   height: 10px; }  
            /* Track */ ::-webkit-scrollbar-track {   background: var(--lightestgrey); } 
             /* Handle */ ::-webkit-scrollbar-thumb {   background: #888;   border-radius: 5px; }  
             /* Handle on hover */ ::-webkit-scrollbar-thumb:hover {   background: #555; }
             

</style>