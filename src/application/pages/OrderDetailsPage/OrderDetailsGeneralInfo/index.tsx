import * as React from 'react';
import { pathOrderHistoryPage } from '@constants/routes';
import { NavLink } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { withStyles, Grid, Typography } from '@material-ui/core';
import { CustomerPageTitle } from '@application/components/CustomerPageTitle';
import { DateFormatter } from '@application/components/DateFormatter';
import { IOrderDetailsGeneralInfoProps as Props } from './types';
import { styles } from './styles';

export const OrderDetailsGeneralInfoBase: React.SFC<Props> = (props): JSX.Element => {
    const {classes, orderId, date, priceMode, timeZone} = props;

    return (
        <Grid container justify="space-between" className={classes.titleContainer}>
            <Grid item xs={12} sm={8}>
                <CustomerPageTitle
                    title={<FormattedMessage
                        id={'order.detail.number.title'}
                        values={{number: orderId}}
                    />}
                    intro={
                        <>
                            <DateFormatter
                                date={date}
                                timeZone={timeZone}
                                title={<FormattedMessage id={'order.detail.date.title'} />}
                            />
                            <Typography component="span" color="inherit">
                                <FormattedMessage id={'order.detail.price.title'} />{priceMode}
                            </Typography>
                        </>
                    }
                    containerExtraClasses={classes.title}
                />
            </Grid>
            <Grid item xs={12} sm={4} className={classes.linkBackOuter}>
                <NavLink
                    to={`${pathOrderHistoryPage}`}
                    className={classes.linkBack}
                >
                    <FormattedMessage id={'order.detail.view.all.title'} />
                </NavLink>
            </Grid>
        </Grid>
    );
};

export const OrderDetailsGeneralInfo = withStyles(styles)(OrderDetailsGeneralInfoBase);
