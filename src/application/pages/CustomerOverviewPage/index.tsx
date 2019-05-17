import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from './connect';
import { Grid, IconButton, Typography, withStyles } from '@material-ui/core';
import { OrdersList } from '@containers/OrdersList';
import { AddressesList } from '@containers/AddressesList';
import { ICustomerOverviewPageProps as Props } from './types';
import { ErrorBoundary } from '@hoc/ErrorBoundary';
import { EditIcon } from './icons';
import { NavLink } from 'react-router-dom';
import { pathCustomerProfilePage, pathOrderHistoryPage } from '@constants/routes';
import { styles } from './styles';

@connect
class CustomerOverviewPageComponent extends React.PureComponent<Props> {
    public componentDidMount = (): void => {
        if (!this.props.isCustomerDataExist) {
            this.initRequestData();
        }
    };

    protected initRequestData = (): void => {
        if (!this.props.isLoading && this.props.isAppDataSet && this.props.customerReference) {
            this.props.getCustomerData(this.props.customerReference);
        }
    };

    public render(): JSX.Element {
        const { classes, customerData, isAddressesListInitiated, isHasOrders, addresses } = this.props;
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
                                                <NavLink { ...props } to={ pathCustomerProfilePage } />
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
                                        <div className={`${classes.block} ${classes.blockBottomIndent}`}>
                                            <div className={ classes.heading }>
                                                <Typography component="h3" variant="h3" className={ classes.subtitle }>
                                                    <FormattedMessage id={ 'last.orders.title' } />
                                                </Typography>
                                                { isHasOrders &&
                                                    <NavLink className={ classes.link } to={ pathOrderHistoryPage }>
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
                        </Grid>
                    </>
                }
            </>
        );
    }
}

export const CustomerOverviewPage = withStyles(styles)(CustomerOverviewPageComponent);
