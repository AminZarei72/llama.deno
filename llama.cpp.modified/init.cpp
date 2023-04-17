#include <cstring>
#include <iostream>
#include <vector>
//  #include <cstring>
#include <fstream>
#include <map>
#include <string> 
// #include <string.h> 
// #include <afx.h>

#include "lama.h" 

 #include <iostream>
#include <string>
#include <locale>
#include <codecvt>
#include <fstream>
// #include <nlohmann/json.hpp>

using namespace std;
// using json = nlohmann::json;
/* ============================ */
#ifdef __cplusplus
extern "C" {
#endif
#include <stdbool.h> 
int init(char* model);
// int init(std::string model);
#ifdef __cplusplus
}
#endif
/* ============================ */
const struct {
    int ContextSize;
    bool F16Memory;
    bool Alpaca;
    bool GPT4all;
} DefaultModelOptions = {
    512,
    true,
    false,
    true
}; 
/* ==================================== */
int init(char* model) {
    
    llama_allocate_state(); 

    fprintf(stderr, "log:llama_allocate_state ok \n"); 

    const int result =  llama_bootstrap(
        model,
        nullptr,
        DefaultModelOptions.ContextSize,
        DefaultModelOptions.F16Memory,
        DefaultModelOptions.Alpaca,
        DefaultModelOptions.GPT4all
    );
    if (result != 0) {
        return 1;
    }
    fprintf(stderr, "log:llama_bootstrap ok \n"); 

    return 0;
}  