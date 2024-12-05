export interface resp<E> {
    code: number,
    message: string,
    body: E
}


export interface InsertOneResponseProps {
    response: resp<string> | null;
}