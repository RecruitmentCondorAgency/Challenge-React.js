import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Button from '../components/Button';
import Input from '../components/Input';
import Layout from '../components/Layout';

import services from '../services';
import { User } from '../types';
import { actions, useStore } from '../store';
import { useDispatch } from 'react-redux';

interface Props {
  type: 'login' | 'register';
}

const SignIn: React.FC<Props> = ({type}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useStore(state => state.auth);
  const [error, setError] = useState<string>('');
  const [disabled, setDisabled] = useState(false);
  const [user, setUser] = useState<Omit<User, 'id'>>({
    email: "",
    password: "",
    universities: [],
  });

  useEffect(() => {
    // check auth on load, redirect if is already logged
    if (auth) navigate('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setDisabled(false);
    setError('');
  }, [type]);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
    const { name, value } = e.target;
    setUser({...user, [name]: value});
  };
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault();
    setDisabled(true);
    setError('');
    try {
      const logged = await services[type](user);
      await dispatch(actions.login(logged));
      navigate('/');
    } catch (e: unknown) {
      if (e instanceof Error) setError(e.message);
    } finally {
      setDisabled(false);
    }
  };

  return (
    <Layout className="flex flex-col gap-3 items-center justify-center">
      <div className="border rounded shadow-lg p-3 w-96">
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <Input label="Email" name="email" type="email" value={user.email} onChange={handleChange} required autoFocus />
          <Input label="Password" name="password" type="password" value={user.password} onChange={handleChange} required />
          <Button color="primary" icon="arrowRight" loading={disabled}>
            <span className="capitalize">{type}</span>
          </Button>
          {error && <div className="text-rose-600 text-center">{error}</div>}
        </form>
      </div>
      {type === 'login' ? <span>
        You need an account?
        <Link to="/register" className="pl-1 text-primary">Register</Link>
      </span> : <span>
        You have an account?
        <Link to="/login" className="pl-1 text-primary">Login</Link>
      </span>}
    </Layout>
  );
};

export default SignIn;
