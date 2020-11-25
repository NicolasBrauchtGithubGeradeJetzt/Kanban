console.log("client works");
async function startup(){
    try{
        const response = await fetch('http://localhost:8000/kanban',{ mode: "no-cors" });
        console.log(response);
        
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