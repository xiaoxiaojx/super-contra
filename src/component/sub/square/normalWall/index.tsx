import * as React from "react";
import {
    WithStaticSquare,
    StaticSquareProps,
    StaticSquareOption
} from "../../HOC";
import "./index.scss";

interface NormalWallProps {
}

class NormalWall extends React.Component< NormalWallProps & StaticSquareProps , {}> {
    render() {
        console.log("NormalWall update...");
        return (
            <div className="normalFloorWrap">
            </div>
        );
    }
}

const defaultOption: StaticSquareOption = {
    imageName: "base.png",
    position: "-32px -256px"
};

const NormalWallWrap = WithStaticSquare<NormalWallProps>(defaultOption)(NormalWall);

export default NormalWallWrap;
