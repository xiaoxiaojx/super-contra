import * as React from "react";
import {
    WithStaticSquare,
    StaticSquareProps,
    StaticSquareOption
} from "../../HOC";

interface CheeseBodyRightProps {
}

class CheeseBodyRight extends React.Component< CheeseBodyRightProps & StaticSquareProps , {}> {
    render() {
        return (
            <div>
            </div>
        );
    }
}

const defaultOption: StaticSquareOption = {
    imageName: "base.png",
    position: "-32px -320px"
};

const CheeseBodyRightWrap = WithStaticSquare<CheeseBodyRightProps>(defaultOption)(CheeseBodyRight);

export default CheeseBodyRightWrap;
