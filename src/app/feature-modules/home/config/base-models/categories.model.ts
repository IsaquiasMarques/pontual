export interface CategoriesModel{
    id: number,
    label: string,
    slug: string,
    hasPosts: boolean,
    priority?: number,
    routeTo?: string,
    childrens?: CategoriesModel[]
}