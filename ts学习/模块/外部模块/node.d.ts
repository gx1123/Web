declare module "url" {
    export interface Url {
        protocol?: string
        hostname?: string
        pathname?: string
    }
    export function parse(urlStr: string, parseQueryString?, slashesDenoteHost?): Url
}
declare module "path" {
    export function normalize(p: string) : string
    export function join(...paths: any[]): string
    export let sep: string
}
declare module "user" {
    interface User {
        name: string
        age: number
        phone?: number
    }
    export function userInfo(info: User) : User
}