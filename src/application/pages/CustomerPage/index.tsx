import * as React from 'react';
import { withRouter } from 'react-router';
import { CustomerPageProps } from './types';
import { AppMain } from '@application/components/AppMain';
import { ErrorBoundary } from '@application/hoc/ErrorBoundary';
import { SideBar } from './SideBar';
import { CustomerRouting } from './CustomerRouting';
import { withStyles, Grid } from '@material-ui/core';
import { styles } from './styles';

@(withRouter as Function)
export class CustomerPageBase extends React.PureComponent<CustomerPageProps> {
    public render() {
        const { classes, location } = this.props;

        return (
            <AppMain>
                <Grid container justify="space-between" className={ classes.customerContainer }>
                    <Grid item xs={ 12 } sm={ 4 } md={ 3 } container direction="column">
                        <ErrorBoundary>
                            <SideBar location={ location } />
                        </ErrorBoundary>
                    </Grid>
                    <Grid item xs={ 12 } sm={ 8 } md={ 9 }>
                        <Grid container className={ classes.rightPart }>
                            <Grid item xs={ 12 }>
                                <CustomerRouting />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </AppMain>
        );
    }
}

export const CustomerPage = withStyles(styles)(CustomerPageBase);

export default CustomerPage;
