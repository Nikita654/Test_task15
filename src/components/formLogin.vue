<template>
  <div class="login">
    <div class="text-center">
      <div class="login_title">Вход</div>
    </div>
    <div class="login_content">
      <div :class="{'has-error':err}" class="form-group">
        <label
          :class="{'control-label-on':labelL}"
          class="control-label"
          for="login-phone"
        >Номер телефона</label>
        <input
          class="form-control"
          :placeholder="phoneText"
          type="text"
          @focus="focusChange()"
          @blur="blurChange()"
          v-model="phoneNumber"
          id="login-phone"
          v-mask="'+7-###-###-##-##'"
        />
        <div ref="login_phone_error" class="form-danger"></div>
      </div>

      <div :class="{'has-error':err}" class="form-group">
        <label
          :class="{'control-label-on':labelP}"
          class="control-label"
          for="login-password"
        >Пароль</label>
        <input
          @focus="labelP = true"
          @blur="labelP = false"
          class="form-control"
          type="password"
          name="password"
          id="login-password"
          placeholder="Пароль"
          v-model="passWord"
        />
        <div ref="login_password_error" class="form-danger"></div>
      </div>
      <div class="login_send">
        <button @click="next" class="btn btn-bold btn-active-yellow" name="send">ВОЙТИ</button>

        <div name="recovery" class="login_recovery">
          <a class="no-decorate">
            <span class="border_bottom_dashed spacing-1">ЗАБЫЛИ ПАРОЛЬ?</span>
          </a>
        </div>
      </div>
      <div class="text-center">
        <div class="login-line-separator"></div>
        <div class="login_register">
          <p class="no-decorate">
            <span class="border_bottom_dashed spacing-1 uppercase">Еще не зарегистированы?</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mask } from "vue-the-mask";
import { mapState } from "vuex";
export default {
  directives: { mask },
  name: "formLogin",
  data() {
    return {
      phoneNumber: "",
      labelP: false,
      labelL: false,
      phoneText: "Номер телефона",
      passWord: "",
      err: false
    };
  },
  methods: {
    focusChange() {
      this.phoneText = "+7-___-___-__-__";
      this.labelL = true;
    },
    blurChange() {
      this.phoneText = "Номер телефона";
      this.labelL = false;
    },
    next() {
      if (
        this.phoneNumber == "+7-911-111-11-14" &&
        this.passWord == "groozgo123"
      ) {
        this.err = false;
        this.$router.push("/carrier/user/company");
      } else {
        if (this.phoneNumber != "+7-911-111-11-14") {
          if (this.phoneNumber.length == 16) {
          this.$refs.login_phone_error.innerHTML = "Неверный номер телефона";
          }else{
          this.$refs.login_phone_error.innerHTML = "Номер слишком короткий";  
          }
        }
        if (this.passWord != "groozgo123") {
          if (this.passWord.length > 7) {
          this.$refs.login_password_error.innerHTML = "Неверный пароль";
          }else{
          this.$refs.login_password_error.innerHTML = "Пароль не менее 8 символов";  
          }
        }
        this.err = true;
      }
      let obj={
           phone:this.phoneNumber,
           password:this.passWord
         }
        Vue.axios.post("https://dev.cargo.direct/api/login",JSON.stringify(obj)).then(data => {
         console.log(data)
        })
    }
  }
};
</script>

<style lang="scss" >
@import "../assets/scss/mainVar.scss";
body {
  background: $primary-color;
  font-family: "Open Sans", Arial, Helvetica, sans-serif;
  color: $main-color;
  font-size: 14px;
  line-height: 1.42857143;
}
.text-center {
  text-align: center;
}
.bold {
  font-weight: 700;
}
.spacing-1 {
  letter-spacing: 1px;
}
.border_bottom_dashed {
  border-bottom: 2px dashed $lightestDF-color;
}
.uppercase {
  text-transform: uppercase;
}
.no-decorate {
  text-decoration: none;
}
label {
  display: inline-block;
  max-width: 100%;
  margin-bottom: 5px;
}

.form-group {
  margin-bottom: 15px;
  .form-control {
    &-static {
      padding-right: 15px;
      padding-left: 15px;
    }

    display: block;
    width: 100%;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    background-color: $default-color;
    background-image: none;
    border: 1px solid $lightestCCC-color;
    border-radius: 4px;
    color: $main-color;
    height: 34px;
    transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s,
      -webkit-box-shadow ease-in-out 0.15s;
    &:focus {
      border-color: $blue-color;
      outline: 0;
      box-shadow: inset 0 1px 1px $dark075-color, 0 0 8px $blue06-color;
    }
    &[disabled],
    &[readonly] {
      background-color: $lightestEEE-color;
      opacity: 1;
    }
  }
  .form-danger {
    color: $danger-color;
  }
}
.has-error .form-control {
  border-color: $danger-color;
  box-shadow: inset 0 1px 1px $dark075-color;
}
.has-success .form-control {
  border-color: $success-color;
  box-shadow: inset 0 1px 1px $dark075-color;
}
.btn {
  outline: none;
  box-shadow: none;
  display: inline-block;
  margin-bottom: 0;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  text-transform: uppercase;
  background-image: none;
  border: 1px solid transparent;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  border-radius: 4px;
  user-select: none;
  &[disabled] {
    cursor: not-allowed;
    opacity: 0.65;
  }
  &-default {
    color: $darkless333-color;
    background-color: $default-color;
    border-color: $lightestCCC-color;
  }
  &-save {
    text-align: right;
    display: block;
    margin-left: auto;
    @media (max-width: 1025px) {
      margin-right: auto;
    }
  }
  &-brand {
    color: $darkless-color;
    background-color: $bright-color;
    border-color: $bright-color;
    line-height: 1.44;
    overflow: hidden;
    border-radius: 20px;
    &-outline {
      color: $bright-color;
      background-color: transparent;
      border-color: $bright-color;
      border-radius: 20px;
    }
  }
  &-file {
    padding: 6px 22px;
    input[type="file"] {
      position: absolute;
      top: 0;
      left: 0;
      min-width: 100%;
      min-height: 100%;
      text-align: right;
      opacity: 0;
      background: none repeat scroll 0 0 transparent;
      cursor: inherit;
      display: block;
    }
  }
  &-lg {
    padding: 10px 16px;
    font-size: 18px;
    line-height: 1.3333333;
    border-radius: 6px;
  }
  &-bold {
    font-weight: bold;
    color: $main-color;
  }
  &-active-yellow {
    background-color: $bright-color;
    border: 2px solid $bright-color;
    letter-spacing: 2px;
    padding: 15px 50px 15px 50px;
    font-size: 14px;
  }
}
.login {
  .form-control {
    height: 50px;
    padding-top: 9px;
  }
  &-line-separator {
    display: inline-block;
    width: 75px;
    height: 2px;
    background-color: $bright-color;
    margin: 35px auto;
    text-align: center;
  }
  .control-label {
    display: none;
    font-size: 10px;
    padding-top: 3px;
    padding-left: 13px;
    position: absolute;
    color: $grey-color;
    z-index: 10;
    &:focus {
      display: inline-block;
    }
    &-on {
      display: inline-block;
    }
  }
  padding-top: 100px;
  padding-bottom: 60px;
  position: relative;
  width: 25%;
  @media (max-width: 1199px) {
    width: 33.33333%;
  }
  @media (max-width: 991px) {
    width: 41.66666%;
  }
  @media (max-width: 766px) {
    width: 91.66666%;
  }
  margin: 0 auto;
  &_content {
    font-weight: 200;
  }
  &_title {
    font-weight: 400;
    font-size: 28px;
    margin: 15px 0;
    padding: 0;
  }
  &_send {
    text-align: left;
    @media screen and (max-width: 400px) {
      text-align: center;
    }
  }
  &_recovery {
    display: inline-block;
    cursor: pointer;
    min-width: 120px;
    margin-left: 20px;
    font-weight: 600;
    color: $brown-color;
    @media screen and (max-width: 400px) {
      margin-top: 15px;
      font-size: 12.8px;
    }
  }
  &_register {
    font-weight: 600;
    cursor: pointer;
    @media screen and (max-width: 400px) {
      font-size: 12.8px;
    }
  }
}
</style>
