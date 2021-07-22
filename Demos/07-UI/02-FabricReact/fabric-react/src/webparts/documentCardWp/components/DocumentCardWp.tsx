import * as React from "react";
import styles from "./DocumentCardWp.module.scss";
import { IDocumentCardWpProps } from "./IDocumentCardWpProps";
import { escape } from "@microsoft/sp-lodash-subset";
import {
  DocumentCard,
  DocumentCardPreview,
  DocumentCardTitle,
  DocumentCardActivity,
  IDocumentCardPreviewProps,
} from "office-ui-fabric-react/lib/DocumentCard";

export default class DocumentCardWp extends React.Component<
  IDocumentCardWpProps,
  {}
> {
  previewProps: IDocumentCardPreviewProps = {
    previewImages: [
      {
        previewImageSrc: String(require("./document-preview.png")),
        iconSrc: String(require("./icon-ppt.png")),
        width: 318,
        height: 196,
        accentColor: "#ce4b1f",
      },
    ],
  };

  public render(): React.ReactElement<IDocumentCardWpProps> {
    return (
      <DocumentCard onClickHref="http://bing.com">
        <DocumentCardPreview {...this.previewProps} />
        <DocumentCardTitle title="Revenue stream proposal fiscal year 2016 version02.pptx" />
        <DocumentCardActivity
          activity="Created Feb 23, 2016"
          people={[
            {
              name: "Kat Larrson",
              profileImageSrc: String(require("./avatar-kat.png")),
            },
          ]}
        />
      </DocumentCard>
    );
  }
}
