export interface Validator<T> {
    create: (data: T | undefined) => boolean
    update: (data: T | undefined) => boolean
}