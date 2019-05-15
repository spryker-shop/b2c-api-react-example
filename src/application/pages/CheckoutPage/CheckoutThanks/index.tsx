import * as React from 'react';
import { connect } from './connect';
import { FormattedMessage } from 'react-intl';
import { NavLink, Redirect } from 'react-router-dom';
import { pathHomePage, pathCheckoutLoginStep } from '@constants/routes';
import withStyles from '@material-ui/core/styles/withStyles';
import { ICheckoutThanksProps as Props, ICheckoutThanksState as State } from './types';
import { styles } from './styles';
import { Button, Typography } from '@material-ui/core';
import { CheckoutRegisterForm } from './CheckoutRegisterForm';

@connect
class CheckoutThanksComponent extends React.Component<Props, State> {
    public state: State = {
        shouldHideForm: true
    };

    public componentDidMount = (): void => {
        const { getCustomerCart, getGuestCart, isUserLoggedIn, anonymId } = this.props;

        if (isUserLoggedIn) {
            getCustomerCart();

            return;
        }

        getGuestCart(anonymId);
        this.setState({ shouldHideForm: false });
    };

    public render = (): JSX.Element => {
        const { classes, orderId, deliveryNewAddress } = this.props;
        const { shouldHideForm } = this.state;
        const email = deliveryNewAddress.email.value;

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
                            <span className={ classes.order }>{ orderId }</span>
                        </span>

                        <span className={ classes.text }>
                            <FormattedMessage id={ 'order.success.thank.message' } />
                        </span>
                        <span className={`${classes.text} ${classes.textEmail}`}>
                            { email }
                        </span>
                    </div>
                    { !shouldHideForm &&
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
