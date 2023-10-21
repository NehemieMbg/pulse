import React from 'react';

import styles from './Footer.module.scss';
import Terms from './Terms/Terms';
import TrendsBody from './TrendsBody/TrendsBody';
import Trends from './Trends/Trends';

function Footer() {
  return (
    <div>
      <div className={styles['footer-container']}>
        <TrendsBody title={'Friend Suggestions'}>
          <Trends />
        </TrendsBody>

        <Terms />
      </div>
    </div>
  );
}

export default Footer;
