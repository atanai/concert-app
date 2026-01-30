export const concerts = [
  {
    id: 1,
    name: 'Concert Name 1',
    description: 'Lorem ipsum dolor sit amet consectetur. Elit purus nam gravida porttitor nibh urna sit ornare a. Proin dolor morbi id ornare aenean non. Fusce dignissim turpis sed non est orci sed in. Blandit ut purus nunc sed donec commodo morbi diam scelerisque.',
    seats: 500,
    bookings: [
      {
        userId: 1,
        name: 'John Doe',
        bookedAt: '2026-01-30T10:30:00Z',
      },
      {
        userId: 2,
        name: 'Jane Smith',
        bookedAt: '2026-01-30T11:00:00Z',
      },
    ],

    cancellations: [
      {
        userId: 3,
        name: 'Mike Brown',
        canceledAt: '2026-01-30T12:15:00Z',
      },
      {
        userId: 4,
        name: 'Sarah Johnson',
        canceledAt: '2026-01-30T13:30:00Z',
      },
    ],
  },
  {
    id: 2,
    name: 'Concert Name 2',
    description: 'Lorem ipsum dolor sit amet consectetur. Elit purus nam gravida porttitor nibh urna sit ornare a.',
    seats: 200,
    booked: [],
    canceled: []
  },
];

export const history = [
  {
    id: 1,
    dateTime: '12/09/2024 15:00:00',
    username: 'Sara John',
    concertName: 'The festival Int 2024',
    action: 0, // cancel
  },
  {
    id: 2,
    dateTime: '12/09/2024 10:39:20',
    username: 'Sara John',
    concertName: 'The festival Int 2024',
    action: 1, // reserve
  },
];
