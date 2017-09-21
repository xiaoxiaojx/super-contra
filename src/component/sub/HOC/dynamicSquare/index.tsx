import * as React from "react";
import {
    getDisplayName
} from "../util";

interface DynamicSquareOption {

}

interface DynamicSquareProps {
}

interface ComponentDecorator<TOwnProps> {
    (component: React.ComponentClass<DynamicSquareProps & TOwnProps>): React.ComponentClass<TOwnProps>;
}

function WithDynamicSquare<TOwnProps>(options: DynamicSquareOption): ComponentDecorator<TOwnProps> {
    return Component =>
        class HocSquare extends React.Component<TOwnProps, {}> {
            static displayName: string = `Hoc${getDisplayName(Component)}`;

            render() {
                return (
                    <Component {...this.props}/>
                );
            }
        };
}

export default WithDynamicSquare;