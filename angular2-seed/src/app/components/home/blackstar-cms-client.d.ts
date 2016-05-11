declare module 'blackstar-cms-client' {
    export class Client {
        constructor(url:string, options?:any)
        create(chunk:any)
        update(chunk:any)
        getAllTags()
        get(query:any)
        getAll()
        bind(any)
    }
}