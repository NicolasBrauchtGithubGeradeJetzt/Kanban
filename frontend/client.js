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

async function add_item(pos){
    try{
        var title = prompt("Geben sie den Namen des Items ein");
        if(title != null){
            const response = await fetch('http://localhost:8000/kanban/createitem', {
                method: 'POST',
                body: JSON.stringify({
                    position: pos,
                    title: title,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });
            update_items();
        }
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
        const tbody = document.querySelector('tbody');
        let row_length = 0;
        let result = '';

        const response = await fetch('http://localhost:8000/kanban/items');
        const items = await response.json();
        console.log("items",items);

        //Ordere Items, to implement to table-body
        let items_ordered = [];
        for(var pos = 0; pos != table_length; pos++){
            items_ordered[pos] = items.filter(item => item.position == pos);
            items_ordered[pos] = [...items_ordered[pos], '+'];
            if(row_length < items_ordered[pos].length){
                row_length = items_ordered[pos].length;
            }
        }

        //Implementing Data to table
        for(var row = 0; row != row_length; row++){
            result += '<tr>';
            for(var pos = 0; pos != table_length; pos++){
                result += '<td>';
                if(items_ordered[pos].length > row){
                    let item = items_ordered[pos][row];
                    if(item == '+'){
                        result += '<button id="' + pos + '">+</button>';
                    }else{
                        result += '<article class="' + item.id + '">' + item.title + '</article>';
                    }
                }
                result += '</td>';
            }
            result += '</tr>';
        }

        tbody.innerHTML = result;

        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                add_item(button.id);
            });
        })
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