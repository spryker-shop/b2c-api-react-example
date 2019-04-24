import * as React from 'react';
import { connect } from './connect';
import { FormattedMessage } from 'react-intl';
import { createCartItemAddToCart } from '@helpers/cart';
import { pathProductPageBase } from '@constants/routes';
import { WishListItemsTableProps, WishListItemsTableState, ItemPrices } from './types';
import { ClickEvent } from '@interfaces/common';
import { IWishlistProduct } from '@interfaces/wishlist';
import { IProductPricesItem, priceTypeNameDefault, priceTypeNameOriginal } from '@interfaces/product';
import { ICellInfo, ITableRow } from '@application/components/AppTable/types';
import { AppTable } from '@application/components/AppTable';
import { AppPrice } from '@application/components/AppPrice';
import { WishlistItemBaseInfo } from '../WishlistItemBaseInfo';
import { Typography, Paper, Button, Divider, withStyles } from '@material-ui/core';
import { styles } from './styles';

@connect
export class WishlistItemsTableComponent extends React.Component<WishListItemsTableProps, WishListItemsTableState> {
    protected headerCellPart: string = 'header-';
    protected headerCells: ICellInfo[] = [
        {content: <FormattedMessage id={ 'word.product.title' } />, id: `${this.headerCellPart}1`},
        {content: <FormattedMessage id={ 'word.price.title' } />, id: `${this.headerCellPart}2`},
        {content: <FormattedMessage id={ 'word.availability.title' } />, id: `${this.headerCellPart}3`},
        {content: '', id: `${this.headerCellPart}4`},
        {content: '', id: `${this.headerCellPart}5`},
    ];
    protected bodyCellPart: string = 'body-';

    readonly state: WishListItemsTableState = {
        movedItem: ''
    };

    public componentDidUpdate = (prevProps: WishListItemsTableProps, prevState: WishListItemsTableState): void => {
        const { cartItemsLength, wishlist } = this.props;

        this.props.deleteMultiItemsHandler(cartItemsLength, prevProps.cartItemsLength);

        if (prevState.movedItem && cartItemsLength > prevProps.cartItemsLength) {
            this.props.deleteItemAction(wishlist.id, prevState.movedItem);
            this.setState({movedItem: ''});
        }
    };

    protected moveToCart = (sku: string) => (event: ClickEvent): void => {
        event.persist();

        this.setState({
            movedItem: sku
        });
        this.props.addItemToCartAction(createCartItemAddToCart(sku, 1), this.props.cartId);
    };

    protected moveAllProductsToCart = (event: ClickEvent): void => {
        event.persist();
        const { products, cartId } = this.props;
        const availableProducts: string[] = products.filter(({availability}) => availability).map(({sku}) => sku);

        this.props.moveToCartHandler(cartId, availableProducts);
    };

    protected handleDeleteItem = (sku: string) => (event: ClickEvent): void => {
        event.persist();
        this.props.deleteItemAction(this.props.wishlist.id, sku);
    };

    protected renderProduct = (sku: string) => (event: ClickEvent): void => {
        event.persist();
        this.props.changeLocation(`${pathProductPageBase}/${sku.split('_')[0]}`);
    };

    protected getTableRows = (): ITableRow[] => {
        const { classes, currency } = this.props;
        const tableAction = this.props.cartLoading ? classes.tableActionDisabled : classes.tableAction;

        return this.props.products.map((item: IWishlistProduct) => {
            const prices: ItemPrices = this.getItemPrices(item.prices);

            return {
                id: item.sku,
                cells: [
                    {
                        content: (<WishlistItemBaseInfo productItem={item} renderProduct={this.renderProduct}/>),
                        id: `${this.bodyCellPart}1`
                    },
                    {
                        content: (
                            <div className={classes.vertical}>
                                <span className={ classes.price }>
                                    <AppPrice
                                        value={prices.original}
                                        currency={currency}
                                        priceType={priceTypeNameOriginal}
                                    />
                                </span>
                                <span className={ classes.price }>
                                    <AppPrice
                                        value={prices.default}
                                        currency={currency}
                                        priceType={priceTypeNameDefault}
                                    />
                                </span>
                            </div>
                        ),
                        id: `${this.bodyCellPart}2`
                    },
                    {
                        content: (
                            <span className={item.availability ? classes.available : classes.noAvailable}>
                                <FormattedMessage
                                    id={`${item.availability ? 'available.title' : 'unavailable.title'}`}
                                />
                            </span>
                        ),
                        id: `${this.bodyCellPart}3`
                    },
                    {
                        content: (
                            <Typography component="span" className={tableAction}
                                        onClick={this.moveToCart(item.sku)}>
                                <FormattedMessage id={'add.to.cart.button.title'}/>
                            </Typography>
                        ),
                        id: `${this.bodyCellPart}4`
                    },
                    {
                        content: (
                            <Typography component="span" className={tableAction}
                                        onClick={this.handleDeleteItem(item.sku)}>
                                <FormattedMessage id={'remove.button.title'}/>
                            </Typography>
                        ),
                        id: `${this.bodyCellPart}5`
                    },
                ],
            };
        });
    };

    protected getItemPrices = (prices: IProductPricesItem[]): ItemPrices => {
        const itemPrices: ItemPrices = {default: '', original: ''};

        prices.forEach((price: IProductPricesItem) => {
            if (price.priceTypeName.toLowerCase() === 'default') {
                itemPrices.default = String(price.grossAmount);
            } else if (price.priceTypeName.toLowerCase() === 'original') {
                itemPrices.original = String(price.grossAmount);
            }
        });

        return itemPrices;
    };

    public render = (): JSX.Element => {
        const { isLoading, cartLoading, classes, products } = this.props;

        if (products && products.length) {
            return (
                <Paper elevation={ 0 }>
                    <AppTable classes={ { bodyCell: classes.bodyCell } } headerCells={ this.headerCells }
                              bodyRows={ this.getTableRows() } />
                    <Button
                        className={ classes.addAllBtn }
                        color="primary"
                        variant="contained"
                        onClick={ this.moveAllProductsToCart }
                        disabled={ isLoading || cartLoading }
                    >
                        <FormattedMessage id={'add.all.products.to.cart.title'} />
                    </Button>
                </Paper>
            );
        }

        return (
            <Paper elevation={0}>
                <Divider />

                <Typography
                    paragraph
                    className={classes.noItems}
                >
                    <FormattedMessage id={'wishlist.empty.message'} />
                </Typography>
            </Paper>
        );
    }
}

export const WishlistItemsTable = withStyles(styles)(WishlistItemsTableComponent);
