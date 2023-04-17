
tiny port to llama.cpp project with Deno ffi library(whcih let you connect to native languages and use their functions in javascript directly!)

## Usage


#compiling:
```
deno task compileCLib
deno task compile
./server localhost 5000 ./models/model.ggml.bin ./llama.cpp.modified/liblama
```
#test it with:
```
 curl -X POST -H "Content-Type: application/json" -d '{"prompt": "  hello are you ready for our conversation ? "}' http://localhost:5000/
```

#developing:
```
deno task dev
``` 

 Note: i'm going to stop developing this until guys at Deno project support Arm64 [issue](https://github.com/denoland/deno/issues/1846) .