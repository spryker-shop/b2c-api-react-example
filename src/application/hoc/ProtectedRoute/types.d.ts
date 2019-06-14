import { RouteComponentProps, RouteProps } from 'react-router-dom';

export interface IProtectedRouteProps extends RouteProps, Partial<RouteComponentProps> {
    pageTitle?: string;
    isUserLoggedIn?: boolean;
    isInitStateFulfilled?: boolean;
    anonymId?: string;
}
