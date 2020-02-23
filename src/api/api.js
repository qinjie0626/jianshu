
let now = '/asimov/trending/now'
// 文章内容
let asimov = '/asimov/p/'
let music = 'http://localhost:3000'
let Login = music + '/login/cellphone'
let Register= music + '/register/cellphone'
// 验证验证码
let captCha = music + '/captcha/verify'
let existence = music + '/cellphone/existence/check'
// 发送验证码
let sent = music + '/captcha/sent'
// 用户详情
let userDetail = music + '/user/detail'
export default {
    Login,
    Register,
    captCha,
    existence,
    sent,
    userDetail,
    now,
    asimov
}