export interface NavigationType {
  navigationIsOpen: boolean;
  searchIsOpen: boolean;
  notificationsIsOpen: boolean;
  backdropIsOpen: boolean;
  outfitsIsOpen: boolean;
  newPostIsOpen: boolean;
  commentsIsOpen: boolean;
  filter: 'for_you' | 'following';
}
