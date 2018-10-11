import * as React from "react";
import {RouteProps} from "react-router";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { toast } from 'react-toastify';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

import {reduxify} from '../../../lib/redux-helper';
import {
  getProduct, isPageProductStateInitiated, isPageProductStateLoading,
  isPageProductStateRejected, isProductDetailsPresent
} from '../../../reducers/Pages/Product';
import {AppMain} from '../../Common/AppMain';
import {ImageSlider} from '../../Common/ImageSlider';
import {ProductGeneralInfo} from './ProductGeneralInfo';
import {DropdownControlled} from '../../UI/DropdownControlled';
import {ProductAvailability} from './ProductAvailability';
import {SprykerButton} from '../../UI/SprykerButton';
import {ProductAttributes} from './ProductAttributes';
import {
  concreteProductType,
  absentProductType,
  defaultItemValueDropdown,
  IProductAttributeMap,
  IProductAttributes,
  IProductCardImages,
  IProductPropFullData,
  ISuperAttributes,
  TProductQuantity,
  IProductDataParsed, priceTypeNameOriginal,
} from '../../../interfaces/product';
import {IImageSlide} from '../../../components/Common/ImageSlider';

import {styles} from './styles';
import {
  ISuperAttribute,
  getAvailabilityDisplay,
  createQuantityVariants,
  createPathToIdProductConcrete,
  findIdProductConcreteByPath,
  getInitialSuperAttrSelected,
} from "../../../services/productHelper";
import {addItemToCartAction} from "../../../actions/Common/Cart";
import {isCartCreated, getCartId} from "../../../reducers/Common/Cart";
import {
  getPayloadForCreateCart,
  isAppInitiated,
  TAppPriceMode,
  TAppStore,
} from "../../../reducers/Common/Init";
import {isUserAuthenticated} from "../../../reducers/Pages/Login";
import {createCartItemAddToCart} from "../../../services/cartHelper";
import {ICartCreatePayload} from "../../../services/Common/Cart";
import {ICartAddItem, TCartId} from "../../../interfaces/cart/index";
import {AppPrice} from "../../Common/AppPrice/index";
import {getProductDataAction} from "../../../actions/Pages/Product";
import {getRouterLocation, getRouterMatchParam, TRouterMatchParam} from "../../../selectors/Common/router";
import {cartAuthenticateErrorText} from "../../../constants/messages/errors";

export const buyBtnTitle = "Add to cart";
const quantitySelectedInitial = 1;

interface ProductPageProps extends WithStyles<typeof styles>, RouteProps {
  product: IProductDataParsed | null;
  isAppDataSet: boolean;
  isUserLoggedIn: boolean;
  appPriceMode: TAppPriceMode;
  appStore: TAppStore;
  addItemToCart: Function;
  getProductData: Function;
  cartCreated: boolean;
  cartId: TCartId;
  payloadForCreateCart: ICartCreatePayload;
  isLoading: boolean;
  isRejected: boolean;
  isInitiated: boolean;
  locationProductSKU?: TRouterMatchParam;
  isProductExist: boolean;
}

interface ProductPageState extends IProductPropFullData, ISuperAttributes {
  attributeMap: IProductAttributeMap | null;
  superAttrSelected: IProductAttributes;
  quantitySelected: TProductQuantity;
}

export class ProductPageBase extends React.Component<ProductPageProps, ProductPageState> {

  public state: ProductPageState = {
    attributeMap: null,
    superAttrSelected: {},
    quantitySelected: quantitySelectedInitial,
    superAttributes: null,
    productType: null,
    sku: null,
    name: null,
    images: null,
    availability: null,
    description: null,
    price: null,
    priceOriginalGross: null,
    priceOriginalNet: null,
    priceDefaultGross: null,
    priceDefaultNet: null,
    attributes: null,
    quantity: null,
  };

  public componentDidMount = () => {
    /*if (this.props.product) {
      this.setInitialData();
    }*/
    const requestProductCondition = (
      !this.props.isProductExist
      ||(this.props.isProductExist && this.props.locationProductSKU !== this.props.product.abstractProduct.sku)
    );
    console.log('componentDidMount requestProductCondition ', requestProductCondition);
    if (requestProductCondition) {
       this.initRequestData();
    }
  }

  public componentDidUpdate = (prevProps: any, prevState: any) => {
    if (this.props.product && !prevState.productType) {
      this.setInitialData();
    }

    const requestProductCondition = (!this.props.isLoading && !this.props.isProductExist);
    if (requestProductCondition) {
      this.initRequestData();
    }
    console.log('componentDidUpdate this.props.isProductExist ', this.props.isProductExist);
    console.log('componentDidUpdate requestProductCondition ', requestProductCondition);
    /*if (!this.props.product
      && !this.props.isInitiated
    ) {
      this.props.getProductData(this.props.locationProductSKU);
    }*/
  }

  private initRequestData = () => {
    const requestProductCondition = (this.props.isAppDataSet && this.props.locationProductSKU);
    if (requestProductCondition) {
      this.props.getProductData(this.props.locationProductSKU);
      return true;
    }
    return false;
  }

  public handleSuperAttributesChange = (event: any, child: React.ReactNode): void => {
    const key = event.target.name;
    const value = event.target.value;

    let productData: IProductPropFullData | null;

    if (value === defaultItemValueDropdown) {
      // If selected nothing
      productData = this.getProductDataObject(
        this.props.product.abstractProduct
      );
    } else {
      // If selected a concrete product
      const idProductConcrete = this.getIdProductConcrete(key, value);

      if (!idProductConcrete) {
        // Such product does not exist
        productData = this.getProductDataObject(null);
      } else {
        // Such product exists
        productData = this.getProductDataObject(
          this.props.product.concreteProducts[idProductConcrete]
        );
      }
    }

    this.setState( (prevState: ProductPageState) => {
      if (this.state.superAttrSelected[key] === value) {
        return;
      }
      return ({
          ...prevState,
          superAttrSelected: {
            ...prevState.superAttrSelected,
            [key]: value,
          },
          quantitySelected: quantitySelectedInitial,
          ...productData,
      });
    });
  }

  public handleProductQuantityChange = (event: any, child: React.ReactNode): void => {
    const value = event.target.value;
    this.setState( (prevState: ProductPageState) => {
      if (this.state.quantitySelected === value) {
        return;
      }
      return ({
          ...prevState,
          quantitySelected: value,
      });
    });
  }

  public handleBuyBtnClick = (event: any): any => {
    if (!this.props.isUserLoggedIn) {
      toast.error(cartAuthenticateErrorText);
      return;
    }
    if (this.state.productType === concreteProductType ) {
      this.props.addItemToCart(
        createCartItemAddToCart(this.state.sku, this.state.quantitySelected),
        this.props.cartId,
        this.props.payloadForCreateCart
      );

      this.setState( (prevState: ProductPageState) => {
        if (this.state.quantitySelected === quantitySelectedInitial) {
          return;
        }
        return ({
          ...prevState,
          quantitySelected: quantitySelectedInitial,
        });
      });
    }
    return null;
  }

  private getProductDataObject = (data: IProductPropFullData | null): IProductPropFullData => {
    const defaultValues = this.props.product.abstractProduct;
    return {
      sku: data ? data.sku : null,
      name: data ? data.name : defaultValues.name,
      images: data ? data.images : defaultValues.images,
      availability: data ? data.availability : false,
      description: data ? data.description : defaultValues.description,
      price: data ? data.price : null,
      priceOriginalGross: data ? data.priceOriginalGross : null,
      priceOriginalNet: data ? data.priceOriginalNet : null,
      priceDefaultGross: data ? data.priceDefaultGross : null,
      priceDefaultNet: data ? data.priceDefaultNet : null,
      attributes: data ? data.attributes : defaultValues.attributes,
      quantity: data ? data.quantity : defaultValues.quantity,
      productType: data ? data.productType : absentProductType,
    };
  }

  private setInitialData = (): void => {
    let productData: IProductPropFullData | null;
    const concreteProductsIds = Object.keys(this.props.product.concreteProducts);
    const isOneConcreteProduct = (concreteProductsIds.length === 1);
    if (isOneConcreteProduct) {
      productData = this.getProductDataObject(this.props.product.concreteProducts[concreteProductsIds[0]]);
    } else {
      productData = this.getProductDataObject(this.props.product.abstractProduct);
    }

    // Parsing superAttributes to set initial data for this.state.superAttrSelected
    const selectedAttrNames = getInitialSuperAttrSelected(this.props.product.superAttributes);

    this.setState( (prevState: ProductPageState) => {
      return ({
          ...prevState,
          superAttributes: this.props.product.superAttributes,
          attributeMap: this.props.product.attributeMap,
          superAttrSelected: selectedAttrNames,
          ...productData,
        });
    });
  }

  private getIdProductConcrete = (key: string, value: string) => {
    const selected = {...this.state.superAttrSelected};
    selected[key] = value;
    const path = createPathToIdProductConcrete(selected);
    if (!path) {
      return false;
    }

    const id = findIdProductConcreteByPath(path, this.state.attributeMap.attribute_variants);
    return id;
  }

  private getSuperAttrValue = (key: string) => {
    if (!key) {
      return defaultItemValueDropdown;
    }
    return (
      this.state.superAttrSelected[key]
        ? this.state.superAttrSelected[key]
        : defaultItemValueDropdown
    );
  }

  private getImageData = (images: Array<IProductCardImages>): Array<IImageSlide> | null => {
    if (!images) {
      return null;
    }
    const response = images.map((element: any, index: number) => (
      {
        id: index,
        src: element.externalUrlLarge,
      }
    ));
    return response;
  }

  private isBuyBtnDisabled = () => {
    if (this.state.productType === concreteProductType && this.state.availability) {
      return false;
    }
    return true;
  }

  public render(): JSX.Element {
    console.info('props: ', this.props);
    const {classes, isLoading} = this.props;
    console.info('state: ', this.state);

    return (
      <AppMain>
        { (!this.props.product || !this.state.productType || !this.props.isAppDataSet || this.props.isRejected)
          ? null
          : (
            <div className={classes.root} >
              <Grid container justify="center" >
                <Grid item xs={12} sm={6} className={classes.sliderParent}>
                  <ImageSlider images={this.getImageData(this.state.images)} />
                </Grid>
                <Grid item xs={12} sm={6} >
                  <ProductGeneralInfo
                    name={this.state.name}
                    sku={this.state.sku}
                    price={<AppPrice value={this.state.priceDefaultGross}/>}
                    oldPrice={<AppPrice value={this.state.priceOriginalGross} priceType={priceTypeNameOriginal}/>}
                  />

                  { this.state.superAttributes
                    ? this.state.superAttributes.map((item: ISuperAttribute) => (
                      <DropdownControlled
                        key={item.name}
                        nameAttr={item.name}
                        nameToShow={item.nameToShow}
                        value={this.getSuperAttrValue(item.name)}
                        handleChange={this.handleSuperAttributesChange}
                        menuItems={item.data}
                      />
                    ))
                    : null
                  }

                  <ProductAvailability availability={getAvailabilityDisplay(this.state.availability)} />

                  <Grid container justify="center" className={classes.buyBtnArea}>
                    <Grid item xs={12} sm={6} className={classes.buyBtnParent} >
                      <SprykerButton
                        title={buyBtnTitle}
                        extraClasses={classes.buyBtn}
                        onClick={this.handleBuyBtnClick}
                        IconType={AddShoppingCartIcon}
                        disabled={this.isBuyBtnDisabled()}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} >
                      {this.isBuyBtnDisabled()
                        ? null
                        : <DropdownControlled
                          nameAttr="quantity"
                          nameToShow="Quantity"
                          value={this.state.quantitySelected}
                          handleChange={this.handleProductQuantityChange}
                          menuItems={createQuantityVariants(this.state.quantity)}
                        />
                      }
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid container justify="center" >
                <ProductAttributes attributes={this.state.attributes} />
                <Grid item xs={12}>
                  <Typography color="inherit" variant="body2" component="p" gutterBottom={true}>
                    {this.state.description}
                  </Typography>
                </Grid>
              </Grid>
            </div>
          )
        }
      </AppMain>
    );
  }
}

export const ProductPage = withStyles(styles)(ProductPageBase);

export const ConnectedProductPage = reduxify(
  (state: any, ownProps: any) => {
    const location = getRouterLocation(state, ownProps);
    const product = getProduct(state, ownProps);
    const isUserLoggedIn = isUserAuthenticated(state, ownProps);
    const cartCreated: boolean = isCartCreated(state, ownProps);
    const cartId: TCartId = getCartId(state, ownProps);
    const payloadForCreateCart: ICartCreatePayload = getPayloadForCreateCart(state, ownProps);
    const isAppDataSet: boolean = isAppInitiated(state, ownProps);
    const isLoading: boolean = isPageProductStateLoading(state, ownProps);
    const isRejected: boolean = isPageProductStateRejected(state, ownProps);
    const isInitiated: boolean = isPageProductStateInitiated(state, ownProps);
    const locationProductSKU = getRouterMatchParam(state, ownProps, 'productId');
    const isProductExist = isProductDetailsPresent(state, ownProps);

    return ({
      location,
      product,
      cartCreated,
      cartId,
      isAppDataSet,
      payloadForCreateCart,
      isUserLoggedIn,
      isInitiated,
      isLoading,
      isRejected,
      locationProductSKU,
      isProductExist,
    });
  },
  (dispatch: Function) => ({
    addItemToCart: (
      payload: ICartAddItem, cartId: TCartId, payloadCartCreate: ICartCreatePayload
    ) => dispatch(addItemToCartAction(payload, cartId, payloadCartCreate)),
    getProductData: (sku: string) => dispatch(getProductDataAction(sku)),
  })
)(ProductPage);
