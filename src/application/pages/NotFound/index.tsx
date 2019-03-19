import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { INotFoundProps as Props, INotFoundState as State } from './types';
import { Grid, withStyles } from '@material-ui/core';
import { styles } from './styles';

export class NotFoundComponent extends React.PureComponent<Props, State> {
    public render() {
        const { classes } = this.props;

        return (
            <Grid container justify="center" className={ classes.root }>
                <div className={this.props.className || ''}>
                    <FormattedMessage id={ 'page.not.found.message' } />
                </div>
            </Grid>
        );
    }
}

export const NotFound = withStyles(styles)(NotFoundComponent);

export default NotFound;
