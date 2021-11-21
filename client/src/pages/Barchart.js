import { Component } from "react";
import { Bar } from "react-chartjs-2";

class Barchart extends  Component {


    render() {

        return (
            <div>
                <Bar
                    data={this.props.chartData}
                    options={{
                        plugins: {
                            title: {
                                display: true,
                                text: "Amount Raised in Wei"
                            },
                            legend: {
                                display: true,
                                position: "bottom",
                            }
                        }
                    }}
                />
            </div>
        )
    }

}

export default Barchart;
