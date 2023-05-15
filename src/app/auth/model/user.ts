export interface User {
  id: string;
  name: string;
  cpf: string;
  email: string;
  password: string;
  pet?: Pet[];
}

export interface Pet {
  id: string;
  name: string;
  age: string;
  breed: string;
  owner: string;
  description?: {
    width: string;
    height: string;
    weight: string;
  }


}


//
