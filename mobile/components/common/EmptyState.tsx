import { Text, View } from 'react-native';
import { colors } from '../../constants/theme';

interface Props {
  title?: string;
  message?: string;
}

export function EmptyState({ title = 'No data', message }: Props) {
  return (
    <View style={{ alignItems: 'center', padding: 24 }}>
      <Text style={{ fontSize: 16, fontWeight: '600', color: colors.text }}>{title}</Text>
      {message ? <Text style={{ color: colors.muted, marginTop: 4, textAlign: 'center' }}>{message}</Text> : null}
    </View>
  );
}
