import React, { useState } from 'react';
import { IoLockClosed } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../../features/auth/authSlice';
import { HttpState, selectHttp, setServer } from '../../features/http/httpSlice';
import makeAxios from '../../helper/makeAxios';

const Connect = () => {
  const dispatch = useDispatch();
  const httpState: HttpState = useSelector(selectHttp);
  const Axios = makeAxios();

  const [form, setForm] = useState({
    email: '',
    password: '',
    server: '',
  });

  const handleForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = event.target;
    setForm({ ...form, [name]: value });
    if (String(name) === 'server') {
      dispatch(setServer({ server: String(value) }));
    }
  }

  const handleSumbmit = async () => {
    const request = Axios.post('/sanctum/token',
      { email: form.email, password: form.password, device_name: 'test' },
    );
    try {
      const response = await request;
      dispatch(setToken({ token: String(response.data) }));
      console.log({ response });
    } catch (error) {
      console.log(error);;
    }
  }

  return (
    <div className={"flex items-center justify-center w-full min-h-screen bg-gray-100"}>
      <div className={"w-5/12 h-auto p-8 bg-white border rounded-md shadow-sm"}>
        <div className={"flex flex-col"}>
          <div className={"flex flex-row items-center self-center justify-center text-blue-900"}>
            <IoLockClosed size={64} />
            <h1 className={"ml-4 font-mono text-4xl"}>Login</h1>
          </div>
          <input name={"email"} onChange={handleForm} className={"h-12 mt-4 text-center border outline-none"} type="text" placeholder={"email"} />
          <input name={"password"} onChange={handleForm} className={"h-12 mt-4 text-center border outline-none"} type="text" placeholder={"password"} />
          <h1 className={"mt-4 font-mono text-gray-800"}>Server Config:</h1>
          <input value={httpState.server} name={"server"} onChange={handleForm} className={"h-12 mt-4 text-center border outline-none"} type="text" placeholder={"server"} />
          <button onClick={handleSumbmit} className={"self-center w-4/12 h-10 mt-4 text-center text-white bg-green-600 shadow-sm outline-none"}>Login</button>
        </div>
      </div>
    </div>
  )
}

export default Connect
