<template>
    <div class="videopage-container">
        <div class="video-page-left">
            <template>
                <el-scrollbar class="video-scrollbar">

                    <div v-for="(item, index) in image_list" :key="index" class="image-container">
                        <div class="imame-block-container">
                            <img class="animeimg" :src="item.src" @click="handle_image_click(index)" alt="image" />
                            <p style="margin-top: 2px; text-align: center;">{{ item.description }}</p>
                        </div>
                    </div>
                </el-scrollbar>
            </template>

        </div>

        <div style="background-color: rgb(171, 171, 171); height: 100; width: 1px;"></div>
        <div class="video-page-right">
            <template>
                <div class="video-container">
                    <div class="video-sub-container">
                        <video-player class="vjs-custom-skin" ref="videoPlayer" :options="playerOptions"
                            @play="onPlayerPlay($event)" @pause="onPlayerPause($event)" @ended="onPlayerEnded($event)">
                        </video-player>
                    </div>
                </div>
            </template>
            <br>
            
            <div class="chapter">
                <div v-for="(chapter, index) in chapter_list" :key="index">
                    <el-button v-if="index == current_chapter_index" type="primary"
                        style="width: 60px; height: 40px; margin-left: 5px;" @click="handle_chapter_button_click(index)">{{
                            chapter }}</el-button>
                    <el-button v-else style="width: 60px; height: 40px; margin-left: 5px;"
                        @click="handle_chapter_button_click(index)">{{ chapter }}</el-button>

                </div>
            </div>

        </div>

    </div>
</template>

<script>
import { Message } from 'element-ui'
import '../mock'
import 'js-cookie'
import Cookies from 'js-cookie'
import axios from 'axios';
import { saveAs } from 'file-saver';
export default {
    data() {
        return {
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
            videoUrl: '', // 从后端获取的视频资源URL 
            image_list: [],
            chapter_list: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', 'ova'],
            anime_title_list:[],
            current_anime_title: '',
            current_chapter_index: '',

            videoChunk: null,
            progress: 0,

        }
    },

    mounted() {
        this.get_all_anime_info()
    },

    methods: {

        get_video_data() {
            this.videoUrl = this.GLOBAL.URL + 'handle_video_request?title=' + this.current_anime_title + '&chapter=' + this.chapter_list[0] + '.mp4';
            console.log(this.videoUrl)
            this.playerOptions.sources[0].src = this.videoUrl
        },
        onPlayerPlay(event) {
            // console.log('player play!', event)
        },
        onPlayerPause(event) {
            // console.log('player pause!', event)
        },
        onPlayerEnded(event) {
            // console.log('player ended!', event)
        },
        onprogress(event) {  // 当下载时，获取已下载的部分  
            this.progress = this.$refs.player.buffered.end(0) / this.$refs.player.duration;
            console.log(this.$refs.player.buffered)
        },
        handle_image_click(index) {
            this.get_current_anime_chapter()
            this.currentAnimeTitle = this.anime_title_list[index]
            this.videoUrl = this.GLOBAL.URL + 'handle_video_request?title=' + this.anime_title_list[index] + '&chapter=' + this.chapter_list[this.current_chapter_index] + '.mp4';
            this.playerOptions.sources[0].src = this.videoUrl
            
        },
        // 获取所有动画的信息，包括封面和标题
        get_all_anime_info() {
            this.$http.get(this.GLOBAL.URL + 'get_anime_info').then(res => {
                // console.log(res.data)
                this.image_list = []
                this.anime_title_list = res.data.titles
                for (let title of this.anime_title_list) {
                    // 设置cover的路径this.GLOBAL.URL + 'get_anime_cover?title=' + title和显示的标题
                    this.image_list.push({ 'src': this.GLOBAL.URL + 'get_anime_cover?title=' + title, 'description': title })
                }
                console.log('anime_title_list')
                console.log(this.anime_title_list)
                this.current_anime_title = this.anime_title_list[0]
                console.log(this.current_anime_title)
                this.current_chapter_index = 0
                this.get_current_anime_chapter()
                this.get_video_data()


            })

        },
        get_current_anime_chapter(){
            var msg={'current_anime_title': this.currentAnimeTitle}
            this.$http.post(this.GLOBAL.URL + 'get_current_anime_chapter',msg).then(res => {

                // console.log('get_current_anime_chapter')
                // console.log(res.data.chapters)
                this.chapter_list = res.data.chapters
                
            })
        },
        handle_chapter_button_click(index) {
            // console.log(index)
            this.current_chapter_index = index;
            // console.log(this.currentAnimeTitle+this.chapter_list[index])
            Cookies.set('current_chapter_index', index, { expires: 180 })
            // console.log(this.image_list[index])
            this.videoUrl = this.GLOBAL.URL + 'handle_video_request?title=' + this.current_anime_title + '&chapter=' + this.chapter_list[index] + '.mp4';
            console.log(this.videoUrl);
            this.playerOptions.sources[0].src = this.videoUrl
            

        }
    }
}
</script>

<style>
.videopage-container {
    width: 100%;
    height: 100%;
    display: flex;
    /* background-color: black; */

}

.video-page-left {

    top: 0;
    width: 20%;
    transition: width 0.2s ease-in-out;
    display: flex;
    height: 100%;
    flex-direction: row-reverse;
    /* background-color: rgb(230, 185, 126); */
}

.video-page-right {
    /* background-color: rgb(169, 224, 114); */
    /* display: flex; */
    align-items: center;
    justify-content: center;
    width: 80%;
    height: 100%;
    transition: width 0.2s ease-in-out;
    /* background-color: antiquewhite; */
}


.video-container {
    display: contents;

}

/* 中间播放器容器 */
.video-sub-container {
    width: 100%;
    margin-top: 30px;
    height: auto;

}

.chapter {
    /* display: grid;   */
    /* grid-auto-flow: column;   */
    display: flex;
    flex-wrap: wrap;
    /* background-color: rgb(29, 45, 12); */
    height: 100px;


}


.image-container {
    /* display: contents; */
    display: inline-block;
    margin-right: 5px;
    margin-top: 5px;
    /* background-color: bisque; */
    width: 100px;
    /* 设置宽度 */
    /* height: 200px; 设置高度  */
    /* transform: scaleX(-1);  */

}


.imame-block-container {
    width: 100%;
    /* background-color: rgb(84, 71, 54); */
}

.animeimg {
    width: 100%;
    height: auto;
}

::-webkit-scrollbar {
    display: none;
}</style>