<template>
<div class='video-container'>
<!--登录模态框-->
    <div :style="fixStyle" class="filter">
    <div class="login-vue" >
        <div class="container">
            <p class="title">学生党员管理系统</p>
            <div class="input-c">
                <Input prefix="ios-contact" v-model="userid" placeholder="用户名" clearable />
                <p class="error">{{accountError}}</p>
            </div>
            <div class="input-c">
                <Input type="password" v-model="userpassword" prefix="md-lock" placeholder="密码" clearable/>
                <p class="error">{{pwdError}}</p>
            </div>
            <Button :loading="isShowLoading" class="submit" type="primary" @click="submit">登陆</Button>
            <p class="account"><span @click="register">注册账号</span> | <span @click="forgetPwd">忘记密码</span></p>
        </div>
    </div>
    </div>
    <!--背景-->
    <div>
        <video :style="fixStyle" autoplay loop muted class="fillWidth" v-on:canplay="canplay" >
          <source src="../assets/video/video_cover.mp4" type="video/mp4"/>
          天啦！你的浏览器真的弟弟，恕不奉陪！
          <!-- <source src="../assets/video/G1w.webm" type="video/webm"/>
          浏览器不支持 video 标签，建议升级浏览器。 -->
        </video>
        <div class="poster hidden" v-if="!vedioCanPlay">
          <img :style="fixStyle" src="../assets/video/bg_cover.jpg" alt="">
        </div>

    </div>
    <!--注册、忘记密码模态框-->
    <Modal v-model="registerModal"  >
        <p slot="header" style="color:#2d8cf0;text-align:center">
            <Icon type="information-circled"></Icon>
            <span>注册账号</span>
        </p>
        <div class='register_modal_content'>
            <i-form  :model="registerModal_data" :rules="ruleInline" :label-width="80" >
                <Row>
                    <i-col span='23'>
                <Form-item prop="username" label="姓名：">
                    <i-input  v-model="registerModal_data.username" placeholder="请输入2-10以内的字符"/>
                 </Form-item>
                    </i-col>
                </Row>
                <Row>
                    <i-col span='23'>
                <Form-item prop="password" label="密码：">
                    <i-input  v-model="registerModal_data.password" />
                 </Form-item>
                    </i-col>
                </Row>
                 <Row>
                    <i-col span='23'>
                <Form-item prop="password_re" label="确认密码：">
                    <i-input  v-model="registerModal_data.password_re" />
                 </Form-item>
                    </i-col>
                </Row>
                 <Row>
                    <i-col span='18'>
                <Form-item prop="email_adress" label="邮箱：">
                    <i-input  v-model="registerModal_data.email_adress" />
                 </Form-item>
                    </i-col>
                   
                    <i-col span='6' >
                        <i-button style='margin-left:5px' :loading='verify_button_loading' @click="getVerifycode">
                            <span v-if='!verify_button_loading'>获取验证码</span>
                            <span v-else>{{countDown}}秒</span>
                            </i-button>
                    </i-col>
                </Row>
                <Row v-if="getverify_button_click">
                 <i-col span='14' >
                        <Form-item prop="verify_code" label="验证码：" >
                        <i-input  v-model="registerModal_data.verify_code" />
                 </Form-item>
                    </i-col>
                </Row>    
            </i-form>
        </div>
        <div slot="footer">
             <i-button     @click="registerModal=false">取消</i-button>
            <i-button type="primary"    @click="submitRegister">确定</i-button>
        </div>
    </Modal>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'login',
    data() {
        return {
            countDown:10,
            verify_button_loading:false,
            getverify_button_click: false,
            registerModal_data:{},
            registerModal:false,
            vedioCanPlay: false,
            fixStyle: '',
            userid: '',
            userpassword: '',
            accountError: '',
            pwdError: '',
            isShowLoading: false,
            ruleInline:{},
        }
    },
     mounted: function() {   //屏幕自适应
      window.onresize = () => {
        const windowWidth = document.body.clientWidth
        const windowHeight = document.body.clientHeight
        const windowAspectRatio = windowHeight / windowWidth
        let videoWidth
        let videoHeight
        if (windowAspectRatio < 0.5625) {
          videoWidth = windowWidth
          videoHeight = videoWidth * 0.5625
          this.fixStyle = {
            height: windowWidth * 0.5625 + 'px',
            width: windowWidth + 'px',
            'margin-bottom': (windowHeight - videoHeight) / 2 + 'px',
            'margin-left': 'initial'
          }
        } else {
          videoHeight = windowHeight
          videoWidth = videoHeight / 0.5625
          this.fixStyle = {
            height: windowHeight + 'px',
            width: windowHeight / 0.5625 + 'px',
            'margin-left': (windowWidth - videoWidth) / 2 + 'px',
            'margin-bottom': 'initial'
          }
        }
      }
      window.onresize()
    },

    watch: {
        $route: {
            handler: function(route) {
                this.redirect = route.query && route.query.redirect
            },
            immediate: true
        }
    },
    methods: {
        getVerifycode(){
            this.verify_button_loading=true
            this.getverify_button_click=true
            this.reckonCountdown(this.countDown)
        },
        reckonCountdown(time){
           let clock = setInterval(function(){ 
               time=time-1
               this.countDown=time
               console.log(time)
               if (this.countDown <= 0) {
            window.clearInterval(clock)
            this.countDown=10
            this.verify_button_loading=false
            }
            }, 1000);

            
        },
        submitRegister(){

        },
        canplay() {
            this.vedioCanPlay = true
      },

        
        register() {
           this.registerModal=true
        },
        forgetPwd() {
           this.forget_pwd_Dilog=true
        },
        submit() {

        if(this.userid===''||this.userpassword===''){
             this.$Message.warning('请填写工号和密码', 3)
            }
           else{var param={};
            param.user_id=this.userid;
            param.user_password=this.userpassword;
            axios({
                method:'post',
                url:'/api/login',
                data:param,
            }).then(res=>{
                var r;
                if(res.data===undefined){
                    r=res
                }else{
                    r=res.data
                }
                console.log(r)
                if(r.msg==""||r.msg==undefined){
                    this.isShowLoading = true
                    // 登陆成功 设置用户信息,将信息存入缓存中
                localStorage.setItem('userName', r.user_name)
                // 登陆成功 假设这里是后台返回的 token
                localStorage.setItem('token',r.token)
                this.$router.push({path: this.redirect || '/'})
                }else{
                    this.$Message.error(r.msg, 5)
                    this.userid=''
                    this.userpassword=''
                }
            })}
           
        }
    }
}
</script>

<style>
.login-vue {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
}
.login-vue .container {
    background: rgba(255, 255, 255, .5);
    width: 300px;
    text-align: center;
    border-radius: 10px;
    padding: 30px;
}
.login-vue .ivu-input {
    background-color: transparent;
    color: #fff;
    outline: #fff;
    border-color: #fff;
}
.login-vue ::-webkit-input-placeholder { /* WebKit, Blink, Edge */
    color: rgba(255, 255, 255, .8);
}
.login-vue :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color: rgba(255, 255, 255, .8);
}
.login-vue ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color: rgba(255, 255, 255, .8);
}
.login-vue :-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: rgba(255, 255, 255, .8);
}
.login-vue .title {
    font-size: 16px;
    margin-bottom: 20px;
}
.login-vue .input-c {
    margin: auto;
    width: 200px;
}
.login-vue .error {
    color: red;
    text-align: left;
    margin: 5px auto;
    font-size: 12px;
    padding-left: 30px;
    height: 20px;
}
.login-vue .submit {
    width: 200px;
}
.login-vue .account {
    margin-top: 30px;
}
.login-vue .account span {
    cursor: pointer;
}
.login-vue .ivu-icon {
    color: #eee;
}
.login-vue .ivu-icon-ios-close-circle {
    color: #777;
}
.homepage-hero-module,
  .video-container {
    position: relative;
    height: 100vh;
    overflow: hidden;
  }
 
  .video-container .poster img{
    z-index: 0;
    position: absolute;
  }
 
  .video-container .filter {
    z-index: 1;
    position: absolute;
    background: rgba(0, 0, 0, 0.4);
    width: 100%;
  }
 
  .fillWidth {
    width: 100%;
  }

</style>


