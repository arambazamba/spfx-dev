import * as React from "react";
import styles from "./Skills.module.scss";
import { Skill } from "../skill";

export interface SkillProps {
  removeMsg: string;
  skills: Skill[];
}

export interface SkillState {
  addSkill: string;
  skills: Skill[];
}

export class Skills extends React.Component<SkillProps, SkillState> {
  constructor(props: SkillProps) {
    super(props);
    this.state = {
      addSkill: "",
      skills: this.props.skills
    };
    this.handleSkillChange = this.handleSkillChange.bind(this);
  }

  render() {
    return (
      <div className={styles.container}>
        <div>
          Your need the follwowing skills:
          <div>
            <label className={styles.lblNewSkill}>Enter a new skill:</label>
            <input type="text" onChange={this.handleSkillChange} />
            <button onClick={() => this.addSkill()}>Add</button>
          </div>
          <div className={styles.divResponse}>
            You typed: {this.state.addSkill}
          </div>
        </div>
        <ul>
          {this.props.skills.map((item: Skill) => {
            return (
              <li
                key={item.Id}
                onClick={() => this.removeSkill(item)}
                className="li-skills"
              >
                {item.Title}
              </li>
            );
          })}
        </ul>
        <br />
        <h5>{this.props.removeMsg}</h5>
      </div>
    );
  }

  handleSkillChange(e: React.FormEvent<HTMLInputElement>) {
    this.setState({ addSkill: e.currentTarget.value });
  }

  addSkill(): void {
    let newid = Math.max.apply(
      Math,
      this.state.skills.map(item => item.Id + 1)
    );
    this.setState({
      skills: this.state.skills.concat([
        { Id: newid, Title: this.state.addSkill }
      ])
    });
    console.log(`Adding skill: ${this.state.addSkill} with ${newid}`);
  }

  removeSkill(skill: Skill): void {
    console.log(`Removing skill: ${skill.Title}`);
    this.setState({
      skills: this.state.skills.filter((i: Skill) => i !== skill)
    });
  }
}
