import rocketLogo from '../../assets/rocket.svg'

import styles from './Header.module.css';

export const Header = () => {
  return <div className={styles.headerContainer}>
    <img src={rocketLogo} />
  </div>
}