import { CustomArrowProps } from 'react-slick';
import { WithStyles } from '@material-ui/core';
import { styles } from './styles';

export interface IArrowButton extends CustomArrowProps, WithStyles<typeof styles> {
    icon: JSX.Element;
}
