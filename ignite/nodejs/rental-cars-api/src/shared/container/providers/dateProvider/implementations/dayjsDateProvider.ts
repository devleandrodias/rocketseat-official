import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

export class DayjsDateProvider implements IDateProvider {
  public compareInHours(startDate: Date, endDate: Date): number {
    const endDateUTC = this.convertToUTC(endDate);
    const startDateUTC = this.convertToUTC(startDate);
    return dayjs(endDateUTC).diff(startDateUTC, "hours");
  }

  public compareInDays(startDate: Date, endDate: Date): number {
    const endDateUTC = this.convertToUTC(endDate);
    const startDateUTC = this.convertToUTC(startDate);
    return dayjs(endDateUTC).diff(startDateUTC, "days");
  }

  public convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  public dateNow(): Date {
    return dayjs().toDate();
  }
}
