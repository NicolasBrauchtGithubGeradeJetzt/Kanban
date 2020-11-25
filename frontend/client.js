console.log("client works");
async function startup(){
    try{
        const response = await fetch('http://localhost:8000/kanban/columns');
        const columns = await response.json();
        if(columns.columns.length > 0){
            const main = document.querySelector('main');
            var result = '<table><thead><tr>';
            columns.columns.forEach(column => {
                result += '<th>' + column + '</th>';
            });
            result += '</tr></thead><tbody></tbody></table>';
            main.innerHTML = result;
        }
        
    }catch(errorReason){
        console.error(errorReason)
    }
}
startup();
/*
class kanban{

    _position;
    _name;
    
    kanban(name){
        _position = 0;
        _name = this.name;
    }
}*/