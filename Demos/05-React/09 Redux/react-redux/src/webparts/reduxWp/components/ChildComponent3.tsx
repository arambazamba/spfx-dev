import * as React from 'react';
import { connect } from "react-redux";
import {Card, CardBody, CardText} from 'reactstrap';

const ChildComponent3 = (props) =>{
    console.log("props in child 3",props)
    return(
        <>
        {
            props.employees.map((item)=>{
                return(
                    <Card style={{backgroundColor: 'bisque'}}>
                        <CardBody>
                            <CardText>{item.Title}</CardText>
                            <CardText>{item.Email}</CardText>
                            <CardText>{item.Position}</CardText>
                        </CardBody>
                    </Card>
                )
            })
        }
        </>
        
    )
}
const mapStateToProps = (state) =>{
    return{
        employees: state.employees
    }
}
export default connect(mapStateToProps)(ChildComponent3);
