export const dateToInput = (date) => {
    const newDate = new Date(date);
    return `${newDate.getFullYear()}-${('0' + (newDate.getMonth() + 1)).slice(-2)}-${('0' + newDate.getDate()).slice(-2)}`;
} // dateToInput

export const dateToMonthAndYear = (date) => {
    const newDate = new Date(date);

    return `${ getMonthName(newDate.getMonth() + 1) } ${newDate.getFullYear()}`;
} // dateToMonthAndYear

function getMonthName(monthNumber) {
    switch(monthNumber) {
        case 1:
            return 'январь';

        case 2:
            return 'февраль';

        case 3:
            return 'март';

        case 4:
            return 'апрель';

        case 5:
            return 'май';

        case 6:
            return 'июнь';

        case 7:
            return 'июль';

        case 8:
            return 'август';

        case 9:
            return 'сентябрь';

        case 10:
            return 'октябрь';

        case 11:
            return 'ноябрь';

        case 12:
            return 'декабрь';

        default:
            return '';
    } // switch
} // getMonthName