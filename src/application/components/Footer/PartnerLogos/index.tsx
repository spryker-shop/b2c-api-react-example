import * as React from 'react';
import { withStyles } from '@material-ui/core';
import { PartnerIconVisa, PartnerIconDhl, PartnerIconHermes, PartnerIconMasterCard, PartnerIconPaypal } from './icons';
import { IPartnerLogosProps as Props } from './types';
import { styles } from './styles';

const PartnerLogosComponent: React.FC<Props> = (props): JSX.Element => {
    const { classes } = props;

    return (
        <ul className={ classes.logosList }>
            <li className={ classes.logosListItem }><PartnerIconVisa /></li>
            <li className={ classes.logosListItem }><PartnerIconMasterCard /></li>
            <li className={ classes.logosListItem }><PartnerIconPaypal /></li>
            <li className={ classes.logosListItem }><PartnerIconDhl /></li>
            <li className={ classes.logosListItem }><PartnerIconHermes /></li>
        </ul>
    );
};

export const PartnerLogos = withStyles(styles)(PartnerLogosComponent);
