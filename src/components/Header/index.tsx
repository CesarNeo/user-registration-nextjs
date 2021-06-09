import { ActiveLink } from '../ActiveLink';

import styles from './styles.module.scss';

export function Header() {
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <img src="/images/Logo.svg" alt="user registration" />

                <nav>
                    <ActiveLink activeClassName={styles.active} href="/">
                        <a>Início</a>
                    </ActiveLink>
                    <ActiveLink activeClassName={styles.active} href="/register">
                        <a>Cadastro de clientes</a>
                    </ActiveLink>
                    <ActiveLink activeClassName={styles.active} href="/listUsers">
                        <a>Gerenciar</a>
                    </ActiveLink>
                </nav>
            </div>
        </header>
    );
}