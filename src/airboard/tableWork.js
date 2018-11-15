var tableData = {};

export function tableData(){
    return tableData;
};

export function createTableHTML(data){
    if(!data) return;
        
    var html = '<table>';
    var time = !data.schedule[0].departure ? 'arrival' : 'departure';
    data.schedule.forEach(el => {
            html += `<tr><td>${el[time]}</td>
            <td>${el.thread.title}</td>
            <td>${el.thread.number}</td>
            <td>${el.days}</td>
        </tr>`
    });
    html += '</table>';
    
    return html;
};

export function saveTableData(data){
    if(!data) return {};
    tableData = data;
    return tableData;
}

export function searchInTable(str){
    if(!tableData) return {};
    str = ' '+str;
    let result = {tableData};
        result.schedule = [];
    tableData.schedule.forEach(el => {
        if(el.thread.number.includes(str)) result.schedule.push(el);
    });
    return result;
}


