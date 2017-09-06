import * as React from "react";
import {
    WithStaticSquare,
    StaticSquareProps,
    StaticSquareOption
} from "../../HOC";
import "./index.scss";

interface NormalFloorProps {
}

class NormalFloor extends React.Component< NormalFloorProps & StaticSquareProps , {}> {
    render() {
    //    const { c } = this.props.hocProps;
        return (
            <div className="normalFloorWrap">
            </div>
        );
    }
}

const defaultOption: StaticSquareOption = {
    imageName: "base.png",
    position: "0 -256px"
};

const NormalFloorWrap = WithStaticSquare<NormalFloorProps>(defaultOption)(NormalFloor);

export default NormalFloorWrap;
