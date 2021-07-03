import * as React from 'react';
import { useState, useEffect, FC } from 'react';
import { ISkillsFunctionalWpProps } from './ISkillsFunctionalWpProps';
import styles from './SkillsFunctionalWp.module.scss';
import { TextField, PrimaryButton } from 'office-ui-fabric-react';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { Skill } from './skill';
import { SkillItem } from './skill-item/skill-item';

export const SkillsFunctionalWp : FC<ISkillsFunctionalWpProps> = (props: ISkillsFunctionalWpProps)=>{
  
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    sp.setup({
      spfxContext: props.context
    });
    getSkillsFromSP()
  }, []);

  const getSkillsFromSP = async () => {
    const items: any[] = await sp.web.lists.getByTitle("Skills").items.getAll();  
    setSkills(items);
  }
  
  return (
    <div className={styles.container}>
      {
        skills.map((sk: Skill)=>{
            return (<SkillItem item={sk} key={sk.ID} ></SkillItem>)
        })
      }
      <div>Click to delete</div>
    </div>
  )
}
