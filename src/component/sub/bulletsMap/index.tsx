import * as React from "react";
import { observer } from "mobx-react";
import Bullet from "./bullet";
import {
    SuperContraStore
} from "../../../store";

interface BulletsMapProps {
    store: SuperContraStore;
}

@observer
class BulletsMap extends React.PureComponent<BulletsMapProps, {}> {
    render() {
        const { store } = this.props;
        const { bulletMap } = store;
        return (
            <div>
                {
                    bulletMap.map((bullet, index) => {
                    if ( bullet ) {
                        return (
                            <Bullet
                                key={`Bullet-${index}`}
                                {...bullet}
                                index={index}
                                store={store}/>
                        );
                    }
                    return null;
                })
                }
            </div>
        );
    }
}

export default BulletsMap;