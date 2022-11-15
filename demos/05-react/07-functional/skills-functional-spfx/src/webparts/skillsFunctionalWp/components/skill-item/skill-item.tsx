import * as React from 'react';
import { FC } from 'react';
import './skill-item.css';
import { Skill } from '../skill';

export interface ISkillItemProps {
	item: Skill;
}

export const SkillItem : FC<ISkillItemProps> = (props: ISkillItemProps )=>{

    const skillClicked = ()=> {console.log(`Deleting skill:  ${ props.item.Title}`)}

    return(
        <div className="skillRow" onClick={skillClicked}>
            {props.item.Title}
        </div>
    )
}