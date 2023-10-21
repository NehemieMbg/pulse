export enum ErrorMsg {
  NOT_CONNECTED = 'You must be connected to use PULSE',

  ERROR = 'Something went wrong',
  NAME_ERROR = 'Your name could not been updated',
  USERNAME_ERROR = 'Your username could not been updated',
  BIO_ERROR = 'Your bio could not been updated',
  BIO_LENGTH_ERROR = 'Your bio length is too long',
  LOCATION_ERROR = 'Your location could not been updated',
  LINK_ERROR = 'Your link could not been updated',
  EMAIL_ERROR = 'Your email could not be updated',

  CITY_EMPTY = 'Please enter your location',
  BIO_EMPTY = 'Please enter a bio',
  USERNAME_EMPTY = 'Please enter your new username',
  NAME_EMPTY = 'Please enter your name',
  LINK_EMPTY = 'Please provide a link',
  EMAIL_EMPTY = 'Please enter your email address',

  WRONG_EMAIL = 'Please enter a valide email address',

  EMAIL_TAKEN = `This email has already been taken`,

  PASSWORD_DO_NOT_MATCH = 'The passwords do not match',
  PASSWORD_INVALID = 'You have enterd an invalid password',
  PASSWORD_MISSING = 'Please enter your password',
  NEW_PASSWORD_MISSING = 'Please enter a new password',
  CONFIRM_PASSWORD_MISSING = 'Please confirm you new password',
  PASSWORD_ERROR = 'Your password could not be updated.',
}

export enum Reset {}
