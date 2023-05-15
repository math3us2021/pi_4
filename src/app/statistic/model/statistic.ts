export const data = [ 1, 3 ,5, 5 ,6 , 7, 8, 9, 10, 11, 12, 13, 14,14]

export interface Food {
  id: string;
  petId: string;
  regulationAlimentId: string;
  dateAliment: string;
  quantity: number;
  sucess: boolean;
  sucessLength: number;
  errorLength: number;

}

export interface User {
  id: string;
  name: string;
  cpf: string;
  email: string;
  password: string;
  birthDate: string;
  phone: string;
}

export interface Pet {
  id: string;
  name: string;
  type: string;
  breed: string;
  age: string;
}

export interface PetTotal {
  id: string;
  name: string;
  quantity: number;
}

export interface ApiResponse<T> {
  items: T[];
  hasNext?: boolean;
}
///
