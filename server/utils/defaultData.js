export const defaultProject = [
  {
    projectName: 'Project One',
    description: `Welcome to hannah's lab, this is your first Project.`,
    tasks: [
      { taskName: 'Task 1', completed: true },
      { taskName: 'Task 2', completed: false },
      { taskName: 'Task 3', completed: false },
    ],
  },
];

export const devMockUser = [
  {
    name: 'John Doe',
    Username: 'johnDoe123',
    email: 'johndoe@example.com',
    profilePicture: 'https://example.com/johndoe.jpg',
    oauthProvider: 'google',
    oauthId: 'google_oauth_123456',
    accessToken: 'access_token_example',
    verificationToken: 'verification_token_example',
    lastLogin: new Date(),
    projects: [],
  },
];
