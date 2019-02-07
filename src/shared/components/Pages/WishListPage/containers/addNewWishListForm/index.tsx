import * as React from 'react';
import { connect } from './connect';
import { FormattedMessage } from 'react-intl';

import { InputChangeEvent } from '@interfaces/common/react';
import { AddNewWishListFormProps, AddNewWishListFormState } from './types';

import { Typography, Paper, TextField, Button, withStyles } from '@material-ui/core';
import { styles } from './styles';

@connect
export class AddNewWishListFormComponent extends React.Component<AddNewWishListFormProps, AddNewWishListFormState> {
    public state: AddNewWishListFormState = {
        name: '',
    };

    public handleChangeName = (event: InputChangeEvent): void => {
        event.persist();
        this.setState({
            name: event.target.value
        });
    };

    public addWishlist = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!this.state.name.trim()) {
            return;
        }

        this.props.addWishlistAction(this.state.name);
        this.setState({
            name: ''
        });
    };

    public render = () => {
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
                        variant={ 'outlined' }
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

export const AddNewWishListForm = withStyles(styles)(AddNewWishListFormComponent);
