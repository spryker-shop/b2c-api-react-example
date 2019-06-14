export interface IErrorBoundaryState {
    hasError: boolean;
    error: Error;
    info: object;
}

export interface IErrorBoundaryProps {
    children: JSX.Element;
}
