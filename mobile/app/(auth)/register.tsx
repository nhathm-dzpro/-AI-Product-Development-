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

const schema = z
  .object({
    name: z.string().min(2, 'Min 2 characters'),
    email: z.string().email('Invalid email'),
    password: z.string().min(6, 'Min 6 characters'),
    confirm: z.string().min(6, 'Min 6 characters'),
  })
  .refine((v) => v.password === v.confirm, { message: 'Passwords do not match', path: ['confirm'] });

type Form = z.infer<typeof schema>;

export default function Register() {
  const { signUp, isLoading } = useAuth();
  const { control, handleSubmit } = useForm<Form>({
    resolver: zodResolver(schema),
    defaultValues: { name: '', email: '', password: '', confirm: '' },
  });

  const onSubmit = async (v: Form) => {
    await signUp(v.name, v.email, v.password);
    router.replace('/(tabs)');
  };

  return (
    <ScreenContainer>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ padding: 20, flexGrow: 1, justifyContent: 'center' }}>
          <Text style={{ fontSize: 28, fontWeight: '800', color: colors.text }}>Create account</Text>
          <Text style={{ color: colors.muted, marginTop: 4, marginBottom: 20 }}>Join ALNrestaurant</Text>
          <Card>
            <View style={{ gap: 12 }}>
              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, value }, fieldState }) => (
                  <Input label="Name" value={value} onChangeText={onChange} errorText={fieldState.error?.message} />
                )}
              />
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
              <Controller
                control={control}
                name="confirm"
                render={({ field: { onChange, value }, fieldState }) => (
                  <Input
                    label="Confirm Password"
                    secureTextEntry
                    value={value}
                    onChangeText={onChange}
                    errorText={fieldState.error?.message}
                  />
                )}
              />
              <Button loading={isLoading} onPress={handleSubmit(onSubmit)}>
                Create Account
              </Button>
            </View>
          </Card>
          <Link href="/(auth)/login" style={{ textAlign: 'center', marginTop: 16, color: colors.primary }}>
            Back to login
          </Link>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}
