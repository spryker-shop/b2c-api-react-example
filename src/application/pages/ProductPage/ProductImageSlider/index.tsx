import * as React from 'react';
import Slider, { Settings } from 'react-slick';
import 'slick-carousel/slick/slick.css';
import { SquareImage } from '@application/components/SquareImage';
import { Grid, withStyles } from '@material-ui/core';
import { ArrowButton } from './ArrowButton';
import { RightIcon, LeftIcon, BottomIcon, TopIcon } from './icons';
import { styles } from './styles';

export class ProductImageSliderComponent extends React.Component<any, any> {
    protected mainSliderRef: Slider;
    protected thumbnailsSliderRef: Slider;

    protected customPaging = (): JSX.Element => (
        <div className={ this.props.classes.dotWrapper }>
            <span className={ this.props.classes.dot } />
        </div>
    );

    protected appendDots = (dots: React.ReactNode): JSX.Element => (
        <div>
            <ul className={ this.props.classes.dotsContainer }>{ dots }</ul>
        </div>
    );

    protected renderMainSliderItems = (): JSX.Element[] => {
        const { images, classes } = this.props;

        if (!images) {
            return null;
        }

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

        if (!images) {
            return null;
        }

        return (
            images.map((image, index) => (
                <div
                    className={ classes.thumbnailItem }
                    key={ image.id } onClick={ () => this.handleClickThumbnailItem(index) }
                >
                    <SquareImage
                        image={ image.src }
                        alt={ image.id }
                        classes={ { imgWrapper: classes.imageThumbnail } }
                    />
                </div>
            ))
        );
    };

    public handleClickThumbnailItem = (index: number): void => {
        this.thumbnailsSliderRef.slickGoTo(index);
        console.log(index, 'akhjsfvsajhfvsalhfvahsvflk');
    };

    public handleBeforeChange = (ref: Slider, oldIndex: number, newIndex: number) => {
        console.log(newIndex);
        ref.slickGoTo(newIndex);
    };

    public render(): JSX.Element {
        const { classes, images } = this.props;
        const thumbnailSliderSlidesToShow = 6;
        const isScrolledSlider = images.length >= thumbnailSliderSlidesToShow;

        const mainSliderSettings: Settings = {
            dots: true,
            prevArrow: (<ArrowButton icon={ <LeftIcon /> } customClass={ classes.slideArrow } />),
            nextArrow: (<ArrowButton icon={ <RightIcon /> } customClass={ classes.slideArrow } />),
            customPaging: this.customPaging,
            appendDots: this.appendDots,
            // beforeChange: (oldIndex, newIndex) => this.handleBeforeChange(this.thumbnailsSliderRef, oldIndex, newIndex)
        };

        const thumbnailSliderSettings: Settings = {
            slidesToShow: thumbnailSliderSlidesToShow,
            arrows: isScrolledSlider,
            vertical: true,
            infinite: isScrolledSlider,
            initialSlide: 2,
            // focusOnSelect: true,
            prevArrow: (<ArrowButton icon={ <TopIcon /> } customClass={ classes.slideArrowThumbs } />),
            nextArrow: (<ArrowButton icon={ <BottomIcon /> } customClass={ classes.slideArrowThumbs } />),
            // beforeChange: (oldIndex, newIndex) => this.handleBeforeChange(this.mainSliderRef, oldIndex, newIndex)
        };

        return (
            <Grid container>
                <Grid item className={ classes.thumbnailsCol }>
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
                <Grid item className={ classes.mainSliderCol }>
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
