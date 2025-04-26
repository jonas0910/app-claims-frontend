interface UserBase {
    id: number;
    name: string;
    email: string;
    
    company_name: string;
    company_address: string;
    company_ruc: string;
    company_postal_code: string;
    company_link: string;
    company_logo: string;
}

export interface User extends UserBase {
    created_at: string;
    updated_at: string;

}