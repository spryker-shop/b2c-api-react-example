import * as React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide
} from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { ISprykerDialogProps as Props } from './types';

export const SprykerDialog: React.SFC<Props> = (props): JSX.Element => {
    const {
        handleShow,
        handleAgree,
        handleDisagree,
        title,
        content,
        isOpen,
        titleAgree = <FormattedMessage id={ 'word.agree.title' } />,
        titleDisagree = <FormattedMessage id={ 'word.disagree.title' } />,
    } = props;

    const Transition = (props: Props) => (
        <Slide direction="up" {...props} />
    );

    return (
        <Dialog
            open={isOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleShow}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            {title
                ? (
                    <DialogTitle id="alert-dialog-slide-title">
                        {title}
                    </DialogTitle>
                )
                : null
            }

            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleDisagree} color="primary">
                    {titleDisagree}
                </Button>
                <Button onClick={handleAgree} color="primary">
                    {titleAgree}
                </Button>
            </DialogActions>
        </Dialog>
    );
};
