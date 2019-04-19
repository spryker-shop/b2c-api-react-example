import * as React from 'react';
import { connect } from './connect';
import { formattedDate } from '@helpers/common/dates';
import { FormattedDate, FormattedMessage } from 'react-intl';
import { ClickEvent, InputChangeEvent } from '@interfaces/common';
import { IWishlistsTableProps as Props, IWishlistsTableState as State } from './types';
import { IWishlist } from '@interfaces/wishlist';
import { ICellInfo, ITableRow } from '@components/AppTable/types';
import { AppTable } from '@components/AppTable';
import { NavLink } from 'react-router-dom';
import { pathWishlistPageBase } from '@constants/routes';
import { Paper, Divider, Typography, TextField, IconButton, withStyles } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { styles } from './styles';

@connect
export class WishlistsTableComponent extends React.Component<Props, State> {
    readonly headerCellPart = 'header-';
    readonly bodyCellPart = 'body-';
    readonly headerCells: ICellInfo[] = [
        { content: 'Name', id: `${this.headerCellPart}1` },
        { content: 'Items', id: `${this.headerCellPart}2` },
        { content: 'Created', id: `${this.headerCellPart}3` },
        { content: '', id: `${this.headerCellPart}4` },
        { content: '', id: `${this.headerCellPart}5` }
    ];

    readonly state: State = {
        updatedName: '',
        updatedList: ''
    };

    protected handleChangeUpdatedName = (event: InputChangeEvent): void => {
        event.persist();
        this.setState(() => ({ updatedName: event.target.value }));
    };

    protected handleUpdateWishlist = (event: ClickEvent): void => {
        this.props.updateWishlistAction(this.state.updatedList, this.state.updatedName);
        this.setState(() => ({ updatedList: '', updatedName: '' }));
    };

    protected handleDeleteWishlist = (wishlistId: string) => (event: ClickEvent): void => {
        this.props.deleteWishlistAction(wishlistId);
    };

    protected setUpdatedWishlist = (id: string, name: string) => (event: ClickEvent): void => {
        this.setState({
            updatedList: id,
            updatedName: name
        });
    };

    protected generateTableRows = (): ITableRow[] => {
        if (!this.props.wishlists) {
            return [];
        }

        const { classes, isLoading } = this.props;
        const tableAction = isLoading ? classes.tableActionDisabled : classes.tableAction;

        return this.props.wishlists.map((item: IWishlist) => {
            const date = formattedDate(item.createdAt);

            const wishlistRow = {
                id: item.id,
                cells: [
                    {
                        content: (
                            this.state.updatedList && this.state.updatedList === item.id
                                ? (
                                    <form noValidate autoComplete="off" className={ classes.updateCell }>
                                        <TextField
                                            value={ this.state.updatedName }
                                            onChange={ this.handleChangeUpdatedName }
                                        />
                                        <IconButton
                                            color="primary"
                                            onClick={ this.handleUpdateWishlist }
                                            disabled={ isLoading }
                                        >
                                            <SaveIcon />
                                        </IconButton>
                                    </form>
                                ) : (
                                    <NavLink
                                        className={ classes.link }
                                        to={ `${pathWishlistPageBase}/${item.id}` }
                                    >
                                        { item.name }
                                    </NavLink>
                                )
                        ),
                        id: `${this.bodyCellPart}1`
                    },
                    { content: item.numberOfItems, id: `${this.bodyCellPart}2` },
                    {
                        content: (
                            <FormattedDate
                                value={ new Date(date) }
                                year="numeric"
                                month="short"
                                day="2-digit"
                            />
                        ),
                        id: `${this.bodyCellPart}3`
                    },
                    {
                        content: (
                            <Typography
                                component="span"
                                className={ tableAction }
                                onClick={ this.setUpdatedWishlist(item.id, item.name) }
                            >
                                <FormattedMessage id={ 'word.edit.title' } />
                            </Typography>
                        ),
                        id: `${this.bodyCellPart}4`
                    },
                    {
                        content: (
                            <Typography
                                component="span"
                                className={ tableAction }
                                onClick={ this.handleDeleteWishlist(item.id) }
                            >
                                <FormattedMessage id={ 'word.delete.title' } />
                            </Typography>
                        ),
                        id: `${this.bodyCellPart}5`
                    }
                ]
            };

            return wishlistRow;
        });
    };

    public render = (): JSX.Element => {
        const { classes } = this.props;
        const bodyRows = this.generateTableRows();

        if (!bodyRows.length) {
            return (
                <Paper elevation={ 0 }>
                    <Divider />

                    <Typography paragraph className={ classes.noItems }>
                        <FormattedMessage id={ 'create.list.message' } />
                    </Typography>
                </Paper>
            );
        }

        return <AppTable headerCells={ this.headerCells } bodyRows={ bodyRows } />;
    };
}

export const WishlistsTable = withStyles(styles)(WishlistsTableComponent);
