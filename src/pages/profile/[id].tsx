import { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { MdKeyboardArrowLeft } from 'react-icons/md';
import Link from 'next/link';
import { useRouter } from 'next/router';
import swal from 'sweetalert';
import Head from 'next/head';

import { api } from '../../services/api';
import { getValidationErrors } from '../../utils/getValidationErrors';
import { Input } from '../../components/Input';
import { GetServerSideProps } from 'next';

import styles from '../../styles/profile.module.scss';

interface User {
    id: string;
    name: string;
    email: string;
    address: string;
    fone: string;
}

interface ProfileProps {
    user: User;
}

interface RegisterFormData {
    name: string;
    email: string;
    address: string;
    fone: string;
}

export default function Profile({ user }: ProfileProps) {
    const formRef = useRef<FormHandles>(null);
    const router = useRouter();

    const handleSubmit = useCallback(async (data: RegisterFormData) => {
        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                email: Yup.string()
                    .required('E-mail obrigatório')
                    .email('Digite um e-mail válido'),
                address: Yup.string().required('Endereço obrigatório'),
                fone: Yup.string().required('Telefone obrigatório')
            });

            await schema.validate(data, {
                abortEarly: false
            });

            await api.put(`/users/${user.id}`, data);

            swal('Atualizado', 'Alteração feita com sucesso!');

            router.back();
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const errors = getValidationErrors(error);
                formRef.current?.setErrors(errors);

                return;
            }

            swal('Erro na atualização', 'Ocorreu um erro ao atualizar, tente novamente!');
        }
    }, []);

    return (
        <>
            <Head>
                <title>Perfil | userregistration</title>
            </Head>

            <main className={styles.profileContainer}>
                <Link href="/listUsers">
                    <button type="button">
                        <MdKeyboardArrowLeft size={48} />
                    </button>
                </Link>

                <div className={styles.profileContent}>

                    <h1>Perfil <span>{user.name}</span></h1>

                    <Form
                        ref={formRef}
                        onSubmit={handleSubmit}
                        initialData={{
                            name: user.name,
                            email: user.email,
                            address: user.address,
                            fone: user.fone
                        }}
                    >
                        <Input
                            type="text"
                            name="name"
                            placeholder="Nome"
                        />
                        <Input
                            type="email"
                            name="email"
                            placeholder="E-mail"
                        />
                        <Input
                            type="text"
                            name="address"
                            placeholder="Digite seu endereço"
                        />
                        <Input
                            type="text"
                            name="fone"
                            placeholder="(11) 99999-9999"
                        />

                        <button type="submit">
                            Confirmar mudanças
                        </button>
                    </Form>
                </div>
            </main>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params;
    const { data } = await api.get(`/users/${id}`);

    const user = {
        id: data.id,
        name: data.name,
        email: data.email,
        address: data.address,
        fone: data.fone
    };

    return {
        props: {
            user
        }
    }
}

