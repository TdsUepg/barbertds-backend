import type { DocumentData } from 'firebase-admin/firestore'

export enum ServiceStatus {
    WAITING = 'WAITING',
    CONCLUDED = 'CONCLUDED',
}
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

export interface BarberRequest {
    name: string
    cpf: string
    email: string
    password: string
    cellPhone: Array<string>
    user: {
        id: string
        role: string
    }
}

export interface Appointment {
    clientId: string
    barberId: string
    serviceId: string
    date: string
    startTime: string
    endTime: string
    serviceStatus: ServiceStatus
}
