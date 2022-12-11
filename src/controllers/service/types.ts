export type Service = {
    id: string
    name: string
    serviceTime: string
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
    serviceTime: string
    value: number
    iconName: string
    user: {
        id: string
        role: string
    }
}
