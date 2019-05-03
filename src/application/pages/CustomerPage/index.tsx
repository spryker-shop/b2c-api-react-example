import * as React from 'react';
import { withRouter } from 'react-router';
import { CustomerPageProps } from './types';
import { AppMain } from '@components/AppMain';
import { ErrorBoundary } from '@hoc/ErrorBoundary';
import { SideBar } from './SideBar';
import { CustomerSideBar } from './CustomerSideBar';
import { CustomerRouting } from './CustomerRouting';
import { withStyles, Grid } from '@material-ui/core';
import { styles } from './styles';

@(withRouter as Function)
class CustomerPageComponent extends React.PureComponent<CustomerPageProps> {
    public render() {
        const { classes, location } = this.props;

        return (
            <AppMain>
                <div className={ classes.container }>
                    <div className={ classes.colSidebar }>
                        <CustomerSideBar location={ location } />
                    </div>
                    <div className={ classes.colContent }>
                        <ErrorBoundary>
                            <SideBar location={ location } />
                        </ErrorBoundary>
                    </Grid>
                    <Grid item xs={ 12 } sm={ 8 } md={ 9 }>
                        <Grid container className={`${classes.rightPart} ${classes.fullHeight}`}>
                            <Grid item xs={ 12 } className={ classes.fullHeight }>
                                <CustomerRouting />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </AppMain>
        );
    }
}

export const CustomerPage = withStyles(styles)(CustomerPageComponent);
