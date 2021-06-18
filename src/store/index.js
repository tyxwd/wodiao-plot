import Vue from 'vue'
import Vuex from 'vuex'
// import  from './mutations'
import {
    scatter_option,
    tree_option, treemap_option, sunburst_option, boxplot_option, heatmap_option, parallel_option,
    graph_option, sankey_option,
} from "./options";

// 1.安装插件
Vue.use(Vuex)
// 2.创建对象
const state = {
    user: {
        username: "wodiao"
    },
    user_info: null,
    login: false,
    chart_time: 0,
    chart_clear_time:0,
    chart_mounted_time:0, // echart画完后，可以显示图标调整的v-if；
    chart_type: null,
    show_xy: true,
    chart_option: {
        option: {
            title: {
                text: "这是一个标题",
                textStyle: {},
                left: "center",
                top: "10%"
            },
            xAxis: {
                name: '这是X轴的名称',
                nameLocation: 'middle',
                nameTextStyle: {
                    color: "#000000"
                },
                axisPointer: {
                    show: true,
                    label: {
                        show: true,
                    }
                },
                axisLabel: {
                    formatter: '{value}'
                },
                show: true,
                position: 'bottom',
                offset: 0,
                nameGap: 30,
                type: 'category',
                // type: 'value',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            },
            yAxis: {
                name: '这是Y轴的名称',
                nameLocation: 'middle',
                nameTextStyle: {
                    color: "#000000",
                    fontStyle: "normal",
                    fontWeight: 'bolder',
                    fontFamily: 'sans-serif',
                    fontSize: 18,
                },
                axisPointer: {
                    show: true,
                    label: {
                        show: true,
                    }
                },
                show: true,
                position: 'left',
                offset: 0,
                boundaryGap: true,
                nameGap: 30,
                nameRotate: 90,
                type: 'value'
            },
            tooltip: {
                show: true,
                trigger: 'item',
                axisPointer: {
                    type: 'cross',
                }
            }, // 鼠标点上去的指示器；
            legend: {
                orient: 'vertical',
                left: 'left',
            },
            series: [
                {
                    data: [120, 200, 150, 80, 70, 110, 130],
                    type: 'bar',
                    showBackground: false,
                    emphasis: {
                        focus: 'series',
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    barWidth: '70%',
                    backgroundStyle: {
                        color: 'rgba(180, 180, 180, 0.9)'
                    },
                    labelLayout: {
                        draggable: true,
                    },
                    // color: '#a90000', // 改颜色
                }
            ]
        },
        radar_option: {
            title: {
                text: "这是一个标题",
                textStyle: {},
                // left: "center",
                left: "70%",
                top: "10%"
            },
            tooltip: {
                show: true,
                trigger: 'item',
                axisPointer: {
                    type: 'cross',
                }
            }, // 鼠标点上去的指示器；
            toolbox: {
                show: true,
                orient: 'horizontal',
                feature: {
                    saveAsImage: {
                        show: true,
                    }
                }
            }, // 功能插件；
            legend: {
                data: [
                    "预算分配（Allocated Budget）",
                    "实际开销（Actual Spending）"
                ]
            },
            radar: {
                // shape: 'circle',
                indicator: [
                    {name: '销售（Sales）', max: 6500},
                    {name: '管理（Administration）', max: 16000},
                    {name: '信息技术（Information Technology）', max: 30000},
                    {name: '客服（Customer Support）', max: 38000},
                    {name: '研发（Development）', max: 52000},
                    {name: '市场（Marketing）', max: 25000}
                ]
            },
            series: [
                {
                    name: '预算 vs 开销（Budget vs spending）',
                    type: 'radar',
                    data: [
                        {
                            value: [4200, 3000, 20000, 35000, 50000, 18000],
                            name: '预算分配（Allocated Budget）'
                        },
                        {
                            value: [5000, 14000, 28000, 26000, 42000, 21000],
                            name: '实际开销（Actual Spending）'
                        }
                    ],
                    // data:[
                    //     {
                    //         'value': [
                    //             4200,
                    //             3000,
                    //             20000,
                    //             35000,
                    //             50000,
                    //             18000
                    //         ],
                    //         'name': '预算分配（Allocated Budget）'
                    //     },
                    //     {
                    //         'value': [
                    //             5000,
                    //             14000,
                    //             28000,
                    //             26000,
                    //             42000,
                    //             21000
                    //         ],
                    //         'name': '实际开销（Actual Spending）'
                    //     },
                    //     {
                    //         'value': [
                    //             3700,
                    //             10000,
                    //             29000,
                    //             29000,
                    //             32000,
                    //             24000
                    //         ],
                    //         'name': 'group3'
                    //     },
                    //     {
                    //         'value': [
                    //             6000,
                    //             14000,
                    //             21000,
                    //             20000,
                    //             22000,
                    //             18000
                    //         ],
                    //         'name': 'groupx'
                    //     }
                    // ],
                    label: {
                        show: false,
                        position: "outside",
                        rotate: 0,
                        offset: [
                            0,
                            0
                        ],
                        color: "#000000",
                        fontStyle: "normal",
                        fontWeight: "bolder",
                        fontFamily: "sans-serif",
                        fontSize: 12,
                        formatter: "{c}"
                    },
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: "rgba(0, 0, 0, 0.5)"
                        }
                    },
                    areaStyle: {
                        color: null,
                        shadowBlur: 0,
                        shadowColor: "#000",
                        shadowOffsetX: 0,
                        shadowOffsetY: 0,
                    },
                }
            ]
        },
        scatter_option,
        tree_option,
        treemap_option,
        sunburst_option,
        boxplot_option,
        heatmap_option,
        parallel_option,
        graph_option,
        sankey_option,
        option_copy: {
            title: {
                "text": "这是一个标题",
                "textStyle": {
                    "color": "#000000",
                    "fontStyle": "normal",
                    "fontWeight": 100,
                    "fontFamily": "sans-serif",
                    "fontSize": 18
                },
                "left": "70%",
                "top": "1%"
            },
            xAxis: {
                "name": "这是X 轴的名称",
                "nameLocation": "middle",
                "nameTextStyle": {
                    "color": "#000000",
                    "fontStyle": "normal",
                    "fontWeight": 100,
                    "fontFamily": "sans-serif",
                    "fontSize": 18
                },
                "show": true,
                "position": "bottom",
                "offset": 0,
                "boundaryGap": true,
                "nameGap": 30,
                "nameRotate": 0,
                "axisLine": {
                    "show": true,
                    "onZero": true,
                    "symbol": "none",
                    "symbolSize": [
                        10,
                        10
                    ]
                },
                "axisTick": {
                    "show": true,
                    "length": 5
                },
                "axisLabel": {
                    "show": true,
                    "rotate": 0,
                    "margin": 8,
                    "color": "#000000",
                    "fontStyle": "normal",
                    "fontWeight": 100,
                    "fontFamily": "sans-serif",
                    "fontSize": 12,
                    "verticalAlign": "auto"
                },
                "data": null
            },
            yAxis: {
                "name": "这是Y 轴的名称",
                "nameLocation": "middle",
                "nameTextStyle": {
                    "color": "#000000",
                    "fontStyle": "normal",
                    "fontWeight": 100,
                    "fontFamily": "sans-serif",
                    "fontSize": 18
                },
                "show": true,
                "position": "left",
                "offset": 0,
                "boundaryGap": true,
                "nameGap": 30,
                "nameRotate": 90,
                "axisLine": {
                    "show": true,
                    "onZero": true,
                    "symbol": "none",
                    "symbolSize": [
                        10,
                        10
                    ]
                },
                "axisTick": {
                    "show": true,
                    "length": 5
                },
                "axisLabel": {
                    "show": true,
                    "rotate": 0,
                    "margin": 8,
                    "color": "#000000",
                    "fontStyle": "normal",
                    "fontWeight": 100,
                    "fontFamily": "sans-serif",
                    "fontSize": 12,
                    "verticalAlign": "auto"
                }
            },
            tooltip: {
                show: true,
                trigger: 'item',
                axisPointer: {
                    type: 'cross',
                }
            }, // 鼠标点上去的指示器；
            legend: {
                orient: 'vertical',
                left: 'left',
            },
            series: [
                {
                    data: [120, 200, 150, 80, 70, 110, 130],
                    type: 'bar',
                    showBackground: false,
                    emphasis: {
                        focus: 'series',
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    barWidth: '70%',
                    backgroundStyle: {
                        color: 'rgba(180, 180, 180, 0.9)'
                    },
                    labelLayout: {
                        draggable: true,
                    },
                    // color: '#a90000', // 改颜色
                }
            ]
        },
    },
}

const store = new Vuex.Store({
    state,
    mutations: {
        set_option(state, value) {
            state.chart_option.option.title.text = value
        },
        change_chart_time(state) {
            state.chart_time = new Date().getTime();
        },
        change_chart_clear_time(state) {
            state.chart_clear_time = new Date().getTime();
        },
        change_chart_mounted_time(state) {
            state.chart_mounted_time = new Date().getTime();
        },
        set_chart_type(state, value) {
            state.chart_type = value
            state.chart_option.option = null
            if (value === 'Scatter') {
                state.chart_option.option = JSON.parse(JSON.stringify(state.chart_option.scatter_option))
            } else if (value === 'Radar') {
                state.chart_option.option = JSON.parse(JSON.stringify(state.chart_option.radar_option))
            } else if (value === "Tree") {
                state.chart_option.option = JSON.parse(JSON.stringify(state.chart_option.tree_option))
            } else if (value === "TreeMap") {
                state.chart_option.option = JSON.parse(JSON.stringify(state.chart_option.treemap_option))
            } else if (value === "Sunburst") {
                state.chart_option.option = JSON.parse(JSON.stringify(state.chart_option.sunburst_option))
            } else if (value === "Treemap") {
                state.chart_option.option = JSON.parse(JSON.stringify(state.chart_option.treemap_option))
            } else if (value === "Boxplot") {
                state.chart_option.option = JSON.parse(JSON.stringify(state.chart_option.boxplot_option))
            } else if (value === "Heatmap") {
                state.chart_option.option = JSON.parse(JSON.stringify(state.chart_option.heatmap_option))
            } else if (value === "Parallel") {
                state.chart_option.option = JSON.parse(JSON.stringify(state.chart_option.parallel_option))
            } else if (value === "Graph") {
                state.chart_option.option = JSON.parse(JSON.stringify(state.chart_option.graph_option))
            } else if (value === "Sankey") {
                state.chart_option.option = JSON.parse(JSON.stringify(state.chart_option.sankey_option))
            } else {
                state.chart_option.option = JSON.parse(JSON.stringify(state.chart_option.option_copy))
            }
            state.show_xy = !(value === 'Radar' || value === 'Pie' || value === 'Tree' || value === 'TreeMap'
                || value === 'Sunburst' || value === 'Parallel' || value === 'Graph' || value === 'Sankey');
        },
    }
})

// 3.导出store独享
export default store


// 新的不知道怎么用
// import { createApp } from 'vue'
// import { createStore } from 'vuex'
//
// const store = createStore( {
//     user: {
//         username: "wodiao"
//     },
//     user_info: null,
//     login: false,
//     chart_option: {
//         option: {
//             title: {
//                 text: "这是一个标题",
//             },
//             xAxis: {
//                 type: 'category',
//                 data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
//             },
//             yAxis: {
//                 type: 'value'
//             },
//             series: [{
//                 data: [120, 200, 150, 80, 70, 110, 130],
//                 type: 'bar',
//                 showBackground: true,
//                 backgroundStyle: {
//                     color: 'rgba(180, 180, 180, 0.9)'
//                 },
//             }]
//         }
//     }
// })
// const app = createApp({})
// app.use(store)