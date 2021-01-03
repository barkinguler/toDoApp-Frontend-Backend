export  interface ImodelResponse{
   id:number;
    username:string;
    password:string;
    token:string;
    humanReadableMessage:string;
    }
    

    export interface AuthRequestData {
      id?:number;
        username:string;
        password:string;
      }