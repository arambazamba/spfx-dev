import * as React from 'react';
import { connect } from "react-redux";

const ChildComponent2 = (props) =>{
    console.log("props in child 2",props)
    return(
        <ul>
            {props.employees.map((item)=>{
                   return(
                       <>
                        <li>{item.Title}</li>
                        <li>{item.Email}</li>
                        <li>{item.Position}</li>
                        <br></br>
                        <br></br>
                       </>
                    
                   ) 
            })}
        </ul>
    )
}
const mapStateToProps = (state) =>{
    return{
        employees: state.employees
    }
}
export default connect(mapStateToProps)(ChildComponent2);
