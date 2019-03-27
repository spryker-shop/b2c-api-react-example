import * as React from 'react';
import { ISlickSliderProps as Props } from './types';
import { IProductRelationsItem } from '@interfaces/productRelations';
import Slider, { Settings } from 'react-slick';
import { ProductCard } from '@application/components/ProductCard';
import { ArrowButton } from './ArrowButton';
import { PrevIcon, NextIcon } from './icons';
import { Grid, withStyles } from '@material-ui/core';
import { styles } from './styles';
import 'slick-carousel/slick/slick.css';

const ProductsSliderComponent = (props: Props): JSX.Element => {
    const { classes, products, currency, onSelectProduct } = props;
    const defaultAmountSlides = 3;
    const shouldRenderSlider = products.length > defaultAmountSlides;

    const customPaging = (): JSX.Element => (
        <div className={ classes.dotWrapper }>
            <span className={ classes.dot } />
        </div>
    );

    const renderDots = (dots: React.ReactNode): JSX.Element => (
        <div>
            <ul className={ classes.dotsContainer }>{ dots }</ul>
        </div>
    );

    const renderProductCards = (): JSX.Element[] => {
        const productsList = products.map((product: IProductRelationsItem) => (
            <div key={ product.sku } className={ classes.slide }>
                <Grid item xs={ 12 }>
                    <ProductCard
                        currency={ currency }
                        images={ product.images }
                        price={ product.price }
                        prices={ product.prices }
                        name={ product.name }
                        sku={ product.sku }
                        onSelectProduct={ onSelectProduct }
                        label={ product.label }
                    />
                </Grid>
            </div>
        ));

        if (!shouldRenderSlider) {
            return productsList.map((item, index) => (
                <Grid item xs={ 12 } sm={ 6 } md={ 3 } key={ index }>{ item }</Grid>
            ));
        }

        return productsList;
    };

    const sliderSettings: Settings = {
        centerMode: true,
        dots: true,
        infinite: true,
        slidesToShow: defaultAmountSlides,
        slidesToScroll: 1,
        initialSlide: 0,
        centerPadding: '150px',
        prevArrow: (<ArrowButton icon={ <PrevIcon /> } customClass={ classes.slideArrow } />),
        nextArrow: (<ArrowButton icon={ <NextIcon /> } customClass={ classes.slideArrow } />),
        customPaging,
        appendDots: renderDots,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: defaultAmountSlides,
                    centerPadding: '0',
                    centerMode: false,
                }
            },
            {
                breakpoint: 680,
                settings: {
                    slidesToShow: 2,
                    centerPadding: '0',
                    centerMode: false,
                }
            }
        ]
    };

    if (!shouldRenderSlider ) {
        return (
            <Grid container className={`${classes.root} ${classes.rootSimpleSlider}`}>
                { renderProductCards() }
            </Grid>
        );
    }

    return (
        <Slider className={ classes.root } { ...sliderSettings }>
            { renderProductCards() }
        </Slider>
    );
};

export const ProductsSlider = withStyles(styles)(ProductsSliderComponent);
