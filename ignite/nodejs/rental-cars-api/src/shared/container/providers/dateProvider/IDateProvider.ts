export interface IDateProvider {
  dateNow(): Date;
  convertToUTC(date: Date): string;
  compareInHours(startDate: Date, endDate: Date): number;
}