import { RouteProps } from 'react-router';
import { WithRouter } from '@interfaces/common';

export interface Props extends RouteProps, WithRouter {
    pageTitle?: string;
    isUserLoggedIn?: boolean;
    isInitStateFulfilled?: boolean;
    anonymId?: string;
    getGuestCartAction?: (anonymId: string) => void;
}
