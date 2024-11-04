export interface EventTicketBody {
  isMovie: boolean;
  event: TicketEventPayload;
  ticketPayload: EventTicketBodyPayload[];
}
export interface MovieTicketBody {
  isMovie: boolean;
  movie: TicketMoviePayload;
  ticketPayload: MovieTicketBodyPayload[];
}

export interface TicketMoviePayload {
  title: string;
  ageRating: string;
  genre: string;
  description: string;
  location: string;
  startTime: Date;
  image: string;
}

export interface TicketEventPayload {
  title: string;
  ageRating?: string;
  genre?: string;
  description: string;
  location: string;
  startTime?: Date;
  image: string;
  maxPurchasePerUser?: number;
  organizerName?: string;
  type?: string;
  salesEndDate?: Date;
  salesStartDate?: Date;
  category?: string;
}

export interface EventTicketBodyPayload {
  name: string;
  ticketPrice: number;
  quantity: number;
  ticketType: string;
}

export interface MovieTicketBodyPayload {
  typeNumber: number;
  ticketPrice: number;
  quantity: number;
  name: string;
  ticketType: string;
}

export interface TicketResponse {
  typeNumber: number;
  ticketPrice: number;
  quantity: number;
  name: string;
  ticketSold: number;
  ticketReserved: number;
  createdBy: string;
  ticket: string;
  status: string;
  ticketType: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface TicketEventData {
  nextPage: number | null;
  prevPage: number | null;
  limit: number;
  currentPage: number;
  foundItems: TicketEvents[];
  totalCount: number;
}

export interface MovieEventData {
  nextPage: number | null;
  prevPage: number | null;
  limit: number;
  currentPage: number;
  foundItems: MovieEvents[];
  totalCount: number;
}

export interface TicketEvents {
  typeNumber: number;
  ticketPrice: number;
  quantity: number;
  name: string;
  ticketSold: number;
  ticketReserved: number;
  createdBy: string;
  ticket: TicketEvent;
  status: string;
  ticketType: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface MovieEvents {
  typeNumber: number;
  ticketPrice: number;
  quantity: number;
  name: string;
  ticketSold: number;
  ticketReserved: number;
  createdBy: string;
  ticket: MovieEvent;
  status: string;
  ticketType: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface TicketEvent {
  title: string;
  startTime: Date;
  salesStartDate: Date;
  salesEndDate: Date;
  category: string;
  type: string;
  image: string;
  description: string;
  location: string;
  maxPurchasePerUser: number;
  organizerName: string;
  uniqueCode: string;
  status: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface MovieEvent {
  title: string;
  startTime: Date;
  createdBy: string;
  description: string;
  venue: string[];
  genre: string;
  ageRating: string;
  location: string;
  image: string;
  uniqueCode: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  id: string;
  organizerName?: string;
}
