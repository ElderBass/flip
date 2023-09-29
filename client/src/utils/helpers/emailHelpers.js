const isValidEmail = (email) => {
    return email.includes('@') || email.substring(email.length - 4) === '.com';
};

const trimEmail = (email) => {
    const atSymbolIndex = email.indexOf('@');
    return email.substring(0, atSymbolIndex);
};

export { isValidEmail, trimEmail };
