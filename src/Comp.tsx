import * as React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



const data = [
  { name: 'Student A', percentage: 92 },
  { name: 'Student B', percentage: 78 },
  { name: 'Student C', percentage: 63 },
  { name: 'Student D', percentage: 87 },
  { name: 'Student E', percentage: 54 },
  { name: 'Student F', percentage: 29 },
  { name: 'Student G', percentage: 96 },
  { name: 'Student H', percentage: 85 },
  { name: 'Student I', percentage: 77 },
  { name: 'Student J', percentage: 42 },
  { name: 'Student K', percentage: 65 },
  { name: 'Student L', percentage: 91 },
  { name: 'Student M', percentage: 73 },
  { name: 'Student N', percentage: 59 },
  { name: 'Student O', percentage: 48 },
  { name: 'Student P', percentage: 80 },
  { name: 'Student Q', percentage: 99 },
  { name: 'Student R', percentage: 60 },
  { name: 'Student S', percentage: 88 },
  { name: 'Student T', percentage: 46 },
  { name: 'Student U', percentage: 69 },
  { name: 'Student AH', percentage: 66 }
];

export interface State {
    color: string;
    startRange: number;
    endRange: number;
    filteredData: typeof data;
}

export const initialState: State = {
    color: "#8884d8",  // Default color
    startRange: 0,     // Default start range
    endRange: 100,     // Default end range
    filteredData: data // Initial filtered data
};

export class ReactCircleCard extends React.Component<{}, State> {
    constructor(props: any) {
        super(props);
        this.state = initialState;
    }

    render() {
        const { color, startRange, endRange, filteredData } = this.state;

        return (
            <div className="relative h-screen flex justify-center items-center">
                <h1 className="absolute top-0 text-center w-full font-bold text-4xl">
                    Student Percentage Marks
                </h1>

                {/* Input fields for color, range, and button */}
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

                {/* Bar Chart */}
                <ResponsiveContainer width="100%" height={600}>
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
                        <Bar dataKey="percentage" fill={color} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        );
    }

    // Function to apply the filter
    private applyFilter = () => {
        const { color, startRange, endRange } = this.state;
        const filtered = data.map((student) => {
            if (student.percentage >= startRange && student.percentage <= endRange) {
                return { ...student, fill: color };  // Apply chosen color
            }
            return student;
        });
        this.setState({ filteredData: filtered });
    };

    private static updateCallback: (data: object) => void = null;

    public static update(newState: State) {
        if (typeof ReactCircleCard.updateCallback === 'function') {
            ReactCircleCard.updateCallback(newState);
        }
    }

    public state: State = initialState;

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
