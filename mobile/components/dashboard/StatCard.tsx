import { Text, View } from 'react-native';
import { Card } from '../ui/Card';
import { colors } from '../../constants/theme';

interface Props {
  label: string;
  value: string;
}

export function StatCard({ label, value }: Props) {
  return (
    <Card style={{ flex: 1, minWidth: 150 }}>
      <View>
        <Text style={{ color: colors.muted, fontSize: 13 }}>{label}</Text>
        <Text style={{ fontSize: 20, fontWeight: '700', color: colors.text, marginTop: 4 }}>{value}</Text>
      </View>
    </Card>
  );
}
