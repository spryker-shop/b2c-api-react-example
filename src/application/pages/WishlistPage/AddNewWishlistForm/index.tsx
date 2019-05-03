import * as React from 'react';
import { connect } from './connect';
import { FormattedMessage } from 'react-intl';
import { InputChangeEvent } from '@interfaces/common';
import { IAddNewWishlistFormProps as Props, IAddNewWishlistFormState as State } from './types';
import { Typography, Paper, TextField, Button, withStyles } from '@material-ui/core';
import { styles } from './styles';

@connect
export class AddNewWishlistFormComponent extends React.Component<Props, State> {
    readonly state: State = {
        name: '',
    };

    protected handleChangeName = (event: InputChangeEvent): void => {
        event.persist();
        this.setState({
            name: event.target.value
        });
    };

    protected addWishlist = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        if (!this.state.name.trim()) {
            return;
        }

        this.props.addWishlistAction(this.state.name);
        this.setState({
            name: ''
        });
    };

    public render = (): JSX.Element => {
        const { classes } = this.props;
        const { name } = this.state;

        return (
            <form noValidate autoComplete="off" onSubmit={this.addWishlist} className={classes.form}>
                <Typography paragraph className={ classes.titleForm }>
                    <FormattedMessage id={ 'add.new.wishlist.title' } />
                </Typography>
                <Paper elevation={0} className={classes.formItem}>
                    <TextField
                        className={ classes.textFieldForm }
                        value={ name }
                        helperText={ <FormattedMessage id={ 'wishlist.name.title' } /> }
                        FormHelperTextProps={ {
                            classes: {
                                root: classes.placeholder,
                                filled: name.length > 0 ? classes.filled : null
                            }
                        } }
                        onChange={ this.handleChangeName }
                        inputProps={ { className: classes.input } }
                    />
                    <Button type="submit" variant="contained" color="primary"
                            className={ classes.formSubmit }>
                        <FormattedMessage id={ 'add.new.wishlist.title' } />
                    </Button>
                </Paper>
            </form>
        );
    }
}

export const AddNewWishlistForm = withStyles(styles)(AddNewWishlistFormComponent);
