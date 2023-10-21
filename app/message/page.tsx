'use client';

import { useState } from 'react';

import styles from './page.module.scss';
import ChatBubbles from '../components/ui/ChatBubbles';
import NewMessage from '../components/message/NewMessage/NewMessage';

function Page() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  return (
    <div className={styles.message}>
      <div className={styles.container}>
        <ChatBubbles className={styles.icon} />
        <h1 className={styles.heading}>Select a message</h1>
        <p className={styles.text}>
          Choose from your existing conversations or start a new one
        </p>
        <button className={styles.btn} onClick={() => setMenuIsOpen(true)}>
          New message
        </button>
      </div>
      <NewMessage
        menuIsOpen={menuIsOpen}
        closeMenu={() => setMenuIsOpen(false)}
      />
    </div>
  );
}

export default Page;
