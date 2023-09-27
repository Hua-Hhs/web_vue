<template>
    <div class="home-container">        
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
</template>

<script>
import {Message} from 'element-ui'
import'../mock'
import 'js-cookie'
import filemanager from './filemanager.vue' // 引入子组件  

export default{  
    components: { filemanager }, // 注册子组件    
    data(){    
        return{
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
        this.fetchVideoData()
      
    },
    
    methods: {   
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

   
    /* ::v-deep .el-scrollbar__wrap {   overflow-x: hidden; } */
            /* Scroll bar stylings */ 
            ::-webkit-scrollbar {   width: 10px;   height: 10px; }  
            /* Track */ ::-webkit-scrollbar-track {   background: var(--lightestgrey); } 
             /* Handle */ ::-webkit-scrollbar-thumb {   background: #888;   border-radius: 5px; }  
             /* Handle on hover */ ::-webkit-scrollbar-thumb:hover {   background: #555; }
             
</style>