import { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import swal from 'sweetalert';
import Head from 'next/head';

import { api } from '../services/api';
import { getValidationErrors } from '../utils/getValidationErrors';
import { Input } from '../components/Input';

import styles from '../styles/register.module.scss';

interface RegisterFormData {
    name: string;
    email: string;
    address: string;
    fone: string;
}

export default function Register() {
    const formRef = useRef<FormHandles>(null);

    const handleSubmit = useCallback(async (data: RegisterFormData, { reset }) => {
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

            await api.post('/users', data);

            swal('Cadastrado', 'Cadastro feito com sucesso!');

            reset();
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const errors = getValidationErrors(error);
                formRef.current?.setErrors(errors);

                return;
            } else {
                swal('Erro no cadastro', 'Ocorreu um erro ao fazer o cadastro!');
            }
        }
    }, []);

    return (
        <>
            <Head>
                <title>Cadastro | userregistration</title>
            </Head>

            <main className={styles.registerContainer}>
                <div className={styles.registerContent}>
                    <h1>Cadastro</h1>
                    <Form ref={formRef} onSubmit={handleSubmit}>
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

                        <button type="submit">Cadastrar</button>
                    </Form>
                </div>
            </main>
        </>
    );
}