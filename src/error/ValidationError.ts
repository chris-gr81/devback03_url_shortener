import { AppError } from "./AppError";

export class ValidationError extends AppError {
  constructor(status: number, message: string) {
    super(status, message);
    this.name = this.constructor.name;
  }
}
