export interface LoginRequest {
    email: string
    password: string
}

export interface User {
    password: string
}

export interface Barber {
    cellPhone?: Array<string>
    cpf: string
    name: string
    email: string
    accessAuthorization: boolean
}

export interface Client {
    cellPhone?: Array<string>
    cpf: string
    name: string
    email: string
}

export type IUser = Barber | Client

export function isBarber(value: IUser): value is Barber {
    return 'accessAuthorization' in value
}
