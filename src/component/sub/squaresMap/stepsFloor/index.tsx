import * as React from "react";
import {
    WithStaticSquare,
    StaticSquareProps,
    StaticSquareOption
} from "../../HOC";

interface StepsFloorProps {
}

class StepsFloor extends React.Component< StepsFloorProps & StaticSquareProps , {}> {
    render() {
        return (
            <div className="normalFloorWrap">
            </div>
        );
    }
}

const defaultOption: StaticSquareOption = {
    imageName: "base.png",
    position: "-64px -320px"
};

const StepsFloorWrap = WithStaticSquare<StepsFloorProps>(defaultOption)(StepsFloor);

export default StepsFloorWrap;
