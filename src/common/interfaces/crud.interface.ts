export interface CRUD {
    getAll: (limit: number, page: number) => Promise<any>,
    create: (resource: any) => Promise<any>,
    updateById: (id: string, resource: any) => Promise<any>,
    getById: (resourceId: any) => Promise<any>,
    softDeleteById: (resourceId: any) => Promise<any>,
    permanentlyDeleteById: (resourceId: any) => Promise<any>,
}