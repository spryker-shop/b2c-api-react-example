import * as React from 'react';
import { SalutationVariants } from '@constants/customer';
import { typeNotificationWarning } from '@constants/notifications';
import { FormattedMessage } from 'react-intl';
import {
    withStyles,
    TextField,
    Button,
    Typography,
    MenuItem,
    Grid,
    Checkbox,
    FormControlLabel
} from '@material-ui/core';
import { NotificationsMessage } from '@application/components/Notifications/NotificationsMessage';
import { TSalutationVariant } from '@interfaces/customer';
import { IRegisterFormProps as Props, IRegisterFormState as State } from './types';
import { InputChangeEvent, FormEvent } from '@interfaces/common';
import { styles } from './styles';

export class RegisterFormBase extends React.Component<Props, State> {
    public state: State = {
        salutation: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptedTerms: false
    };

    protected handleChangeSalutation = (event: InputChangeEvent): void => {
        this.setState(() => ({salutation: event.target.value}));
    };

    protected handleChangeAgreement = (event: InputChangeEvent): void => {
        this.setState(() => ({acceptedTerms: !this.state.acceptedTerms}));
    };

    protected handleChange = ({target: {name, value}}: InputChangeEvent): void => {
        this.setState(() => ({...this.state, [name]: value}));
    };

    protected handleSubmitForm = (e: FormEvent): void => {
        e.preventDefault();
        const {salutation, firstName, lastName, email, password, confirmPassword, acceptedTerms} = this.state;

        if (!salutation || !firstName || !lastName || !email || !password || !confirmPassword || !acceptedTerms) {
            NotificationsMessage({
                id: 'empty.required.fields.message',
                type: typeNotificationWarning
            });

            return null;
        }

        if (password !== confirmPassword) {
            NotificationsMessage({
                id: 'password.not.equal.message',
                type: typeNotificationWarning
            });

            return null;
        }

        this.props.handleSubmit(this.state);
    };

    public render(): JSX.Element {
        const {classes} = this.props;

        return (
            <React.Fragment>
                <Typography variant="title" color="inherit" noWrap>
                    <FormattedMessage id={'word.register.title'} />
                </Typography>
                <form
                    className={classes.container}
                    noValidate
                    autoComplete="off"
                    onSubmit={this.handleSubmitForm}
                    id="RegisterForm"
                >
                    <TextField
                        required
                        id="register-salutation"
                        select
                        label={<FormattedMessage id={'salutation.label'} />}
                        name="salutation"
                        className={classes.textField}
                        value={this.state.salutation}
                        onChange={this.handleChangeSalutation}
                        SelectProps={{
                            MenuProps: {
                                className: classes.menu
                            }
                        }}
                        margin="normal"
                        fullWidth
                        InputLabelProps={{shrink: true}}
                    >
                        {SalutationVariants.map((option: TSalutationVariant) => (
                            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        required
                        id="register-first-name"
                        label={<FormattedMessage id={'first.name.label'} />}
                        name="firstName"
                        type="text"
                        value={this.state.firstName}
                        className={classes.textField}
                        margin="normal"
                        fullWidth
                        onChange={this.handleChange}
                        InputLabelProps={{shrink: true}}
                        InputProps={{className: classes.input}}
                    />

                    <TextField
                        required
                        id="register-last-name"
                        label={<FormattedMessage id={'last.name.label'} />}
                        name="lastName"
                        type="text"
                        value={this.state.lastName}
                        onChange={this.handleChange}
                        className={classes.textField}
                        margin="normal"
                        fullWidth
                        InputLabelProps={{shrink: true}}
                        InputProps={{className: classes.input}}
                    />

                    <TextField
                        required
                        id="register-email"
                        label={<FormattedMessage id={'email.label'} />}
                        name="email"
                        type="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                        className={classes.textField}
                        margin="normal"
                        fullWidth
                        InputLabelProps={{shrink: true}}
                        InputProps={{className: classes.input}}
                    />

                    <Grid container direction="row" justify="space-between" alignItems="center" spacing={16}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="register-password"
                                label={<FormattedMessage id={'word.password.title'} />}
                                name="password"
                                type="password"
                                value={this.state.password}
                                onChange={this.handleChange}
                                className={classes.textField}
                                margin="normal"
                                fullWidth
                                InputLabelProps={{shrink: true}}
                                InputProps={{className: classes.input}}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                id="register-confirm-password"
                                label={<FormattedMessage id={'confirm.password.title'} />}
                                name="confirmPassword"
                                type="password"
                                value={this.state.confirmPassword}
                                onChange={this.handleChange}
                                className={classes.textField}
                                margin="normal"
                                fullWidth
                                InputLabelProps={{shrink: true}}
                                InputProps={{className: classes.input}}
                            />
                        </Grid>
                    </Grid>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state.acceptedTerms}
                                onChange={this.handleChangeAgreement}
                                name="acceptedTerms"
                            />
                        }
                        label={<FormattedMessage id={'accept.terms.title'} />}
                    />

                    <Button type="submit" variant="contained" className={classes.button}>
                        <FormattedMessage id={'word.register.title'} />
                    </Button>
                </form>
            </React.Fragment>
        );
    }
}

export const RegisterFormComponent = withStyles(styles)(RegisterFormBase);
