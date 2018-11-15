export class SearchBox{
    constructor(lineName, buttonName){
        this.linePlaceholder = lineName || '';
        this.buttonName = buttonName || 'search';
        this.element = this._createElement(this.linePlaceholder, this.buttonName);
        this._renderSearchBox();
    }

    _createElement(lineName, buttonName){
        const searchbox = document.createElement('div');
        searchbox.classList.add('searchbox');
        const line = document.createElement('input');
        line.classList.add('searchbox-line');
        line.placeholder = lineName;
        const button = document.createElement('button');
        button.classList.add('searchline-button');
        button.innerText = buttonName;
        searchbox.appendChild(line);
        searchbox.appendChild(button);
        return {
            searchbox,
            line,
            button
        }
    }

    removeActive() {
        this.element.line.classList.remove('active');
    }

    _renderSearchBox(){
        this.element.line.addEventListener('click', e => {
            this.element.line.classList.add('active');
            const handlers = this.eventHandlers || {};
            const subscribers = handlers['lineClick'] || [];
            subscribers.forEach(sub => {
                    sub(this.element.line);
            });
        });
        this.element.line.addEventListener('input', e => {
            const handlers = this.eventHandlers || {};
            const subscribers = handlers['lineInput'] || [];
            subscribers.forEach(sub => {
                    sub(this.element.line);
            });
        });
        this.element.button.addEventListener('click', e => {
            const handlers = this.eventHandlers || {};
            const subscribers = handlers['clickButton'] || [];
            subscribers.forEach(sub => {
                    sub(this.element);
            });
        })
    }


    on(eventName, cb) {
        if (typeof cb !== 'function') {
            return;
        }
        this.eventHandlers = this.eventHandlers || {};
        this.eventHandlers[eventName] = this.eventHandlers[eventName] || [];
        this.eventHandlers[eventName].push(cb);
    }

    getElement(){
        return this.element.searchbox;
    }
}