"use strict";
import powerbi from "powerbi-visuals-api";

import DataView = powerbi.DataView;
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import * as React from "react";
import * as ReactDOM from "react-dom";
import ReactCircleCard, { initialState } from "./Comp"; // Adjust the path as necessary
import "./../style/visual.less";

export class Visual implements IVisual {
    private target: HTMLElement;
    private reactRoot: React.ComponentElement<any, any>;

    constructor(options: VisualConstructorOptions) {
        this.target = options.element;
        this.renderReactComponent(initialState);
    }

    public update(options: VisualUpdateOptions) {
        if (options.dataViews && options.dataViews[0]) {
            const dataView: DataView = options.dataViews[0];

            const textLabel = dataView.metadata.columns[0].displayName;
            const textValue = dataView.single ? dataView.single.value.toString() : "";

            ReactCircleCard.update({
                color: "#8884d8", // Default color or retrieve from data if needed
                startRange: 0,    // Default start range or retrieve from data if needed
                endRange: 100,    // Default end range or retrieve from data if needed
                filteredData: []  // You can initialize this as needed
            });
        } else {
            this.clear();
        }
    }

    private clear() {
        ReactCircleCard.update(initialState);
    }

    private renderReactComponent(initialState: any) {
        this.reactRoot = React.createElement(ReactCircleCard, {});
        ReactDOM.render(this.reactRoot, this.target);
    }
}
