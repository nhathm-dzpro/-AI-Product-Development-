import { ScrollView, Text, View } from 'react-native';
import Svg, { Line as SvgLine, Polyline, Circle } from 'react-native-svg';
import { Header } from '../../components/layout/Header';
import { ScreenContainer } from '../../components/layout/ScreenContainer';
import { Card } from '../../components/ui/Card';
import { StatCard } from '../../components/dashboard/StatCard';
import { MOCK_PRODUCTS } from '../../constants/mock';
import { colors } from '../../constants/theme';
import { formatVND } from '../../utils/format';

// Foundation mock chart: pure react-native-svg, no reanimated/victory needed.
// Phase 2 can swap this with victory-native once reanimated is installed.
const DATA = [0, 0, 0, 0, 0, 0, 0];
const W = 300;
const H = 120;
const PAD = 10;

function toPoints(): string {
  const stepX = (W - PAD * 2) / Math.max(DATA.length - 1, 1);
  const max = Math.max(...DATA, 1);
  return DATA.map((v, i) => {
    const x = PAD + i * stepX;
    const y = H - PAD - (v / max) * (H - PAD * 2);
    return `${x},${y}`;
  }).join(' ');
}

function lastPoint(): { x: number; y: number } {
  const stepX = (W - PAD * 2) / Math.max(DATA.length - 1, 1);
  const max = Math.max(...DATA, 1);
  const v = DATA[DATA.length - 1] ?? 0;
  return { x: PAD + (DATA.length - 1) * stepX, y: H - PAD - (v / max) * (H - PAD * 2) };
}

export default function Analytics() {
  const pts = toPoints();
  const last = lastPoint();

  return (
    <ScreenContainer>
      <Header title="Analytics" subtitle="Mock chart" />
      <ScrollView contentContainerStyle={{ padding: 16, gap: 12 }}>
        <StatCard label="Revenue" value={formatVND(0)} />
        <StatCard label="Profit" value={formatVND(0)} />
        <StatCard label="Expenses" value={formatVND(0)} />
        <Card>
          <Text style={{ fontWeight: '700', marginBottom: 8 }}>Revenue (mock)</Text>
          <View style={{ alignItems: 'center' }}>
            <Svg width={W} height={H}>
              <SvgLine
                x1={PAD}
                y1={H - PAD}
                x2={W - PAD}
                y2={H - PAD}
                stroke={colors.border}
                strokeWidth={1}
              />
              <Polyline points={pts} fill="none" stroke={colors.primary} strokeWidth={2} />
              <Circle cx={last.x} cy={last.y} r={4} fill={colors.primary} />
            </Svg>
            <Text style={{ color: colors.muted, marginTop: 4 }}>7 days — no data yet</Text>
          </View>
        </Card>
        <Card>
          <Text style={{ fontWeight: '700', marginBottom: 8 }}>Top Products</Text>
          {MOCK_PRODUCTS.slice(0, 3).map((p) => (
            <Text key={p.id} style={{ paddingVertical: 2 }}>
              {p.name}
            </Text>
          ))}
        </Card>
      </ScrollView>
    </ScreenContainer>
  );
}
