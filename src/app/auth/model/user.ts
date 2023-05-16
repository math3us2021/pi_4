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
  type: string;
  breed: string;
  gender: string;
  birthDate: string;
  user?: User;
  weight?: number;
  }





//
