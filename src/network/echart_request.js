import {request} from "./request";

// 获取初始list信息；
export function get_type_list() {
    return request({
        url: "/get_type_list",
        method: "post",
        data: {
            module: "echarts"
        }
    })
}

// 获取当前echart的示例数据；
export function get_type_init_data(type) {
    return request({
        url: "/get_type_init_data",
        method: "post",
        data: {
            type: type,
            module: "echarts"
        }
    })
}

export function download_excel(type){
    return request({
        url:"/static/init_excel/echarts/" + type +".xlsx",
        method:"get",
        headers: {
            'Content-Type': 'blob',
        }
    })
}

// 获取用户提交的信息；
export function get_echart_data(excel_id, suffix, type) {
    return request({
        url: "/get_data",
        method: "post",
        data: {
            module: "echarts",
            excel_id_dict: {
                excel_id: excel_id,
                suffix: suffix,
                type: type,
            }
        }
    })
}