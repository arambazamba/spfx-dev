import { FC } from 'react';
import { User } from '../../user';

export interface IGreeterProps {    
    user: User;    
}

export const Greeter: FC<IGreeterProps> = (props: IGreeterProps) => {    
    
    const formatName = (user: User) =>{
        return user.firstName + ' ' + user.lastName;
    }

    return (    
        <div>
            <h2>Hello, functional {formatName(props.user)}</h2>            
        </div>
    );
 };    

 export default Greeter;
     