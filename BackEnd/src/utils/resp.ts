export interface resp<E> {
    code: number,
    message: string,
    body: E
}