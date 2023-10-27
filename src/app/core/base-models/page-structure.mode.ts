import { AdsModel } from "./ads.model"
import { PostsModel } from "./posts.model"

// export interface SectionDataModel{
//     // sectionTitle: string,
//     entries: PostsModel[] | AdsModel
// }

interface PageSectionsModel{
    type: 'post' | 'advertisement',
    sectionTitle: string,
    // data: PostsModel[] | AdsModel
    data: any
}

export interface PageStructure{
    sections: PageSectionsModel[]
}