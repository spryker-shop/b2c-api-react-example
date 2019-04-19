import * as React from 'react';
import { connect } from './connect';
import { FormattedMessage } from 'react-intl';
import { NavLink } from 'react-router-dom';
import { pathOrderDetailsPageBase } from '@constants/routes';
import withStyles from '@material-ui/core/styles/withStyles';
import DoneIcon from '@material-ui/icons/Done';
import { CustomerPageTitle } from '@components/CustomerPageTitle';
import { ICheckoutThanksProps as Props } from './types';
import { styles } from './styles';

const CheckoutThanksComponent: React.SFC<Props> = (props): JSX.Element => {
    const { classes, orderId } = props;

    return (
        <div className={ classes.success }>
            <CustomerPageTitle title={ <FormattedMessage id={ 'word.success.title' } /> } />
            <div className={ classes.thank }>
                <FormattedMessage id={ 'order.success.thank.message' } />
                <NavLink to={ `${pathOrderDetailsPageBase}/${orderId}` } className={ classes.link }>
                    <FormattedMessage id={ 'word.here.title' } />
                </NavLink>
            </div>
            <div className={ `${classes.thank} ${classes.order}` }>
                <FormattedMessage id={ 'order.id.title' } />: <span>{ orderId }</span>
            </div>
            <div className={ classes.doneIcon }>
                <DoneIcon />
            </div>
        </div>
    );
};

export const CheckoutThanks = connect(withStyles(styles)(CheckoutThanksComponent));
