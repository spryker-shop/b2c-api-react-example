import * as React from 'react';
import { connect } from './connect';
import { FormattedMessage } from 'react-intl';
import { InputChangeEvent } from '@interfaces/common';
import { IAddNewWishlistFormProps as Props, IAddNewWishlistFormState as State } from './types';
import { Grid, Button, withStyles } from '@material-ui/core';
import { styles } from './styles';
import { SprykerInput } from '@components/UI/SprykerInput';

@connect
class AddNewWishlistFormComponent extends React.Component<Props, State> {
    readonly state: State = {
        name: ''
    };

    protected handleChangeName = (event: InputChangeEvent): void => this.setState({ name: event.target.value });

    protected addWishlist = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        if (!this.state.name.trim()) {
            return;
        }

        this.props.addWishlistAction(this.state.name);
        this.setState({ name: '' });
    };

    public render = (): JSX.Element => {
        const { classes } = this.props;
        const { name } = this.state;

        return (
            <form noValidate autoComplete="off" onSubmit={ this.addWishlist } className={ classes.form }>
                <Grid container spacing={ 8 }>
                    <Grid item className={`${classes.col} ${classes.colInput}`}>
                        <SprykerInput
                            inputName="wishlistName"
                            onChangeHandler={ this.handleChangeName }
                            inputValue={ name }
                            classes={{
                                input: classes.input
                            }}
                            placeholder={ <FormattedMessage id={ 'wishlist.name.title' } /> }
                        />
                    </Grid>
                    <Grid item className={ classes.col }>
                        <Button type="submit" variant="outlined" className={ classes.button } fullWidth>
                            <FormattedMessage id={ 'add.new.wishlist.title' } />
                        </Button>
                    </Grid>
                </Grid>
            </form>
        );
    };
}

export const AddNewWishlistForm = withStyles(styles)(AddNewWishlistFormComponent);
