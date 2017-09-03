import * as React from "react";
import {
    QuestionWall,
    NormalWall,
    NormalFloor
} from "../";
import {
    SquareSpeciesType,
    SquareStatusType
} from "../../../common/constant";
import "./index.scss";

interface SquareProps {
    squareSpecies: SquareSpeciesType;
    squareStatus?: SquareStatusType;
}

class Square extends React.Component<SquareProps, {}> {
    static defaultProps: SquareProps = {
        squareSpecies: 0,
        squareStatus: 0
    };

    render() {
        const { squareSpecies } = this.props;
        return (
            <div className="squareWrap">
                {
                    squareSpecies === 1 &&
                    <NormalFloor />
                }
                {
                    squareSpecies === 2 &&
                    <QuestionWall />
                }
                {
                    squareSpecies === 3 &&
                    <NormalWall />
                }
            </div>
        );
    }
}

export default Square;