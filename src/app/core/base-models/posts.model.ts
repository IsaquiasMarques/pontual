import { ImageObjectInterface } from "@shared/components/model/image-object"

interface PostCategoriesInterface{
    id: number,
    name: string,
    slug: string
}
export interface PostsModel{
    id?: number
    imagePath: ImageObjectInterface,
    slug: string
    title: string,
    categories: PostCategoriesInterface[],
    author?: string,
    created_at: string,
    highlightDescription?: string
    fullDescription?: string
}