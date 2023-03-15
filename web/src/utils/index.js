import * as yup from 'yup';

export const authSchema = yup.object().shape({
    email: yup.string().required("Email is required").email("Email is invalid"),
    password: yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
});

export function setCurrentUser(data) {
    return localStorage.setItem('currentUser', JSON.stringify(data));
}

export function getCurrentUser() {
    return localStorage.getItem('currentUser');
}

export function clearCurrentUser() {
    return localStorage.clear();
}