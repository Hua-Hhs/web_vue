<template>
    <div class="home-container">
        <div class="left">
            <template>  
                <div class="video-container">  
                    <video-player class="vjs-custom-skin"  
                                ref="videoPlayer"  
                                :options="playerOptions"  
                                @play="onPlayerPlay($event)"  
                                @pause="onPlayerPause($event)"  
                                @ended="onPlayerEnded($event)">  
                    </video-player>  
                </div>  
            </template> 
        </div> 
        <div class="right">
            <filemanager />            
        </div>  
        
        

       
         <div class="background"></div>
    </div>
</template>

<script>
import {Message} from 'element-ui'
import'../mock'
import 'js-cookie'
import filemanager from './filemanager.vue' // 引入右边文件管理页面  
import filemanager from './filemanager.vue' // 引入子组件 

export default{  
    components: { filemanager }, // 注册子组件    
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
                // var data = res.data;
                // this.current_pathcurrent_path = data.current_path;
                // this.file_info_list = data.file_info_list;
                // this.my_text = data.my_text;
                // this.special_current_path = data.special_current_path
                // this.special_file_info_list = data.special_file_info_list;
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

        fetchVideoData() {  
            // 调用后端API获取视频数据，并将视频URL赋值给playerOptions.sources.src和videoUrl变量  
            // 具体实现根据你的后端API而定，这里只是一个示例  
            this.videoUrl = this.GLOBAL.URL +  'handle_video_request' // 假设从后端获取的视频URL  
            this.playerOptions.sources[0].src = this.videoUrl  
        },  
        onPlayerPlay(event) {  
        console.log('player play!', event)  
        },  
        onPlayerPause(event) {  
        console.log('player pause!', event)  
        },  
        onPlayerEnded(event) {  
        console.log('player ended!', event)  
        }  

    }
}
</script>

<style>

    .left {  
        display: flex;  
        justify-content: center; /* 水平居中 */  
        align-items: center; /* 垂直居中 */  
    }
    .home-container {  
    display: flex;  
    }  
    
    .left {  
    width: 70%;  
   
    }  
    
    .right {  
    width: 30%;  

    }
    /* ::v-deep .el-scrollbar__wrap {   overflow-x: hidden; } */
            /* Scroll bar stylings */ 
            ::-webkit-scrollbar {   width: 10px;   height: 10px; }  
            /* Track */ ::-webkit-scrollbar-track {   background: var(--lightestgrey); } 
             /* Handle */ ::-webkit-scrollbar-thumb {   background: #888;   border-radius: 5px; }  
             /* Handle on hover */ ::-webkit-scrollbar-thumb:hover {   background: #555; }
             
    /* body {  
      
      background-image: url('../assets/bg.png');
      background-color: rgba(255,255,255,0.2);
      
      background-size: cover;  
      
      background-position: center;   
    }   */
    /* .background{
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
     */
</style>