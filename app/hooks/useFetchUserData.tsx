import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

function useFetchUserData(setUserData: any) {
  const latestChanges = useSelector(
    (state: { user: { latestChanges: Object } }) => state.user.latestChanges
  );

  // help avoid unnecessary multiple calls to the database
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('/api/user');
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }, [setUserData]);

  useEffect(() => {
    fetchData();
  }, [fetchData, latestChanges]);
}

export default useFetchUserData;

export function useGetUser(setUserData: any) {
  const latestChanges = useSelector(
    (state: { user: { latestChanges: Object } }) => state.user.latestChanges
  );

  // help avoid unnecessary multiple calls to the database
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('/api/users/get-user');
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }, [setUserData]);

  useEffect(() => {
    fetchData();
  }, [fetchData, latestChanges]);
}

export function useGetProfile(username: string, setUserData: any) {
  const latestChanges = useSelector(
    (state: { user: { latestChanges: Object } }) => state.user.latestChanges
  );

  // help avoid unnecessary multiple calls to the database
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`/api/users/${username}`);
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }, [setUserData, username]);

  useEffect(() => {
    fetchData();
  }, [fetchData, latestChanges]);
}

export function useGetSuggestion(setUserData: any) {
  const latestChanges = useSelector(
    (state: { user: { latestChanges: Object } }) => state.user.latestChanges
  );

  // help avoid unnecessary multiple calls to the database
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('/api/user/suggestions');
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }, [setUserData]);

  useEffect(() => {
    fetchData();
  }, [fetchData, latestChanges]);
}

export function useGetFollowing(setUserData: any) {
  const latestChanges = useSelector(
    (state: { user: { latestChanges: Object } }) => state.user.latestChanges
  );

  // help avoid unnecessary multiple calls to the database
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch('/api/posts/following');
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }, [setUserData]);

  useEffect(() => {
    fetchData();
  }, [fetchData, latestChanges]);
}

export function useGetComments(postId: string, setUserData: any) {
  const latestChanges = useSelector(
    (state: { user: { latestChanges: Object } }) => state.user.latestChanges
  );

  // help avoid unnecessary multiple calls to the database
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`/api/posts/${postId}/comments`);
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }, [setUserData, postId]);

  useEffect(() => {
    fetchData();
  }, [fetchData, latestChanges]);
}

export function useGetLikes(postId: string, setUserData: any) {
  const latestChanges = useSelector(
    (state: { user: { latestChanges: Object } }) => state.user.latestChanges
  );

  // help avoid unnecessary multiple calls to the database
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`/api/posts/${postId}/likes`);
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }, [setUserData, postId]);

  useEffect(() => {
    fetchData();
  }, [fetchData, latestChanges]);
}

export function useGetFollowers(username: string, setUserData: any) {
  const latestChanges = useSelector(
    (state: { user: { latestChanges: Object } }) => state.user.latestChanges
  );

  // help avoid unnecessary multiple calls to the database
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`/api/follow/${username}`);
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }, [setUserData, username]);

  useEffect(() => {
    fetchData();
  }, [fetchData, latestChanges]);
}

export function useGetNotifications(setNotification: any) {
  const latestChanges = useSelector(
    (state: { user: { latestChanges: Object } }) => state.user.latestChanges
  );

  // help avoid unnecessary multiple calls to the database
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`/api/user/notifications`);
      const data = await response.json();
      setNotification(data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }, [setNotification]);

  useEffect(() => {
    fetchData();
  }, [fetchData, latestChanges]);
}
