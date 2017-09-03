import * as React from "react";
import { observer } from "mobx-react";
import {
    Square
} from "../sub";
import {
    SuperContraStore
} from "../../store";
import {
    levelOneMap
} from "../../common/levelMap";
import "./index.scss";

interface InGameProps {
    superContraStore: SuperContraStore;
}

@observer
class InGameBG extends React.Component<InGameProps, {}> {
    render() {
        return (
            <div className="inGameBGWrap">
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
        );
    }
}

export default InGameBG;