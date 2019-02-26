import * as React from 'react';
import { withStyles, Grid } from '@material-ui/core';
import { sprykerFormStyles } from '@application/components/UI/SprykerForm/sprykerFormStyles';
import { FieldTextInput } from '@application/components/UI/SprykerForm/FieldTextInput';
import { SprykerSelect } from '@application/components/UI/SprykerSelect';
import { FieldCheckbox } from '@application/components/UI/SprykerForm/FieldCheckbox';
import { FieldRadio } from '@application/components/UI/SprykerForm/FieldRadio';
import { IFormField, ISprykerFormProps as Props } from './types';

export const SprykerFormBase: React.SFC<Props> = (props): JSX.Element => {
    const {
        classes,
        form: {
            formName,
            onChangeHandler,
            onSubmitHandler,
            onBlurHandler,
            fields,
            controlsGroupClassName
        },
        formClassName,
        SubmitButton
    } = props;

    const isRowsExist = (fields.length > 0);

    const getTextInput = (field: IFormField) => (
        <FieldTextInput
            formName={ formName }
            inputName={ field.inputName }
            inputValue={ field.inputValue }
            inputType={ field.inputType }
            isRequired={ field.isRequired ? field.isRequired : false }
            onChangeHandler={ field.onChangeOwnHandler ? field.onChangeOwnHandler : onChangeHandler }
            onBlurHandler={ field.onBlurOwnHandler ? field.onBlurOwnHandler : onBlurHandler }
            label={ field.label ? field.label : null }
            isError={ field.isError ? field.isError : false }
        />
    );

    const getSelectField = (field: IFormField) => (
        <SprykerSelect
            currentMode={ field.inputValue }
            changeHandler={ field.onChangeOwnHandler ? field.onChangeOwnHandler : onChangeHandler }
            menuItems={ field.menuItems }
            name={ field.inputName }
            label={ field.label ? field.label : null }
            selectClassName={ classes.input }
            isFullWidth={ true }
            isRequired={ field.isRequired ? field.isRequired : false }
            menuItemFirst={ field.menuItemFirst ? field.menuItemFirst : null }
            extraTitleClassName={ `${classes.selectLabel} ${classes.label}` }
            extraFormControlClassName={ classes.selectFormControlClassName }
            extraRootClassName={ classes.selectRoot }
            extraInputRootClassName={ classes.selectInputRoot }
            extraSelectFieldClassName={ classes.inputRoot }
        />
    );

    const getCheckboxField = (field: IFormField) => (
        <FieldCheckbox
            inputName={ field.inputName }
            label={ field.label ? field.label : null }
            isChecked={ field.inputValue }
            changeHandler={ field.onChangeOwnHandler ? field.onChangeOwnHandler : onChangeHandler }
        />
    );

    const getRadioField = (field: IFormField) => (
        <FieldRadio
            inputName={ field.inputName }
            currentMode={ field.inputValue }
            radioItems={ field.radioItems }
            label={ field.label ? field.label : null }
            labelIcon={ field.labelIcon ? field.labelIcon : null }
            isItemsInRow={ field.isItemsInRow }
            changeHandler={ field.onChangeOwnHandler ? field.onChangeOwnHandler : onChangeHandler }
        />
    );

    return (
        <form
            className={ `${classes.form} ${formClassName ? formClassName : ''}` }
            noValidate
            autoComplete="off"
            onSubmit={ onSubmitHandler }
            id={ `${formName}` }
            name={ `${formName}` }
        >
            { isRowsExist && fields.map((row: IFormField[], indexRow: number) => {
                const isFieldsExist = (row.length > 0);

                return (
                    <Grid
                        container
                        justify="flex-start"
                        alignItems="flex-end"
                        className={ `${classes.controlsGroup} ${controlsGroupClassName ? controlsGroupClassName : ''}` }
                        key={ `${formName}-${row[0].inputName}` }
                        data-form-row={ indexRow }
                    >
                        { isFieldsExist && row.map((field: IFormField, indexColumn: number) => {
                            let fieldComponent: JSX.Element | null;
                            if (field.type === 'input') {
                                fieldComponent = getTextInput(field);
                            } else if (field.type === 'select' && field.menuItems && field.menuItems.length > 0) {
                                fieldComponent = getSelectField(field);
                            } else if (field.type === 'checkbox') {
                                fieldComponent = getCheckboxField(field);
                            } else if (field.type === 'radio') {
                                fieldComponent = getRadioField(field);
                            } else {
                                fieldComponent = null;
                            }

                            return (
                                <Grid
                                    item
                                    xs={ 12 }
                                    sm={ field.spaceNumber }
                                    className={
                                        `${classes.control}
                                        ${field.spaceNumber === 12 ? classes.controlFullWidth : ''}`
                                    }
                                    key={ field.inputName }
                                    data-form-column={ `${indexRow}-${indexColumn}` }
                                >
                                    { fieldComponent }
                                </Grid>
                            );
                        }) }
                    </Grid>
                );
            }) }
            { SubmitButton || null }
        </form>
    );
};

export const SprykerForm = withStyles(sprykerFormStyles)(SprykerFormBase);
