export default password => {
    // probably already handled by the required flag
    if(_.isNull(password) || !_.isString(password) || _.isEmpty(password))
        return false;

    // Minimum of 1 Uppercase Letter
    if(false === /[A-Z]/.test(password))
        return false;

    // Minimum of 1 Number
    if(false === /\d/.test(password))
        return false;

    // Minimum of 6 Characters
    // separately targeting input length to provide specific error message

    return true;
};
