/**
 * config:
 * {
 *  tabs: [
 *      { id: '1', name: 'tab 1', order: 1},
 *      { id: '2', name: 'tab 2', order: 2},
 *  ],
 *  active: 2 //id табы активной
 * }
 */
export class TabsComponent {
    constructor(config) {
        this.config = config || {};
        this._elements = this._createElements(this.config);
        this._renderHeader(this._elements.tabsHeader);
    }

    _createElements(config) {
        const tabs = document.createElement('div');
        tabs.classList.add('tabs');
        const tabsHeader = document.createElement('div');
        tabsHeader.classList.add('tabs-header');
        const tabsContent = document.createElement('div');
        tabsContent.classList.add('tabs-content');
        tabs.appendChild(tabsHeader);
        tabs.appendChild(tabsContent);
        return {
            tabs,
            tabsContent,
            tabsHeader
        };
    }

    _renderHeader(headerEl) {
        if (!headerEl) {
            return;
        }
        const tabs = (this.config.tabs || []).sort((a, b) => a.order - b.order);
        if (this.config.active === undefined) {
            this.config.active = tabs[0].id;
        }
        tabs.forEach(tab => {
            const tabEl = document.createElement('div');
            tabEl.classList.add('tabs-tab');
            if (tab.id === this.config.active) {
                tabEl.classList.add('active');
                this.activeTab = tab;
            }
            tabEl.innerText = tab.name;
            tabEl.dataset.tab = tab;
            tabEl.addEventListener('click', e => {
                this._changeActive(tabEl);
                const handlers = this.eventHandlers || {};
                const subscribers = handlers['tabClick'] || [];
                subscribers.forEach(sub => {
                    sub(tab);
                });
            });
            headerEl.appendChild(tabEl);
        });
    }

    _changeActive(tabEl) {
        const tabs = this._elements.tabsHeader.querySelectorAll('.tabs-tab');
        for (const tab of tabs) {
            tab.classList.remove('active');
        }
        tabEl.classList.add('active');
    }

    on(eventName, cb) {
        if (typeof cb !== 'function') {
            return;
        }
        this.eventHandlers = this.eventHandlers || {};
        this.eventHandlers[eventName] = this.eventHandlers[eventName] || [];
        this.eventHandlers[eventName].push(cb);
    }

    renderContent(contentHTML) {
        this._elements.tabsContent.innerHTML = contentHTML;
    }

    getElement() {
        return this._elements.tabs;
    }
}