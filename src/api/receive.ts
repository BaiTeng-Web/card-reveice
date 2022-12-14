import request from './request';

export interface HttpResponse {
  status: number
  success?: boolean
  traceId?: string
  data: any
}

export const getVerificationCode = async (data = {}): Promise<HttpResponse> => request('/api/message/sendMessageVIP', {
  method: 'post',
  data,
});
export const getCheckCode = async (data = {}): Promise<HttpResponse> => request('/api/message/checkCode', {
  method: 'post',
  data,
});
export const getReceive = async (data = {}): Promise<HttpResponse> => request('/api/ls/submit', {
  method: 'post',
  data,
});
// 查看会员领取次数
export const getReceivePurview = async (data = {}): Promise<HttpResponse> => request('/api/aftermarket/queryReceivePurview', {
  method: 'post',
  data,
});
// 会员权益领取
export const submitByCard = async (data = {}): Promise<HttpResponse> => request('/api/ls/submitByCard', {
  method: 'post',
  data,
});
