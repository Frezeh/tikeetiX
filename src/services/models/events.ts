export interface EventBody {
  title: string;
  salesStartDate: Date;
  salesEndDate: Date;
  startTime: Date;
  category: string;
  type: string;
  description: string;
  image: string;
  location: string;
  eventLevels: string[];
  maxPurchasePerUser: number;
  organizerName: string;
  //file: string;
}

export interface Events {
  _id: string;
  title: string;
  salesStartDate: Date;
  salesEndDate: Date;
  startTime: Date;
  category: string;
  type: string;
  description: string;
  image: string;
  location: string;
  paymentType: string;
  eventLevels: string[];
  maxPurchasePerUser: number;
  organizerName: string;
  uniqueCode: string;
  status: string;
  createdBy: string;
  tickets: Ticket[];
}

export interface EventsData {
  nextPage: number | null;
  prevPage: number | null;
  limit: number;
  currentPage: number;
  foundItems: Events[];
  totalCount: number;
}

export interface TEventLevelBody {
  category: string;
  ticketPrice: number;
  quantity: number;
  ticketCurrency: string;
}

export interface TEventLevel {
  id: string;
  category: string;
  ticketPrice: number;
  quantity: number;
  ticketCurrency: string;
  createdBy: string;
}

export interface EventDetails {
  event: {
    title: string;
    startTime: Date;
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
    tickets: Ticket[];
  };
}

export interface Ticket {
  id: string;
  ticketPrice: number;
  quantity: number;
  name: string;
  ticketSold: number;
  ticketReserved: number;
  createdBy: string;
  activity: string;
  status: string;
  activityType: string;
  createdAt: Date;
  updatedAt: Date;
}
