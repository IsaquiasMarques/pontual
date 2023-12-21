
export interface PontualTeam{
    imagePath?: string,
    name: string,
    role: string,
    email: string
}

export const USER_ROLE_FROM_BACKOFFICE_NOT_INCLUDED_ON_PONTUAL_TEAM: string = 'Jornalista';
export const ROLE_IN_CASE_POST_OWNER_IS_CHAT_GPT: string = 'Inteligência Artificial';

export const PONTUAL_TEAM: PontualTeam[] = [
    {
        name: 'Joaquim Paulo',
        role: 'Editor',
        email: 'joaquim.paulo@pontual.com'
      },
      {
        name: 'Mário Cunha',
        role: 'Repórter de Crime',
        email: 'mario.cunha@pontual.com'
      },
      {
        name: 'Maria Francisco',
        role: 'Repórter de Economia',
        email: 'maria.francisco@pontual.com'
      },
      {
        name: 'Dadilson Tumba',
        role: 'Repórter de Política',
        email: 'dadilson.tumba@pontual.com'
      },
      {
        name: 'Judith Caetano',
        role: 'Repórter de Sociedade',
        email: 'judith.caetano@pontual.com'
      },
      {
        name: 'Natércia Dias',
        role: 'Repórter de Entretenimento',
        email: 'natercia.dias@pontual.com'
      },
      {
        imagePath: 'assets/images/photos/img-1.png',
        name: 'Alexandre Mungongo',
        role: 'Repórter de Cultura',
        email: 'alexandre.mungongo@pontual.com'
      },
      {
        name: 'Damião Manuel',
        role: 'Designer e Programador',
        email: 'damiao.manuel@pontual.com'
      },
      {
        name: 'José Mussole',
        role: 'Fotógrafo',
        email: 'jose.mussole@pontual.com'
      },
];