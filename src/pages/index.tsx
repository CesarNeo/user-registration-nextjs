import Link from 'next/link';

import styles from '../styles/home.module.scss';

export default function Home() {
  return (
    <main className={styles.homeContainer}>
      <div className={styles.homeContent}>
        <div className={styles.homeContentLeft}>
          <h1>Cadastre novos clientes e gerencie</h1>
          <Link href="/register" >
            <button>Cadastrar novos clientes</button>
          </Link>
        </div>
        <div className={styles.homeContentRight}>
          <img src="/images/image-home.svg" alt="" />
        </div>
      </div>
    </main>
  )
}
