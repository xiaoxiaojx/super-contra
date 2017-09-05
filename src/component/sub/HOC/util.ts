import {
    StaticSquareOption
} from "./staticSquare";

export function getDisplayName(WrappedComponent: React.ComponentClass) {
    return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

export function getImageStyles (parm?: StaticSquareOption): React.CSSProperties {
    const { imageName = "", position = "" } = parm;
    const requireImg = require(`../../../image/${imageName}`);
    const normalStyle: React.CSSProperties = imageName ? {
        backgroundImage: `url(${requireImg})`
    } : {};
    const positionStyle: React.CSSProperties = position ? {
        backgroundPosition: position
    } : {};
    return {...normalStyle, ...positionStyle};
}