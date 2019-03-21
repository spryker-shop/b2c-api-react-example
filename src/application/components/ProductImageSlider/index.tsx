import * as React from 'react';
import { connect } from './connect';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import { SquareImage } from '@application/components/SquareImage';
import { Grid, withStyles } from '@material-ui/core';
import { ArrowButton } from './ArrowButton';
import { RightIcon, LeftIcon, BottomIcon, TopIcon } from './icons';
import { IProductImageSliderProps as Props } from './types';
import { styles } from './styles';
import { getProductLabel } from '@helpers/product/label';

@connect
export class ProductImageSliderComponent extends React.Component<Props> {
    protected mainSliderRef: Slider;
    protected thumbnailsSliderRef: Slider;

    protected customPaging = (): JSX.Element => (
        <div className={ this.props.classes.dotWrapper }>
            <span className={ this.props.classes.dot } />
        </div>
    );

    protected appendDots = (dots: React.ReactNode): JSX.Element => (
        <div><ul className={ this.props.classes.dotsContainer }>{ dots }</ul></div>
    );

    protected renderMainSliderItems = (): JSX.Element[] => {
        const { images, classes } = this.props;

        return (
            images.map(image => (
                <div className={ classes.mainSliderItem } key={ image.id }>
                    <SquareImage image={ image.src } alt={ image.id } classes={ { imgWrapper: classes.imageMain } } />
                </div>
            ))
        );
    };

    protected renderThumbnailsSliderItems = (): JSX.Element[] => {
        const { images, classes } = this.props;

        return (
            images.map(image => (
                <div className={ classes.thumbnailItem } key={ image.id }>
                    <SquareImage
                        image={ image.src }
                        alt={ image.id }
                        classes={ { imgWrapper: classes.imageThumbnail } }
                    />
                </div>
            ))
        );
    };

    protected renderLabels = (): JSX.Element => {
        const { productsLabeled, availableLabels } = this.props;

        console.log(productsLabeled, availableLabels);
        if (productsLabeled) {
            const labelsIdArr = productsLabeled;
            const label = getProductLabel(productsLabeled, availableLabels);
            console.log(label);
        }
    }

    public render(): JSX.Element {
        const { classes, images } = this.props;
        const thumbnailSliderSlidesToShow = 6;
        const isScrolledSlider = images.length >= thumbnailSliderSlidesToShow;
        const isSingleSlide = images.length === 1;

        const mainSliderSettings: Settings = {
            dots: true,
            prevArrow: (<ArrowButton icon={ <LeftIcon /> } customClass={ classes.slideArrow } />),
            nextArrow: (<ArrowButton icon={ <RightIcon /> } customClass={ classes.slideArrow } />),
            customPaging: this.customPaging,
            appendDots: this.appendDots,
            asNavFor: this.thumbnailsSliderRef
        };

        const thumbnailSliderSettings: Settings = {
            slidesToShow: thumbnailSliderSlidesToShow,
            arrows: isScrolledSlider,
            vertical: true,
            infinite: isScrolledSlider,
            asNavFor: this.mainSliderRef,
            focusOnSelect: true,
            prevArrow: (<ArrowButton icon={ <TopIcon /> } customClass={ classes.slideArrowThumbs } />),
            nextArrow: (<ArrowButton icon={ <BottomIcon /> } customClass={ classes.slideArrowThumbs } />)
        };

        if (!images.length) {
            return null;
        }

        return (
            <Grid container>
                <Grid
                    item
                    className={`${classes.thumbnailsCol} ${isSingleSlide ? classes.thumbnailsHidden : ''}`}
                >
                    <Slider
                        { ...thumbnailSliderSettings }
                        ref={ slider => (this.thumbnailsSliderRef = slider) }
                        className={`
                            ${classes.thumbnailSlider}
                            ${isScrolledSlider ? classes.thumbnailSliderScrolled : ''}
                        `}
                    >
                        { this.renderThumbnailsSliderItems() }
                    </Slider>
                </Grid>
                <Grid
                    item
                    className={`${classes.mainSliderCol} ${isSingleSlide ? classes.mainSliderFullWidth : ''}`}
                >
                    {this.renderLabels()}
                    <Slider
                        { ...mainSliderSettings }
                        ref={ slider => (this.mainSliderRef = slider) }
                        className={ classes.mainSlider }
                    >
                        { this.renderMainSliderItems() }
                    </Slider>
                </Grid>
            </Grid>
        );
    }
}

export const ProductImageSlider = withStyles(styles)(ProductImageSliderComponent);
