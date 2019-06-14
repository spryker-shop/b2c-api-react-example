import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from './connect';
import { Button, Grid, IconButton, Typography, withStyles } from '@material-ui/core';
import { OrdersList } from '@containers/OrdersList';
import { AddressesList } from '@containers/AddressesList';
import { ICustomerOverviewProps as Props } from './types';
import { ErrorBoundary } from '@hoc/ErrorBoundary';
import { EditIcon } from './icons';
import { NavLink, withRouter } from 'react-router-dom';
import { pathCustomerProfile, pathCustomerOrderHistory, pathLoginPage } from '@constants/routes';
import { styles } from './styles';
import { ClickEvent } from '@interfaces/common';

@connect
@(withRouter as Function)
class CustomerOverviewComponent extends React.PureComponent<Props> {
    public componentDidMount = (): void => {
        if (!this.props.isCustomerDataExist) {
            this.initRequestData();
        }
    };

    protected initRequestData = (): void => {
        if (!this.props.isLoading && this.props.isAppDataSet && this.props.customerReference) {
            this.props.getCustomerProfileAction(this.props.customerReference);
        }
    };

    protected handleLogout = (event: ClickEvent): void => {
        event.preventDefault();
        this.props.logoutAction();
        this.props.history.push(pathLoginPage);
    };

    public render(): JSX.Element {
        const { classes, customerData, isAddressesListInitiated, hasOrders, addresses } = this.props;
        const isDevServer = process.env.NODE_ENV === 'webpack-dev-server';
        const isParallelRequest = isDevServer ? isAddressesListInitiated : true;

        return (
            <>
                <Typography component="h1" variant="h2" className={ classes.title }>
                    <FormattedMessage id={ 'word.profile.overview' } />
                </Typography>
                { customerData &&
                    <>
                        <Grid container className={ classes.container }>
                            <Grid item xs={ 12 } className={ classes.col }>
                                <div className={`${classes.block} ${classes.blockCustomer}`}>
                                    <Typography component="h3" variant="h3" className={ classes.subtitle }>
                                        <FormattedMessage id={ 'word.profile.title' } />
                                    </Typography>
                                    <div>
                                        { customerData.salutation }.
                                        <span className={ classes.textAlternative }>
                                            {` ${customerData.firstName} ${customerData.lastName}`}
                                        </span>
                                    </div>
                                    <div className={ classes.textHightlight }>{ customerData.email }</div>
                                    <IconButton
                                        className={ classes.actionItem }
                                        component={
                                            ({ innerRef, ...props }) =>
                                                <NavLink { ...props } to={ pathCustomerProfile } />
                                        }
                                    >
                                        <EditIcon />
                                    </IconButton>
                                </div>
                            </Grid>

                            <Grid item xs={ 12 } className={ classes.col }>
                                <ErrorBoundary>
                                    <div className={`${!Boolean(addresses.length) ? classes.block : ''}`}>
                                        { !Boolean(addresses.length) &&
                                            <Typography component="h3" variant="h3" className={ classes.subtitle }>
                                                <FormattedMessage id={'word.addresses.title'} />
                                            </Typography>
                                        }
                                        <AddressesList isMainOnly isEditOnly />
                                    </div>
                                </ErrorBoundary>
                            </Grid>

                            { isParallelRequest &&
                                <Grid item xs={ 12 } className={ classes.col }>
                                    <ErrorBoundary>
                                        <div className={ classes.block }>
                                            <div className={ classes.heading }>
                                                <Typography component="h3" variant="h3" className={ classes.subtitle }>
                                                    <FormattedMessage id={ 'last.orders.title' } />
                                                </Typography>
                                                { hasOrders &&
                                                    <NavLink className={ classes.link } to={ pathCustomerOrderHistory }>
                                                        <FormattedMessage id={ 'view.all.title' } />
                                                    </NavLink>
                                                }
                                            </div>
                                            <OrdersList
                                                shouldShowOrdersAmount={ false }
                                                ordersLimit={ 3 }
                                                classes={{ orderItem: classes.orderItem }}
                                            />
                                        </div>
                                    </ErrorBoundary>
                                </Grid>
                            }

                            <Grid item xs={ 12 } className={ classes.col }>
                                <Button onClick={ this.handleLogout } variant="contained" fullWidth>
                                    <FormattedMessage id={ 'log.out.button.title' } />
                                </Button>
                            </Grid>
                        </Grid>
                    </>
                }
            </>
        );
    }
}

export const CustomerOverview = withStyles(styles)(CustomerOverviewComponent);
