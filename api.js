
import{Application,Router,send}from"https://deno.land/x/oak@v6.3.1/mod.ts";
const app=new Application();
const router=new Router();
let items = [];
let id = 0;
router
    .get("/kanban/columns",context=>context.response.body={
        "id":"Todo",
        "columns":["ToDo","In progress", "Done"]
    }
    )
    .get("/kanban/items",context=>context.response.body= items)
    .get("/kanban/items/todo",context=>context.response.body= items.filter(allItems=> allItems.status=="todo"))
    .get("/kanban/items/inprogress",context=>context.response.body= items.filter(allItems=> allItems.status=="inProgress"))
    .get("/kanban/items/done",context=>context.response.body= items.filter(allItems=> allItems.status=="done"))
    .post("/kanban/createitem",async context =>{
        const item = await context.request.body({ type: "json" }).value;
        item.id =id;
        items =[
            ...items,
            item];
        id++;

    }
    )
    .put("/kanban/item/:id", async context => {
        const id = context.params.id;
        const item = await context.request.body({ type: "json" }).value;
        const olditem = items.find(item => item.id == id);
        const index = items.indexOf(olditem);
        item.id = parseInt(id, 10);
        items[index] = item
    })
    .delete("/kanban/delete/:id", async context => {
        const id = context.params.id;
        items = items.filter(i => i.id != id);
    });
app.use(router.routes());
app.use(async context => {
    await send(context, context.request.url.pathname, {
      root: `${Deno.cwd()}/frontend`,
      index: "index.html",
    });
  });
app.listen({port:8000});