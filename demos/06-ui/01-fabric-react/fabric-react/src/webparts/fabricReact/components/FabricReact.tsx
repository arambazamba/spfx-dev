import * as React from 'react';
import styles from './FabricReact.module.scss';
import { IFabricReactProps, IFabricReactState } from './IFabricReactProps';
// import { escape } from '@microsoft/sp-lodash-subset';
import {
  DefaultButton,
  ButtonType,
  Nav,
  Panel,
  PanelType,
} from "office-ui-fabric-react";

export default class FabricReact extends React.Component<IFabricReactProps, IFabricReactState> {

  constructor(props: IFabricReactProps) {
    super(props);
    this.state = {
      showPanel: false,
    };
  }

  public render(): React.ReactElement<IFabricReactProps> {
    // const {
    //   description,
    //   isDarkTheme,
    //   environmentMessage,
    //   hasTeamsContext,
    //   userDisplayName
    // } = this.props;

    return (
      <div>
        <div className="ms-BasicButtonsExample">
          <DefaultButton data-automation-id="test">Normal button</DefaultButton>
          <DefaultButton
            data-automation-id="test"
            buttonType={ButtonType.primary}
            onClick={this._buttonOnClickHandler.bind(this)}
          >
            Primary button
          </DefaultButton>
        </div>

        <div className="ms-NavExample-LeftPane">
          <Nav
            groups={[
              {
                links: [
                  {
                    name: "Home",
                    url: "http://example.com",
                    links: [
                      {
                        name: "Activity",
                        url: "http://msn.com",
                      },
                      {
                        name: "News",
                        url: "http://msn.com",
                      },
                    ],
                    isExpanded: true,
                  },
                  {
                    name: "Documents",
                    url: "http://example.com",
                    isExpanded: true,
                  },
                  { name: "Pages", url: "http://msn.com" },
                  { name: "Notebook", url: "http://msn.com" },
                  {
                    name: "MSN",
                    url: "http://msn.com",
                  },
                  {
                    name: "Edit Link",
                    url: "http://example.com",
                    iconClassName: "ms-Icon--Edit",
                  },
                  {
                    name: "Edit",
                    url: "#",
                    onClick: this._navOnClickHandler,
                    icon: "Edit",
                  },
                ],
              },
            ]}
          />
        </div>

        <div className="ms-PanelExample">
          <DefaultButton
            description="Opens the Sample Panel"
            onClick={this._showPanel.bind(this)}
          >
            Open Panel
          </DefaultButton>
          <Panel
            isOpen={this.state.showPanel}
            type={PanelType.smallFixedFar}
            onDismiss={this._closePanel.bind(this)}
            headerText="Panel - Small, right-aligned, fixed"
          >
            <span className="ms-font-m">Content goes here.</span>
          </Panel>
        </div>
      </div>
    );
  }

  private _buttonOnClickHandler() {
    alert("You clicked the primary button");
    return false;
  }

  private _navOnClickHandler() {
    alert("You clicked the edit button in navigation");
    return false;
  }

  private _showPanel() {
    this.setState({ showPanel: true });
  }

  private _closePanel() {
    this.setState({ showPanel: false });
  }
}
