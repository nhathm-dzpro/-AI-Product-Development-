import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '~/constants/Colors';

interface BarData {
  label: string;
  value: number;
  color?: string;
}

interface BarChartProps {
  data: BarData[];
  height?: number;
  showValues?: boolean;
  activeIndex?: number;
}

export function BarChart({ data, height = 120, showValues = false, activeIndex }: BarChartProps) {
  const max = Math.max(...data.map((d) => d.value));

  return (
    <View style={styles.wrapper}>
      <View style={[styles.chart, { height }]}>
        {data.map((d, i) => {
          const barHeight = max > 0 ? (d.value / max) * (height - 20) : 0;
          const isActive = activeIndex === i;
          const color = d.color || (isActive ? Colors.primary : Colors.primaryLight);

          return (
            <View key={i} style={styles.barCol}>
              {showValues ? (
                <Text style={styles.value}>{(d.value / 1000000).toFixed(1)}M</Text>
              ) : null}
              <View style={styles.barWrapper}>
                <View
                  style={[
                    styles.bar,
                    {
                      height: barHeight,
                      backgroundColor: color,
                      borderRadius: 6,
                    },
                  ]}
                />
              </View>
              <Text style={[styles.label, isActive && styles.labelActive]}>{d.label}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {},
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
  },
  barCol: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  barWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
  },
  bar: {
    width: '100%',
    minHeight: 4,
  },
  label: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  labelActive: {
    color: Colors.primary,
    fontWeight: '700',
  },
  value: {
    fontSize: 9,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});
