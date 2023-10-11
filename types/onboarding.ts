export interface EventCentreReg {
    eventCentreName: string
    email: string
    password: string
    phoneNumber: string
    state: string
    confirmPassword: string
}

export interface UserReg {
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    password: string
    confirmPassword: string
}

export interface LoginDetails {
    email: string
    password: string
}