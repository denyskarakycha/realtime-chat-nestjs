import { Injectable } from '@nestjs/common';

@Injectable()
export class DateService {
  getPaginationDate(date: string | number) {
    const startDate = new Date(date);
    startDate.setDate(startDate.getDate() - 5);

    const start = startDate.toISOString().split('T')[0];

    const endDate = new Date(date);
    endDate.setDate(endDate.getDate() + 5);

    const end = endDate.toISOString().split('T')[0];

    return {
      start,
      end,
    };
  }
}
