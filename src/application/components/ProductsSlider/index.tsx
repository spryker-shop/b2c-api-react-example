import * as React from 'react';
import { ISlickSliderProps as Props } from './types';
import { IProductRelationsItem } from '@interfaces/productRelations';
import Slider, { Settings } from 'react-slick';
import { ProductCard } from '@application/components/ProductCard';
import { PrevIcon, NextIcon } from './icons';
import { withStyles } from '@material-ui/core';
import { styles } from './styles';
import 'slick-carousel/slick/slick.scss';

const ProductsSliderBase = (props: Props): JSX.Element => {
    const { classes, products, currency } = props;

    const slickSettings: Settings = {
        centerMode: true,
        dots: true,
        slidesToShow: 3,
        centerPadding: '150px',
        prevArrow: (
            <div>
                <div className={ classes.slideArrow }>
                    <PrevIcon />
                </div>
            </div>
        ),
        nextArrow: (
            <div>
                <div className={ classes.slideArrow }>
                    <NextIcon />
                </div>
            </div>
        ),
        customPaging: () => (
            <div className={ classes.dotWrapper }>
                <span className={ classes.dot } />
            </div>
        ),
        appendDots: dots => (
            <div>
                <ul className={ classes.dotsContainer }>{ dots }</ul>
            </div>
        )
    };

    return (
        <Slider className={ classes.root } { ...slickSettings }>
            {
                products.map((product: IProductRelationsItem) => (
                    <div key={ product.sku } className={ classes.slide }>
                        <ProductCard
                            currency={ currency }
                            images={ product.images }
                            price={ product.price }
                            prices={ product.prices }
                            name={ product.name }
                            sku={ product.sku }
                            onSelectProduct={ () => alert(123) }
                            label={ null }
                        />
                    </div>
                ))
            }
        </Slider>
    );
};

export const ProductsSlider = withStyles(styles)(ProductsSliderBase);
