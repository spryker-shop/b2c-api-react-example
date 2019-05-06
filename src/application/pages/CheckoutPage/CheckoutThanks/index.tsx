import * as React from 'react';
import { connect } from './connect';
import { FormattedMessage } from 'react-intl';
import { NavLink, Redirect } from 'react-router-dom';
import { pathCheckoutLoginStep, pathOrderDetailsPageBase } from '@constants/routes';
import withStyles from '@material-ui/core/styles/withStyles';
import { ICheckoutThanksProps as Props } from './types';
import { styles } from './styles';

@connect
class CheckoutThanksComponent extends React.Component<Props> {
    public componentDidMount = (): void => {
        const { getCustomerCart, getGuestCart, isUserLoggedIn, anonymId } = this.props;

        if (isUserLoggedIn) {
            getCustomerCart();

            return;
        }

        getGuestCart(anonymId);
    };

    public render = (): JSX.Element => {
        const { classes, orderId, isUserLoggedIn } = this.props;

        if (!orderId) {
            return <Redirect to={ pathCheckoutLoginStep } />;
        }

        return (
            <div className={ classes.success }>
                <div><FormattedMessage id={ 'word.success.title' } /></div>
                <div className={ classes.thank }>
                    <FormattedMessage id={ 'order.success.thank.message' } />
                    { isUserLoggedIn &&
                    <NavLink to={ `${ pathOrderDetailsPageBase }/${ orderId }` } className={ classes.link }>
                        <FormattedMessage id={ 'word.here.title' } />
                    </NavLink>
                    }
                </div>
                <div className={ `${ classes.thank } ${ classes.order }` }>
                    <FormattedMessage id={ 'order.id.title' } />: <span>{ orderId }</span>
                </div>
            </div>
        );
    };
}

export const CheckoutThanks = withStyles(styles)(CheckoutThanksComponent);
