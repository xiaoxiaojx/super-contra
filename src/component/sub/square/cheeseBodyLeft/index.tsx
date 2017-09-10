import * as React from "react";
import {
    WithStaticSquare,
    StaticSquareProps,
    StaticSquareOption
} from "../../HOC";

interface CheeseBodyLeftProps {
}

class CheeseBodyLeft extends React.Component< CheeseBodyLeftProps & StaticSquareProps , {}> {
    render() {
        return (
            <div>
            </div>
        );
    }
}

const defaultOption: StaticSquareOption = {
    imageName: "base.png",
    position: "0px -320px"
};

const CheeseBodyLeftWrap = WithStaticSquare<CheeseBodyLeftProps>(defaultOption)(CheeseBodyLeft);

export default CheeseBodyLeftWrap;
