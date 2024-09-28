export interface Movie {
  uniqueCode: string;
  title: string;
  startTime: string;
  createdBy: {};
  amount: number;
  description: string;
  venue: string[];
  movieRooms: string[];
  genre: string;
  ageRating: string;
  location: string;
  currency: string;
  customUrl: string;
  image: string;
  thumbnail: string;
  status: string;
  id: string;
}

export interface MovieData {
  nextPage: number | null;
  prevPage: number | null;
  limit: number;
  currentPage: number;
  foundItems: Movie[];
  totalCount: number;
}

export interface MovieBody {
  title: string;
  startTime?: string;
  description: string;
  movieRooms: string[];
  genre: string;
  ageRating: string;
  location: string;
  image: string;
  file?: File;
}

export interface MovieRoom {
  roomName: string;
  typeNumber: number;
  ticketPrice: number;
  quantity: number;
  ticketCurrency: string;
}

export interface MovieRoomResponse {
  roomName: string;
  typeNumber: number;
  ticketPrice: number;
  quantity: number;
  ticketCurrency: string;
  user: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export type Status = "DRAFT" | "PENDING" | "PAUSED" | "ONGOING" | "COMPLETED";
