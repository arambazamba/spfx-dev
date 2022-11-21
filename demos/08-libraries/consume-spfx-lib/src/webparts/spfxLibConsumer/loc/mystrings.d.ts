declare interface ISpfxLibConsumerWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
}

declare module 'SpfxLibConsumerWebPartStrings' {
  const strings: ISpfxLibConsumerWebPartStrings;
  export = strings;
}
