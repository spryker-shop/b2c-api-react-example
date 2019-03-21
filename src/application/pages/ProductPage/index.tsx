import * as React from 'react';
import { connect } from './connect';
import {
    createPathToIdProductConcrete,
    findIdProductConcreteByPath,
    getAvailabilityDisplay,
    getInitialSuperAttrSelected,
    parseCurrentProductDataObject
} from '@helpers/product';
import { withStyles, Grid } from '@material-ui/core';
import { AppMain } from '@application/components/AppMain';
import { ImageSlider } from '@application/components/ImageSlider';
import { ProductGeneralInfo } from './ProductGeneralInfo';
import { ProductSuperAttribute } from './ProductSuperAttribute';
import { ProductConfiguratorAddToCart } from './ProductConfiguratorAddToCart';
import { ProductConfiguratorAddToWishlist } from './ProductConfiguratorAddToWishlist';
import { ProductDetail } from './ProductDetail';
import { ErrorBoundary } from '@application/hoc/ErrorBoundary';
import { IImageSlide } from '@application/components/ImageSlider/types';
import { ProductRelations } from '@application/containers/ProductRelations';
import { ProductPageProps as Props, ProductPageState as State } from './types';
import { IProductAttributes, IProductCardImages, IProductPropFullData } from '@interfaces/product';
import { withRouter } from 'react-router';
import { Breadcrumbs } from '@application/components/Breadcrumbs';
import { styles } from './styles';
import { IBreadcrumbItem } from '@interfaces/category';

@(withRouter as Function)
@connect
export class ProductPageComponent extends React.Component<Props, State> {
    public state: State = {
        attributeMap: null,
        superAttrSelected: {},
        superAttributes: null,
        productType: null,
        sku: null,
        name: null,
        images: null,
        availability: null,
        description: null,
        price: null,
        prices: null,
        priceOriginalGross: null,
        priceOriginalNet: null,
        priceDefaultGross: null,
        priceDefaultNet: null,
        attributes: null,
        attributeNames: null,
        categoriesTree: []
    };

    public componentDidMount = (): void => {
        this.props.getProductData(this.props.locationProductSKU);
    };

    public componentDidUpdate = (prevProps: Props, prevState: State): void => {
        if (this.props.isRejected || this.props.isLoading || !this.props.isAppDataSet) {
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
            !prevProps.product || prevProps.product.abstractProduct.sku !== this.props.locationProductSKU;

        if (isShouldUpdateProductState) {
            this.setInitialData();
        }

        if (prevState.name !== this.state.name) {
            this.getCategoiriesTree();
        }
    };

    protected handleSuperAttributesChange = ({ name, value }: { name: string, value: string }): void => {
        const { abstractProduct, concreteProducts } = this.props.product;
        const { superAttrSelected } = this.state;
        const changedSelectedAttr = { ...superAttrSelected, [name]: value };
        const isAllAttributesSelected = !Object.values(changedSelectedAttr).some(item => item === null);
        const idProductConcrete = this.getIdProductConcrete(changedSelectedAttr);
        let productData: IProductPropFullData | null;

        this.setState((prevState: State) => ({
            ...prevState,
            superAttrSelected: {
                ...prevState.superAttrSelected,
                [name]: value
            }
        }));

        if (isAllAttributesSelected) {
            if (!idProductConcrete) {
                productData = parseCurrentProductDataObject(abstractProduct, null);

                this.changeProductDataState(productData);

                return;
            }

            productData = parseCurrentProductDataObject(abstractProduct, concreteProducts[idProductConcrete]);

            this.changeProductDataState(productData);
        }
    };

    protected changeProductDataState = (productData: IProductPropFullData): void => {
        this.setState((prevState: State) => ({ ...prevState, ...productData }));
    };

    protected setInitialData = (): void => {
        const { concreteProducts, abstractProduct, superAttributes, attributeMap } = this.props.product;
        const concreteProductsIds = Object.keys(concreteProducts);
        const isOneConcreteProduct = Boolean(concreteProductsIds.length === 1);
        const productData: IProductPropFullData | null = parseCurrentProductDataObject(
            abstractProduct,
            isOneConcreteProduct
                ? concreteProducts[concreteProductsIds[0]]
                : parseCurrentProductDataObject(abstractProduct, null, true)
        );

        const selectedAttrNames = getInitialSuperAttrSelected(superAttributes);

        this.setState((prevState: State) => ({
            ...prevState,
            superAttributes,
            attributeMap,
            superAttrSelected: selectedAttrNames,
            ...productData
        }));
    };

    protected getIdProductConcrete = (selected: IProductAttributes): string => {
        const path = createPathToIdProductConcrete(selected);
        const { attribute_variants } = this.state.attributeMap;

        if (path) {
            return findIdProductConcreteByPath(path, attribute_variants);
        }
    };

    protected getImageData = (images: IProductCardImages[]): IImageSlide[] | null => images
        ? images.map((element: IProductCardImages, index: number) => ({
            id: index,
            src: element.externalUrlLarge
        })) : null;

    protected getCategoiriesTree = (): void => {
        const { state: locationState } = this.props.location;
        const formattedCategoriesTree = locationState ? locationState.categoriesTree : false;
        let categoriesTree: IBreadcrumbItem[] = [];

        const productNode: IBreadcrumbItem = {
            name: this.state.name,
            current: true,
            nodeId: null
        };

        if (Boolean(formattedCategoriesTree)) {
            categoriesTree = formattedCategoriesTree.map((item: IBreadcrumbItem) => {
                const newItem = { ...item };
                delete newItem.current;

                return newItem;
            });
        }

        categoriesTree.push(productNode);
        this.setState({ categoriesTree });
    };

    public render(): JSX.Element {
        const {
            categoriesTree,
            sku,
            priceDefaultGross,
            priceOriginalGross,
            name,
            superAttributes,
            productType,
            attributes,
            attributeNames,
            description,
            availability
        } = this.state;
        const { classes, isUserLoggedIn, isWishlistsFetched } = this.props;
        const images = this.getImageData(this.state.images);
        const isComponentLoading = !this.props.product || !this.state.productType || !this.props.isAppDataSet ||
            this.props.isRejected;
        const isShouldLoadRelationsImmediately = isUserLoggedIn ? isWishlistsFetched : true;

        return (
            <div className={ classes.root }>
                { !isComponentLoading &&
                    <>
                        <Breadcrumbs breadcrumbsList={ categoriesTree } />
                        <AppMain>
                            <Grid container spacing={ 40 } className={ classes.productMain }>
                                <Grid item xs={ 12 } sm={ 12 } md={ 7 } className={ classes.sliderParent }>
                                    <div className={ classes.sliderParentContainer }>
                                        <ImageSlider
                                            images={ images }
                                            uniqueKey={ sku }
                                            showThumbs={ false }
                                            showStatus={ false }
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={ 12 } sm={ 12 } md={ 5 } className={ classes.generalInfoParent }>
                                    <ProductGeneralInfo
                                        name={ name }
                                        sku={ sku }
                                        price={ priceDefaultGross }
                                        oldPrice={ priceOriginalGross ? priceOriginalGross : null }
                                        availability={ getAvailabilityDisplay(availability) }
                                    />

                                    { superAttributes &&
                                        <ErrorBoundary>
                                            <ProductSuperAttribute
                                                productData={ superAttributes }
                                                onChange={ this.handleSuperAttributesChange }
                                            />
                                        </ErrorBoundary>
                                    }

                                    <ErrorBoundary>
                                        <ProductConfiguratorAddToCart
                                            productType={ productType }
                                            product={ this.props.product.concreteProducts[sku] }
                                            sku={ sku }
                                        />
                                    </ErrorBoundary>

                                    { isUserLoggedIn &&
                                        <ErrorBoundary>
                                            <ProductConfiguratorAddToWishlist
                                                productType={ productType }
                                                sku={ sku }
                                            />
                                        </ErrorBoundary>
                                    }
                                </Grid>
                            </Grid>
                            <ProductDetail
                                attributes={ attributes }
                                attributeNames={ attributeNames }
                                description={ description }
                                sku={ sku ? sku : this.props.product.abstractProduct.sku }
                            />
                            {isShouldLoadRelationsImmediately &&
                                <ErrorBoundary>
                                    <ProductRelations sku={ this.props.product.abstractProduct.sku } />
                                </ErrorBoundary>
                            }
                        </AppMain>
                    </>
                }
            </div>
        );
    }
}

export const ProductPage = withStyles(styles)(ProductPageComponent);
