console.log("client works");

async function startup(){
    try{
        const response = await fetch('http://localhost:8000/kanban/columns');
        const columns = await response.json();
        if(columns.columns.length > 0){
            const main = document.querySelector('main');
            var result = '<table><thead><tr>';
            columns.columns.forEach(column => {
                result += '<th id="'+column.id+'">' + column.title + '</th>';
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

async function delete_item(item){
    try{
        const response = await fetch('http://localhost:8000/kanban/delete/' + item.id, {
            method: 'DELETE',
        });
        update_items();
    }catch(errorReason){
        console.error(errorReason)
    }
}

async function move_item(item, direction, max_length){
    try{
        item.position = direction + parseInt(item.position);

        if(item.position >= 0 && item.position < max_length){
            const response = await fetch('http://localhost:8000/kanban/item/' + item.id, {
                method: 'PUT',
                body: JSON.stringify(item),
            });
            update_items();
        }
    }catch(errorReason){
        console.error(errorReason)
    }
}

async function edit_item(item){
    try{
        var new_title = prompt("Geben sie den Namen des Items ein", item.title);
        if(new_title != null){
            item.title = new_title;
            const response = await fetch('http://localhost:8000/kanban/item/' + item.id, {
                method: 'PUT',
                body: JSON.stringify(item),
            });
            update_items();
        }
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
                result += '<td id="'+ pos +'" ondrop="drop(event)" ondragover="allowDrop(event)">';
                if(items_ordered[pos].length > row){
                    let item = items_ordered[pos][row];
                    if(item == '+'){
                        result += '<button class="add" id="'+pos+'"><img src="/icons/add.svg"></button>';
                    }else{
                        result += '<article id="'+item.id+'" draggable="true" ondragstart="drag(event)">' + '<div>'+item.title+'</div>' + 
                        '<button id="edit"><img src="/icons/edit.svg"></button>'+
                        '<button id="delete"><img src="/icons/delete.svg"></button>'+
                        '<button id="left"><img src="/icons/arrow_left.png"></button>'+
                        '<button id="right"><img src="/icons/arrow_right.png"></button>'+'</article>';
                    }
                }
                result += '</td>';
            }
            result += '</tr>';
        }

        tbody.innerHTML = result;

        const articles = document.querySelectorAll('article');

        articles.forEach(article => {
            let id = article.id;
            const data = items.filter(item => item.id == id)[0];

            let left = article.querySelector('#left');
            let right = article.querySelector('#right');
            let trash = article.querySelector('#delete');
            let edit = article.querySelector('#edit');

            left.addEventListener('click', () => {
                 move_item(data, -1, table_length)});
            right.addEventListener('click', () => {
                 move_item(data, 1, table_length)});
            trash.addEventListener('click', () => {
                 delete_item(data)});
            edit.addEventListener('click', () =>{
                edit_item(data)})
        })

        const buttons = document.querySelectorAll('.add');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                add_item(button.id);
            });
        })
    }catch(errorReason){
        console.error(errorReason)
    }
}
function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    move_item_byDragAndDrop(data, ev.target.id);
  }

  
async function move_item_byDragAndDrop(itemId, pos){
    try{
        if(document.querySelector('td[id="' + pos + '"]') != null){
            var item = {
                id: itemId,
                position: pos,
                title: document.getElementById(itemId).querySelector('div').innerText,
            }
            const response = await fetch('http://localhost:8000/kanban/item/' + item.id, {
                method: 'PUT',
                body: JSON.stringify(item),
            });
            update_items();
        }
    }catch(errorReason){
        console.error(errorReason)
    }
}

startup();