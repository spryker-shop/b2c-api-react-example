import * as React from 'react';
import { connect } from './connect';
import { FormattedMessage } from 'react-intl';
import { NavLink, Redirect } from 'react-router-dom';
import { pathHomePage, pathCheckoutLoginStep, pathCustomerOrderDetailsBase } from '@constants/routes';
import withStyles from '@material-ui/core/styles/withStyles';
import { ICheckoutThanksProps as Props, ICheckoutThanksState as State } from './types';
import { styles } from './styles';
import { Button, Typography } from '@material-ui/core';
import { CheckoutRegisterForm } from './CheckoutRegisterForm';

@connect
class CheckoutThanksComponent extends React.Component<Props, State> {
    public readonly state: State = {
        isAuthorizedUser: true,
        email: null
    };

    public componentDidMount = (): void => {
        const { getCustomerCartsAction, isUserLoggedIn, anonymId, profile, deliveryNewAddress, orderId } = this.props;

        if (!orderId) {
            return;
        }

        const userEmail = isUserLoggedIn ? profile.email : deliveryNewAddress.email.value;
        this.setState({ email: userEmail.toString() });

        getCustomerCartsAction(anonymId, isUserLoggedIn, true);

        if (isUserLoggedIn) {
            return;
        }

        this.setState({ isAuthorizedUser: false });
    };

    public render = (): JSX.Element => {
        const { classes, orderId } = this.props;
        const { isAuthorizedUser, email } = this.state;
        const orderTag = isAuthorizedUser
            ? <NavLink
                to={`${ pathCustomerOrderDetailsBase }/${ orderId }`}
                className={`${classes.order} ${classes.orderLink}`}
            >
                { orderId }
            </NavLink>
            : <span className={ classes.order }>{ orderId }</span>;

        if (!orderId) {
            return <Redirect to={ pathCheckoutLoginStep } />;
        }

        return (
            <div className={ classes.container }>
                <div className={ classes.inner }>
                    <Typography component="h2" variant="h2" className={ classes.title }>
                        <FormattedMessage id={ 'order.success.thank.title' } />
                    </Typography>
                    <div className={ classes.information }>
                        <span className={ classes.subtitle }>
                            <FormattedMessage id={ 'order.number.title' } />
                            { orderTag }
                        </span>

                        <span className={ classes.text }>
                            <FormattedMessage id={ 'order.success.thank.message' } />
                        </span>
                        <span className={`${classes.text} ${classes.textEmail}`}>
                            { email }
                        </span>
                    </div>
                    { !isAuthorizedUser &&
                        <div className={ classes.register }>
                            <span className={ classes.subtitle }>
                                <FormattedMessage id={ 'register.message' } />
                            </span>
                            <CheckoutRegisterForm />
                        </div>
                    }
                    <Button
                        component={ ({ innerRef, ...props }) => <NavLink { ...props } to={ pathHomePage } /> }
                        variant="outlined"
                        fullWidth
                    >
                        <FormattedMessage id={ 'go.to.homepage.title' } />
                    </Button>
                </div>
            </div>
        );
    };
}

export const CheckoutThanks = withStyles(styles)(CheckoutThanksComponent);
