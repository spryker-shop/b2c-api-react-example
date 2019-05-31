import { RouteProps } from 'react-router-dom';
import { WithRouter } from '@interfaces/common';

export interface IScrollToTopRouteProps extends RouteProps, WithRouter {
    children: JSX.Element;
}
