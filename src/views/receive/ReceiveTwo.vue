<template>
  <div class="receive">
    <div class="receive_logo">
      <img src="../../assets/imgs/tian-logo.png" alt="" />
      <span>天翼</span>
    </div>
    <div class="receive_title"></div>
    <div class="receive_title receive_title_other"></div>
    <div class="illustrations">
      <img src="../../assets/imgs/tianyi.png" alt="" />
    </div>
    <div class="receive_box">
      <div class="input_box">
        <van-field
          autocomplete="off"
          v-model="phoneValue"
          :maxlength="11"
          type="tel"
          placeholder="请输入手机号"
        />
      </div>
      <div class="input_box">
        <van-field
          autocomplete="off"
          v-model="codeValue"
          :maxlength="6"
          type="tel"
          placeholder="输入短信验证码"
        />
        <div @click="handleSentCode" class="send_btn">{{ showTxt }}</div>
      </div>
      <div @click="handleClick" class="receive_sub">立即领取</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Toast } from 'vant';
import {
  getVerificationCode,
  getCheckCode,
  getReceive,
} from '../../api/receive';

let timer = null as any;

export default defineComponent({
  name: 'ReceiveTwo',
  setup() {
    const codeFlag = ref(true);
    let time = 60;
    const showTxt = ref('获取验证码');
    const phoneValue = ref(null) as any;
    const codeValue = ref(null) as any;
    const getCode = () => {
      if (!timer) {
        time = 60;
        codeFlag.value = false;
        timer = setInterval(() => {
          if (time > 0 && time <= 60) {
            time -= 1;
            showTxt.value = `${time}s`;
          } else {
            codeFlag.value = true;
            showTxt.value = '重新获取';
            clearInterval(timer);
            timer = null;
          }
        }, 1000);
        getVerificationCode({ phone: phoneValue.value }).then((res: any) => {
          Toast(res.msg);
        });
      }
    };
    const handleSentCode = () => {
      if (phoneValue.value === '') {
        Toast('手机号不能为空');
      } else if (/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(phoneValue.value)) {
        if (codeFlag.value) {
          getCode();
        }
      } else {
        Toast('请输入正确的手机号');
      }
      if (codeFlag.value) {
        codeFlag.value = false;
      }
    };
    const toReceive = () => {
      getReceive({ phoneNum: phoneValue.value, productId: 'TYCGQYK' }).then(
        (res: any) => {
          if (res.code === '200' || res.code === 200) {
            Toast('领取成功，请查收短信通知');
            phoneValue.value = '';
            codeValue.value = '';
            codeFlag.value = true;
            time = 60;
            clearInterval(timer);
            timer = null;
            showTxt.value = '获取验证码';
          }
        },
      );
    };
    const handleClick = () => {
      if (phoneValue.value && codeValue.value) {
        getCheckCode({ phone: phoneValue.value, code: codeValue.value }).then(
          (res: any) => {
            if (res.code === '200' || res.code === 200) {
              toReceive();
            }
          },
        );
      } else {
        Toast('请输入手机号/验证码');
      }
    };
    return {
      showTxt,
      phoneValue,
      codeValue,
      handleSentCode,
      getCode,
      handleClick,
      toReceive,
    };
  },
});
</script>

<style lang="scss" scoped>
.receive {
  width: 100%;
  height: 100vh;
  background: #102c77;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  &_logo {
    padding: 21px 0 0 66px;
    height: 40px;
    margin-bottom: 50px;
    display: flex;
    align-items: center;
    img {
      width: 58px;
      height: 40px;
    }
    font-size: 27px;
    font-family: SourceHanSansSC;
    font-weight: 400;
    color: #ffffff;
    line-height: 27px;
  }

  &_title {
    width: 352px;
    height: 53px;
    background-image: url('@/assets/imgs/receive-title1.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin: 0 auto 41px;
  }
  &_title_other {
    width: 484px;
    height: 53px;
    background-image: url('@/assets/imgs/receive-title2.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin: 0 auto 33px;
  }
  .illustrations {
    height: 432px;
    margin: 0 auto 75px;
    display: flex;
    justify-content: center;
    img {
      height: 432px;
    }
  }
  .receive_box {
    width: 567px;
    height: 373px;
    box-sizing: border-box;
    padding-top: 63px;
    background-image: url('@/assets/imgs/form-box.jpg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    .input_box {
      width: 525px;
      height: 69px;
      background-image: url('@/assets/imgs/inp-bg.jpg');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      margin-bottom: 26px;
      position: relative;
      .send_btn {
        position: absolute;
        right: 22px;
        top: 16px;
        width: 150px;
        font-size: 28px;
        font-family: SourceHanSansSC;
        font-weight: 400;
        color: #3cb4f0;
        text-align: center;
      }
      .van-cell {
        background: none;
        padding: 0 !important;
        padding-left: 29px !important;
        line-height: 69px;
        // border: none;
        &::after {
          border-bottom: none;
        }
        :deep .van-field__control {
          font-size: 28px;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #fff;
          &::placeholder {
            color: #dcdee6;
          }
        }
      }
    }
    .receive_sub {
      width: 315px;
      height: 74px;
      background: #3cb4f0;
      border-radius: 35px;
      text-align: center;
      line-height: 74px;
      font-size: 29px;
      font-family: SourceHanSansSC;
      font-weight: 400;
      color: #fff;
    }
  }
}
</style>
