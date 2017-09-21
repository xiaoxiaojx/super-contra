import * as React from "react";
import { observer } from "mobx-react";
import Bullet from "./bullet";
import {
    SuperContraStore
} from "../../../store";

interface BulletsProps {
    store: SuperContraStore;
}

@observer
class Bullets extends React.PureComponent<BulletsProps, {}> {
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

export default Bullets;