'use client';

import { closeBackdrop } from '@/app/store/slices/navigation-slice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationType } from '@/app/types/navigation-type';

import styles from './Backdrop.module.scss';

function Backdrop() {
  const dispatch = useDispatch();

  const { backdropIsOpen: backdrop } = useSelector(
    (state: { navigation: NavigationType }) => state.navigation
  );

  useEffect(() => {
    if (backdrop) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
  }, [backdrop]);

  function closeBackdropHandler() {
    dispatch(closeBackdrop());
  }

  return (
    <>
      <div
        onClick={closeBackdropHandler}
        className={`${styles.backdrop} ${!backdrop ? `${styles.hidden}` : ''}`}
      ></div>
    </>
  );
}

export default Backdrop;
