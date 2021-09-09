import React, {createContext, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Auth, AuthContextValue, User} from '../model/Auth';
import {createJwt} from '../util/jwt';
import {validate as passwordValidate} from '../util/password';
import {JWT_KEY, USERS_KEY} from '../constant/Auth';

// @ts-ignore
const AuthContext = createContext<AuthContextValue>();

function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({children}: Props) {
  const [users, setUsers] = useState<Auth[]>([]);
  const [authInstance, setAuthInstance] = useState<Auth | null>(null);

  useEffect(() => {
    AsyncStorage.getItem(USERS_KEY).then(usersStr => {
      if (usersStr) {
        let usersStrV: Auth[] = JSON.parse(usersStr);
        setUsers(usersStrV);
        AsyncStorage.getItem(JWT_KEY).then(token => {
          if (token) {
            loginUserWithToken(token, usersStrV).catch();
          }
        });
      }
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
  }, [users]);

  const signup = (user: string, pass: string) =>
      new Promise<Auth>((resolve, reject) => {
        if (user.length < 1 && pass.length < 1) {
          reject('Username and Password are required!');
        }
        if (!passwordValidate(pass)) {
          reject('Password must be 8-12 chars');
        }
        let userData: User = {username: user, password: pass};
        createJwt(userData).then((token: string) => {
          let auth: Auth | undefined = users.find(
            (x: Auth) => x.username === user,
          );
          if (auth) {
            reject('Username already exists');
          }
          auth = {
            username: user,
            jwt: token,
            createdAt: new Date(),
            loggedInAt: new Date(),
          };

          AsyncStorage.setItem(JWT_KEY, token.toString()).then(() => {
            setAuthInstance(auth as Auth);
            users.push(auth as Auth);
            setUsers(prevState => [...prevState, auth as Auth]);
            resolve(auth);
          });
        });
      }),
    loginUser = (user: string, pass: string) =>
      new Promise<Auth>((resolve, reject) => {
        if (user.length < 1 && pass.length < 1) {
          reject('Username and Password are required!');
        }
        if (!passwordValidate(pass)) {
          reject('Password must be 8-12 chars');
        }
        let userData: User = {username: user, password: pass};
        createJwt(userData).then(token => {
          let auth: Auth | undefined = users.find((x: Auth) => x.jwt === token);
          if (auth !== undefined && auth !== null) {
            auth.loggedInAt = new Date();
            AsyncStorage.setItem(JWT_KEY, token).then(() => {
              if (auth) {
                setAuthInstance(auth);
                resolve(auth);
              }
            });
          } else {
            reject('Username or Password does not match!');
          }
        });
      }),
    loginUserWithToken = (token: string, usersV: Auth[]) =>
      new Promise((resolve, reject) => {
        let auth: Auth | undefined = usersV.find((x: Auth) => {
          return x.jwt === token;
        });
        if (auth !== undefined && auth !== null) {
          auth.loggedInAt = new Date();
          setAuthInstance(auth);
          resolve(auth);
        } else {
          reject('Token not found, Login again!');
        }
      }),
    logoutUser = () => {
      AsyncStorage.removeItem(JWT_KEY).then(() => {
        setAuthInstance(null);
      });
    };

  const value: AuthContextValue = {
    auth: authInstance,
    signup,
    loginUser,
    logoutUser,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

interface Props {
  children: React.ReactNode;
}

export {useAuth, AuthProvider};
