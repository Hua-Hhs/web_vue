<template>
    <div class="login-container">
        <div class="background"></div>
        <el-form ref = "loginForm" :model="loginForm" :rules="loginRulers" class="login-form" auto-complete="on" label-position="left">
            
            <div class="title-container">
                <h3 class="title">修改管理员密码</h3>
            </div>

            <!-- <el-form-item prop="username">
                <el-input
                ref="username"
                v-model="loginForm.username"
                placeholder="新用户名"
                name="username"
                type="text"
                tabindex="1"
                auto-complete="on"
                prefix-icon="el-icon-user"
                />
            </el-form-item>
            <el-form-item prop="name">
                <el-input
                ref="name"
                v-model="loginForm.name"
                placeholder="姓名"
                name="name"
                type="text"
                tabindex="1"
                auto-complete="on"
                prefix-icon="el-icon-user"
                />
            </el-form-item> -->
            <el-form-item prop="oldpassword">
                <el-input
                ref="oldpassword"
                v-model="loginForm.oldpassword"
                placeholder="旧密码"
                name="oldpassword"
                tabindex="2"
                auto-complete="on"
               
                prefix-icon="el-icon-help"
                show-password
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
               
                prefix-icon="el-icon-help"
                show-password
                />
            </el-form-item>
            <el-form-item prop="passwordCheck">
                <el-input
                ref="passwordCheck"
                v-model="loginForm.passwordCheck"
                placeholder="确认密码"
                name="passwordCheck"
                tabindex="2"
                auto-complete="on"
                @keyup.enter.native="handleCheck"
                prefix-icon="el-icon-help"
                show-password
                />
            </el-form-item>

            <el-button :loading="loading" type="primary" style="width:100;margin-bottom:30px;"
            @click.native.prevent="handleCheck">确定</el-button>
            <el-button :loading="loading" type="primary" style="width:100;margin-bottom:30px;"
            @click.native.prevent="handleLogout">返回</el-button>
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
        const validatename = (rule, value, callback)=>{
            if(!value){
                callback(new Error('姓名不能为空'))
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
        const validatePasswordCheck = (rule, value, callback)=>{
            if(value != this.loginForm.password){              
                callback(new Error('两次输入密码不一致'))
            }else{
                callback()
            }
        }
        const validateOldPassword = (rule, value, callback)=>{
            if(value.length == 0){
                callback(new Error('请输入旧密码'))
            }else{
                callback()
            }
        }
        return{
            loginForm:{
                username:'',
                name:'',
                password:'',
                passwordCheck:'',
                oldpassword:'',

            },
            loginRulers:{
                username:[{required:true, trigger: 'blur', validator: validateUsername}],
                name:[{required:true, trigger: 'blur', validator: validatename}],
                password:[{required:true, trigger: 'blur', validator: validatePassword}],                
                passwordCheck:[{required:true, trigger: 'blur', validator: validatePasswordCheck}],
                oldpassword:[{required:true, trigger: 'blur', validator: validateOldPassword}]
            },
            loading: false,
            passwordType: 'password',
        }
    },
    mounted() {
       
     
      
    },
    
    methods: {
        
        handleCheck(){
            this.$refs.loginForm.validate(valid =>{
                if(valid){
                    const data = {id : this.loginForm.username}
                    console.log(data)
                    this.$http.post(this.GLOBAL.URL + 'Manager/UpdateManager', data).then(res => {       
                        console.log(res)                 
                        if(res.data.code == 20000) {
                            Message({
                                message: '修改成功',
                                type: 'success',
                                duration: 5 * 1000
                            })
                            this.$router.replace('/')
                        }else{                           
                            Message({
                                message: '旧密码错误',
                                type: 'error',
                                duration: 5 * 1000
                            })                           
                         
                        }
                    })
                }
            })
        },
        // handleLogin() {          
            
        //     this.$refs.loginForm.validate(valid =>{
        //         if(valid){
        //            this.$refs.loading = true
        //             const data = {
        //             username: this.loginForm.username.trim(),
        //             password: this.loginForm.password
        //             }
        //             this.$http.post(this.GLOBAL.URL + 'user/login', data).then(res => { 
        //                 const info = res.data
        //                 console.log(info);
        //                 if(info.code != 20000) {
        //                     Message({
        //                         message: info.message || 'Error',
        //                         type: 'error',
        //                         duration: 5 * 1000
        //                     })
        //                     // this.loading = false
        //                 }else{
                            
        //                    // 
        //                     const token = info.data.token; 
        //                    // console.log(token);
        //                     this.$store.commit('SET_TOKEN',token);
                           
        //                     this.$router.replace('/rootPage'),
                            
        //                     this.loading = false
        //                 }
        //             }).catch(()=>{this.loading = false})
                
        //         }else{
        //             console.log('error submit')
        //             return false
        //         }
        //     })
        // },

        handleLogout(){
            this.$router.replace('/rootPage')
        }
        
    }
}
</script>

<style>
    .login-form{
        position: absolute;
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