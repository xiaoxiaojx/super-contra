import * as React from "react";
import {
    WithStaticSquare,
    StaticSquareProps,
    StaticSquareOption
} from "../../HOC";
import "./index.scss";

interface QuestionWallProps {
}

class QuestionWall extends React.Component< QuestionWallProps & StaticSquareProps , {}> {
    render() {
        return (
            <div className="normalFloorWrap">
            </div>
        );
    }
}

const defaultOption: StaticSquareOption = {
    imageName: "wen.gif"
};

const QuestionWallWrap = WithStaticSquare<QuestionWallProps>(defaultOption)(QuestionWall);

export default QuestionWallWrap;
