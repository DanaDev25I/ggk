
import PocketBase from 'pocketbase';

const pb = new PocketBase('https://search-app.pockethost.io/');

export const login = async (email, password) => {
    try {
        const authData = await pb.collection('users').authWithPassword(email, password);
        return authData;
    } catch (error) {
        console.error('Login failed', error);
        throw error;
    }
};

export const register = async (userData) => {
    try {
        const newUser = await pb.collection('users').create(userData);
        return newUser;
    } catch (error) {
        console.error('Registration failed', error);
        throw error;
    }
};

export const logout = async () => {
    try {
        await pb.authStore.clear(); // Clear local auth store
    } catch (error) {
        console.error('Logout failed', error);
        throw error;
    }
};
export { login as   default }