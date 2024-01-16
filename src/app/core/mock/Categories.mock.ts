import { CategoriesModel } from "@core/base-models/categories.model";

export const CATEGORY_CONTAINER_ID: number = 4200;
export const CATEGORY_CONTAINER_LABEL: string = 'Mais Pontual';
export const CATEGORY_CONTAINER_SLUG: string = 'mais-pontual';

export const CATEGORIES: CategoriesModel[] = [
    {
        id: 200,
        label: 'Política',
        slug: 'politica',
        hasPosts: true
    },
    {
        id: 201,
        label: 'Sociedade',
        slug: 'sociedade',
        hasPosts: true
    },
    {
        id: 202,
        label: 'Criminalidade',
        slug: 'criminalidade',
        hasPosts: true
    },
    {
        id: 203,
        label: 'Economia',
        slug: 'economia',
        hasPosts: true
    },
    {
        id: 204,
        label: 'Entrevistas',
        slug: 'entrevistas',
        hasPosts: true
    },
    {
        id: 205,
        label: 'Religião',
        slug: 'economia',
        hasPosts: true,
    },
    {
        id: 205,
        label: 'Mundo',
        slug: 'mundo',
        hasPosts: true,
    },
    {
        id: 4200,
        label: CATEGORY_CONTAINER_LABEL,
        slug: CATEGORY_CONTAINER_SLUG,
        hasPosts: true,
        priority: 0,
        childrens: [
            {
                id: 206,
                label: 'Desporto',
                slug: 'desporto',
                hasPosts: true
            },
            {
                id: 207,
                label: 'Lifestyle',
                slug: 'lifestyle',
                hasPosts: false,
            },
        ]
    },
];