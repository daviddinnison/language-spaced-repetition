export const loadAuthToken = () => {
    console.log('LOADED AUTH TOKEN')
    return localStorage.getItem('authToken');
};

export const saveAuthToken = authToken => {
    console.log('YOU HAVE SAVED THE AUTH TOKEN.')
    try {
        localStorage.setItem('authToken', authToken);
    } catch (e) {}
};

export const clearAuthToken = () => {
    try {
        localStorage.removeItem('authToken');
    } catch (e) {}
};
