import { Link, router } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Card } from '../../components/ui/Card';
import { colors } from '../../constants/theme';

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Min 6 characters'),
});

type Form = z.infer<typeof schema>;

export default function Login() {
  const { signIn, isLoading } = useAuth();
  const { control, handleSubmit } = useForm<Form>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (v: Form) => {
    await signIn(v.email, v.password);
    router.replace('/(tabs)');
  };

  return (
    <ScreenContainer>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ padding: 20, flexGrow: 1, justifyContent: 'center' }}>
          <Text style={{ fontSize: 28, fontWeight: '800', color: colors.text }}>ALNrestaurant</Text>
          <Text style={{ color: colors.muted, marginTop: 4, marginBottom: 20 }}>Welcome back</Text>
          <Card>
            <View style={{ gap: 12 }}>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value }, fieldState }) => (
                  <Input
                    label="Email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    value={value}
                    onChangeText={onChange}
                    errorText={fieldState.error?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, value }, fieldState }) => (
                  <Input
                    label="Password"
                    secureTextEntry
                    value={value}
                    onChangeText={onChange}
                    errorText={fieldState.error?.message}
                  />
                )}
              />
              <Button loading={isLoading} onPress={handleSubmit(onSubmit)}>
                Login
              </Button>
            </View>
          </Card>
          <Link href="/(auth)/register" style={{ textAlign: 'center', marginTop: 16, color: colors.primary }}>
            Create account
          </Link>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}
