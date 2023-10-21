import React from 'react';

import styles from './MessageUserList.module.scss';
import Image from 'next/image';
import Link from 'next/link';

function MessageUserList() {
  return (
    <ul className={styles.list}>
      <li className={styles['user']}>
        <Link href={''} className={styles.link}>
          <div className={styles['user-container']}>
            <Image
              src={'/user-profile-2.jpg'}
              height={100}
              width={100}
              alt="profile-picture"
              className={styles['profile-picture']}
            />
            <div className={styles.text}>
              <h2 className={styles.fullname}>Anna Merly</h2>
              <p className={styles.username}>@{'anna_mrl'}</p>
            </div>
          </div>

          <button className={styles.btn}>next</button>
        </Link>
      </li>
      <li className={styles['user']}>
        <Link href={''} className={styles.link}>
          <div className={styles['user-container']}>
            <Image
              src={'/user-profile-2.jpg'}
              height={100}
              width={100}
              alt="profile-picture"
              className={styles['profile-picture']}
            />
            <div className={styles.text}>
              <h2 className={styles.fullname}>Anna Merly</h2>
              <p className={styles.username}>@{'anna_mrl'}</p>
            </div>
          </div>

          <button className={styles.btn}>next</button>
        </Link>
      </li>
      <li className={styles['user']}>
        <Link href={''} className={styles.link}>
          <div className={styles['user-container']}>
            <Image
              src={'/user-profile-2.jpg'}
              height={100}
              width={100}
              alt="profile-picture"
              className={styles['profile-picture']}
            />
            <div className={styles.text}>
              <h2 className={styles.fullname}>Anna Merly</h2>
              <p className={styles.username}>@{'anna_mrl'}</p>
            </div>
          </div>

          <button className={styles.btn}>next</button>
        </Link>
      </li>
      <li className={styles['user']}>
        <Link href={''} className={styles.link}>
          <div className={styles['user-container']}>
            <Image
              src={'/user-profile-2.jpg'}
              height={100}
              width={100}
              alt="profile-picture"
              className={styles['profile-picture']}
            />
            <div className={styles.text}>
              <h2 className={styles.fullname}>Anna Merly</h2>
              <p className={styles.username}>@{'anna_mrl'}</p>
            </div>
          </div>

          <button className={styles.btn}>next</button>
        </Link>
      </li>
      <li className={styles['user']}>
        <Link href={''} className={styles.link}>
          <div className={styles['user-container']}>
            <Image
              src={'/user-profile-2.jpg'}
              height={100}
              width={100}
              alt="profile-picture"
              className={styles['profile-picture']}
            />
            <div className={styles.text}>
              <h2 className={styles.fullname}>Anna Merly</h2>
              <p className={styles.username}>@{'anna_mrl'}</p>
            </div>
          </div>

          <button className={styles.btn}>next</button>
        </Link>
      </li>
      <li className={styles['user']}>
        <Link href={''} className={styles.link}>
          <div className={styles['user-container']}>
            <Image
              src={'/user-profile-2.jpg'}
              height={100}
              width={100}
              alt="profile-picture"
              className={styles['profile-picture']}
            />
            <div className={styles.text}>
              <h2 className={styles.fullname}>Anna Merly</h2>
              <p className={styles.username}>@{'anna_mrl'}</p>
            </div>
          </div>

          <button className={styles.btn}>next</button>
        </Link>
      </li>
      <li className={styles['user']}>
        <Link href={''} className={styles.link}>
          <div className={styles['user-container']}>
            <Image
              src={'/user-profile-2.jpg'}
              height={100}
              width={100}
              alt="profile-picture"
              className={styles['profile-picture']}
            />
            <div className={styles.text}>
              <h2 className={styles.fullname}>Anna Merly</h2>
              <p className={styles.username}>@{'anna_mrl'}</p>
            </div>
          </div>

          <button className={styles.btn}>next</button>
        </Link>
      </li>
      <li className={styles['user']}>
        <Link href={''} className={styles.link}>
          <div className={styles['user-container']}>
            <Image
              src={'/user-profile-2.jpg'}
              height={100}
              width={100}
              alt="profile-picture"
              className={styles['profile-picture']}
            />
            <div className={styles.text}>
              <h2 className={styles.fullname}>Anna Merly</h2>
              <p className={styles.username}>@{'anna_mrl'}</p>
            </div>
          </div>

          <button className={styles.btn}>next</button>
        </Link>
      </li>
      <li className={styles['user']}>
        <Link href={''} className={styles.link}>
          <div className={styles['user-container']}>
            <Image
              src={'/user-profile-2.jpg'}
              height={100}
              width={100}
              alt="profile-picture"
              className={styles['profile-picture']}
            />
            <div className={styles.text}>
              <h2 className={styles.fullname}>Anna Merly</h2>
              <p className={styles.username}>@{'anna_mrl'}</p>
            </div>
          </div>

          <button className={styles.btn}>next</button>
        </Link>
      </li>
      <li className={styles['user']}>
        <Link href={''} className={styles.link}>
          <div className={styles['user-container']}>
            <Image
              src={'/user-profile-2.jpg'}
              height={100}
              width={100}
              alt="profile-picture"
              className={styles['profile-picture']}
            />
            <div className={styles.text}>
              <h2 className={styles.fullname}>Anna Merly</h2>
              <p className={styles.username}>@{'anna_mrl'}</p>
            </div>
          </div>

          <button className={styles.btn}>next</button>
        </Link>
      </li>
    </ul>
  );
}

export default MessageUserList;
