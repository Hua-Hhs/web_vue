<template>
    <div class="home-container">
        <div class="left">
            <videoplayer />
        </div>
        <div class="right">
            <!-- <div class="right-container"> -->
            <div class="buttons">
                <el-button class="button1" @click="onbuttonclick">展开文件列表</el-button>

            </div>
            <div style="background-color: rgb(171, 171, 171); height: 100; width: 1px;"></div>

            <div class="filemanager">
                <filemanager />
            </div>
        </div>


        <!-- </div> -->
        <!-- <div class="background"></div> -->
    </div>
</template>

<script>
import { Message } from 'element-ui'
import '../mock'
import 'js-cookie'
import filemanager from './filemanager.vue' // 引入右边文件管理页面  
import videoplayer from './videoplayer.vue' // 

export default {
    components: { filemanager, videoplayer }, // 注册子组件    
    data() {
        return {
            is_expanded: false,
        }
    },
    mounted() {
    },

    methods: {
        onbuttonclick() {

            var left = document.querySelector(".left");
            var right = document.querySelector(".right");

            if (!this.is_expanded) {
                right.style.width = '50%';
                left.style.width = '50%';
            } else {
                right.style.width = '20%';
                left.style.width = '80%';
            }
            this.is_expanded = !this.is_expanded;
        },

    }
}
</script>

<style>
.home-container {
    width: 100%;
    height: 100%;
    display: flex;
    /* align-items: center;
    justify-content: center; */
    /* background-color: beige; */
}

.left {
    top: 0;
    width: 80%;
    transition: width 0.2s ease-in-out;
    /* background-color: burlywood; */

}

.right {
    /* background-color: rgb(169, 224, 114); */
    display: flex;
    width: 20%;
    transition: width 0.2s ease-in-out;
}

.buttons {
    height: 100;
    width: 50px;
    /* background-color: aqua; */

}

.button1 {
    left: 0;
    min-width: 10px;
    width: 100%;
    white-space: normal;

}

.filemanager {
    right: 0px;
    flex-grow: 1;
    /* background-color: antiquewhite; */

}
</style>