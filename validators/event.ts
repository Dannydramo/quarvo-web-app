import * as Yup from 'yup';

export const bookEventValidationSchema = Yup.object().shape({
    physical_user_name: Yup.string().required('Customer name is required'),
    physical_user_email: Yup.string()
        .email('Invalid email address')
        .required('Customer email is required'),
    physical_user_phone: Yup.string().required(
        'Customer phone number is required'
    ),
    amount:Yup.string().required('Amount is required'),
    date: Yup.date().required('Event date is required'),
});
