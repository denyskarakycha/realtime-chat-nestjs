import { Injectable } from '@nestjs/common';

@Injectable()
export class DateService {
  getDialogDate(date: string) {
    const timestamp = new Date(Number(date));

    const day = timestamp.getDate();
    const month = timestamp.getMonth() + 1;
    const year = timestamp.getFullYear();

    return `${day}.${month}.${year}`;
  }
}
