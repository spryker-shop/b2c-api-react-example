import * as React from 'react';
import { connect } from './connect';
import { withRouter } from 'react-router';
import { getAvailabilityDisplay, parseCurrentProductDataObject } from '@helpers/product';
import { FormattedMessage } from 'react-intl';
import { withStyles, Grid } from '@material-ui/core';
import { AppMain } from '@components/AppMain';
import { ProductImageSlider } from '@components/ProductImageSlider';
import { ProductGeneralInfo } from './ProductGeneralInfo';
import { ProductSuperAttribute } from './ProductSuperAttribute';
import { ProductConfiguratorAddToCart } from './ProductConfiguratorAddToCart';
import { ProductConfiguratorAddToWishlist } from './ProductConfiguratorAddToWishlist';
import { ProductDetail } from './ProductDetail';
import { ErrorBoundary } from '@hoc/ErrorBoundary';
import { ProductRelations } from '@containers/ProductRelations';
import { Breadcrumbs } from '@components/Breadcrumbs';
import { ProductPageProps as Props, ProductPageState as State } from './types';
import { IProductAttributes, IProductPropFullData } from '@interfaces/product';
import { IIndexSignature, IBreadcrumbItem } from '@interfaces/common';
import { Preloader } from '@components/Preloader';
import { styles } from './styles';

@(withRouter as Function)
@connect
export class ProductPageComponent extends React.Component<Props, State> {
    public state: State = {
        superAttrSelected: {},
        productType: null,
        sku: null,
        name: null,
        images: null,
        availability: null,
        description: null,
        prices: {
            priceOriginalGross: null,
            priceOriginalNet: null,
            priceDefaultGross: null,
            priceDefaultNet: null,
        },
        categoriesTree: [],
        descriptionAttributes: null
    };

    public componentDidMount = (): void => {
        this.props.getProductData(this.props.locationProductSKU);
    };

    public componentDidUpdate = (prevProps: Props, prevState: State): void => {
        if (this.props.isRejected || this.props.isLoading) {
            return;
        }

        if (!this.props.isFulfilled
            && (!prevProps.product || prevProps.product.abstractProduct.sku !== this.props.locationProductSKU)
        ) {
            this.props.getProductData(this.props.locationProductSKU);

            return;
        }

        if (this.props.product.abstractProduct.sku !== this.props.locationProductSKU) {
            this.props.getProductData(this.props.locationProductSKU);

            return;
        }

        const isShouldUpdateProductState = (prevProps.isFulfilled !== this.props.isFulfilled) ||
            !prevProps.product || (prevProps.product.abstractProduct.sku !== this.props.locationProductSKU);

        if (isShouldUpdateProductState) {
            this.setInitialData();
        }

        if (prevState.name !== this.state.name) {
            this.getCategoiriesTree();
        }
    };

    protected handleSuperAttributesChange = (name: string, value: string): void => {
        const { superAttrSelected } = this.state;
        const changedSelectedAttr = { ...superAttrSelected, [name]: value };
        const isAllAttributesSelected = !Object.values(changedSelectedAttr).some(item => item === null);

        this.setState({ superAttrSelected: changedSelectedAttr });

        if (isAllAttributesSelected) {
            const productData = this.findAndParseConcreteProduct(changedSelectedAttr);
            this.changeProductDataState(productData);
        }
    };

    protected findAndParseConcreteProduct = (changedSelectedAttr: IProductAttributes): IProductPropFullData => {
        const { abstractProduct, concreteProducts, attributeVariants } = this.props.product;
        const path: string[] = Object.keys(changedSelectedAttr).map(attr => `${attr}:${changedSelectedAttr[attr]}`);
        const idProductConcrete: string = path.reduce((acc: IIndexSignature, key): IIndexSignature | string => {
            const convertedAcc  = acc[key] as unknown as { [key: string]: { id_product_concrete: string }; };

            return acc[key] && convertedAcc.id_product_concrete ? convertedAcc.id_product_concrete : acc[key];
        }, {...(attributeVariants as unknown as IIndexSignature)}) as string;

        if (!idProductConcrete) {
            return parseCurrentProductDataObject(abstractProduct, null);
        }

        return parseCurrentProductDataObject(abstractProduct, concreteProducts[idProductConcrete]);
    };

    protected changeProductDataState = (productData: IProductPropFullData): void =>
        this.setState((prevState: State) => ({ ...prevState, ...productData }));

    protected setInitialData = (): void => {
        const { state: locationState } = this.props.location;
        const activeSupperAttributes = locationState && locationState.superAttributes
            ? locationState.superAttributes : false;
        const { concreteProducts, abstractProduct, superAttributes, selectedAttrNames } = this.props.product;
        const concreteProductsIds = Object.keys(concreteProducts);
        const isOneConcreteProduct = Boolean(concreteProductsIds.length === 1);
        const superAttrSelected = Object.keys(selectedAttrNames).reduce((acc: IIndexSignature, name) => {
            const redirectedAttributes = activeSupperAttributes
                ? activeSupperAttributes.filter((item: IIndexSignature) => Boolean(item[name]))
                : false;

            acc[name] = Boolean(redirectedAttributes.length)
                ? redirectedAttributes[0][name]
                : superAttributes.filter(item => item.name === name)[0].data[0].value;

            return acc;
        }, {});

        const productData: IProductPropFullData | null = isOneConcreteProduct
            ? parseCurrentProductDataObject(abstractProduct, concreteProducts[concreteProductsIds[0]])
            : this.findAndParseConcreteProduct(superAttrSelected);

        this.setState({ superAttrSelected, ...productData });
    };

    protected getCategoiriesTree = (): void => {
        const { state: locationState } = this.props.location;
        const formattedCategoriesTree: IBreadcrumbItem[] = locationState && locationState.categoriesTree
            ? locationState.categoriesTree : false;
        let categoriesTree: IBreadcrumbItem[] = [];

        const productNode: IBreadcrumbItem = {
            name: this.state.name,
            current: true,
            path: ''
        };

        if (Boolean(formattedCategoriesTree)) {
            categoriesTree = formattedCategoriesTree.map((item: IBreadcrumbItem) => ({
                name: item.name,
                path: item.path
            }));
        }

        categoriesTree.push(productNode);
        this.setState({ categoriesTree });
    };

    public render(): JSX.Element {
        const {
            categoriesTree,
            sku,
            prices,
            name,
            productType,
            description,
            availability,
            descriptionAttributes,
            images,
            superAttrSelected
        } = this.state;
        const { classes, isUserLoggedIn, isWishlistsFetched, product } = this.props;
        const isComponentLoading = !this.props.product || !this.state.productType || this.props.isRejected;
        const shouldLoadRelationsImmediately = isUserLoggedIn ? isWishlistsFetched : true;
        const isDevServer = process.env.NODE_ENV === 'webpack-dev-server';
        const isParallelRequest = isDevServer ? shouldLoadRelationsImmediately : true;

        if (isComponentLoading) {
            return <Preloader />;
        }

        return (
            <div className={ classes.root }>
                <Breadcrumbs breadcrumbsList={ categoriesTree } />
                <AppMain>
                    <Grid container spacing={ 16 } className={ classes.productMain }>
                        <Grid item xs={ 12 } sm={ 6 }  md={ 7 }>
                            <div className={ classes.productPreview }>
                                <ProductImageSlider images={ images } />
                            </div>
                        </Grid>
                        <Grid item xs={ 12 } sm={ 6 } md={ 5 }>
                            <div className={ classes.productContent }>
                                <ProductGeneralInfo
                                    name={ name }
                                    sku={ sku }
                                    price={ prices ? prices.priceDefaultGross : null }
                                    oldPrice={ prices && prices.priceOriginalGross ? prices.priceOriginalGross : null }
                                    availability={ getAvailabilityDisplay(availability) }
                                />

                                { product.superAttributes &&
                                    <ErrorBoundary>
                                        <ProductSuperAttribute
                                            superAttrSelected={ superAttrSelected }
                                            superAttributes={ product.superAttributes }
                                            onChange={ this.handleSuperAttributesChange }
                                        />
                                    </ErrorBoundary>
                                }

                                <ErrorBoundary>
                                    <ProductConfiguratorAddToCart
                                        productType={ productType }
                                        product={ product.concreteProducts[sku] }
                                        sku={ sku }
                                    />
                                </ErrorBoundary>

                                { isUserLoggedIn &&
                                    <ErrorBoundary>
                                        <ProductConfiguratorAddToWishlist productType={ productType } sku={ sku } />
                                    </ErrorBoundary>
                                }
                            </div>
                        </Grid>
                    </Grid>
                    <ProductDetail
                        descriptionAttributes={ descriptionAttributes }
                        description={ description }
                        sku={ sku ? sku : product.abstractProduct.sku }
                    />
                    { isParallelRequest &&
                        <ErrorBoundary>
                            <ProductRelations
                                classes={{ root: classes.sliderWrapper, slider: classes.slider }}
                                sku={ product.abstractProduct.sku }
                                title={ <FormattedMessage id={ 'product.relations.title' } /> }
                            />
                        </ErrorBoundary>
                    }
                </AppMain>
            </div>
        );
    }
}

export const ProductPage = withStyles(styles)(ProductPageComponent);
