export function fulDateTranslate(fullDate: any, lang: string = 'pt-AO'){
    let splited = fullDate.split(' ');
    let weekday = weekDayTranslate(splited[0].toLowerCase());
    let month = monthTranslate(splited[1].toLowerCase());
    let day = splited[2];
    let year = splited[3];

    return `${weekday} ${month} ${day} ${year}`;

}

function weekDayTranslate(weekInEn: string){
    switch(weekInEn){
        case 'sunday,':
            return 'Domingo,';
        case 'monday,':
            return 'Segunda-feira,';
        case 'tuesday,':
            return 'Terça-feira,';
        case 'wednesday,':
            return 'Qurta-feira,';
        case 'thursday,':
            return 'Quinta-feira,';
        case 'friday,':
            return 'Sexta-feira,';
        case 'saturday,':
            return 'Sábado,';
        default:
            return 'not-valid entry';
    }
}

function monthTranslate(monthInEn: string): string{
    switch(monthInEn){
        case 'january':
            return 'Janeiro';
        case 'february':
            return 'Fevereiro';
        case 'march':
            return 'Março';
        case 'april':
            return 'Abril';
        case 'may':
            return 'Maio';
        case 'june':
            return 'Junho';
        case 'july':
            return 'Julho';
        case 'august':
            return 'Agosto';
        case 'september':
            return 'Setembro';
        case 'october':
            return 'Outubro';
        case 'november':
            return 'Novembro';
        case 'december':
            return 'Dezembro';
        default:
            return 'not-valid entry';
    }
}