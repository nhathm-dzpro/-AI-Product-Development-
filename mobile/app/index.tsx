import { Redirect } from 'expo-router';
import { useAuth } from '../contexts/AuthContext';
import { Loading } from '../components/common/Loading';

export default function Index() {
  const { user, isLoading } = useAuth();
  if (isLoading) return <Loading />;
  return <Redirect href={user ? '/(tabs)' : '/(auth)/login'} />;
}
