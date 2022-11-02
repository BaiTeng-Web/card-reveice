import request from './request';

export interface HttpResponse {
  status: number
  success?: boolean
  traceId?: string
  data: any
}

export const getVerificationCode = async (data = {}): Promise<HttpResponse> => request('/api/message/sendMessage', {
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
