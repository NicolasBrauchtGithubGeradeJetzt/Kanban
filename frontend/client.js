console.log("client works");
async function startup(){
    try{
        const response = await fetch('http://localhost:8000/kanban/columns');
        const columns = await response.json();
        console.log(columns);
        
    }catch(errorReason){
        console.error(errorReason)
    }
}
startup();

class kanban{

    _position;
    _name;
    
    kanban(name){
        _position = 0;
        _name = this.name;
    }
}