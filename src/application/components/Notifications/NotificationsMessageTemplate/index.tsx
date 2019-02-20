import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { INotificationsMessageWithStyles } from './types';

export const NotificationsMessageTemplateBase: React.SFC<INotificationsMessageWithStyles> = (props): JSX.Element => {
    const {message, messageWithCustomText, icon, id, classes} = props;

    const messageWithInformation = messageWithCustomText
        ? <FormattedMessage id={messageWithCustomText} values={{messageText: message}} />
        : message;

    return (
        <>
            {icon &&
                <span className={classes.icon}>
                    {icon}
                </span>
            }
            {id
                ? <FormattedMessage id={id} />
                : messageWithInformation
            }
        </>
    );
};

export const NotificationsMessageTemplate = withStyles(styles)(NotificationsMessageTemplateBase);
