import * as React from 'react';
import { ISlickSliderProps as Props } from './types';
import { IProductRelationsItem } from '@interfaces/product';
import Slider, { Settings } from 'react-slick';
import { ProductCard } from '@components/ProductCard';
import { ArrowButton } from './ArrowButton';
import { PrevIcon, NextIcon } from './icons';
import { Grid, withStyles, withWidth } from '@material-ui/core';
import { styles } from './styles';
import 'slick-carousel/slick/slick.css';
import { appBreakpoints } from '@theme/properties/overwritten/appBreakpoints';
import { isWidthUp } from '@material-ui/core/withWidth';

const ProductsSliderComponent = (props: Props): JSX.Element => {
    const { classes, products, currency, onSelectProduct, width } = props;
    const defaultAmountSlides = 3;
    const shouldRenderSlider = products.length > defaultAmountSlides;

    const customPaging = (): JSX.Element => (
        <div className={ classes.dotWrapper }>
            <span className={ classes.dot } />
        </div>
    );

    const renderDots = (dots: JSX.Element): JSX.Element => (
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
                        image={ product.image }
                        price={ product.price }
                        prices={ product.prices }
                        name={ product.name }
                        sku={ product.sku }
                        onSelectProduct={ onSelectProduct }
                        label={ product.label }
                        classes={{
                            image: classes.image,
                            price: classes.price,
                            oldPrice: classes.oldPrice,
                            name: classes.name
                        }}
                    />
                </Grid>
            </div>
        ));

        if (!shouldRenderSlider) {
            return productsList.map((item, index) => (
                <Grid item xs={ 4 } key={ index }>{ item }</Grid>
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
                breakpoint: appBreakpoints.values.lg,
                settings: {
                    centerPadding: '0',
                    centerMode: false
                }
            },
            {
                breakpoint: appBreakpoints.values.sm,
                settings: {
                    slidesToShow: 1,
                    arrows: false,
                    dots: false,
                    centerPadding: '55px',
                    centerMode: true,
                    infinite: false
                }
            },
            {
                breakpoint: appBreakpoints.values.xs,
                settings: {
                    slidesToShow: 1,
                    arrows: false,
                    dots: false,
                    centerPadding: '25px',
                    centerMode: true,
                    infinite: false
                }
            }
        ]
    };

    if (isWidthUp('sm', width) && !shouldRenderSlider) {
        return (
            <div className={ classes.layout }>
                <Grid container className={`${classes.root} ${classes.rootSimpleSlider}`}>
                    { renderProductCards() }
                </Grid>
            </div>
        );
    }

    return (
        <div className={ classes.wrapper }>
            <div className={ classes.layout }>
                <Slider className={ classes.root } { ...sliderSettings }>
                    { renderProductCards() }
                </Slider>
            </div>
        </div>
    );
};

export const ProductsSlider = withWidth()(withStyles(styles)(ProductsSliderComponent));
