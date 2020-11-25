
import{Application,Router,send}from"https://deno.land/x/oak@v6.3.1/mod.ts";
const app=new Application();
const router=new Router();
let kanban = [];
router
    .get("/kanban/columns",context=>context.response.body={
        "id":"Todo",
        "columns":["ToDo","In progress", "Done"]
    }
    );
app.use(router.routes());
app.use(async context => {
    await send(context, context.request.url.pathname, {
      root: `${Deno.cwd()}/frontend`,
      index: "index.html",
    });
  });
app.listen({port:8000});