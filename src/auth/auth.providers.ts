export const authProviders = [
  {
    provide: 'SECRET_KEY',
    useValue: process.env.SECRET_KEY,
  },
];
