import type { DocumentData } from 'firebase-admin/firestore'

export interface BarberDocuments {
    id: string
    data: () => DocumentData
}

export interface Barber {
    id: string
    cpf: string
    name: string
    email: string
    cellPhone?: Array<string>
    accessAuthorization: boolean
}
