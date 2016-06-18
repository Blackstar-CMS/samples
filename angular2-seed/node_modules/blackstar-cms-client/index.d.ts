declare module 'blackstar-cms-client' {
    export class Client {
        constructor(url:string, options?:any)
        create(chunk:any)
        update(chunk:any)
        getAllTags()
        get(query:any)
        getAll()
        bind(any)
        delete(id:number)
        adminSearch(query:string)
        mediaSearch(query:string)
        createMedia(media:any)
        deleteMedia(hash:string)
    }
}
