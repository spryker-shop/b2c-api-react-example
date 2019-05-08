import * as React from 'react';
import { FormattedMessage, FormattedPlural } from 'react-intl';
import { IWishlistsListItemProps as Props } from './types';
import { NavLink } from 'react-router-dom';
import { pathWishlistsPage } from '@constants/routes';
import { IconButton, withStyles } from '@material-ui/core';
import { DeleteIcon, EditIcon } from './icons';
import { styles } from './styles';
import { SprykerInput } from '@components/UI/SprykerInput';
import { DateFormatter } from '@components/DateFormatter';

const WishlistsListItemComponent: React.SFC<Props> = (props): JSX.Element => {
    const {
        classes,
        id,
        activeListId,
        name,
        numberOfItems,
        date,
        isLoading,
        activeListName,
        handleChangeUpdatedName,
        handleUpdateWishlist,
        handleDeleteWishlist
    } = props;

    return (
        <div key={ id } className={ classes.item }>
            <div className={ classes.name }>
                { activeListId === id
                    ? (
                        <form noValidate autoComplete="off">
                            <SprykerInput
                                inputName="wishlistName"
                                onChangeHandler={ handleChangeUpdatedName }
                                inputValue={ activeListName }
                                classes={{
                                    inputRoot: classes.inputRoot,
                                    input: classes.input
                                }}
                                autoFocus
                            />
                        </form>
                    )
                    : (
                        <NavLink className={ classes.nameLink } to={`${pathWishlistsPage}/${id}`}>
                            { name }
                        </NavLink>
                    )
                }
            </div>
            <span className={ classes.generalInfo }>
                <span className={ classes.generalInfoTitle }>
                    <FormattedMessage id={ 'number.of.items.title' } />
                </span>
                <span className={ classes.generalInfoDescritption }>
                    <span className={ classes.amount }>
                        {`${numberOfItems} `}
                        <FormattedPlural
                            value={ numberOfItems }
                            one={ <FormattedMessage id={ 'word.item.title' } /> }
                            other={ <FormattedMessage id={ 'word.items.title' } /> }
                        />
                    </span>
                </span>
                <span className={ classes.generalInfoTitle }>
                    <FormattedMessage id={ 'date.of.creation.title' } />
                </span>
                <span className={ classes.generalInfoDescritption }>
                    <DateFormatter date={ date } />
                </span>
            </span>
            <div className={ classes.actions }>
                <IconButton
                    className={`${ classes.actionItem } ${ classes.actionEdit }`}
                    onClick={ () => handleUpdateWishlist(id, name) }
                    disabled={ isLoading }
                    classes={{ disabled: classes.actionItemDisabled }}
                >
                    <EditIcon />
                </IconButton>

                <IconButton
                    className={`${ classes.actionItem } ${ classes.actionDelete }`}
                    onClick={ () => handleDeleteWishlist(id) }
                    disabled={ isLoading }
                    classes={{ disabled: classes.actionItemDisabled }}
                >
                    <DeleteIcon />
                </IconButton>
            </div>
        </div>
    );
};

export const WishlistsListItem = withStyles(styles)(WishlistsListItemComponent);
