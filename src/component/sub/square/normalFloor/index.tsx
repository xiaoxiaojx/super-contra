import * as React from "react";
import {
    createStaticSquare,
    StaticSquareProps,
    StaticSquareOption
} from "../../HOC";
import "./index.scss";

interface NormalFloorProps {
}

class NormalFloor extends React.Component< NormalFloorProps & StaticSquareProps , {}> {
    render() {
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

const NormalFloorWrap = createStaticSquare<NormalFloorProps>(defaultOption)(NormalFloor);

export default NormalFloorWrap;
