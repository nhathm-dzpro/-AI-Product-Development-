import { Text, View } from 'react-native';
import { colors } from '../../constants/theme';

interface Props {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}

export function Header({ title, subtitle, right }: Props) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
      }}
    >
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 22, fontWeight: '700', color: colors.text }}>{title}</Text>
        {subtitle ? <Text style={{ color: colors.muted, marginTop: 2 }}>{subtitle}</Text> : null}
      </View>
      {right}
    </View>
  );
}
