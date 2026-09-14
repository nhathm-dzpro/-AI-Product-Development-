import { Button as PaperButton, type ButtonProps } from 'react-native-paper';

export function Button(props: ButtonProps) {
  return <PaperButton mode="contained" {...props} style={[{ borderRadius: 10 }, props.style]} />;
}
