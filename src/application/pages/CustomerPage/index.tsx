import * as React from 'react';
import { withRouter } from 'react-router';
import { CustomerPageProps } from './types';
import { AppMain } from '@application/components/AppMain';
import { SideBar } from './SideBar';
import { CustomerRouting } from './CustomerRouting';
import { withStyles, Grid } from '@material-ui/core';
import { styles } from './styles';

@(withRouter as Function)
class CustomerPageBase extends React.PureComponent<CustomerPageProps> {
    public render() {
        const { classes, location } = this.props;

        return (
            <AppMain>
                <div className={ classes.container }>
                    <div className={ classes.colSidebar }>
                        <SideBar location={ location } />
                    </div>
                    <div className={ classes.colContent }>
                        <CustomerRouting />
                    </div>
                </div>
            </AppMain>
        );
    }
}

export const CustomerPage = withStyles(styles)(CustomerPageBase);
