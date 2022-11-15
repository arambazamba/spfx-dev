import * as React from "react";
import { SkillsCtx } from "../skills-context";
import AddSkill from "./AddSkill";
import SkillFilter from "./SkillFilter";
import SkillItem from "./SkillItem";
import "./SkillList.css";

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
