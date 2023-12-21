
export function slideTo(index: number, parent: string, subparent: string = 'posts-container'){
    let parentElement = document.querySelector(`.${parent}`) as HTMLElement;
    let subParentElement = document.querySelector(`.${parent} .${subparent}`) as HTMLElement;
    let childrensCount = subParentElement.childElementCount;
    let childrens = subParentElement.children as any as NodeListOf<HTMLElement>
    
    var pontualPostCards = Array.from(childrens).filter(function(element) {
        return element.tagName.toLowerCase() === "pontual-post-card";
    });

    parentElement.scrollTo(pontualPostCards[index].offsetLeft, 0);

}