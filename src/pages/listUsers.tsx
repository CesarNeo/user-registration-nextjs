import { useEffect, useState, useCallback } from 'react';
import { MdHighlightOff, MdCreate } from 'react-icons/md';
import Link from 'next/link';
import Head from 'next/head';

import { api } from '../services/api';

import styles from '../styles/listUsers.module.scss';

interface User {
    id: string;
    name: string;
    email: string;
    address: string;
    fone: string;
}

export default function ListUsers() {
    const [users, setUsers] = useState<User[]>([]);

    const handleDelete = useCallback((id) => {
        api.delete(`/users/${id}`);
    }, []);

    const hasUsers = users.length === 0;

    useEffect(() => {
        api.get('/users')
            .then(response => setUsers(response.data));
    }, [users]);

    return (
        <>
            <Head>
                <title>Gerenciar | userregistration</title>
            </Head>

            <main className={styles.listUsersContainer}>
                <div className={styles.listUsersContent}>
                    <h1>Todos os clientes</h1>

                    <table cellSpacing={0}>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Endereço</th>
                                <th>Telefone</th>
                                <th>Editar</th>
                                <th>Excluir</th>
                            </tr>
                        </thead>
                    </table>

                    {!hasUsers ? (users.map(user => (
                        <div className={styles.listUser} key={user.id}>
                            <div>
                                <span>{user.name}</span>
                            </div>
                            <div>
                                <span>{user.email}</span>
                            </div>
                            <div>
                                <span>{user.address}</span>
                            </div>
                            <div>
                                <span>{user.fone}</span>
                            </div>
                            <Link href={`/profile/${user.id}`}>
                                <button type="button">
                                    <MdCreate color="2D9CDB" size={34} />
                                </button>
                            </Link>
                            <button type="button" onClick={() => handleDelete(user.id)}>
                                <MdHighlightOff color="e85d04" size={34} />
                            </button>
                        </div>
                    ))) : (
                        <div className={styles.listUsersEmpty}>
                            <h2>
                                Não existe clientes cadastrados <br />
                                Cadastre novos clientes para ver a lista de clientes
                            </h2>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}