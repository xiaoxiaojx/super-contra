import * as React from "react";
import QuestionWall from "./questionWall";
import NormalWall from "./normalWall";
import NormalFloor from "./normalFloor";
import CheeseBodyLeft from "./cheeseBodyLeft";
import CheeseBodyRight from "./cheeseBodyRight";
import CheeseHeadLeft from "./cheeseHeadLeft";
import CheeseHeadRight from "./cheeseHeadRight";
import StepsFloor from "./stepsFloor";
import {
    SquareSpeciesType,
    StaticSquareStatusType
} from "../../../common/constant";
import "./index.scss";

interface SquareProps {
    squareSpecies: SquareSpeciesType;
    squareStatus?: StaticSquareStatusType;
}

class Square extends React.Component<SquareProps, {}> {
    static defaultProps: SquareProps = {
        squareSpecies: 0,
        squareStatus: 0
    };
    shouldComponentUpdate(nextProps) {
        const { squareSpecies, squareStatus } = this.props;
        if ( squareSpecies === 2 && squareStatus !== nextProps.squareStatus) {
            return true;
        }
        return false;
    }

    render() {
        const { squareSpecies, squareStatus } = this.props;
        return (
            <div className="squareWrap">
                {
                    squareSpecies === 1 &&
                    <NormalFloor />
                }
                {
                    squareSpecies === 2 &&
                    <QuestionWall status={squareStatus}/>
                }
                {
                    squareSpecies === 3 &&
                    <NormalWall />
                }
                {
                    squareSpecies === 4 &&
                    <CheeseHeadLeft />
                }
                {
                    squareSpecies === 5 &&
                    <CheeseHeadRight />
                }
                {
                    squareSpecies === 6 &&
                    <CheeseBodyLeft />
                }
                {
                    squareSpecies === 7 &&
                    <CheeseBodyRight />
                }
                {
                    squareSpecies === 8 &&
                    <StepsFloor />
                }
            </div>
        );
    }
}

export default Square;