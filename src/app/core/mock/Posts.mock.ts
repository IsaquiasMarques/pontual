import { PostsModel } from "@core/base-models/posts.model";

export const BANNER_POSTS: PostsModel[] = [
    {
        imagePath: { 
            fullImageSize: 'assets/images/home/banner/bigImage.png',
            mediumImageSize: 'assets/images/home/banner/bigImage.png',
            thumbnailImageSize: 'assets/images/home/banner/bigImage.png',
        },
        title: 'Adalberto da Costa Júnior pretende interromper suas campanhas política de 2027',
        slug: 'adalverto-da-costa-junior-pretne',
        categories: [
            {
                id: 12,
                name: 'Política',
                slug: 'politica'
            }
        ],
        highlightDescription: 'Para nós existe uma linha visível na nossa relação com os clientes, fornecedores, colaboradores e texto de teste para as reticências',
        created_at: '48 minutos atrás'
    },
    {
        imagePath: {
            fullImageSize: 'assets/images/home/banner/bigImage.png',
            mediumImageSize: 'assets/images/home/banner/bigImage.png',
            thumbnailImageSize: 'assets/images/home/banner/bigImage.png',
        },
        title: 'Adalberto da Costa Júnior pretende interromper suas campanhas política de 2027',
        slug: 'adalberto-da-costa-junior-pretende',
        categories: [
            {
                id: 12,
                name: 'Política',
                slug: 'politica'
            }
        ],
        highlightDescription: 'Para nós existe uma linha visível na nossa relação com os clientes, fornecedores, colaboradores e texto de teste para as reticências',
        created_at: '50 minutos atrás'
    }
];

export const HIGHLIGHTED_POSTS: PostsModel[] = [
    {
        imagePath: {
            fullImageSize: 'assets/images/home/banner/highlight-1.png',
            mediumImageSize: 'assets/images/home/banner/highlight-1.png',
            thumbnailImageSize: 'assets/images/home/banner/highlight-1.png',
        },
        slug: 'crianca-cria-papel-de-parede',
        title: 'Criança cria papel de parede que refle luz solar durante a noite.',
        categories: [
            {
                id: 13,
                name: 'Sociedade',
                slug: 'sociedade'
            }
        ],
        author: 'Joaquim Paulo',
        created_at: '12 Minutos atrás'
    },
    {
        imagePath: {
            fullImageSize: 'assets/images/home/banner/highlight-2.png',
            mediumImageSize: 'assets/images/home/banner/highlight-2.png',
            thumbnailImageSize: 'assets/images/home/banner/highlight-2.png',
        },
        title: 'Mais de vinte e dois criminosos foram presos durante a última madrugada',
        slug: 'mais-de-vinte-e-dois-criminosos',
        categories: [
            {
                id: 14,
                name: 'Criminalidade',
                slug: 'criminalidade'
            }
        ],
        author: 'Miguel Paulo',
        created_at: '27 Minutos atrás'
    },
    {
        imagePath: {
            fullImageSize: 'assets/images/home/banner/highlight-3.png',
            mediumImageSize: 'assets/images/home/banner/highlight-3.png',
            thumbnailImageSize: 'assets/images/home/banner/highlight-3.png',
        },
        title: 'Festival de artes realizado no museu da escravatura teve mais de mil acesso.',
        slug: 'festival-de-artes-realizado',
        categories: [
            {
                id: 12,
                name: 'Política',
                slug: 'politica'
            }
        ],
        author: 'Edna Jirão',
        created_at: '48 Minutos atrás'
    },
];

export const MOST_RECENT_POSTS: PostsModel[] = [
    {
        imagePath: {
            fullImageSize: 'assets/images/home/banner/highlight-1.png',
            mediumImageSize: 'assets/images/home/banner/highlight-1.png',
            thumbnailImageSize: 'assets/images/home/banner/highlight-1.png',
        },
        slug: 'crianca-cria-papel-de-parede',
        title: 'Criança cria papel de parede que refle luz solar durante a noite.',
        categories: [
            {
                id: 13,
                name: 'Sociedade',
                slug: 'sociedade'
            }
        ],
        author: 'Joaquim Paulo',
        created_at: '12 Minutos atrás'
    }
];