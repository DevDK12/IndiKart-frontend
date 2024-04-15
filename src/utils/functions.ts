import moment from 'moment';

export const lastMonths = () => {

    const currentDate = moment();
    currentDate.date(1);

    const last6months = [];
    const last12months = [];
    for (let i = 0; i < 6; i++) {
        last6months.unshift(currentDate.clone().subtract(i, 'months').format('MMM'));
    }
    for (let i = 0; i < 12; i++) {
        last12months.unshift(currentDate.clone().subtract(i, 'months').format('MMM'));
    }

    return [last6months, last12months];
}