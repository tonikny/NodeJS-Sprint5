/* export class Missatge {
  id!: number;
  text!: String;
  salaId!: number;
  userId!: number;
} */

export interface Missatge {
  id?: number;
  text: String;
  salaId: number;
  userId: number;
  createdAt: Date;
}