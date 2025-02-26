export const defaultProject = [
  {
    projectName: 'Project One',
    description: `Welcome to hannah's lab, this is your first Project.`,
    backgroundImage:
      'https://cdn.pixabay.com/photo/2023/04/13/17/08/forest-7922999_1280.jpg',
    iconColor: '#f7653d',
    items: [
      {
        itemName: 'Create a new project',
        completed: false,
        dueDate: '2025-02-23',
        tasks: [
          {
            taskName: 'Go to navbar',
            completed: false,
          },
          {
            taskName: 'create new project',
            completed: false,
          },
        ],
      },
    ],
  },
];

export const defaultStickyNotes = [
  {
    stickyNoteTitle: 'Sticky one',
    stickyNoteText: 'Research Paper Publication',
    stickyNoteColor: '#FFB3B3',
  },
  {
    stickyNoteTitle: 'Sticky notes rule',
    stickyNoteText:
      'this is a testing text that would help me find a cure for cancer.\nAnd This is a new line.',
    stickyNoteColor: '#B3FFF7',
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
