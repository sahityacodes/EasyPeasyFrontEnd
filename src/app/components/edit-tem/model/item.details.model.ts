export interface ItemDetailsModel {
  data: ItemDetailsModel;
  showContactInfo: boolean;
  seller: any;
  name: string;
  description: string;
  price : Number;
  zip: Date,
  country: string,
  city: string;
  street: string;
  number: number;
  quantity: 1 ;
  category:number;
  is_service: boolean;
  image : string;
}
export interface ItemSellModel {
  showContactInfo: boolean;
  delivery_time: Date[];
  name: string;
  description: string;
  price : Number;
  zip: Date,
  country: string,
  city: string;
  street: string;
  number: number;
  quantity: 1 ;
  username:string;
  category:number;
  is_service: boolean;
  _id: any;
  publication_date: number;
}