import * as React from "react";
declare const data: {
    name: string;
    percentage: number;
}[];
export interface State {
    color: string;
    startRange: number;
    endRange: number;
    filteredData: typeof data;
}
export declare const initialState: State;
export declare class ReactCircleCard extends React.Component<{}, State> {
    constructor(props: any);
    render(): React.JSX.Element;
    private applyFilter;
    private static updateCallback;
    static update(newState: State): void;
    state: State;
    componentWillMount(): void;
    componentWillUnmount(): void;
}
export default ReactCircleCard;
