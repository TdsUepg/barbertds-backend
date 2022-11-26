export interface Barber {
    id: string
    name: string
}

export interface Service {
    id: string
    name: string
    value: number
}

export interface Client {
    id: string
    email: string
    name: string
}

export enum ServiceStatus {
    WAITING = 'WAITING',
    CONCLUDED = 'CONCLUDED',
}

interface User {
    id: string
    role: string
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

export interface AppointmentRequest {
    user: User
    client: Client
    barber: Barber
    service: Service
    date: string
    startTime: string
    endTime: string
    serviceStatus: ServiceStatus
}
