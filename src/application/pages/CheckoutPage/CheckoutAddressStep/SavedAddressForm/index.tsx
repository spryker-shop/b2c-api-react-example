import * as React from 'react';
import { connect } from './connect';
import { FormControlLabel, Radio, RadioGroup, withStyles } from '@material-ui/core';
import { ISavedAddressFormProps as Props } from './types';
import { checkoutSelectionInputs } from '@constants/checkout';
import { IRadioItem } from '@components/UI/SprykerForm/types';
import { styles } from './styles';
import { convertAddressesToRadioItems } from '@helpers/formCreations/checkout/savedAddressSettings';
import { FormattedMessage } from 'react-intl';

const SavedAddressFormComponent: React.SFC<Props> = (props): JSX.Element => {
    const { classes, currentMode, addressesCollection, onFieldChangeHandler, formName } = props;
    const isAddressesCollectionExist = addressesCollection && addressesCollection.length > 0;

    if (!isAddressesCollectionExist) {
        return null;
    }

    const savedAddressList = (): IRadioItem[] => (
        convertAddressesToRadioItems(addressesCollection).concat({
            value: checkoutSelectionInputs.isAddNewDeliveryValue,
            label: <FormattedMessage id={ 'add.new.delivery.address.label' } />
        })
    );

    const renderSavedAddressItems = (): JSX.Element[] => savedAddressList().map((item: IRadioItem) => (
        <FormControlLabel
            value={ item.value }
            key={`${item.value}`}
            classes={{
                root: `${classes.inputRadio} ${(currentMode === item.value) ? classes.checkedInputRadio : '' }`,
                label: `${classes.radioLabel} ${(currentMode === item.value) ? classes.checkedRadioLabel : '' }`
            }}
            control={ <Radio classes={ { root: classes.radio, checked: classes.checkedRadio } } /> }
            label={ item.label }
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
