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
        update_items();
        
    }catch(errorReason){
        console.error(errorReason)
    }
}

async function add_item(){
    try{
        update_items();
    }catch(errorReason){
        console.error(errorReason)
    }
}

async function delete_item(){
    try{
        update_items();
    }catch(errorReason){
        console.error(errorReason)
    }
}

async function update_items(){
    try{
        const table_length = document.querySelectorAll('th').length;
        console.log(table_length);
        const tbody = document.querySelector('tbody');
        let result = '';

        const response = await fetch('http://localhost:8000/kanban/items');
        const items = await response.json();
        console.log(items);

        let items_ordered = [];
        let position_array_tracker = [];
        
        if(items.length != 0){

        }else{
            result += '<tr>';
            for(pos = 0;pos != table_length; pos++){
                result += '<td><button>+</button></td>';
            }
            result += '</tr>';
        }

        tbody.innerHTML = result;

        //tbody.innerHTML = '<tr><td>+</td><td>+</td><td>+</td></tr>'

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