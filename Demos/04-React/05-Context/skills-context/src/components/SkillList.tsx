import * as React from "react";
import "./SkillList.css";
import { Skill } from "../skill";
import AddSkill from "./AddSkill";
import SkillItem from "./SkillItem";
import SkillFilter from "./SkillFilter";
import { IContext, SkillsCtx } from "../skills-context";

export interface SkillListProps {}

export interface SkillListState {}

export default class SkillList extends React.Component<
  SkillListProps,
  SkillListState
> {
  constructor(props: SkillListProps) {
    super(props);
  }

  render() {
    return (
      <SkillsCtx.Consumer>
        {({skills,filterSkills,removeSkill,toggleComplete,addSkill}):React.ReactNode=>(
          <div className="container">
            <SkillFilter onFilter={filterSkills} />
            <div>Your need the follwowing skills</div>
            <div className="skillContainer">
              {skills.map((item: any) => {
                return (
                  <SkillItem
                    key={item.id}
                    item={item}
                    removeSkill={removeSkill}
                    toggleComplete={toggleComplete}
                  />
                ); //Notice this.method.bind(this) syntax
              })}
            </div>
            {/* Notice we don't use this.method.bind(this) syntax here ... instead we implement an arrow function */}
            <AddSkill addSkill={addSkill} />
          </div>
        )}
      </SkillsCtx.Consumer>
      
    );
  }

}

SkillList.contextType = SkillsCtx;
