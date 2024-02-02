<template>
  
            <div>
                <video ref="videoPlayer" controls></video>
            </div>
   
</template>

<script>
import { Message } from 'element-ui'
// import '../mock'
export default {
    data() {
        return{}
    },

    mounted() {
        // this.fetchVideoData()
        // this.fun()
        this.fetchVideo()
 

    },

    methods: {
        async fetchVideo() {
        try {
            console.log(0)
          const response = await this.$http.get('/api/test3', { responseType: 'arraybuffer' });
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