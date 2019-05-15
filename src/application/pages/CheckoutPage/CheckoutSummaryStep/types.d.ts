import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { ICheckoutStepsCompletionState, IShipmentMethod } from '@interfaces/checkout';
import { ClickEvent } from '@interfaces/common';

export interface ICheckoutSummaryStepProps extends WithStyles<typeof styles> {
    stepsCompletion: ICheckoutStepsCompletionState;
    isSendBtnDisabled: boolean;
    sendData: (event: ClickEvent) => void;
}
