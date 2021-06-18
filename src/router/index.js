import Vue from 'vue'
import VueRouter from 'vue-router'


//懒加载
const MainPage = () => import("../views/main_page/MainPage")
const Register = () => import("../views/register_login/Register")
const Login = () => import("../views/register_login/Login")
const PasswordReset = () => import("../views/register_login/PasswordReset")
const LoadPage = () => import ("../views/register_login/LoadPage")
const CalcPage = () => import("../views/calc_page/CalcPage")
const EchartPage = () => import("../views/echarts_page/EchartPage")

// charts类型
const MyLine = () => import("../views/echarts_page/echarts/MyLine")
const MyBar = () => import("../views/echarts_page/echarts/MyBar")
const MyScatter = () => import("../views/echarts_page/echarts/MyScatter")
const MyPie = () => import("../views/echarts_page/echarts/MyPie")
const MyEffectScatter = () => import("../views/echarts_page/echarts/MyEffectScatter")
const MyRadar = ()=> import("../views/echarts_page/echarts/MyRadar")
const MyTree = ()=> import("../views/echarts_page/echarts/MyTree")
const MyTreemap = ()=> import("../views/echarts_page/echarts/MyTreemap")
const MySunburst = ()=> import("../views/echarts_page/echarts/MySunburst")
const MyBoxplot = ()=> import("../views/echarts_page/echarts/MyBoxplot")
const MyHeatmap = ()=> import("../views/echarts_page/echarts/MyHeatmap")
const MyParallel = ()=> import("../views/echarts_page/echarts/MyParallel")
const MyGraph = ()=> import("../views/echarts_page/echarts/MyGraph")
const MySankey = ()=> import("../views/echarts_page/echarts/MySankey")


const children = [
    {
        path: 'Line',
        name: "Line",
        component: MyLine
    },
    {
        path: 'Bar',
        name: "Bar",
        component: MyBar
    },
    {
        path: 'Scatter',
        name: "Scatter",
        component: MyScatter
    },
    {
        path: 'Pie',
        name: "Pie",
        component: MyPie
    },
    {
        path: 'EffectScatter',
        name: "EffectScatter",
        component: MyEffectScatter
    },
    {
        path: 'Radar',
        name: "Radar",
        component: MyRadar
    },
    {
        path: 'Tree',
        name: "Tree",
        component: MyTree
    },
    {
        path: 'Treemap',
        name: "Treemap",
        component: MyTreemap
    },
    {
        path: 'Sunburst',
        name: "Sunburst",
        component: MySunburst
    },
    {
        path: 'Boxplot',
        name: "Boxplot",
        component: MyBoxplot
    },
    {
        path: 'Heatmap',
        name: "Heatmap",
        component: MyHeatmap
    },
    {
        path: 'Parallel',
        name: "Parallel",
        component: MyParallel
    },
    {
        path: 'Graph',
        name: "Graph",
        component: MyGraph
    },
    {
        path: 'Sankey',
        name: "Sankey",
        component: MySankey
    },
]

//1.安装插件
Vue.use(VueRouter)

//2.创建router
const routes = [
    {
        path: '/',
        name: "mainPage",
        component: MainPage
    },
    {
        path: '/register',
        name: "register",
        component: Register
    },
    {
        path: '/login/',
        name: "login",
        component: Login,
    },
    {
        path: '/resetPassword',
        name: "resetPassword",
        component: PasswordReset,
    },
    {
        path: '/loadPage/',
        name: "loadPage",
        component: LoadPage,
    },
    {
        path: '/calcPage',
        name: "calcPage",
        component: CalcPage,
    },
    {
        path: '/echartPage',
        name: "echartPage",
        component: EchartPage,
        children:children,
    },
    // {
    //   path: '/profile',
    //   component: Profile
    // }
]
const router = new VueRouter({
    routes,
    // mode: 'history',
    // base:"/static/dist/"
})

// 3.导出router
export default router
