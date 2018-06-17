import  queryString from "query-string"

class Utils {
    static searchWithParams(name , query){
        let parameter = queryString.parse(query)[name];
        if(!parameter || parameter < 1){
            parameter = 1;
        }
        return parameter;
    }
}
export default Utils;