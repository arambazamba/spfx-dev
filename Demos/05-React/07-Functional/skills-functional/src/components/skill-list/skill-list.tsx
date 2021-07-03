import { FC } from 'react';
import { Skill } from '../../skill';
import './skill-list.css';
import { SkillItem } from '../skill-item/skill-item';

export interface ISkillListProps {
	skills: Skill[];
}

export const SkillList : FC<ISkillListProps> = (props: ISkillListProps) =>{

    return (
        <div className="container">
            {
                props.skills.map((sk: Skill)=>{
                    return (<SkillItem item={sk} key={sk.id} ></SkillItem>)
                })
            }
            <div>Click to delete</div>
        </div>
    )
}