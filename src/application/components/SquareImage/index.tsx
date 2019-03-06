import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { ISquareImageProps as Props } from './types';

export const SquareImageComponent: React.SFC<Props> = (props): JSX.Element => {
    const { classes, size, image, alt = '' } = props;
    const sizePX = size ? `${size}px` : '';
    const imgSize = size ? size * 0.82 : '';

    return (
        <div className={ classes.imgWrapper } style={ { width: sizePX, height: sizePX, minWidth: sizePX } }>
            <img
                src={ image }
                style={ { maxWidth: imgSize, maxHeight: imgSize } }
                alt={ alt }
                className={ classes.image }
            />
            <div className={ classes.actionAreaOverlay } />
        </div>
    );
};

export const SquareImage = withStyles(styles)(SquareImageComponent);
