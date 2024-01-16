interface PageSectionsModel{
    type: 'post' | 'advertisement',
    sectionTitle: string,
    sectionSlug: string,
    data: any,
    postsWrap?: boolean
}

export interface PageStructure{
    sections: PageSectionsModel[]
}