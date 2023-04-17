import { init, predict } from "./functions.ts";

/* ============================================================= */
/* init configs */
const url=Deno.args[0]
const port=Number(Deno.args[1])
const modelPath=Deno.args[2] 
const cLibName=Deno.args[3] 
/* todo:get other configs here or with a config file(e.g:cores,top_k...) */


let libSuffix = "";
switch (Deno.build.os) {
  case "windows":
    libSuffix = "dll";
    break;
  case "darwin":
    libSuffix = "dylib";
    break;
  default:
    libSuffix = "so";
    break;
}

// const libName = `../llama.cpp.modified/liblama.${libSuffix}`;
// const libName = `${cLib}.${libSuffix}`;
export const configs={
  port:port, 
  server:`http://${url}:${port}`,
  model:modelPath,
  cLibPath:`${cLibName}.${libSuffix}`,
  defaultasdasd:{},
  defaultasdasd2:{},
}
/* ============================================================= */
export const cLib = Deno.dlopen(
  configs.cLibPath,
  {
    "init": { parameters: ["buffer"], result: "isize" },
    "predict": { parameters: ["buffer", "buffer"], result: "buffer" },
    // "replacer": { parameters: ["buffer"], result: "buffer" },
  },
);

/* ============================================================= */
await init({model:configs.model,configs:{}})
/* ============================================================= */
for await (const conn of Deno.listen({ port: configs.port })) {
  handleHttp(conn);
}
/* ----------------------------------------------------- */
async function handleHttp(conn: Deno.Conn) {
  for await (const reqEvent of Deno.serveHttp(conn)) {
    console.log(reqEvent.request.method, reqEvent.request.url);

    if (reqEvent.request.method === "POST") {
      const _body = await reqEvent.request.json();
      const url=reqEvent.request.url.replace(configs.server,'')
      const res=await switcher(url, _body);
      if(res==='err_500'){
        await reqEvent.respondWith(new Response(JSON.stringify({
          status:'nok',
          body:null,
        })));
      }else{
        await reqEvent.respondWith(new Response(JSON.stringify({
          status:'ok',
          body:res,
        })));
      }
    }
  }
}
/* ------------------------------------------------------------ */
async function switcher(url: string, body: any) {
  switch (url) {
    case "/":return await predict(body).catch(e=>'err_500');
    default:return null;
  }
}
/* ============================================================= */
 