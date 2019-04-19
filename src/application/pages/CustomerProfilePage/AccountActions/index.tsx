import * as React from 'react';
import { connect } from './connect';
import { FormattedMessage } from 'react-intl';
import { pathLoginPage } from '@constants/routes';
import { IAccountActionsProps as Props, IAccountActionsState as State } from './types';
import { Grid, Typography, Divider } from '@material-ui/core';
import { SprykerButton } from '@application/components/UI/SprykerButton';
import { SprykerDialog } from '@application/components/UI/SprykerDialog';
import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from './styles';

@connect
export class AccountActionsComponent extends React.Component<Props, State> {
    readonly state: State = {
        isDeleteProfileDialogOpen: false
    };

    protected handleDeleteProfileDialogAgree = (event: React.MouseEvent<HTMLElement>): void => {
        if (!this.props.customerReference) {
            return;
        }
        this.props.deleteCustomerEntity(this.props.customerReference);
        this.handleDeleteProfileDialogShowing(event);

        this.props.routerPush(`${pathLoginPage}`);
    };

    protected handleDeleteProfileDialogDisagree = (event: React.MouseEvent<HTMLElement>): void => {
        this.handleDeleteProfileDialogShowing(event);
    };

    protected handleDeleteProfileDialogShowing = (event: React.SyntheticEvent<{}>): void => {
        this.setState(prev => ({isDeleteProfileDialogOpen: !prev.isDeleteProfileDialogOpen}));
    };

    protected handleSubmitDeleteAccount = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        this.setState({
            isDeleteProfileDialogOpen: true
        });
    };

    public render = (): JSX.Element => {
        const { classes } = this.props;

        return (
            <>
                <Grid container justify="flex-start" className={ classes.section }>
                    <Grid item xs={ 12 }>
                        <Typography variant="h6" className={ classes.sectionTitle }>
                            <FormattedMessage id={ 'delete.account.title' } />
                        </Typography>

                        <Divider/>
                    </Grid>

                    <Grid item xs={ 12 }>
                        <Typography className={ classes.warningTitle }>
                            <FormattedMessage id={ 'delete.account.message' } />
                        </Typography>
                    </Grid>

                    <Grid item xs={ 12 } sm={ 2 }>
                        <SprykerButton
                            title={ <FormattedMessage id={ 'delete.account.title' } /> }
                            onClick={ this.handleSubmitDeleteAccount }
                            extraClasses={ classes.deleteBtn }
                        />
                    </Grid>
                </Grid>

                { this.state.isDeleteProfileDialogOpen && (
                    <SprykerDialog
                        handleShow={ this.handleDeleteProfileDialogShowing }
                        content={ <FormattedMessage id={ 'confirm.delete.account.message' } /> }
                        isOpen={ this.state.isDeleteProfileDialogOpen }
                        handleAgree={ this.handleDeleteProfileDialogAgree }
                        handleDisagree={ this.handleDeleteProfileDialogDisagree }
                    />
                ) }
            </>
        );
    }
}

export const AccountActions = withStyles(styles)(AccountActionsComponent);
