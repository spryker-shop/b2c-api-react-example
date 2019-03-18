import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { ISquareImageProps as Props } from './types';

export const SquareImageBase: React.SFC<Props> = (props): JSX.Element => {
    const { classes, extraOverlayClassName, size, image, alt = '' } = props;
    const sizePX = `${size}px`;
    const imgSize = size * 0.82;

    return (
        <div className={ classes.imgWrapper } style={ { width: sizePX, height: sizePX, minWidth: sizePX } }>
            <img
                src={ image }
                style={ { maxWidth: imgSize, maxHeight: imgSize } }
                alt={ alt }
            />
            <div className={`${classes.actionAreaOverlay} ${extraOverlayClassName ? extraOverlayClassName : ''}`} />
        </div>
    );
};

export const SquareImage = withStyles(styles)(SquareImageBase);
