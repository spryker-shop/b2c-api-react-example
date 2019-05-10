import * as React from 'react';
import { connect } from './connect';
import { NavLink } from 'react-router-dom';
import { ICheckoutBreadcrumbsProps as Props } from './types';
import { checkoutBreadcrumbsList } from './fixtures';
import { withStyles } from '@material-ui/core';
import { withRouter } from 'react-router';
import { styles } from './styles';
import { FormattedMessage } from 'react-intl';

const CheckoutBreadcrumbsComponent: React.SFC<Props> = (props): JSX.Element => {
    const { classes, location: { pathname }, isUserLoggedIn } = props;

    const renderBreadcrumbs = (): JSX.Element[] => {
        let passedFlag = true;

        return checkoutBreadcrumbsList.map((item, index) => {
            const isActive = item.path === pathname;
            const activeClass = isActive ? classes.itemActive : '';
            const classIndexing = isUserLoggedIn ? classes[`itemLevel${index}`] : '';
            if (isActive) {
                passedFlag = false;
            }
            const passedClass = passedFlag ? classes.itemPassed : '';

            return (
                <li
                    key={ item.path }
                    className={`${ classes.item } ${ activeClass } ${ passedClass } ${ classIndexing }`}
                >
                    <NavLink to={ item.path } className={ classes.link }>
                        <div className={classes.itemInner}>
                             <span className={classes.itemText}>
                                 <FormattedMessage id={ item.title } />
                             </span>
                            <span className={`${classes.itemDecor} ${classes.bgColor}`} />
                        </div>
                    </NavLink>
                </li>
            );
        });
    };

    return (
        <div className={`${classes.wrapper} ${classes.bgColor}`}>
            <div className={ classes.inner }>
                <ul className={ classes.list }>
                    { renderBreadcrumbs() }
                </ul>
            </div>
        </div>
    );
};

export const CheckoutBreadcrumbs = connect(withStyles(styles)(withRouter(CheckoutBreadcrumbsComponent)));
