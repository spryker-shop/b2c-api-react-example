import * as React from 'react';
import { connect } from './connect';
import { FormControlLabel, Radio, RadioGroup, withStyles } from '@material-ui/core';
import { ISavedAddressFormProps as Props } from './types';
import { IRadioItem } from '@components/UI/SprykerForm/types';
import { styles } from './styles';
import { IAddressItemCollection } from '@interfaces/addresses';
import { getSalutationToShow } from '@helpers/customer/salutation';

const SavedAddressFormComponent: React.SFC<Props> = (props): JSX.Element => {
    const { classes, currentMode, addressesCollection, onFieldChangeHandler, formName, extraField } = props;
    const isAddressesCollectionExist = addressesCollection && addressesCollection.length > 0;

    if (!isAddressesCollectionExist) {
        return null;
    }

    const getSalutation = (address: IAddressItemCollection): React.ReactNode => {
        let salutation: React.ReactNode = null;

        if (address.salutation) {
            salutation = getSalutationToShow(address.salutation);
        }

        return salutation;
    };

    const getFullInforamtion = (address: IAddressItemCollection): string | React.ReactNode => {
        let response: string = '';

        if (address.firstName) {
            response += ` ${address.firstName}`;
        }
        if (address.lastName) {
            response += ` ${address.lastName}`;
        }
        if (address.address1) {
            response += `, ${address.address1}`;
        }
        if (address.address2) {
            response += ` ${address.address2}`;
        }
        if (address.city) {
            response += `, ${address.city}`;
        }
        if (address.zipCode) {
            response += `, ${address.zipCode}`;
        }
        if (address.country && address.country.name) {
            response += `, ${address.country.name}`;
        }

        return response;
    };

    const savedAddressList = (): IRadioItem[] => (
        addressesCollection.map((item: IAddressItemCollection): IRadioItem => (
            {value: item.id, label: getFullInforamtion(item), salutation: getSalutation(item)}
        )).concat(extraField)
    );

    const renderSavedAddressItems = (): JSX.Element[] => savedAddressList().map((item: IRadioItem) => (
        <FormControlLabel
            key={`${formName}${item.value}`}
            aria-label={ item.value }
            value={ item.value }
            classes={{
                root: `${classes.inputRadio} ${(currentMode === item.value) ? classes.checkedInputRadio : '' }`,
                label: `${classes.radioLabel} ${(currentMode === item.value) ? classes.checkedRadioLabel : '' }`
            }}
            control={ <Radio
                classes={{ root: classes.radio }}
                checkedIcon={ <span className={ classes.radioIcon } /> }
                icon={ <span className={ classes.radioIcon } /> }
            /> }
            label={ <>{ Boolean(item.salutation) && item.salutation }{ item.label }</> }
        />
    ));

    return (
        <form name={ formName }>
            <RadioGroup
                value={ currentMode }
                onChange={ onFieldChangeHandler }
                classes={{
                    root: classes.radioGroup
                }}
            >
                { renderSavedAddressItems() }
            </RadioGroup>
        </form>
    );
};

export const SavedAddressForm = connect(withStyles(styles)(SavedAddressFormComponent));
