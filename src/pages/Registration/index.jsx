import React from 'react';

import { useForm } from 'react-hook-form';
import { fetchRegister, selectIsAuth } from '../../redux/slices/auth';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';

import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import styles from './Registr.module.scss';

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
    mode: 'onChange'
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));

    if (!data.payload) {
      return alert('Не удалось создать аккаунт');
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  };

  if (isAuth && window.localStorage.getItem('token')) {
    return <Navigate to="/" />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register('fullName', { required: 'Укажите полное имя' })}
          className={styles.field}
          label="Полное имя"
          fullWidth
        />
        <TextField
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email', { required: 'Укажите почту' })}
          className={styles.field}
          type = 'email'
          label="E-Mail"
          fullWidth
        />
        <TextField
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register('password', { required: 'Укажите пароль' })}
          className={styles.field}
          type="password"
          label="Пароль"
          fullWidth
        />
        <Button disabled={!isValid} type='submit' size="large" variant="contained" fullWidth>
          Зарегистрироваться
        </Button>
      </form>
      <div className={styles.buttons}>
      <Link to="/login">
        <Button className = {styles.buttons} variant="outlined" size="large" fullWidth>Войти</Button>
      </Link>
      </div>
    </Paper>
  );
};
