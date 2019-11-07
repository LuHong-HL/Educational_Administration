<template>
  <div class="login-wrapper">
    <div class="login-content">
      <div class="login-box">
        <div class="div-box">
          <p class="box-title">用户登录</p>
          <div class="username" :class="focusFlag == 1 ? focusClass : ''">
            <span class="iconfont">&#xe63c;</span>
            <input type="text" class="text" v-model="username" @focus="focusStyle1" @blur="blurStyle"
              placeholder="username">
          </div>
          <p class="info">
            <span v-show="userFlag" v-text='userInfo'></span>
          </p>
          <div class="password" :class="focusFlag == 2 ? focusClass : ''">
            <span class="iconfont psw-icon">&#xe7b8;</span>
            <input type="password" class="text" v-model="password" @keyup.enter="userLogin" @focus="focusStyle2"
              @blur="blurStyle" placeholder="password">
          </div>
          <p class="info">
            <span v-show="pswFlag" v-text="pswInfo"></span>
          </p>
          <button class="login-btn" @click="userLogin">登录</button>
          <div class="box-footer">
            <span class="forget-psw">忘记密码？</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    created() {
      
    },
    data() {
      return {
        focusClass: 'focusClass',
        focusFlag: 0,
        userFlag: false,
        pswFlag: false,
        username: '',
        password: '',
        userInfo:'账户不为空',
        pswInfo: '密码不为空',
      }
    },
    methods: {
      focusStyle1() {
        this.focusFlag = 1;

      },
      focusStyle2() {
        this.focusFlag = 2;

      },
      blurStyle() {
        this.focusFlag = 0;
      },
      checkInfo() {
        
      },
      userLogin() {
        this.$router.push('/home/announcement');
      }
    },

  }

</script>

<style scoped>
  .login-content {
    position: relative;
    height: 100vh;
    /* background: url('http://112.74.39.181:1453/img/loginBg.png') center center repeat; */
    background: #C9EEFD;
  }
  .login-box {
    position: absolute;
    right: 10%;
    top: 25%;
    width: 360px;
    height: 320px;
    border: 1px solid #ccc;
    z-index: 99;
    background: #fff;
  }

  .div-box {
    position: relative;
    left: 30px;
    top: 30px;
    width: 300px;
    height: 300px;
  }

  .box-title {
    line-height: 25px;
    line-height: 25px;
    font-size: 18px;
    color: #666;
    margin-bottom: 20px;
  }

  .username,
  .password {
    height: 36px;
    line-height: 36px;
    border: 1px solid #ddd;
  }

  .username span,
  .password span {
    float: left;
    font-size: 18px;
    color: #DCDCDC;
    font-weight: bold;
    padding: 0px 10px;

  }

  .iconfont{
    color: rgb(194, 188, 188)!important;
  }

  input::placeholder {
    color: rgb(194, 188, 188);
  }

  .text {
    float: left;
    color: #333;
    width: 240px;
    padding: 5px;
  }

  .login-btn {
    width: 300px;
    height: 45px;
    line-height: 45px;
    text-align: center;
    color: #fff;
    font-size: 22px;
    font-weight: bold;
    border-radius: 5px;
    background: rgb(142, 227, 241);
    cursor: pointer;
  }

  .login-btn:hover{
    background: rgb(135, 220, 233);
  }

  .box-footer {
    width: 300px;
    height: 36px;
    line-height: 36px;
    margin-top: 10px;
  }

  .forget-psw {
    float: right;
    color: #25a4bb;
    cursor: pointer;
  }

  .info {
    height: 25px;
    line-height: 25px;
  }

  .info span {
    font-size: 12px;
    color: #FF2832;
    padding-left: 12px;
  }

  .focusClass {
    border: 1px solid #666;
  }

</style>
