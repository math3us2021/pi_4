export const data = [ 1, 3 ,5, 5 ,6 , 7, 8, 9, 10, 11, 12, 13, 14,14]

export interface Food {
  id: string;
  pet: Pet[];
  regulationAlimentId: string;
  dateAliment: string;
  quantity: number;
  sucess: boolean;
  // sucessLength: number;
  // errorLength: number;

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
  birthdate?: string;
}

export interface Static {
  meanResponse: number;
  modeResponse: number;
  medianResponse: number;
  stdeviationResponse: number;
}

export interface PetParams {
  params?: string;
  id?: string;
}
export interface PetTotal {
  id: string;
  name: string;
  quantity: number;
}
export interface WeightMonth {
  id: string;
  weight: number;
  width: number;
  age: number;
  height: number;
  foodMonth: number;
  date: string;
}

export interface ApiResponse<T> {
  items: T[];
  hasNext?: boolean;
}
///
