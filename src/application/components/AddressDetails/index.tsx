import * as React from 'react';
import { getSalutationToShow } from '@helpers/customer/salutation';
import { withStyles, Typography, Grid } from '@material-ui/core';
import { AddressPart } from './AddressPart';
import { IAddressDetailsProps as Props } from './types';
import { IAddressPartRow } from './AddressPart/types';
import { styles } from './styles';

export const AddressDetailsBase: React.SFC<Props> = (props): JSX.Element => {
    const {
        classes,
        blockTitle,
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
        email,
        country,
        cellPhone,
        comment,
        description,
        middleName,
        poBox
    } = props;

    const salutationToShow = getSalutationToShow(salutation);
    const parts: IAddressPartRow[] = [];
    parts.push({
        key: '1', data: [
            {text: salutationToShow},
            {text: firstName, isBold: true},
            {text: middleName, isBold: true},
            {text: lastName, isBold: true}
        ]
    });
    parts.push({key: '2', data: [{text: company}]});
    parts.push({key: '3', data: [{text: address1}, {text: address2}, {text: address3}]});
    parts.push({key: '4', data: [{text: zipCode}, {text: `${city},`}, {text: country}]});
    parts.push({key: '5', data: [{text: phone}, {text: cellPhone}]});
    parts.push({key: '6', data: [{text: email}]});
    parts.push({key: '7', data: [{text: poBox}]});
    parts.push({key: '8', data: [{text: comment}]});
    parts.push({key: '9', data: [{text: description}]});

    return (
        <Grid container className={classes.root}>
            <Grid item xs={12} className={classes.container}>
                <Typography
                    align="left"
                    component="h3"
                    color="inherit"
                    className={classes.title}
                >
                    {blockTitle}
                </Typography>
                {parts.map((part: IAddressPartRow) => (<AddressPart key={part.key} row={part.data} />))}
            </Grid>
        </Grid>
    );
};

export const AddressDetails = withStyles(styles)(AddressDetailsBase);
