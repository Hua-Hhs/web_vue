<template>
    <div class="login-container">
        <div class="background"></div>
        <el-form ref = "loginForm" :model="loginForm" :rules="loginRulers" class="login-form" auto-complete="on" label-position="left">
            
            <div class="title-container">
                <h3 class="title">刷题考试系统教师网页管理端</h3>
            </div>

            <el-form-item prop="username">
                <el-input
                ref="username"
                v-model="loginForm.username"
                placeholder="用户名"
                name="username"
                type="text"
                tabindex="1"
                auto-complete="on"
                prefix-icon="el-icon-user"
                />
            </el-form-item>

            <el-form-item prop="password">
                <el-input
                ref="password"
                v-model="loginForm.password"
                placeholder="密码"
                name="password"
                tabindex="2"
                auto-complete="on"
                @keyup.enter.native="handleLogin"
                prefix-icon="el-icon-help"
                show-password
                />
            </el-form-item>
            <el-button :loading="loading" type="primary" style="width:100;margin-bottom:30px;"
            @click.native.prevent="handleLogin">教师登录</el-button>
            <el-button :loading="loading" type="primary" style="width:100;margin-bottom:30px;"
            @click.native.prevent="handleManagerLogin">管理员登录</el-button>

        </el-form>
    </div>
</template>

<script>
import {Message} from 'element-ui'
import'../mock'
import 'js-cookie'


export default{
    name: 'Login',
    data(){
        const validateUsername = (rule, value, callback)=>{
            if(!value){
                callback(new Error('请输入正确的用户名'))
            }else{
                callback()
            }
        }
        const validatePassword = (rule, value, callback)=>{
            if(value.length < 6){
                callback(new Error('密码不能少于6位'))
            }else{
                callback()
            }
        }

        return{
            loginForm:{
                username:'',
                password:''
            },
            loginRulers:{
                username:[{required:true, trigger: 'blur', validator: validateUsername}],
                password:[{required:true, trigger: 'blur', validator: validatePassword}]
            },
            loading: false,
            passwordType: 'password',
            // uploadURL : this.GLOBAL.URL + 'user/upload',
            // fileList: [], // 上传的文件列表
  
        }
    },
    mounted() {
        this.$http.get(this.GLOBAL.URL).then(res => {
            console.log(res)
         })
      console.log(this.GLOBAL.URL)
      
    },
    
    methods: {    
     
        handleLogin() {
            
            
            this.$refs.loginForm.validate(valid =>{
                if(valid){
                   this.$refs.loading = true
                    const data = {
                    username: this.loginForm.username.trim(),
                    password: this.loginForm.password
                    }
                    this.$globalVariable.teacherID = data.username;
                    this.$globalVariable.teacherPassword = data.password;
                    // console.log(this.$globalVariable.teacherPassword)
                    this.$http.post(this.GLOBAL.URL + 'user/login', data).then(res => { 
                        const info = res.data
                        console.log(info);
                        if(info.code != 20000) {
                            Message({
                                message: info.message || 'Error',
                                type: 'error',
                                duration: 5 * 1000
                            })
                            this.$globalVariable.loading = true;
                            this.loading = false
                        }else{
                            
                           // 
                            const token = info.data.token; 
                           // console.log(token);
                            this.$store.commit('SET_TOKEN',token);
                           
                            this.$router.replace('/teacherPage'),
                            
                            this.loading = false
                        }
                    }).catch(()=>{this.loading = false})
                
                }else{
                    console.log('error submit')
                    return false
                }
            })
        },

        handleManagerLogin() {
            
            
            this.$refs.loginForm.validate(valid =>{
                if(valid){
                   this.$refs.loading = true
                    const data = {
                    managerid: this.loginForm.username.trim(),
                    managerpassword: this.loginForm.password
                    }
                    this.$globalVariable.teacherID = data.username;
                    this.$globalVariable.teacherPassword = data.password;
                    // console.log(this.$globalVariable.teacherPassword)
                    this.$http.post(this.GLOBAL.URL + 'user/managerlogin', data).then(res => { 
                        const info = res.data
                        console.log(info);
                        if(info.code != 20000) {
                            Message({
                                message: info.message || 'Error',
                                type: 'error',
                                duration: 5 * 1000
                            })
                        }else{
                            
                           // 
                            const token = info.data.token; 
                           // console.log(token);
                            this.$store.commit('SET_TOKEN',token);
                           
                            this.$router.replace('/rootPage');
                            
                            
                        }
                    }).catch(()=>{})
                
                }else{
                    console.log('error submit')
                    return false
                }
            })
        },

        handletest(){
            this.$router.replace('/SigninPage')
        },
        handleRoot(){
            this.$router.replace('/rootPage')
        },
    }
}
</script>

<style>
    .login-form{
        position: relative;
        width: 520px;
        max-width: 100%;
        padding: 35px 50px 10px;
        margin: 0 auto;
        overflow: hidden;
        background-color: #283443;
        border-radius: 8px;
        opacity: 0.9;
    }
    .el-form-item{
        border: 1px solid rgba(255,255,255,0.1);
        background: rgba(0,0,0,0.1);
        border-radius: 5px;
        color:#454545;
    }
    .login-container{
        min-height: 100%;
        width:100%;
        
        overflow: hidden;
        background-size:cover;
        background-repeat: no-repeat;
        background-position: center;
        
        display: flex;
        align-items: center;
        
    }
    .title-container{
        position: relative;
    }
    .title{
        font: 26px;
        color:#eee;
        margin: 0px auto, 40px auto;
        text-align: center;
        font-weight: bold;
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
    
</style>