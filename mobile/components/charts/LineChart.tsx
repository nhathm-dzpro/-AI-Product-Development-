import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path, Circle, Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { Colors } from '~/constants/Colors';

interface LineData {
  label: string;
  value: number;
}

interface LineChartProps {
  data: LineData[];
  height?: number;
  color?: string;
  showGradient?: boolean;
}

export function LineChart({ data, height = 140, color = Colors.primary, showGradient = true }: LineChartProps) {
  const width = 320;
  const paddingH = 20;
  const paddingV = 16;
  const chartW = width - paddingH * 2;
  const chartH = height - paddingV * 2;

  const max = Math.max(...data.map((d) => d.value));
  const min = Math.min(...data.map((d) => d.value));
  const range = max - min || 1;

  const points = data.map((d, i) => ({
    x: paddingH + (i / (data.length - 1)) * chartW,
    y: paddingV + chartH - ((d.value - min) / range) * chartH,
    label: d.label,
    value: d.value,
  }));

  const linePath = points
    .map((p, i) => {
      if (i === 0) return `M ${p.x} ${p.y}`;
      const prev = points[i - 1];
      const cpX = (prev.x + p.x) / 2;
      return `C ${cpX} ${prev.y} ${cpX} ${p.y} ${p.x} ${p.y}`;
    })
    .join(' ');

  const areaPath = `${linePath} L ${points[points.length - 1].x} ${height - paddingV} L ${points[0].x} ${height - paddingV} Z`;

  return (
    <View style={styles.wrapper}>
      <Svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>
        <Defs>
          <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor={color} stopOpacity="0.2" />
            <Stop offset="100%" stopColor={color} stopOpacity="0" />
          </LinearGradient>
        </Defs>
        {showGradient ? <Path d={areaPath} fill="url(#grad)" /> : null}
        <Path d={linePath} stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((p, i) => (
          <Circle key={i} cx={p.x} cy={p.y} r="4" fill={Colors.white} stroke={color} strokeWidth="2" />
        ))}
      </Svg>
      <View style={styles.labels}>
        {data.map((d, i) => (
          <Text key={i} style={styles.label}>{d.label}</Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {},
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: -8,
  },
  label: {
    fontSize: 11,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});
