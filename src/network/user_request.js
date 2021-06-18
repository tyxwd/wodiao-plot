import {request, longTimeRequest} from "./request";

export function toRegister(_register_form) {
    return request({
        url:"/to_register",
        method:"post",
        data:{
            register_form:_register_form,
        }
    })
}

export function isActivated(_uuid) {
    return longTimeRequest({
        url:"/is_activated",
        method:"post",
        data:{
            uuid:_uuid,
        }
    })
}

export function toLogin(login_form) {
    return longTimeRequest({
        url:"/login",
        method:"post",
        data:{
            login_form:login_form,
        }
    })
}

export function getUserInfo() {
    return request({
        url:"/get_user_info",
        method:"post",
    })
}

// 退出登陆
export function toExit() {
    return request({
        url:"/user_exit",
        method:"post",
    })
}

export function getUserPassword() {
    return request({
        url:"/get_user_password",
        method:"post",
    })
}