import * as Yup from 'yup';

export const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email address')
        .required('Email address is required'),
    password: Yup.string()
        .required('Password is required'),
});

export const eventRegistrationValidationSchema = Yup.object().shape({
    eventCentreName: Yup.string().required('Event Centre Name is required'),
    phoneNumber: Yup.string()
        .matches(/^[0-9]{11}$/, 'Phone Number must be exactly 11 digits')
        .required('Phone Number is required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email address is required'),
    state: Yup.string().required('State is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null!], 'Passwords must match')
        .required('Confirm Password is required'),
});

export const userRegistrationValidationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phoneNumber: Yup.string().matches(/^\d{11}$/, 'Phone number must be 11 digits').required('Phone Number is required'),
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null!], 'Passwords must match')
        .required('Confirm Password is required'),
});