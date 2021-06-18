import {request} from "./request";

export function toRegister(_register_form) {
    return request({
        url:"/to_register",
        method:"post",
        data:{
            register_form:_register_form,
        }
    })
}