import { WithStyles } from '@material-ui/core';
import { styles } from '@application/components/ImageSlider/styles';

interface IImageSlide {
    id: string | number;
    src: string;
}

export interface IImageSliderProps extends WithStyles<typeof styles> {
    images: IImageSlide[];
    uniqueKey?: string | number;
    showThumbs?: boolean;
    showStatus?: boolean;
}
