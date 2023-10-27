export interface AdsModel{
    page?: 'home' | 'see-posts' | 'reading' | 'results',
    imagePath: {
        fullImageSize: string,
        thumbnailImageSize: string
    },
    link?: string
}