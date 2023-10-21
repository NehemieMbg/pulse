import { createSlice } from '@reduxjs/toolkit';
import { NavigationType } from '@/app/types/navigation-type';

const initialState: NavigationType = {
  navigationIsOpen: false,
  searchIsOpen: false,
  notificationsIsOpen: false,
  backdropIsOpen: false,
  outfitsIsOpen: false,
  commentsIsOpen: false,
  newPostIsOpen: false,
  filter: 'for_you',
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    // Navigation Bar
    openNavigation: (state) => {
      state.navigationIsOpen = true;
    },
    closeNavigation: (state) => {
      state.navigationIsOpen = false;
    },
    // Search bar
    openSearch: (state) => {
      state.searchIsOpen = true;
    },
    closeSearch: (state) => {
      state.searchIsOpen = false;
    },
    // Notifications
    openNotifications: (state) => {
      state.notificationsIsOpen = true;
    },
    closeNotifications: (state) => {
      state.notificationsIsOpen = false;
    },
    // Backdrop
    openBackdrop: (state) => {
      state.backdropIsOpen = true;
    },
    closeBackdrop: (state) => {
      state.backdropIsOpen = false;
      state.commentsIsOpen = false;
    },
    // For the user to get Outfits Links
    openOutfits: (state) => {
      state.outfitsIsOpen = true;
    },
    closeOutfits: (state) => {
      state.outfitsIsOpen = false;
    },
    // For the comment section of a post
    openComments: (state) => {
      state.commentsIsOpen = true;
      state.backdropIsOpen = true;
    },
    closeComments: (state) => {
      state.commentsIsOpen = false;
      state.backdropIsOpen = false;
    },
    // For the new Posts
    openNewPost: (state) => {
      state.newPostIsOpen = true;
    },
    closeNewPost: (state) => {
      state.newPostIsOpen = false;
    },
    setFilterForYou: (state) => {
      state.filter = 'for_you';
    },
    setFilterFollowing: (state) => {
      state.filter = 'following';
    },
  },
});

export const {
  openNavigation,
  closeNavigation,
  openSearch,
  closeSearch,
  openNotifications,
  closeNotifications,
  openBackdrop,
  closeBackdrop,
  openOutfits,
  closeOutfits,
  openComments,
  closeComments,
  openNewPost,
  closeNewPost,
  setFilterForYou,
  setFilterFollowing,
} = navigationSlice.actions;

export default navigationSlice.reducer;
