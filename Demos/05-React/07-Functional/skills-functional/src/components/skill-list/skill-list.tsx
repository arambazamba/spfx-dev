import { FC } from 'react';
import { Skill } from '../../skill';

export interface ISkillListProps {
	skills: Skill[];
}

export const SkillList : FC<ISkillListProps> = (props: ISkillListProps) =>{

    return (
        <div className="container">
            {
                props.skills.map((sk: Skill)=>{
                    return (<div>{sk.name}</div>)
                })
            }
        </div>
    )
}