export interface IErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
    info: object;
}

export interface IErrorBoundaryProps {
    children: JSX.Element;
}
