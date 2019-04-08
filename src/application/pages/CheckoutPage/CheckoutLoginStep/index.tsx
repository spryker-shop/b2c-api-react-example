import * as React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { connect } from './connect';
import { FormattedMessage } from 'react-intl';
import { pathCheckoutAddressStep } from '@constants/routes';
import { withStyles } from '@material-ui/core';
import { LoginForm } from './LoginForm';
import { ICheckoutLoginStep as Props } from './types';
import { styles } from './styles';

@connect
class CheckoutLoginStepComponent extends React.Component<Props> {
    public render(): JSX.Element {
        const { classes, isUserLoggedIn } = this.props;

        if (isUserLoggedIn) {
            return <Redirect to={ pathCheckoutAddressStep } />;
        }

        return (
            <div>
                <LoginForm />
                <NavLink to={ pathCheckoutAddressStep }><FormattedMessage id={ 'word.address.title' } /></NavLink>
            </div>
        );
    }
}

export const CheckoutLoginStep = withStyles(styles)(CheckoutLoginStepComponent);
