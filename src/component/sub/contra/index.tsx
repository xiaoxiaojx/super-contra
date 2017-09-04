import * as React from "react";
import "./index.scss";

interface ContraState {
    left: number;
    top: number;
}

class Contra extends React.Component<any, ContraState> {
    state: ContraState = {
        left: 0,
        top: 384
    };
    render() {
        const { left, top } = this.state;

        return (
            <div
                className="contraWrap"
                style={{left, top}}>
            </div>
        );
    }
}

export default Contra;