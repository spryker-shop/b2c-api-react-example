import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { ICheckoutStepsCompletionState } from '@interfaces/checkout';

export interface ICheckoutPaymentStepProps extends WithStyles<typeof styles> {
    stepsCompletion: ICheckoutStepsCompletionState;
}
