import { PontualTeam } from "@core/mock/team.mock";

export function pontualTeamDataTransformer(incomingData: any[]): PontualTeam[]{
    let transformed: PontualTeam[] = [];

    incomingData.forEach((data: any) => {
        transformed.push({
            imagePath: (data.foto) ? data.foto : null,
            name: data.nome ?? 'Não nomeado',
            role: data.funcao ?? 'Sem função',
            email: data.email ?? 'sem email'
        });
    });

    return transformed;

}