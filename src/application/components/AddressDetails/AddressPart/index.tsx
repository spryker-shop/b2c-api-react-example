import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import { IAddressPart, IAddressPartProps } from './types';
import { styles } from './styles';

export const AddressPartBase: React.SFC<IAddressPartProps> = (props): JSX.Element => {
    const {classes, row} = props;

    if (!row || !Array.isArray(row) || !row.length) {
        return null;
    }

    const isNotEmpty = row.some(({text}) => (Boolean(text) === true));

    if (!isNotEmpty) {
        return null;
    }

    return (
        <Typography
            align="left"
            component="p"
            color="inherit"
        >
            {
                row.map(({text, isBold}: IAddressPart, index: number) => {
                    if (text) {
                        return (
                            <span
                                key={`${text}-${index}`}
                                className={`${classes.item} ${isBold ? classes.bold : ''}`}
                            >
                                {text}
                            </span>
                        );
                    }
                })
            }
        </Typography>
    );

};

export const AddressPart = withStyles(styles)(AddressPartBase);
