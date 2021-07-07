import { AuthRequestData, ImodelResponse } from './Iresponse';

export interface ImodelWork {
  id?: number;
  workname: string;
  done: boolean;

  datee?: ImodelDate;
}

export interface ImodelDate {
  id?: number;
  datename: string;
  courses?: Array<ImodelWork>;
  auth?: AuthRequestData;
}
