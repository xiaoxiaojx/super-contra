export function getDisplayName(WrappedComponent: React.ComponentClass) {
    return WrappedComponent.displayName || WrappedComponent.name || "Component";
}