import * as React from 'react';
import { NavLink } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider/Divider';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';

import { ClickEvent } from 'src/shared/interfaces/commoon/react';
import { AppPrice } from 'src/shared/components/Common/AppPrice';
import { priceTypeNameDefault, priceTypeNameOriginal } from 'src/shared/interfaces/product';
import { createCartItemAddToCart } from 'src/shared/helpers/cart';
import { pathProductPageBase, pathWishListsPage } from 'src/shared/routes/contentRoutes';
import { AppPageTitle } from '../../Common/AppPageTitle';
import { AppTable } from '../../Common/AppTable';
import { WishlistItemBaseInfo } from './WishlistItemBaseInfo';
import { styles } from './styles';
import { WishlistPageProps as Props, WishlistPageState as State } from './types';
import { connect } from './connect';

export const pageTitle = 'Search results for ';

@connect
export class WishlistDetailBase extends React.Component<Props, State> {
  public state: State = {
    movedItem: '',
  };

  public componentDidUpdate(prevProps: Props, prevState: State) {
    if (prevState.movedItem && this.props.cartItemsLength > prevProps.cartItemsLength) {
      this.props.deleteItemAction(this.props.wishlist.id, prevState.movedItem);
      this.setState(() => ({movedItem: ''}));
    }
  }

  public renderProduct = (sku: string, name: string) => (event: ClickEvent) => {
    event.persist();
    this.props.changeLocation(`${pathProductPageBase}/${sku.split('_')[0]}`);
  };

  public handleDeleteItem = (sku: string) => (event: ClickEvent) => {
    event.persist();
    this.props.deleteItemAction(this.props.wishlist.id, sku);
  };

  public moveToCart = (sku: string) => (event: ClickEvent) => {
    event.persist();
    this.setState(() => ({movedItem: sku}));
    this.props.addItemToCartAction(createCartItemAddToCart(sku, 1), this.props.cartId);
  };

  public moveAllProductsToCart = (event: ClickEvent) => {
    event.persist();
    const {products} = this.props;
    const availableProducts: string[] = products.filter(({availability}) => availability).map(({sku}) => sku);

    this.props.multiItemsCartAction(this.props.cartId, availableProducts);
  };

  public wishlistMenu = () => {
    const {classes, wishlist} = this.props;

    return (
      <MenuList className={ classes.menu }>
        <MenuItem className={ classes.menuItem }>
          <NavLink to={ pathWishListsPage } className={ classes.link }>Wishlist</NavLink>
        </MenuItem>
        <MenuItem className={ classes.menuItem }>{ wishlist.name }</MenuItem>
      </MenuList>
    );
  };

  public render() {
    const {classes, products, isLoading, cartLoading, currency} = this.props;
    const tableAction = cartLoading ? classes.tableActionDisabled : classes.tableAction;

    if (!products.length && isLoading) {
      return null;
    }

    const headerCells: {content: string}[] = [
      {content: 'Product'},
      {content: 'Price'},
      {content: 'Availability'},
      {content: ''},
      {content: ''},
    ];

    const bodyRows: any[] = products.map(item => {
      const prices: any = {default: '', original: ''};

      item.prices.forEach((price: any) => {
        if (price.priceTypeName.toLowerCase() === 'default') {
          prices.default = price.grossAmount + '';
        } else {
          if (price.priceTypeName.toLowerCase() === 'original') {
            prices.original = price.grossAmount + '';
          }
        }
      });

      return {
        id: item.sku,
        cells: [
          {
            content: (<WishlistItemBaseInfo productItem={item} renderProduct={this.renderProduct}/>),
          },
          {
            content: (
              <div className={ classes.vertical }>
                <AppPrice
                  value={ prices.original }
                  extraClassName={ classes.price }
                  currency={ currency }
                  priceType={ priceTypeNameOriginal }
                />
                <AppPrice
                  value={ prices.default }
                  extraClassName={ classes.price }
                  currency={ currency }
                  priceType={ priceTypeNameDefault }
                />
              </div>
            ),
          },
          {
            content: (
              <span className={ item.availability ? classes.available : classes.noAvailable }>
                { item.availability ? 'Available' : 'Not available' }
              </span>
            ),
          },
          {
            content: (
              <Typography component="span" className={ tableAction } onClick={ this.moveToCart(item.sku) }>
                Add to Cart
              </Typography>
            ),
          },
          {
            content: (
              <Typography component="span" className={ tableAction } onClick={ this.handleDeleteItem(item.sku) }>
                Remove
              </Typography>
            ),
          },
        ],
      };
    });

    return (
      <Grid container>
        <Grid item xs={ 12 }>
          <AppPageTitle
            classes={ {root: classes.appPageTitleRoot, pageHeader: classes.appPageTitleRootPageHeader} }
            title="Wishlist"
          />
        </Grid>

        <Grid item xs={ 12 }>
          { this.wishlistMenu() }

          { bodyRows.length
            ? (
              <Paper elevation={ 0 }>
                <AppTable
                  classes={ {bodyCell: classes.bodyCell} }
                  headerCells={ headerCells }
                  bodyRows={ bodyRows }
                />

                <Button
                  className={ classes.addAllBtn }
                  color="primary"
                  variant="contained"
                  onClick={ this.moveAllProductsToCart }
                  disabled={ isLoading || cartLoading }
                >
                  Add all available products to cart
                </Button>
              </Paper>
            ) : (
              <Paper elevation={ 0 }>
                <Divider/>

                <Typography paragraph className={ classes.noItems }>
                  Currently no items in your wishlist.
                </Typography>
              </Paper>
            )
          }
        </Grid>
      </Grid>
    );
  }
}

export const ConnectedWishlistDetailPage = withStyles(styles)(WishlistDetailBase);

export default ConnectedWishlistDetailPage;
