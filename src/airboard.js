export default class Airboard{
    constructor(domEl){
        if(!domEl)
            throw new Error('Передан пустой DOM элемент');
        
        this.domEl = domEl;
    }

    getDepartureFlight(){
        var promise = fetch('') 
    }
}