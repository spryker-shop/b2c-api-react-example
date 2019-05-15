import * as React from 'react';
import { connect } from './connect';
import { Grid, withStyles } from '@material-ui/core';
import { SprykerSelect } from '@components/UI/SprykerSelect';
import { SalutationVariants } from '@constants/customer';
import { FormattedMessage } from 'react-intl';
import { SprykerInput } from '@components/UI/SprykerInput';
import { ICountry } from '@interfaces/country';
import { IAddressFormProps as Props } from './types';
import { styles } from './styles';

const AddressFormComponent: React.SFC<Props> = (props): JSX.Element => {
    const {
        classes,
        countriesCollection,
        shouldShowEmail,
        formName,
        onFieldChangeHandler,
        onFieldBlurHandler,
        data,
        additionalActions
    } = props;
    const isCountriesCollectionExist = Boolean(Array.isArray(countriesCollection) && countriesCollection.length > 0);
    const countriesList = isCountriesCollectionExist ? countriesCollection
        .map((item: ICountry) => ({value: item.iso2Code, name: item.name})) : null;

    return (
        <form name={ formName } className={ classes.form }>
            <Grid container spacing={ 24 }>
                <Grid item xs={ 12 }>
                    <SprykerSelect
                        currentMode={ data.salutation.value }
                        onChangeHandler={ onFieldChangeHandler }
                        menuItems={ SalutationVariants }
                        label={ <FormattedMessage id={ 'salutation.label' } /> }
                        menuItemFirst={{
                            value: ' ',
                            name: <FormattedMessage id={ 'salutation.label' } />,
                            disabled: true
                        }}
                        name="salutation"
                        isError={ data.salutation.isError }
                        isFullWidth
                        isSimple
                        isRequired
                    />
                </Grid>
                <Grid item xs={ 12 }>
                    <SprykerInput
                        isRequired
                        formName={ formName }
                        label={ <FormattedMessage id={ 'first.name.label' } /> }
                        inputName="firstName"
                        onChangeHandler={ onFieldChangeHandler }
                        onBlurHandler={ onFieldBlurHandler }
                        inputValue={ data.firstName.value }
                        isError={ data.firstName.isError }
                    />
                </Grid>
                <Grid item xs={ 12 }>
                    <SprykerInput
                        isRequired
                        formName={ formName }
                        label={ <FormattedMessage id={ 'last.name.label' } /> }
                        inputName="lastName"
                        onChangeHandler={ onFieldChangeHandler }
                        onBlurHandler={ onFieldBlurHandler }
                        inputValue={ data.lastName.value }
                        isError={ data.lastName.isError }
                    />
                </Grid>
                <Grid item xs={ 12 }>
                    <SprykerInput
                        label={ <FormattedMessage id={ 'company.label' } /> }
                        inputName="company"
                        formName={ formName }
                        onChangeHandler={ onFieldChangeHandler }
                        onBlurHandler={ onFieldBlurHandler }
                        inputValue={ data.company.value || '' }
                        isError={ data.company.isError }
                    />
                </Grid>
                <Grid item xs={ 12 } lg={ 6 }>
                    <SprykerInput
                        isRequired
                        formName={ formName }
                        label={ <FormattedMessage id={ 'street.label' } /> }
                        inputName="address1"
                        onChangeHandler={ onFieldChangeHandler }
                        onBlurHandler={ onFieldBlurHandler }
                        inputValue={ data.address1.value }
                        isError={ data.address1.isError }
                    />
                </Grid>
                <Grid item xs={ 12 } lg={ 6 }>
                    <SprykerInput
                        isRequired
                        formName={ formName }
                        label={ <FormattedMessage id={ 'number.label' } /> }
                        inputName="address2"
                        onChangeHandler={ onFieldChangeHandler }
                        onBlurHandler={ onFieldBlurHandler }
                        inputValue={ data.address2.value }
                        isError={ data.address2.isError }
                        inputType="number"
                    />
                </Grid>
                <Grid item xs={ 12 }>
                    <SprykerInput
                        formName={ formName }
                        label={ <FormattedMessage id={ 'street.extra.label' } /> }
                        inputName="address3"
                        onChangeHandler={ onFieldChangeHandler }
                        onBlurHandler={ onFieldBlurHandler }
                        inputValue={ data.address3.value || '' }
                        isError={ data.address3.isError }
                    />
                </Grid>
                { shouldShowEmail &&
                    <Grid item xs={ 12 }>
                        <SprykerInput
                            isRequired
                            formName={ formName }
                            label={ <FormattedMessage id={ 'email.label' } /> }
                            inputName="email"
                            inputType="email"
                            onChangeHandler={ onFieldChangeHandler }
                            onBlurHandler={ onFieldBlurHandler }
                            inputValue={ data.email.value }
                            isError={ data.email.isError }
                        />
                    </Grid>
                }
                <Grid item xs={ 12 } lg={ 6 }>
                    <SprykerInput
                        isRequired
                        formName={ formName }
                        label={ <FormattedMessage id={ 'city.label' } /> }
                        inputName="city"
                        onChangeHandler={ onFieldChangeHandler }
                        onBlurHandler={ onFieldBlurHandler }
                        inputValue={ data.city.value }
                        isError={ data.city.isError }
                    />
                </Grid>
                <Grid item xs={ 12 } lg={ 6 }>
                    <SprykerInput
                        isRequired
                        formName={ formName }
                        label={ <FormattedMessage id={ 'zip.code.label' } /> }
                        inputName="zipCode"
                        onChangeHandler={ onFieldChangeHandler }
                        onBlurHandler={ onFieldBlurHandler }
                        inputValue={ data.zipCode.value }
                        isError={ data.zipCode.isError }
                        inputType="number"
                    />
                </Grid>
                <Grid item xs={ 12 } lg={ 6 }>
                    <SprykerSelect
                        currentMode={ data.country.value }
                        onChangeHandler={ onFieldChangeHandler }
                        menuItems={ countriesList }
                        label={ <FormattedMessage id={ 'country.label' } /> }
                        menuItemFirst={{
                            value: ' ',
                            name: <FormattedMessage id={ 'first.item.in.select' } />,
                            disabled: true
                        }}
                        name="country"
                        isError={ data.country.isError }
                        isFullWidth
                        isSimple
                        isRequired
                    />
                </Grid>
                <Grid item xs={ 12 } lg={ 6 }>
                    <SprykerInput
                        formName={ formName }
                        label={ <FormattedMessage id={ 'phone.label' } /> }
                        inputName="phone"
                        onChangeHandler={ onFieldChangeHandler }
                        onBlurHandler={ onFieldBlurHandler }
                        inputValue={ data.phone.value || '' }
                        isError={ data.phone.isError }
                        inputType="number"
                    />
                </Grid>
                { additionalActions && additionalActions }
            </Grid>
        </form>
    );
};

AddressFormComponent.defaultProps = {
    shouldShowEmail: false,
    additionalActions: null
};
export const AddressForm = connect(withStyles(styles)(AddressFormComponent));
