import * as ttfArtifact from "./ttf/artifact_pb";
import * as ttfCore from "./ttf/core_pb";
import * as vscode from "vscode";

import { ArtifactPanelBase } from "./artifactPanelBase";
import { ITtfInterface } from "./ttfInterface";
import { propertySetPanelEvents } from "./panels/propertySetPanelEvents";
import { TokenTaxonomy } from "./tokenTaxonomy";

export class PropertySetPanel extends ArtifactPanelBase<ttfCore.PropertySet> {
  static async createNewPropertySet(
    ttfConnection: ITtfInterface,
    environment: string,
    ttfTaxonomy: TokenTaxonomy,
    extensionPath: string,
    disposables: vscode.Disposable[],
    panelReloadEvent: vscode.Event<void>
  ) {
    const panel = new PropertySetPanel(
      ttfConnection,
      environment,
      ttfTaxonomy,
      extensionPath,
      disposables,
      panelReloadEvent
    );
    return await ArtifactPanelBase.createNew(
      ttfConnection,
      ttfTaxonomy,
      panel,
      new ttfCore.PropertySet(),
      "taxonomy.model.core.PropertySet",
      ttfArtifact.ArtifactType.PROPERTY_SET
    );
  }

  static async openExistingPropertySet(
    artifactId: string,
    ttfConnection: ITtfInterface,
    environment: string,
    ttfTaxonomy: TokenTaxonomy,
    extensionPath: string,
    disposables: vscode.Disposable[],
    panelReloadEvent: vscode.Event<void>
  ) {
    const panel = new PropertySetPanel(
      ttfConnection,
      environment,
      ttfTaxonomy,
      extensionPath,
      disposables,
      panelReloadEvent
    );
    await panel.openArtifact(artifactId);
    return panel;
  }

  private constructor(
    ttfConnection: ITtfInterface,
    environment: string,
    ttfTaxonomy: TokenTaxonomy,
    extensionPath: string,
    disposables: vscode.Disposable[],
    panelReloadEvent: vscode.Event<void>
  ) {
    super(
      ttfConnection,
      "taxonomy.model.core.PropertySet",
      environment,
      ttfTaxonomy,
      "Property Set",
      "property-set.svg",
      "propertySetPanel",
      "propertySetPanel.main.js",
      extensionPath,
      disposables,
      panelReloadEvent
    );
  }

  protected async onUnhandledMessage(message: any) {
  }

  protected async getArtifact(
    symbol: ttfArtifact.ArtifactSymbol
  ): Promise<ttfCore.PropertySet> {
    return await new Promise((resolve, reject) =>
      this.ttfConnection.getPropertySetArtifact(
        symbol,
        (error, response) => (error && reject(error)) || resolve(response)
      )
    );
  }
}
