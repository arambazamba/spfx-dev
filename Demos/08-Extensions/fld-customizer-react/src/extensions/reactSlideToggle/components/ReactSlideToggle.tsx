import { Log } from '@microsoft/sp-core-library';
import { override } from '@microsoft/decorators';
import * as React from 'react';
import { Toggle as ReactToggle } from "office-ui-fabric-react";

import styles from './ReactSlideToggle.module.scss';

export interface IReactSlideToggleProps {
  checked: string;
  id: string;
  disabled: boolean;
  onChanged: (checked: boolean, id: string) => void;
}

interface IReactSlideToggleState {
  checked?: boolean;
}

const LOG_SOURCE: string = 'ReactSlideToggle';

export default class ReactSlideToggle extends React.Component<IReactSlideToggleProps, IReactSlideToggleState> {

  constructor(props: IReactSlideToggleProps, state: IReactSlideToggleState) {
    super(props, state);

    const curVal = props.checked === "Yes" ? true : false;

    this.state = {
      checked: curVal,
    };
  }

  @override
  public componentDidMount(): void {
    Log.info(LOG_SOURCE, 'React Element: ReactSlideToggle mounted');
  }

  @override
  public componentWillUnmount(): void {
    Log.info(LOG_SOURCE, 'React Element: ReactSlideToggle unmounted');
  }

  @override
  public render(): React.ReactElement<{}> {
    return (
      <div className={styles.cell}>
        <ReactToggle
          defaultChecked={this.state.checked}
          onText="Yes"
          offText="No"
          onChanged={this.onChanged.bind(this)}
          disabled={this.props.disabled}
        />
      </div>
    );
  }

  private onChanged(checked: boolean): void {
    if (this.props.onChanged) this.props.onChanged(checked, this.props.id);
  }
}
