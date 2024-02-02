<template>
    <div>
      <video ref="videoPlayer" controls></video>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        videoSrc: this.GLOBAL.URL+'test3', // 替换成你的后端接口
      };
    },
    mounted() {
        this.$http.get(this.videoSrc, { responseType: 'arraybuffer' });
    //   this.fetchVideoData();
    },
    methods: {
      async fetchVideoData() {
        try {
            console.log(0)
          const response = await this.$http.get(this.videoSrc, { responseType: 'arraybuffer' });
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
    },
  };
  </script>
  