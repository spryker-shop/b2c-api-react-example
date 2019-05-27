import * as React from 'react';
import { withRouter } from 'react-router';
import { connect } from './connect';
import { FormattedMessage } from 'react-intl';
import { pathLoginPage } from '@constants/routes';
import { IAccountActionsProps as Props, IAccountActionsState as State } from './types';
import { Grid, Typography, Button } from '@material-ui/core';
import { SprykerDialog } from '@components/UI/SprykerDialog';
import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from './styles';

@(withRouter as Function)
@connect
export class DeleteAccountComponent extends React.Component<Props, State> {
    readonly state: State = {
        isDeleteProfileDialogOpen: false
    };

    protected handleDeleteProfileDialogAgree = (): void => {
        const { customerReference, deleteCustomerAction, history } = this.props;

        if (!customerReference) {
            return;
        }

        deleteCustomerAction(customerReference);
        this.handleDeleteProfileDialogShowing();

        history.push(`${pathLoginPage}`);
    };

    protected handleDeleteProfileDialogShowing = (): void =>
        this.setState(prev => ({isDeleteProfileDialogOpen: !prev.isDeleteProfileDialogOpen}));

    protected handleSubmitDeleteAccount = (): void => this.setState({ isDeleteProfileDialogOpen: true });

    public render = (): JSX.Element => {
        const { classes } = this.props;

        return (
            <>
                <Typography component="h2" variant="h2" className={ classes.text }>
                    <FormattedMessage id={ 'delete.account.title' } />
                </Typography>

                <Typography className={ classes.text } color="textSecondary" >
                    <FormattedMessage id={ 'delete.account.message' } />
                </Typography>

                <Button variant="outlined" onClick={ this.handleSubmitDeleteAccount } className={ classes.submit }>
                    <FormattedMessage id={ 'word.delete.title' } />
                </Button>

                { this.state.isDeleteProfileDialogOpen && (
                    <SprykerDialog
                        handleShow={ this.handleDeleteProfileDialogShowing }
                        isOpen={ this.state.isDeleteProfileDialogOpen }
                    >
                        <Typography component="h3" variant="h3" className={`${classes.text} ${classes.textMessage}`} >
                            <FormattedMessage id={ 'confirm.delete.account.message' } />
                        </Typography>
                        <Grid container spacing={ 16 }>
                            <Grid item xs={ 12 } sm={ 6 }>
                                <Button
                                    variant="outlined"
                                    onClick={ this.handleDeleteProfileDialogShowing }
                                    fullWidth
                                >
                                    <FormattedMessage id={ 'word.disagree.title' } />
                                </Button>
                            </Grid>
                            <Grid item xs={ 12 } sm={ 6 }>
                                <Button
                                    onClick={ this.handleDeleteProfileDialogAgree }
                                    variant="contained"
                                    fullWidth
                                >
                                    <FormattedMessage id={ 'word.agree.title' } />
                                </Button>
                            </Grid>
                        </Grid>
                    </SprykerDialog>
                )}
            </>
        );
    }
}

export const DeleteAccount = withStyles(styles)(DeleteAccountComponent);
