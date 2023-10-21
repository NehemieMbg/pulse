import UserProfileTwo from '@/app/components/User/UserProfile-2/UserProfileTwo';
import styles from './Likes.module.scss';
import CloseComponent from '@/app/components/ui/CloseComponent/CloseComponent';
import useClickOutside from '@/app/hooks/useClickOutside';
import { useRef, useEffect } from 'react';
import { UserLikes } from '@/app/types/posts-type';

function Likes(props: {
  sectionIsOpen: boolean;
  closeSectionHandler: () => void;
  userLikes: UserLikes[];
}) {
  const { sectionIsOpen, closeSectionHandler, userLikes } = props;
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (sectionIsOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
  }, [sectionIsOpen]);

  // Close the section when clicked outside the ref
  useClickOutside(menuRef, () => closeSectionHandler());

  return (
    <div
      className={
        sectionIsOpen ? `${styles['likes-container']}` : `${styles.hidden}`
      }
    >
      <div className={styles.likes} ref={menuRef}>
        <div className={styles['top-container']}>
          <CloseComponent closeSection={closeSectionHandler} />
          <h2 className={styles.heading}>Likes</h2>
        </div>

        <ul className={styles['user-like-container']}>
          {userLikes?.map((user) => (
            <li className={styles['user-like']} key={user.id}>
              <UserProfileTwo user={user.author} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Likes;
