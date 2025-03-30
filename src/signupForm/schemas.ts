import { z } from 'zod';

export const SignupSchema = z.object({
    email: z.string({ message: 'Email is required' }).email({ message: 'Invalid email address' }),
    password: z.string({ message: 'Password is required' }).min(8, { message: 'Password must be at least 8 characters long' }),
    firstName: z.string({ message: 'First name is required' }).min(1, { message: 'First name is required' }),
    lastName: z.string({ message: 'Last name is required' }).min(1, { message: 'Last name is required' }),
    sex: z.enum(['1', '2'], { message: 'Gender is required' }),
    birthDate: z.string({ message: 'Date of birth is required' }).date('Must be a valid date'),
    branch: z.string({ message: 'Branch is required' }).uuid({ message: 'Invalid branch ID' }),
    subscription: z.string({ message: 'Subscription is required' }).uuid({ message: 'Invalid subscription ID' }),

})

export function validateSignup(data: any) {
    return SignupSchema.safeParse(data)
}

export function validateSignupPartial(data: any) {
    return SignupSchema.partial().safeParse(data)
}

export const AccountSchema = z.object({
    email: z.string({ message: 'Email is required' }).email({ message: 'Invalid email address' }),
    password: z.string({ message: 'Password is required' }).min(8, { message: 'Password must be at least 8 characters long' }),
    confirmPassword: z.string({ message: 'Confirm password' }).min(8, { message: 'Password must be at least 8 characters long' }),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
})

export function validateAccount(data: any) {
    return AccountSchema.safeParse(data)
}

export const PersonalInfoSchema = z.object({
    firstName: z.string({ message: 'First name is required' }).min(1, { message: 'First name is required' }),
    lastName: z.string({ message: 'Last name is required' }).min(1, { message: 'Last name is required' }),
    sex: z.enum(['1', '2'], { message: 'Gender is required' }),
    birthDate: z.string({ message: 'Date of birth is required' }).date('Must be a valid date'),
})

export function validatePersonalInfo(data: any) {
    return PersonalInfoSchema.safeParse(data)
}

export const SubscriptionFieldsSchema = z.object({
    branch: z.string({ message: 'Branch is required' }).uuid({ message: 'Invalid branch ID' }),
    subscription: z.string({ message: 'Subscription is required' }).uuid({ message: 'Invalid subscription ID' }),
})

export function validateSubscriptionFields(data: any) {
    return SubscriptionFieldsSchema.safeParse(data)
}

export interface FormErrors {
    email?: Array<string>;
    password?: Array<string>;
    confirmPassword?: Array<string>;
    firstName?: Array<string>;
    lastName?: Array<string>;
    sex?: Array<string>;
    birthDate?: Array<string>;
    branch?: Array<string>;
    subscription?: Array<string>;
}