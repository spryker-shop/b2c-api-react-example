import * as React from 'react';
import { Route, withRouter } from 'react-router';
import { Props } from './types';
import { connect } from './connect';
import { pathLoginPage } from '@constants/routes';
import { NotificationsMessage } from '@components/Notifications/NotificationsMessage';
import { typeNotificationSuccess } from '@constants/notifications';

@connect
@(withRouter as Function)
export class ProtectedRoute extends React.PureComponent<Props> {
    public static defaultProps = {
        pageTitle: '',
    };

    public componentDidMount = (): void => {
        this.checkAuthorized(false);
    };

    public componentDidUpdate = (prevProps: Props): void => {
        if (prevProps.isUserLoggedIn && !this.props.isUserLoggedIn) {
            this.props.history.push(pathLoginPage);
            NotificationsMessage({
                id: 'customer.logout.message',
                type: typeNotificationSuccess
            });
            setTimeout(() => {
                this.props.getGuestCartAction(this.props.anonymId);
            }, 100);
        }

        this.checkAuthorized(prevProps.isUserLoggedIn);
    };

    private checkAuthorized = (prevIsUserLoggedIn: boolean): void => {
        if (!prevIsUserLoggedIn && !this.props.isUserLoggedIn) {
            this.props.history.push(pathLoginPage);
        }
    };

    public render(): React.ReactNode {
        return this.props.isUserLoggedIn
            ? <Route {...this.props} />
            : null;
    }
}
