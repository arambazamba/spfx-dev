import * as React from "react";
import { connect } from "react-redux";
import {listaction} from "../store/action/Action";
import { sp, Web } from '@pnp/sp/presets/all';

const RootComponent = (props) =>{
console.log("props of root are", props)
    React.useEffect(()=>{
        sp.web.lists.getByTitle("Employees").items.get().then((items)=>{
            console.log("employee items", items)
            props.listaction(items);
        })
    },[])
    return(
        <h1 style={{textAlign: 'center'}}>Employee Details</h1>
    )
}
const mapStateToProps=(state)=>{
    return{
        employees: state.employees
    }
}
const mapDispatchToProps = (dispatch) =>{
    return{
        listaction: (items: any) => dispatch(listaction(items))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(RootComponent);