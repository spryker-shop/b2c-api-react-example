import { RouteComponentProps, RouteProps } from 'react-router-dom';

export interface IScrollToTopRouteProps extends RouteProps, Partial<RouteComponentProps> {
    children: JSX.Element;
}
