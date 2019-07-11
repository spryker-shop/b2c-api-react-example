import * as React from 'react';
import { connect } from './connect';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import { SquareImage } from '@components/SquareImage';
import { Grid, Hidden, withStyles } from '@material-ui/core';
import { ArrowButton } from './ArrowButton';
import { RightIcon, LeftIcon, BottomIcon, TopIcon } from './icons';
import { IProductImageSliderProps as Props, ICustomArrowProps } from './types';
import { styles } from './styles';
import { ProductLabel } from '@components/ProductLabel';
import { appBreakpoints } from '@theme/properties/overwritten/appBreakpoints';

@connect
class ProductImageSliderComponent extends React.Component<Props> {
    protected mainSliderRef: Slider;
    protected thumbnailsSliderRef: Slider;

    protected customPaging = (): JSX.Element => (
        <div className={ this.props.classes.dotWrapper }>
            <span className={ this.props.classes.dot } />
        </div>
    );

    protected renderDots = (dots: JSX.Element): JSX.Element => (
        <div><ul className={ this.props.classes.dotsContainer }>{ dots }</ul></div>
    );

    protected renderImageItems = (): JSX.Element[] => {
        const { images, classes } = this.props;

        return (
            images.map((image, index) => (
                <div className={ classes.mainSliderItem } key={`${image.id}-${index}`}>
                    <SquareImage image={ image.src } alt={ image.id } classes={ { imgWrapper: classes.imageMain } } />
                </div>
            ))
        );
    };

    protected renderThumbnailItems = (): JSX.Element[] => {
        const { images, classes } = this.props;

        return (
            images.map((image, index) => (
                <div className={ classes.thumbnailItem } key={`${image.id}-${index}`}>
                    <SquareImage
                        image={ image.src }
                        alt={ image.id }
                        classes={ { imgWrapper: classes.imageThumbnail } }
                    />
                </div>
            ))
        );
    };

    public render(): JSX.Element {
        const { classes, images, productLabels } = this.props;
        const thumbnailsToShow = 6;
        const isSliderScrollable = images.length >= thumbnailsToShow;
        const isSingleSlide = images.length === 1;
        const SlickButtonWrapper = (arrowProps: ICustomArrowProps): JSX.Element => {
            const { currentSlide, slideCount, children, ...props } = arrowProps;

            return (
                <span {...props}>{children}</span>
            );
        };

        const mainSliderSettings: Settings = {
            dots: true,
            customPaging: this.customPaging,
            appendDots: this.renderDots,
            beforeChange: (current, next) => this.thumbnailsSliderRef.slickGoTo(next),
            prevArrow: (
                <SlickButtonWrapper>
                    <ArrowButton icon={ <LeftIcon /> } classes={{
                        button: classes.slideArrow,
                        icon: classes.slideArrowIcon
                    }} />
                </SlickButtonWrapper>
            ),
            nextArrow: (
                <SlickButtonWrapper>
                    <ArrowButton icon={ <RightIcon /> } classes={{
                        button: classes.slideArrow,
                        icon: classes.slideArrowIcon
                    }} />
                </SlickButtonWrapper>
            ),
            responsive: [
                {
                    breakpoint: appBreakpoints.values.sm,
                    settings: {
                        arrows: false,
                        centerPadding: isSingleSlide ? '0' : '30px',
                        centerMode: true,
                        infinite: false,
                    }
                }
            ]
        };

        const thumbnailSliderSettings: Settings = {
            slidesToShow: thumbnailsToShow,
            arrows: isSliderScrollable,
            vertical: true,
            infinite: isSliderScrollable,
            asNavFor: this.mainSliderRef,
            focusOnSelect: true,
            beforeChange: (current, next) => this.mainSliderRef.slickGoTo(next),
            prevArrow: (
                <SlickButtonWrapper>
                    <ArrowButton icon={ <TopIcon /> } classes={{
                        button: classes.slideArrowThumbs,
                        icon: classes.slideArrowThumbsIcon
                    }} />
                </SlickButtonWrapper>
            ),
            nextArrow: (
                <SlickButtonWrapper>
                    <ArrowButton icon={ <BottomIcon /> } classes={{
                        button: classes.slideArrowThumbs,
                        icon: classes.slideArrowThumbsIcon
                    }} />
                </SlickButtonWrapper>
            )
        };

        if (!images.length) {
            return null;
        }

        return (
            <Grid container>
                <Hidden only={['xs', 'sm']} implementation="css">
                    <Grid
                        item
                        className={`${classes.thumbnailsCol} ${isSingleSlide ? classes.thumbnailsHidden : ''}`}
                    >
                        <Slider
                            { ...thumbnailSliderSettings }
                            ref={ slider => (this.thumbnailsSliderRef = slider) }
                            className={`
                                ${classes.thumbnailSlider}
                                ${isSliderScrollable ? classes.thumbnailSliderScrolled : ''}
                            `}
                        >
                            { this.renderThumbnailItems() }
                        </Slider>
                    </Grid>
                </Hidden>
                <Grid
                    item
                    className={`${classes.mainSliderCol} ${isSingleSlide ? classes.mainSliderFullWidth : ''}`}
                >
                    <div className={ classes.sliderWrapper }>
                        <ProductLabel
                            label={ productLabels }
                            classes={{
                                labelsOuter: `${classes.label}
                                ${isSingleSlide ? classes.labelSingleSlide : ''}`
                            }}
                        />
                        <Slider
                            { ...mainSliderSettings }
                            ref={ slider => (this.mainSliderRef = slider) }
                            className={ classes.mainSlider }
                        >
                            { this.renderImageItems() }
                        </Slider>
                    </div>
                </Grid>
            </Grid>
        );
    }
}

export const ProductImageSlider = withStyles(styles)(ProductImageSliderComponent);
