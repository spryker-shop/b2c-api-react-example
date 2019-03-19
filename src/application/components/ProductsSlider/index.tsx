import * as React from 'react';
import { ISlickSliderProps as Props } from './types';
import { IProductRelationsItem } from '@interfaces/productRelations';
import Slider, { Settings } from 'react-slick';
import { ProductCard } from '@application/components/ProductCard';
import { ArrowButton } from './ArrowButton';
import { PrevIcon, NextIcon } from './icons';
import { withStyles } from '@material-ui/core';
import { styles } from './styles';
import 'slick-carousel/slick/slick.css';

const ProductsSliderComponent = (props: Props): JSX.Element => {
    const { classes, products, currency, onSelectProduct } = props;

    const customPaging = (): JSX.Element => (
        <div className={ classes.dotWrapper }>
            <span className={ classes.dot } />
        </div>
    );

    const appendDots = (dots: React.ReactNode): JSX.Element => (
        <div>
            <ul className={ classes.dotsContainer }>{ dots }</ul>
        </div>
    );

    const renderProductCards = (): JSX.Element[] => (
        products.map((product: IProductRelationsItem) => (
            <div key={ product.sku } className={ classes.slide }>
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
            </div>
        ))
    );

    const slickSettings: Settings = {
        centerMode: true,
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 0,
        centerPadding: '150px',
        prevArrow: (<ArrowButton icon={ <PrevIcon /> } customClass={ classes.slideArrow } />),
        nextArrow: (<ArrowButton icon={ <NextIcon /> } customClass={ classes.slideArrow } />),
        customPaging,
        appendDots,
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 3,
                    centerPadding: 0,
                    centerMode: false,
                }
            },
            {
                breakpoint: 680,
                settings: {
                    slidesToShow: 2,
                    centerPadding: 0,
                }
            }
        ]
    };

    return (
        <Slider className={ classes.root } { ...slickSettings }>
            { renderProductCards() }
        </Slider>
    );
};

export const ProductsSlider = withStyles(styles)(ProductsSliderComponent);
