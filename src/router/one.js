// 一级路由
import Index from '../components/index'
import SignIn from '../components/signIn'
import Detail from '../components/detail'
const One = [
    {
        path:'/index',
        component:Index
    },
    {
        path:'/sign',
        component:SignIn
    },
    {
        path:'/detail/:id',
        component:Detail
    },
    {
        path:'*',
        redirect:'/index'
    }
]
export default One