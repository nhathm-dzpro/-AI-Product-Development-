import { Text, View } from 'react-native';
import { colors } from '../../constants/theme';

export function ErrorState({ message = 'Something went wrong' }: { message?: string }) {
  return (
    <View style={{ alignItems: 'center', padding: 24 }}>
      <Text style={{ color: colors.danger, fontWeight: '600' }}>{message}</Text>
    </View>
  );
}
