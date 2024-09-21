import * as React from "react";
import powerbi from "powerbi-visuals-api";
import DataView = powerbi.DataView;
export interface State {
    color: string;
    startRange: number;
    endRange: number;
    filteredData: any[];
}
export declare const initialState: State;
export declare class ReactCircleCard extends React.Component<{}, State> {
    constructor(props: any);
    static update(newState: State): void;
    updateData(dataView: DataView): void;
    render(): React.JSX.Element;
    private applyFilter;
    private static updateCallback;
    componentWillMount(): void;
    componentWillUnmount(): void;
}
export default ReactCircleCard;
