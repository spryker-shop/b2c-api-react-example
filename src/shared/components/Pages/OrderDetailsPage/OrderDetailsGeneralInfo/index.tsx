import * as React from 'react';
import { pathOrderHistoryPage } from 'src/shared/routes/contentRoutes';
import { NavLink } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import { CustomerPageTitle } from '@components/Common/CustomerPageTitle';
import { DateFormatter } from '@components/components/DateFormatter';
import { IOrderDetailsGeneralInfoProps } from './types';
import { styles } from './styles';
import Typography from '@material-ui/core/Typography/Typography';

export const OrderDetailsGeneralInfoBase: React.SFC<IOrderDetailsGeneralInfoProps> = props => {
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
