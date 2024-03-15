<template>
  <div>
    <video ref="videoPlayer" class="video-js vjs-default-skin" controls>
      <source :src="videoSrc" type="video/mp4">
    </video>
  </div>
</template>

<script>
import videojs from 'video.js';
import 'video.js/dist/video-js.css';


export default {
  data() {
    return {
      videoSrc: 'http://192.168.31.146:8000/test',
    };
  },
  mounted() {
    // 初始化视频播放器
    this.player = videojs(this.$refs.videoPlayer);

    // 添加一个自定义按钮到控制条
    this.player.getChild('controlBar').addChild('button', {
      text: 'Custom Button', // 按钮文字
      el: videojs.dom.createEl('button', {
        className: 'Button',
        innerHTML: 'A', // 向右箭头图标，使用Font Awesome图标库
      }),
      // 按钮点击事件处理
      handleClick(event) {
        console.log('Custom button clicked');
      }
    },1);

    // class CustomButton extends videojs.getComponent('Button') {
    //   constructor(player, options) {
    //     super(player, options);
    //     this.controlText(options.text);
    //     this.el().innerHTML = options.innerHTML;
    //   }

    //   handleClick(event) {
    //     console.log('Custom button clicked');
    //   }
    // }

    // Component.registerComponent("CustomButton", CustomButton);
    // // 添加一个自定义按钮到控制条
    // this.player.getChild('controlBar').addChild(new CustomButton(this.player, {
    // text: 'Custom Button', // 按钮文字
    // innerHTML: 'A', // 设置按钮内容为字母"A"
    // }),0);
    // this.player.controlBar.el().insertBefore(customButton.el(), this.player.controlBar.getChild(0).el());

  },
  beforeDestroy() {
    // 销毁视频播放器
    if (this.player) {
      this.player.dispose();
    }
  },
};


    // // 视频播放
    // if (!this.player) {
    //     let that = this
    //     this.player = videojs("#videoPlayer", this.videoOptions, function onPlayerReady(this:any) {
    //     console.log('onPlayerReady', this);
    //     this.on('ended',function(next){
    //         console.log('ended', next);
    //         that.nextVideo()
    //       })
    //     })
    //     console.log('player', this.player);
    //     this.$nextTick(() => {
    //         /* ADD PREVIOUS */
    //         var Button = videojs.getComponent('Button');
            

    //       const self = this;
    //       const Component = videojs.getComponent("Component");
    //       // const Button = videojs.getComponent("Button");
    //       class PrevButton extends Button {
    //         constructor(player, options = {}) {
    //           super(player, options);
    //           console.log(player, options);
    //           this.controlText("Previous");
          
    //         }
    //         buildCSSClass() {
    //           return "vjs-play-control-btn icon aufontAll fast-forward h-icon-all-fast-backward";
    //           // return `vjs-play-control ${super.buildCSSClass()}`
    //         }

    //         handleClick() {
    //           console.log('Previous');
    //           // player.playlist.next();
    //         }
    //       }
    //       class NextButton extends Button {
    //         constructor(player, options = {}) {
    //           super(player, options);
    //           console.log(player, options);
    //           this.controlText("Next");

    //         }
    //         buildCSSClass() {
    //           return "vjs-play-control-btn icon aufontAll fast-forward h-icon-all-fast-forward";
    //           // return `vjs-play-control ${super.buildCSSClass()}`
    //         }
    
    //         handleClick() {
    //           console.log('Next');
    //           // player.playlist.next();
    //         }
    //       }
    //       Component.registerComponent("PrevButton", PrevButton);
    //       Component.registerComponent("NextButton", NextButton);
    //       this.player.getChild('controlBar').addChild('PrevButton', {}, 0);
    //       this.player.getChild('controlBar').addChild('NextButton', {}, 2);
    //     })
     
    //   }


</script>

<style>
/* 可以添加样式来美化视频播放器 */
</style>

