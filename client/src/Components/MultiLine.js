// rerender bug fixed by changing return to an array instead of a jsx element

/*multiline function takes text and returns it in an array separated by newlines so that it can be mapped in a jsx component as <li> or <p> */
export default function MultiLine(message){
        
        let body = [];
        let linestart = 0;
        
        for(let i=0; i<message.length+1;i++){
            if(message===""||message===null||message===undefined){
                break
            }else{
            if(message.at(i)==="\n"){
                body.push(message.slice(linestart,i));
                linestart = i+1;
            }else if(i===message.length){
                body.push(message.slice(linestart,i));
            }
        }
    }
        return body
    }
    

