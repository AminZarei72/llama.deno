#include <cstring>
#include <iostream>
#include <vector>
//  #include <cstring>
#include <fstream>
#include <map>
#include <string> 
#include "lama.h" 

 #include <iostream>
#include <string>
#include <locale>
#include <codecvt>
#include <fstream>
// #include <nlohmann/json.hpp>
using namespace std;
// using json = nlohmann::json;
#include <typeinfo>
/* ============================ */
#ifdef __cplusplus
extern "C" {
#endif
#include <stdbool.h> 
// int predict(char* text);
// const char* predict(char* text);
const char* predict(char* text,char* out); 
#ifdef __cplusplus
}
#endif
/* ============================ */
const struct {
    int Seed;
    int Threads;
    int Tokens;
    int TopK;
    float TopP;
    float Temperature;
    float Penalty;
    int Repeat;
    bool IgnoreEOS;
} DefaultOptions = {
    -1,
    8,
    128,
    10000,
    0.90,
    0.96,
    1,
    64,
    false
}; 
/* ==================================== */ 
 const char* predict(char* text,char* out) { 
  fprintf(stderr, "log:'%s'\n",text)   ; 
    void* params = llama_allocate_params(
        text,
        DefaultOptions.Seed,
        DefaultOptions.Threads,
        DefaultOptions.Tokens,
        DefaultOptions.TopK,
        DefaultOptions.TopP,
        DefaultOptions.Temperature,
        DefaultOptions.Penalty,
        DefaultOptions.Repeat,
        DefaultOptions.IgnoreEOS
    ); 
    
    fprintf(stderr, "log:llama_allocate_params ok \n");  fprintf(stderr, "log:out ok \n");
    // const int ret = llama_predict(
    const char* ret= llama_predict(
        params,
        nullptr,
        out
    );  
    return ret;
 }
/* ==================================== */ 