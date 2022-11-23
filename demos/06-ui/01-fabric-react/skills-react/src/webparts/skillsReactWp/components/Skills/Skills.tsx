import * as React from "react";
import styles from "./Skills.module.scss";
import { Skill } from "../skill";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPHttpClient } from "@microsoft/sp-http";

import { DefaultButton, ButtonType } from "office-ui-fabric-react";
import { TextField } from "office-ui-fabric-react/lib/TextField";

export interface SkillProps {
  removeMsg: string;
  skills: Skill[];
  context: WebPartContext;
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
      skills: this.props.skills,
    };
    this.handleSkillChange = this.handleSkillChange.bind(this);
  }

  public render() {
    return (
      <div className={styles.container}>
        <div>
          Your need the follwowing skills:
          <div className={styles.row}>
            <TextField
              onChange={this.handleSkillChange}
              label="Enter a new skill:"
              style={{ width: "200px" }}
            ></TextField>

            <DefaultButton
              buttonType={ButtonType.primary}
              onClick={() => this.addSkill()}
            >
              Add
            </DefaultButton>
          </div>
          <div className={styles.divResponse}>
            You typed: {this.state.addSkill}
          </div>
        </div>
        <ul>
          {this.state.skills.map((item: Skill) => {
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

  private handleSkillChange(e: React.FormEvent<HTMLInputElement>) {
    this.setState({ addSkill: e.currentTarget.value });
  }

  private addSkill(): void {
    const newid = Math.max.apply(
      Math,
      this.state.skills.map((item) => item.Id + 1)
    );
    const param = { Id: newid, Title: this.state.addSkill };

    this.addSkillToSP(param).then((resp) => {
      console.log(resp);
      this.setState({
        skills: this.state.skills.concat([param]),
      });
      console.log(`Adding skill: ${this.state.addSkill} with ${newid}`);
    });
  }

  private addSkillToSP(skill: Skill) {
    console.log(`Adding skill to SP: ${skill.Title}`);
    const qry: string = `${this.props.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('skills')/items`;
    return this.props.context.spHttpClient.post(
      qry,
      SPHttpClient.configurations.v1,
      {
        body: JSON.stringify(skill),
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
      }
    );
  }

  private removeSkill(skill: Skill): void {
    this.removeSkillFromSP(skill).then(() => {
      let arrSkills = this.state.skills.filter((sk: Skill) => sk !== skill);
      this.setState({
        skills: arrSkills,
      });
    });
  }

  private removeSkillFromSP(skill: Skill) {
    console.log(`Removing skill to SP: ${skill.Title}`);
    const qry: string = `${this.props.context.pageContext.web.absoluteUrl}/_api/web/lists/getbytitle('skills')/items(${skill.Id})`;

    return this.props.context.spHttpClient.post(
      qry,
      SPHttpClient.configurations.v1,
      {
        body: JSON.stringify(skill),
        headers: {
          "IF-MATCH": "*",
          "X-HTTP-Method": "DELETE",
          accept: "application/json",
          "content-type": "application/json",
        },
      }
    );
  }
}
