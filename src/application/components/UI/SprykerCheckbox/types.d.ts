import * as React from 'react';
import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { IFormField } from '@components/UI/SprykerForm/types';

export interface IFieldCheckboxProps extends WithStyles<typeof styles> {
    label: IFormField['label'];
    inputName: IFormField['inputName'];
    isError?: IFormField['isError'];
    isChecked: boolean;
    changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
