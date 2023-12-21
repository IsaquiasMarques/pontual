import { PostsModel } from "./posts.model"

export interface CategoriesModel{
    id: number,
    label: string,
    slug: string,
    hasPosts: boolean,
    priority?: number,
    routeTo?: string,
    childrens?: CategoriesModel[]
}

export interface CategoriesWithPostsModel{
    categoryId: number,
    label: string,
    slug: string,
    entries: PostsModel[]
}