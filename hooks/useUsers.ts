import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

interface Geo {
  lat: string;
  lng: string;
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

async function getUsers(): Promise<User[]> {
  const params = new URLSearchParams();

  if (1 == 1) {
    params.append('site', 'mx');
  }

  return axios
    .get('https://jsonplaceholder.typicode.com/users', { params })
    .then(({ data }) => data);
}

async function getPosts(): Promise<Post[]> {
  return axios
    .get('https://jsonplaceholder.typicode.com/posts')
    .then(({ data }) => data);
}

export const useUsers = () => {
  const usersQuery = useQuery(['users'], getUsers, {
    //refetchOnWindowFocus: false,
  });

  const postsQuery = useQuery(['posts'], getPosts, {
    enabled: !!usersQuery.data,
  });
  return { usersQuery, postsQuery };
};

export default useUsers;
