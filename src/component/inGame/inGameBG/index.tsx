import * as React from "react";
import { observer } from "mobx-react";
import {
    Square
} from "../../sub";
import {
    SuperContraStore
} from "../../../store";
import {
    levelOneMap
} from "../../../common/levelMap";
import "./index.scss";

interface InGameProps {
    superContraStore: SuperContraStore;
    children: React.ReactNode;
    className?: string;
}

@observer
class InGameBG extends React.Component<InGameProps, {}> {
    render() {
        const { className = "", children } = this.props;
        const currentClassName = className ? `inGameBGWrap ${className}` : "inGameBGWrap";

        return (
            <div className={currentClassName}>
                <div className="gameBackground">
                    {
                        levelOneMap.map((items, indexX) =>
                            <div className="col" key={`col-${indexX}`}>
                                {
                                    items.map((item, indexY) =>
                                        <Square
                                            key={`col-${indexX},row-${indexY}`}
                                            squareSpecies={item}/>)
                                }
                            </div>
                        )
                    }
                </div>
                <div className="gameContent"> { children } </div>
            </div>
        );
    }
}

export default InGameBG;