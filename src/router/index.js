import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
function Router(props){
    return (
        <Switch>
            {
                props.routes.map((item,index)=>{
                    if(item.path==='*'){
                        return <Redirect key={index} to={item.redirect}/>
                    }else{
                        return <Route key={item.path} path={item.path} component={item.component} />
                    }
                })
            }
        </Switch>
    )
}
export default Router