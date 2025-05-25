export class ScheduleItem {
  id: string;
  daytime: string; // ISO string
  hall: number;
  rows: number;
  seats: number;
  price: number;
  taken?: string[]; // Массив занятых мест, например ["1_5", "2_7"]
}

export class Film {
  id: string;
  title: string;
  rating: number;
  director: string;
  tags: string[];
  image?: string;
  cover?: string;
  about?: string;
  description?: string;
  schedule: ScheduleItem[];
}
