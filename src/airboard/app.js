import {getData} from './apiservice';
import {TabsComponent} from '../common/components/tabs';
import {SearchBox} from '../common/components/searchBox';
import {createTableHTML, saveTableData, tableData, searchInTable} from './tableWork';


/**
 * Поскольку API не предоставляет данных о задержанных рейсах, сделал только вывод информации по отправляющимся и прибывающим рейсам.
 * Ссылка на документацию к API https://tech.yandex.ru/rasp/doc/reference/schedule-point-point-docpage/
 * Также не увидел возможности отправлять запрос по номеру рейса, поэтому поиск ведется среди полученных рейсов.
 */

export function app(){
    const tabs = new TabsComponent({
        tabs: [
            { id: 1, name: 'Вылет', order: 1, data: { event: 'departure' } },
            { id: 2, name: 'Прилет', order: 2, data: { event: 'arrival' } },
        ],
        active: 1
    });

    const searchBox = new SearchBox('Номер рейса', 'Сбросить фильтр');

    tabs.on('tabClick', (e) => {
        // get data
        tabs.renderContent('<p>Загрузка данных...</p>');
        getData({ event: e.data.event }).then(data => {
            tabs.renderContent(createTableHTML(data));
        });
    });

    searchBox.on('lineInput', e => {
        tabs.renderContent('');
        tabs.renderContent(createTableHTML(searchInTable(e.value)))
    })

    searchBox.on('clickButton', e => {
        tabs.renderContent('');
        e.line.value = '';
        tabs.renderContent(createTableHTML(tableData));
    });
    
    const airboard = document.getElementById('airboard');
    airboard.innerHTML = '';
    searchBox.getElement().firstChild.type ='number';
    tabs.getElement().firstChild.appendChild(searchBox.getElement());
    airboard.appendChild(tabs.getElement());

    var activeTab;
    tabs.config.tabs.forEach(t => {
        if(t.id == tabs.config.active)
            activeTab = t;
    });

    tabs.renderContent('<p>Загрузка данных...</p>');
        getData({ event: activeTab.data.event }).then(data => {
            tabs.renderContent(createTableHTML(data));
            saveTableData(data);
        }).catch(err => {
            tabs.renderContent(err);
        });
};

