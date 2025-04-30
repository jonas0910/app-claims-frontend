import {z} from 'zod';

export const userSchema = z.object({
    name: z.string().min(1, {message: 'Name is required'}),
    email: z.string().email({message: 'Email is required'}),
    // password: z.string().min(6, {message: 'Password is required'}),
    // passwordConfirmation: z.string().min(6, {message: 'Password confirmation is required'}),

    //company
    company_ruc: z.string().min(1, {message: 'Company RUC is required'}),
    company_name: z.string().min(1, {message: 'Company name is required'}),
    company_address: z.string().min(1, {message: 'Company address is required'}),
    company_postal_code: z.string().min(1, {message: 'Company postal code is required'}),
    company_link: z.string().min(1, {message: 'Company link is required'}),
    company_logo: z.any().optional(), // Assuming this is a file input, you can adjust the validation as needed

});

export type UserSchemaInputsType = z.infer<typeof userSchema>;