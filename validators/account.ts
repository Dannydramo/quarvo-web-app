import * as Yup from 'yup';

export const changeNameValidationSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    phoneNumber: Yup.string()
        .matches(/^[0-9]{11}$/, 'Phone Number must be exactly 11 digits')
        .required('Phone Number is required'),
});

export const changePasswordValidationSchema = Yup.object().shape({
    currentPassword: Yup.string().required('Current Password is required'),
    newPassword: Yup.string()
        .required('New Password is required')
        .min(8, 'Password must be at least 8 characters'),
    confirmNewPassword: Yup.string()
        .required('Confirm New Password is required')
        .oneOf([Yup.ref('newPassword')], 'Passwords must match'),
});
