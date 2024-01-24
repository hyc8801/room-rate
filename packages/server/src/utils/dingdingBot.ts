import axios from 'axios';
import * as hmacSHA256 from 'crypto-js/hmac-sha256';
import * as Base64 from 'crypto-js/enc-base64';

class DingdingBot {
  /** webhook地址 */
  private webhookUrl;
  constructor(webhookUrl: string, secret: string) {
    const timestamp = new Date().getTime();
    const sign = this.signFn(secret, `${timestamp}\n${secret}`);
    this.webhookUrl = `${webhookUrl}&timestamp=${timestamp}&sign=${sign}`;
  }
  /**
   * 推送消息
   * @param msg 消息内容
   * @param atMobiles 需要at人员的手机号
   */
  public pushMsg(msg: string, atMobiles?: string[]): boolean {
    try {
      const options = {
        msgtype: 'text',
        text: {
          content: msg,
        },
        at: {
          atMobiles: atMobiles ?? [],
          isAtAll: false,
        },
      };
      axios.post(this.webhookUrl, options);
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }
  /** 签名加密 */
  private signFn = (secret: string, content: string) => {
    // 加签
    const str = Base64.stringify(hmacSHA256(content, secret));
    return encodeURIComponent(str);
  };
}
const dingdingBot = new DingdingBot(
  'https://oapi.dingtalk.com/robot/send?access_token=fb6baadbe1750d822ca07604c0743814e7e49bfcf9b4448370d95a740e390dfd',
  'SEC05d3b3e6bbb8c16a59ba54a02861b92f15c18ea17a6ca3f07094cf44cea07653',
);

export default dingdingBot;
