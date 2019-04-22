import React from 'react';
import { NotificationsMessageTemplate } from '@components/Notifications/NotificationsMessageTemplate';
import { INotificationsMessageProps as Props } from '../types';
import { toast } from 'react-toastify';
import { SuccessIcon, RejectIcon } from './icons';
import { typeNotificationWarning, typeNotificationSuccess, typeNotificationError } from '@constants/notifications';

export const NotificationsMessage: Function = (props: Props) => {
    const {type} = props;
    let toastType;
    let iconComponent;

    switch (type) {
        case typeNotificationError:
            iconComponent = <RejectIcon />;
            toastType = toast.TYPE.ERROR;
            break;
        case typeNotificationSuccess:
            iconComponent = <SuccessIcon />;
            toastType = toast.TYPE.SUCCESS;
            break;
        case typeNotificationWarning:
            toastType = toast.TYPE.WARNING;
            break;
        default:
            toastType = toast.TYPE.DEFAULT;
            iconComponent = null;
    }

    const propsForMessage = {
        ...props,
        icon: iconComponent
    };

    return (
        toast(<NotificationsMessageTemplate {...propsForMessage} />, {
            type: toastType
        })
    );
};
