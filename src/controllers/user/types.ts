export interface LoginRequest {
    email: string
    password: string
}

export interface User {
    password: string
}

export interface Barber {
    id: string
    cellPhone?: Array<string>
    cpf: string
    name: string
    email: string
    accessAuthorization: boolean
}

export interface Client {
    id: string
    cellPhone?: Array<string>
    cpf: string
    name: string
    email: string
}

export type IUser = Barber | Client

export function isBarber(value: IUser): value is Barber {
    return 'accessAuthorization' in value
}
