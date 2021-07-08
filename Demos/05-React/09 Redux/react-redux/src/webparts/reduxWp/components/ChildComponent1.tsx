import * as React from "react";
import { connect } from "react-redux";
import {Table} from 'reactstrap';

const ChildComponent1 = (props) =>{
    console.log("props in child 1",props)
    return(
        <Table>
            <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Position</th>
            </tr>
            </thead>
            
            <tbody>
                {props.employees.map((item)=>{
                   return <tr>
                        <td>{item.Title}</td>
                        <td>{item.Email}</td>
                        <td>{item.Position}</td>
                    </tr>
                })}
            </tbody>
        </Table>
    )
};
const mapStateToProps = (state) =>{
    return{
        employees: state.employees
    }
}
export default connect(mapStateToProps)(ChildComponent1);