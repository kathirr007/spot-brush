import createPersistedState from 'vuex-persistedstate';
import * as Cookies from 'js-cookie';
import cookie from 'cookie';

export default ({ store, req }) => {
    window.onNuxtReady(() => {
        createPersistedState({
            paths: ['preferences'],
            storage: {
                getItem: (key) => {
                    if (process.server) {
                        const parsedCookies = cookie.parse(req.headers.cookie);
                        return parsedCookies[key];
                    } else {
                        return Cookies.get(key);
                    }
                },
                // Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.
                setItem: (key, value) =>
                    Cookies.set(key, value, { expires: 3, secure: false }),
                removeItem: key => Cookies.remove(key)
            }
        })(store)
    })
};
