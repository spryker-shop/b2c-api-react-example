import { RouteProps } from 'react-router';
import { WithRouter } from '@interfaces/common';
import { getCustomerCartsAction } from '@stores/actions/common/cart';

export interface IProtectedRouteProps extends RouteProps, WithRouter {
    pageTitle?: string;
    isUserLoggedIn?: boolean;
    isInitStateFulfilled?: boolean;
    anonymId?: string;
    getCustomerCartsAction?: (anonymId: string, isUserLoggedIn: boolean) => void;
}
