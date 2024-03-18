export interface Reservation {
  id: string;
  subject: string;
  modifiedDate: string;
  startDate: string;
  endDate: string;
  resources: [
    {
      id: string;
      type: string;
      code: string;
      parent: {
        id: string;
        type: string;
        code: string;
        name: string;
      };
    }
  ];
}

export interface ClassResponse {
  status: string;
  reservations: Reservation[];
}

export interface CourseResponse {
  status: string;
  message: string;
  reservations: Reservation[];
}
