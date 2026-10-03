
import { createApp } from "vue";
import App from "./App.vue";
import { defineRule } from "vee-validate";
import { required, min,max } from "@vee-validate/rules";

defineRule("required", required);
defineRule("min", min);
defineRule("max" ,max);
defineRule("StartedWithCapital" , (value:string) => {

    if(value.length === 0) {
        return  "Input most not be an empty string ";
    }

    if(value [0] === value[0].toUpperCase()

    ){
       return "string is start with capital letter";
    }

    return  true;

} )

createApp(App).mount("#app");