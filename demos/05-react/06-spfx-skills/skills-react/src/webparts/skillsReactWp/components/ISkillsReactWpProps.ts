import { WebPartContext } from '@microsoft/sp-webpart-base';
import { Skill } from './skill';

export interface ISkillsReactWpProps {
  description: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  skills: Skill[];
  context: WebPartContext;
}
