import { AxiosPromise, AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AuthState, selectAuth, setToken } from '../../features/auth/authSlice';
import { HttpState, selectHttp, setServer } from '../../features/http/httpSlice';
import makeAxios from '../../helper/makeAxios';

const Connect = () => {
  const dispatch = useDispatch();
  const httpState: HttpState = useSelector(selectHttp);
  const authState: AuthState = useSelector(selectAuth);
  const Axios = makeAxios();

  const [form, setForm] = useState({
    email: '',
    password: '',
    server: '',
  });

  useEffect(() => {
    // console.log("http:state", httpState.server);
    // console.log("http:csrf", httpState.CSRF_TOKEN);
    console.log(authState.token);
  }, [authState])


  const handleForm = (event: any, name: string) => {
    const { text } = event.nativeEvent;
    setForm({ ...form, [name]: text });
    if (String(name) === 'server') {
      dispatch(setServer({ server: String(text) }));
    }
  }

  const handleSumbmit = async () => {
    const request: AxiosPromise = Axios.post('/api/sanctum/token',
      { email: form.email, password: form.password, device_name: 'test' },
    );
    try {
      const response: AxiosResponse = await request;
      dispatch(setToken({ token: String(response.data) }));
      console.log(response.data);
    } catch (error: any) {
      console.log(error);
    }
  }

  const handleTestAuth = async () => {
    const request: AxiosPromise = Axios.get('/api/test_token/');
    try {
      const response: AxiosResponse = await request;
      console.log(response.data);
    } catch (error: any) {
      console.log({ error });
    }
  }

  return (
    <View>
      <TextInput
        value={form.email}
        placeholder={"email"}
        onChange={(event: any) => handleForm(event, 'email')}
      />
      <TextInput
        value={form.password}
        placeholder={"password"}
        onChange={(event: any) => handleForm(event, 'password')}
        secureTextEntry={true}
      />
      <TextInput
        value={httpState.server}
        placeholder={"server"}
        onChange={(event: any) => handleForm(event, 'server')}
      />
      <Button
        title={'Login'}
        onPress={handleSumbmit}
      />
      <Button
        title={'test auth'}
        onPress={handleTestAuth}
      />
    </View>
  )
}

export default Connect;