import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import axios from '../../api/axios';

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState();

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('api/users');
  return response.data.userList;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, usersAdapter.setAll);
  },
});

export default usersSlice.reducer;

export const { selectAll: selectAllUsers, selectById: selectUserById } =
  usersAdapter.getSelectors((state) => state.users);
