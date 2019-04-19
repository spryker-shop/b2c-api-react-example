import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { ICheckoutBreadcrumbsProps as Props } from './types';
import { checkoutBreadcrumbsList } from './fixtures';
import { withStyles } from '@material-ui/core';
import { withRouter } from 'react-router';
import { styles } from './styles';
import { FormattedMessage } from 'react-intl';

const CheckoutBreadcrumbsComponent: React.SFC<Props> = props => {
    const { classes, location: { pathname } } = props;

    const renderBreadcrumbs = (): JSX.Element[] => {
        let passedFlag = true;

        return checkoutBreadcrumbsList.map(item => {
            const isActive = item.path === pathname;
            const activeClass = isActive ? classes.itemActive : '';

            if (isActive) {
                passedFlag = false;
            }

            return (
                <li
                    key={ item.path }
                    className={`${ classes.item } ${ activeClass } ${ passedFlag ? classes.itemPassed : '' }`}
                >
                    <NavLink to={ item.path } className={ classes.link }>
                        <FormattedMessage id={ item.title } />
                    </NavLink>
                </li>
            );
        });
    };

    return (
        <div>
            <ul>
                { renderBreadcrumbs() }
            </ul>
        </div>
    );
};

export const CheckoutBreadcrumbs = withStyles(styles)(withRouter(CheckoutBreadcrumbsComponent));
