"use strict";
import powerbi from "powerbi-visuals-api";
import DataView = powerbi.DataView;
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import * as React from "react";
import * as ReactDOM from "react-dom";
import ReactCircleCard, { initialState, State } from "./Comp"; // Adjust the path if necessary
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

            // Extract categories and values from the dataView
            const categories = dataView.categorical.categories[0].values; // X-axis values (student names)
            const values = dataView.categorical.values[0].values; // Y-axis values (percentages)

            // Map the extracted data to the format expected by ReactCircleCard
            const filteredData = categories.map((category: any, index: number) => {
                return {
                    name: category,       // Student name
                    percentage: values[index] // Student percentage
                };
            });

            // Pass the updated state to ReactCircleCard
            ReactCircleCard.update({
                color: "#8884d8", // Default color or retrieve from data if needed
                startRange: 0,    // Default start range or retrieve from data if needed
                endRange: 100,    // Default end range or retrieve from data if needed
                filteredData: filteredData // Pass the transformed data
            });
        } else {
            this.clear();
        }
    }

    private clear() {
        ReactCircleCard.update(initialState);
    }

    private renderReactComponent(initialState: State) {
        this.reactRoot = React.createElement(ReactCircleCard, {});
        ReactDOM.render(this.reactRoot, this.target);
    }
}
