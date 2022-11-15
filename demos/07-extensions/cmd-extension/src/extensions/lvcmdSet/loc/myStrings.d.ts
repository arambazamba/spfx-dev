declare interface ILvcmdSetCommandSetStrings {
  Command1: string;
  Command2: string;
}

declare module 'LvcmdSetCommandSetStrings' {
  const strings: ILvcmdSetCommandSetStrings;
  export = strings;
}
