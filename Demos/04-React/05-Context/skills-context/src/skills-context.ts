import React from "react";
import { Skill } from "./skill";

export interface IContext {
    skills: Skill[];
    original_skills:Skill[],
    removeSkill:(skill: Skill)=>void,
    toggleComplete:(id: number)=>void,
    addSkill:(skill: string)=>void,
    filterSkills: (filter: string)=>void
  }

export const SkillsCtx = React.createContext<IContext>({
    skills:[],
    original_skills:[],
    removeSkill:(skill: Skill): void => {},
    toggleComplete:(id: number):void => {},
    addSkill:(skill: string) => {},
    filterSkills: (filter: string):void => {}
});
