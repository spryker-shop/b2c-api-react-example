import * as React from 'react';
import { getSalutationToShow } from '@helpers/common';
import { withStyles, Typography } from '@material-ui/core';
import { IAddressDetailsProps as Props } from './types';
import { styles } from './styles';

const AddressDetailsComponent: React.FC<Props> = (props): JSX.Element => {
    const {
        classes,
        title,
        address: {
            salutation,
            firstName,
            lastName,
            address1,
            address2,
            address3,
            zipCode,
            city,
            company,
            phone,
            country
        },
        children
    } = props;
    const salutationToShow = getSalutationToShow(salutation);

    return (
        <div className={ classes.container }>
            { title &&
                <Typography component="h3" variant="h3" className={ classes.title }>
                    { title }
                </Typography>
            }
            <div>{ salutationToShow } {` ${ firstName } ${ lastName }`}</div>
            <div>{`${ company || '' }`}</div>
            <div>{`${ address1 } ${ address2 } ${ address3 }`}</div>
            <div>{`${ zipCode } ${ city }, ${ country }`}</div>
            <div>{`${ phone || '' }`}</div>
            { children }
        </div>
    );
};

export const AddressDetails = withStyles(styles)(AddressDetailsComponent);
