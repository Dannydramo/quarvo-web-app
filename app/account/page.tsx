import React from 'react';
import UserDashboardLayout from '../components/UserDashboardLayout';
import ChangeName from './ChangeName';
import ChangePassword from './ChangePassword';

const Account = () => {
    return (
        <UserDashboardLayout>
            <section className="mx-auto overflow-x-hidden w-[95%] sm:w-[90%]">
                <ChangeName />
                <hr className='my-6'/>
                <ChangePassword />
            </section>
        </UserDashboardLayout>
    );
};

export default Account;
