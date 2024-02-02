<template>
    <div class="videopage-container">
        <div class="video-page-left">
            <template>
                <el-scrollbar class="video-scrollbar">

                    <div v-for="(item, index) in imageList" :key="index" class="image-container">
                        <div class="imame-block-container">
                            <img class="animeimg" :src="item.src" @click="handleImageClick(index)" alt="image" />
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
                <div v-for="(i, index) in chapters" :key="index">
                    <el-button v-if="index == currentChapterIndex" type="primary"
                        style="width: 60px; height: 40px; margin-left: 5px;" @click="handle_chapter_button_click(index)">{{
                            i }}</el-button>
                    <el-button v-else style="width: 60px; height: 40px; margin-left: 5px;"
                        @click="handle_chapter_button_click(index)">{{ i }}</el-button>

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
            imageList: [],
            chapters: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', 'ova'],
            currentAnimeTitle: '',
            currentChapterIndex: '',

            videoChunk: null,
            progress: 0,

        }
    },

    mounted() {
        
        // this.fun()
        // this.fetchVideo()
        this.fetchAnimeData()
        
        // this.currentChapterIndex = Cookies.get('currentChapterIndex')

    },

    methods: {
        async fetchVideo() {
        try {
            console.log(0)
          const response = await this.$http.get(this.GLOBAL.URL + 'test3', { responseType: 'arraybuffer' });
          console.log(1)
          const videoBlob = new Blob([response.data], { type: 'video/mp4' });
          console.log(2)
          const videoUrl = URL.createObjectURL(videoBlob);
          console.log(3)
          this.$refs.videoPlayer.src = videoUrl;
        } catch (error) {
          console.error('Error fetching video data:', error);
        }
    },
        fetchVideoData() {
            this.videoUrl = this.GLOBAL.URL + 'handle_video_request?title=' + this.imageList[0]['description'] + '&chapter=' + this.chapters[0] + '.mp4';
            
            // this.videoUrl = this.GLOBAL.URL + 'test2'
            this.playerOptions.sources[0].src = this.videoUrl
            // this.videoUrl = 'http://localhost:8080/play'
            // this.videoUrl = '极限竞速：地平线.mp4'
        },
        async fun(){
            const response = await this.$http.get(this.GLOBAL.URL + 'test3', { responseType: 'arraybuffer' });
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
        handleImageClick(index) {
            this.videoUrl = this.GLOBAL.URL + 'handle_video_request?title=' + this.imageList[index]['description'] + '&chapter=' + this.chapters[0] + '.mp4';
            console.log(this.videoUrl);
            this.playerOptions.sources[0].src = this.videoUrl
            this.currentAnimeTitle = this.imageList[index]['description']
        },
        // 获取动画的封面和标题
        fetchAnimeData() {
            this.$http.get(this.GLOBAL.URL + 'get_anime_info').then(res => {
                console.log(res.data)
                this.imageList = []
                for (let title of res.data.titles) {
                    this.imageList.push({ 'src': this.GLOBAL.URL + 'get_anime_cover?title=' + title, 'description': title })
                }
                this.fetchVideoData()
            })

        },
        handle_chapter_button_click(index) {
            // console.log(index)
            this.currentChapterIndex = index;
            // console.log(this.currentAnimeTitle+this.chapters[index])
            Cookies.set('currentChapterIndex', index, { expires: 180 })
            // console.log(this.imageList[index])
            this.videoUrl = this.GLOBAL.URL + 'handle_video_request?title=' + this.currentAnimeTitle + '&chapter=' + this.chapters[index] + '.mp4';
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