import { Skill } from '../../skill';
import { FC } from 'react';
import './skill-item.css';

export interface ISkillItemProps {
	item: Skill;
}

export const SkillItem : FC<ISkillItemProps> = (props: ISkillItemProps )=>{

    const {  name } = props.item;

    const skillClicked = ()=> {console.log(`Deleting skill:  ${ name}`)}

    return(
        <div className="skillRow" onClick={skillClicked}>
            {name}
        </div>
    )
}