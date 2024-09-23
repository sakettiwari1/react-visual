import * as React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import powerbi from "powerbi-visuals-api";
import DataView = powerbi.DataView;

export interface State {
    color: string;
    startRange: number;
    endRange: number;
    filteredData: any[];
}

export const initialState: State = {
    color: "#8884d8",
    startRange: 0,
    endRange: 100,
    filteredData: []
};

export class ReactCircleCard extends React.Component<{}, State> {
    constructor(props: any) {
        super(props);
        this.state = initialState;
    }

    public static update(newState: State) {
        if (typeof ReactCircleCard.updateCallback === 'function') {
            ReactCircleCard.updateCallback(newState);
        }
    }

    public updateData(dataView: DataView) {
        const categories = dataView.categorical.categories[0].values;
        const measures = dataView.categorical.values[0].values;

        const filteredData = categories.map((name: string, index: number) => ({
            name,
            percentage: measures[index]
        }));

        this.setState({ filteredData });
    }

    render() {
        const { color, startRange, endRange, filteredData } = this.state;

        // Calculate the width based on the number of bars
        const barWidth = Math.max(50, Math.min(100, 1000 / filteredData.length));

        return (
            <div className="relative h-screen flex flex-col justify-center items-center">
                <h1 className="absolute top-0 text-center w-full font-bold text-4xl">
                    Student Percentage Marks
                </h1>

                <div className="absolute top-0 right-0 m-4 p-4 border border-gray-200 shadow-lg bg-white">
                    <label>
                        Select Color:
                        <input
                            type="color"
                            value={color}
                            onChange={(e) => this.setState({ color: e.target.value })}
                            style={{ marginLeft: '10px' }}
                        />
                    </label>
                    <br />
                    <label style={{ marginTop: '10px' }}>
                        Start Range:
                        <input
                            type="number"
                            value={startRange}
                            onChange={(e) => this.setState({ startRange: Number(e.target.value) })}
                            style={{ marginLeft: '10px', width: '50px' }}
                        />
                    </label>
                    <br />
                    <label style={{ marginTop: '10px' }}>
                        End Range:
                        <input
                            type="number"
                            value={endRange}
                            onChange={(e) => this.setState({ endRange: Number(e.target.value) })}
                            style={{ marginLeft: '10px', width: '50px' }}
                        />
                    </label>
                    <br />
                    <button
                        className='bg-sky-500 rounded-md text-white'
                        onClick={this.applyFilter}
                        style={{ marginTop: '10px', padding: '5px 10px' }}
                    >
                        Apply Filter
                    </button>
                </div>

                <div style={{ width: '100%', height: '600px' }}>
                    <ResponsiveContainer>
                        <BarChart
                            layout="vertical"
                            data={filteredData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" />
                            <YAxis dataKey="name" type="category" />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="percentage" fill={color} barSize={barWidth} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        );
    }

    private applyFilter = () => {
        const { color, startRange, endRange } = this.state;
        const filtered = this.state.filteredData.map((student) => {
            if (student.percentage >= startRange && student.percentage <= endRange) {
                return { ...student, fill: color };
            }
            return { ...student, fill: '#d3d3d3' };
        });
        this.setState({ filteredData: filtered });
    };

    private static updateCallback: (data: object) => void = null;

    public componentWillMount() {
        ReactCircleCard.updateCallback = (newState: State): void => {
            this.setState(newState);
        };
    }

    public componentWillUnmount() {
        ReactCircleCard.updateCallback = null;
    }
}

export default ReactCircleCard;
