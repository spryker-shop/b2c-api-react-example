import {
    pathCheckoutAddressStep,
    pathCheckoutLoginStep,
    pathCheckoutSummaryStep,
    pathCheckoutShipmentStep,
    pathCheckoutPaymentStep
} from '@constants/routes';

export const checkoutBreadcrumbsList = [
    {
        path: pathCheckoutLoginStep,
        title: 'word.login.title'
    },
    {
        path: pathCheckoutAddressStep,
        title: 'word.address.title'
    },
    {
        path: pathCheckoutShipmentStep,
        title: 'word.shipment.title'
    },
    {
        path: pathCheckoutPaymentStep,
        title: 'word.payment.title'
    },
    {
        path: pathCheckoutSummaryStep,
        title: 'word.summary.title'
    }
];
