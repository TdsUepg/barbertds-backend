export type Service = {
    id: string
    name: string
    serviceTime: number
    value: number
    iconName: string
    user: {
        id: string
        role: string
    }
}

export type CreateServiceRequest = {
    id: string
    name: string
    serviceTime: number
    value: number
    iconName: string
    user: {
        id: string
        role: string
    }
}
