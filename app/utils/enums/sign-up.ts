export enum FormSection {
  FIRST_SECTION = 'FIRST_SECTION',
  SECOND_SECTION = 'SECOND_SECTION',
}

export enum NewUser {
  INPUTS_REQUIRED = 'All fields must be provided.',
  EMAIL_EXIT = 'Email has already been taken.',
  USER_DONT_EXIT = 'User does not exist',
  USERNAME_EXIT = 'Username has already been taken.',
  PASSWORD_DONT_MATCH = 'The passwords do not match.',
  NAME_IS_MISSING = "What's your name?",
  WRONG_CREDENTIALS = 'Incorrect email or password',
  EMAIL_IS_MISSING = "What's your email address?",
  PASSWORD_IS_MISSING = "Wath's your password?",
  USERNAME_EMPTY_SPACE = 'Usernanme cannot have an empty space',
  USERNAME_INVALID = 'Invalid username. It should start with a letter, be 3 to 30 characters long, and contain only letters, numbers, and underscores. No spaces or special characters allowed.',
}
