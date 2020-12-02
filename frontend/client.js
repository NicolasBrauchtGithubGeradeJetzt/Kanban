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

async function delete_item(data){
    try{
        //let item = JSON.parse(data);
        //const response = await fetch('http://localhost:8000/kanban/delete/' + item.id);
        update_items();
    }catch(errorReason){
        console.error(errorReason)
    }
}

async function move_item(data, direction){
    try{
        let item = JSON.parse(data);
        console.log(item);

        //const response = await fetch('http://localhost:8000/kanban/item/' + item.id);
        //
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
            result += '<tr ondrop="drop(event)" ondragover="allowDrop(event)">';
            for(var pos = 0; pos != table_length; pos++){
                result += '<td>';
                if(items_ordered[pos].length > row){
                    let item = items_ordered[pos][row];
                    if(item == '+'){
                        result += '<button id="'+pos+'">+</button>';
                    }else{
                        result += '<article class="' + item.id + '" draggable="true" ondragstart="drag(event)>' + item.title + 
                        '<button id="edit">*</button>'+
                        '<button id="delete">-</button>'+
                        '<button id="left">←</button>'+
                        '<button id="right">→</button>'+'</article>';
                    }
                }
                result += '</td>';
            }
            result += '</tr>';
        }

        tbody.innerHTML = result;

        const articles = document.querySelectorAll('article');

        articles.forEach(article => {
            let id = article.className;
            const data = article.data;

            let left = article.querySelector('');
            let right = article.querySelector('');
            let trash = article.querySelector('');
            let edit = article.querySelector('');

            left.addEventListener('click', () => {
                 move_item()});
            right.addEventListener('click', () => {
                 move_item()});
            trash.addEventListener('click', () => {
                 delete_item()});
            edit.addEventListener('click', () ={
                
            })
        })

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
function allowDrop(ev) {
    ev.preventDefault();
  }
  
  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  
  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
  }
startup();