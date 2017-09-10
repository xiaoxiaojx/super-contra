import * as React from "react";
import {
    WithStaticSquare,
    StaticSquareProps,
    StaticSquareOption
} from "../../HOC";

interface CheeseHeadLeftProps {
}

class CheeseHeadLeft extends React.Component< CheeseHeadLeftProps & StaticSquareProps , {}> {
    render() {
        return (
            <div>
            </div>
        );
    }
}

const defaultOption: StaticSquareOption = {
    imageName: "base.png",
    position: "0px -288px"
};

const CheeseHeadLeftWrap = WithStaticSquare<CheeseHeadLeftProps>(defaultOption)(CheeseHeadLeft);

export default CheeseHeadLeftWrap;
