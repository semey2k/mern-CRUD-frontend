import * as React from 'react';

import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchRemoveUsers,
  fetchBlockUsers,
  fetchUsers,
  fetchUnblockUsers,
} from '../../redux/slices/user';
import { selectIsAuth, authMe, logout } from '../../redux/slices/auth';
import { Navigate } from 'react-router-dom';

import Button from '@mui/material/Button';
import BlockIcon from '@mui/icons-material/Block';
import IconButton from '@mui/material/IconButton';
import OfflinePinIcon from '@mui/icons-material/OfflinePin';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import styles from './Table.module.scss';

const columns = [
  { field: '_id', headerName: 'ID', width: 200 },
  { field: 'fullName', headerName: 'Full name', width: 200 },
  { field: 'email', headerName: 'Email', width: 200 },
  {
    field: 'Created',
    headerName: 'Created',
    width: 200,
  },
  {
    field: 'LastLogin',
    headerName: 'LastLogin',
    width: 200,
  },
  {
    field: 'status',
    headerName: 'status',
    width: 100,
  },
];

export const Table = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  const isAuth = useSelector(selectIsAuth);
  const isAuthMe = useSelector(authMe);

  const onClickLogout = () => {
    if (window.confirm('Вы действительно хотите выйти?')) {
      dispatch(logout());
      window.localStorage.removeItem('token');
    }
  };

  const onClickRemove = () => {
    if (window.confirm('Вы действительно хотите удалить пользователя?')) {
      selectedRows.forEach((el) => dispatch(fetchRemoveUsers(el)));
      if (isAuth) {
        if (selectedRows.some((el) => el === isAuthMe._id)) {
          window.localStorage.removeItem('token');
        }
      }
    }
  };

  const onClickBlocked = () => {
    if (window.confirm('Вы действительно хотите заблокировать пользователя?')) {
      selectedRows.forEach((el) => dispatch(fetchBlockUsers(el)));
      if (isAuth) {
        if (selectedRows.some((el) => el === isAuthMe._id)) {
          window.localStorage.removeItem('token');
        }
      }
    }
  };

  const onClickUnBlocked = () => {
    if (window.confirm('Вы действительно хотите удалить пользователя?')) {
      selectedRows.forEach((el) => dispatch(fetchUnblockUsers(el)));
    }
  };

  React.useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const isUsersLoading = users.status === 'loading';

  const [selectedRows, setSelectedRows] = React.useState([]);

  if (!window.localStorage.getItem('token')) {
    return <Navigate to="/login" />;
  }

  return (
    <div style={{ height: 600, width: '100%' }}>
      <div className={styles.btns}>
      <div>
      <IconButton onClick={onClickRemove}>
        <DeleteForeverIcon />
      </IconButton>
      <IconButton onClick={onClickBlocked}>
        <BlockIcon />
      </IconButton>
      <IconButton onClick={onClickUnBlocked}>
        <OfflinePinIcon />
      </IconButton>
      </div>
      <Button onClick={onClickLogout} variant="contained" color="error">
        Выйти
      </Button>
      </div>

      <DataGrid
        rows={users.items}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        checkboxSelection
        loading={isUsersLoading}
        getRowId={(row) => row._id}
        onSelectionModelChange={(ids) => {
          const selectedRowsData = ids.map((id) => users.items.find((row) => row._id === id));
          setSelectedRows(selectedRowsData.map((el) => el._id));
        }}
      />
    </div>
  );
};
