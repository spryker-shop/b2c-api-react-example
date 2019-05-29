import { NotificationsMessage } from '@components/Notifications/NotificationsMessage';
import { typeNotificationError } from '@constants/notifications';

export const errorMessageInform = (errorMessage: string, isRequest = true): void => {
    const messageType = isRequest ? 'request.error.message' : 'unexpected.error.message';

    NotificationsMessage({
        messageWithCustomText: messageType,
        message: errorMessage,
        type: typeNotificationError
    });
};
