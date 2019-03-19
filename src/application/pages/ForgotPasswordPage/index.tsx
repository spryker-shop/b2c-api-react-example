import * as React from 'react';
import { connect } from './connect';
import {
    withStyles,
    Grid,
    Paper,
    Typography,
    TextField,
    Button
} from '@material-ui/core';
import BackIcon from '@material-ui/icons/ChevronLeft';
import {
    IForgotPasswordPageProps as Props,
    IForgotPasswordPageState as State
} from './types';
import { AppMain } from '@application/components/AppMain';
import { styles } from './styles';
import { ClickEvent, InputChangeEvent } from '@interfaces/common';
import { FormattedMessage } from 'react-intl';

@connect
export class ForgotPasswordPageBase extends React.Component<Props, State> {
    public readonly state: State = {
        email: ''
    };

    protected handleChange = (e: InputChangeEvent): void => {
        this.setState({email: e.target.value});
    };

    protected submitRequest = (e: ClickEvent): void => {
        this.props.sendForgotRequest(this.state.email);
    };

    public render(): JSX.Element {
        const {classes, routerGoBack} = this.props;
        const {email} = this.state;

        return (
            <AppMain>
                <Grid
                    item xs={12}
                    container
                    justify="center"
                >
                    <Paper className={classes.forgot}>
                        <Typography color="primary" variant="headline" paragraph>
                            <FormattedMessage id={'recovery.password.title'} />
                        </Typography>
                        <Typography variant="title" paragraph>
                            <FormattedMessage id={'enter.email.address.message'} />
                        </Typography>
                        <form autoComplete="off">
                            <TextField
                                required
                                inputProps={{type: 'email'}}
                                label={<FormattedMessage id={'email.label'} />}
                                className={classes.email}
                                value={email}
                                helperText={<FormattedMessage id={'email.label'} />}
                                FormHelperTextProps={{
                                    classes: {
                                        root: classes.placeholder,
                                        filled: email.length > 0 ? classes.filled : null
                                    }
                                }}
                                onChange={this.handleChange}
                            />
                        </form>
                        <Grid container justify="flex-end">
                            <Button
                                variant="outlined"
                                color="primary"
                                className={classes.passwordButtons}
                                onClick={() => routerGoBack()}
                            >
                                <BackIcon />
                                <FormattedMessage id={'word.back.title'} />
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.passwordButtons}
                                onClick={this.submitRequest}
                            >
                                <FormattedMessage id={'word.submit.title'} />
                            </Button>
                        </Grid>
                    </Paper>
                </Grid>
            </AppMain>
        );
    }
}

export const ForgotPasswordPage = withStyles(styles)(ForgotPasswordPageBase);
