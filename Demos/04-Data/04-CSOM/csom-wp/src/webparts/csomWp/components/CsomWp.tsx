import * as React from 'react';
import styles from './CsomWp.module.scss';
import { ICsomWpProps } from './ICsomWpProps';
import { escape } from '@microsoft/sp-lodash-subset';

export interface ICsomWpState {
  listTitles: string[];
  loadingLists: boolean;
  error: string;
}

export default class CsomWp extends React.Component<ICsomWpProps, ICsomWpState> {

  constructor(props?: ICsomWpProps, context?: any) {
    super(props);

    this.state = {
      listTitles: [],
      loadingLists: false,
      error: null,
    };

    this.getListsTitles = this.getListsTitles.bind(this);
  }

  private getListsTitles(): void {
    this.setState({
      loadingLists: true,
      listTitles: [],
      error: null,
    });

    const context: SP.ClientContext = new SP.ClientContext(this.props.siteUrl);
    const lists: SP.ListCollection = context.get_web().get_lists();
    context.load(lists, "Include(Title)");
    context.executeQueryAsync(
      (sender: any, args: SP.ClientRequestSucceededEventArgs): void => {
        const listEnumerator: IEnumerator<SP.List> = lists.getEnumerator();

        const titles: string[] = [];
        while (listEnumerator.moveNext()) {
          const list: SP.List = listEnumerator.get_current();
          titles.push(list.get_title());
        }

        this.setState(
          (prevState: ICsomWpState, props: ICsomWpProps): ICsomWpState => {
            prevState.listTitles = titles;
            prevState.loadingLists = false;
            return prevState;
          }
        );
      },
      (sender: any, args: SP.ClientRequestFailedEventArgs): void => {
        this.setState({
          loadingLists: false,
          listTitles: [],
          error: args.get_message(),
        });
      }
    );
  }

  public render(): React.ReactElement<ICsomWpProps> {
    const titles: JSX.Element[] = this.state.listTitles.map(
      (listTitle: string, index: number, listTitles: string[]): JSX.Element => {
        return <li key={index}>{listTitle}</li>;
      }
    );

    return (
      <div className={ styles.csomWp }>
        <div className={ styles.container }>
        <div
            className={`ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}`}
          >
            <div className="ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1">
              <span className="ms-font-xl ms-fontColor-white">
                Welcome to SharePoint!
              </span>
              <p className="ms-font-l ms-fontColor-white">
                Customize SharePoint experiences using Web Parts.
              </p>
              <p className="ms-font-l ms-fontColor-white">
                {escape(this.props.description)}
              </p>
              <a
                className={styles.button}
                onClick={this.getListsTitles}
                role="button"
              >
                <span className={styles.label}>Get lists titles</span>
              </a>
              <br />
              {this.state.loadingLists && <span>Loading lists...</span>}
              {this.state.error && (
                <span>
                  An error has occurred while loading lists: {this.state.error}
                </span>
              )}
              {this.state.error === null && titles && <ul>{titles}</ul>}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
