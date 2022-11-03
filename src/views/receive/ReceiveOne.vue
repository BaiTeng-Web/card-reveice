<template>
  <div class="receive">
    <div class="receive_logo">
      <img src="../../assets/imgs/mang-logo.png" alt="" />
    </div>
    <div class="receive_title"></div>
    <div class="receive_title receive_title_other"></div>
    <img class="illustrations" src="../../assets/imgs/mangguo.png" alt="" />
    <div class="receive_box">
      <div class="input_box">
        <van-field
          autocomplete="off"
          v-model="phoneValue"
          :maxlength="11"
          type="tel"
          placeholder="请输入领取手机号"
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
  getReceivePurview,
  submitByCard,
} from '../../api/receive';

let timer = null as any;

export default defineComponent({
  name: 'ReceiveOne',
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
    const handleReceivePurview = () => {
      getReceivePurview({ phone: phoneValue.value }).then((res: any) => {
        if (res.code === 200) {
          const { cardPhoneFirstTime, cardPhoneFirstMoney, surplusNum, total } =
            res.data;
          setTimeout(() => {
            Toast(
              `您开卡首充时间为${cardPhoneFirstTime},首充金额为${cardPhoneFirstMoney},已领取${
                total - surplusNum
              }次，还剩${surplusNum}次`,
            );
          }, 2000);
          if (surplusNum > 0) {
            getCode();
          }
        }
      });
    };
    const handleSentCode = () => {
      if (phoneValue.value === '') {
        return Toast('手机号不能为空');
      }
      if (/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(phoneValue.value)) {
        if (codeFlag.value) {
          return handleReceivePurview();
        }
      } else {
        return Toast('请输入正确的手机号');
      }
    };
    const toReceive = () => {
      submitByCard({ phoneNum: phoneValue.value, productId: 'AQYM' }).then(
        (res: any) => {
          if (res.code === 200) {
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
            if (res.code === 200) {
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
      handleReceivePurview,
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
    height: 45px;
    margin-bottom: 49px;
    img {
      height: 100%;
    }
  }
  &_title {
    width: 430px;
    height: 53px;
    background-image: url('@/assets/imgs/receive-title3.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin: 0 auto 41px;
  }
  &_title_other {
    width: 496px;
    background-image: url('@/assets/imgs/receive-title4.png');
    margin: 0 auto 63px;
  }
  .illustrations {
    width: 480px;
    margin: 0 auto 85px;
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
