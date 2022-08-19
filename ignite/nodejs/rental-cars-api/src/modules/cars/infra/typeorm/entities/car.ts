import { v4 } from "uuid";

export class Car {
  id: string;
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  available: boolean;
  category_id: string;
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = v4();
      this.available = true;
      this.created_at = new Date();
    }
  }
}
