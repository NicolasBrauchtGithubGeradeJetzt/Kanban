
import{Application,Router,send}from"https://deno.land/x/oak@v6.3.1/mod.ts";
const app=new Application();
const router=new Router();
let kanban = [];
router
    .get("/kanban",context=>context.response.body=kanban
    );
app.use(router.routes());
app.use(async context => {
    await send(context, context.request.url.pathname, {
      root: `${Deno.cwd()}`,
      index: "index.html",
    });
  });
app.listen({port:8000});