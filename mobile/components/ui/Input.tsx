import { Text } from 'react-native';
import { TextInput, type TextInputProps } from 'react-native-paper';

interface Props extends TextInputProps {
  label: string;
  errorText?: string;
}

export function Input({ label, errorText, ...rest }: Props) {
  return (
    <>
      <TextInput label={label} mode="outlined" error={Boolean(errorText)} {...rest} />
      {errorText ? <Text style={{ color: '#E03131', marginTop: 4 }}>{errorText}</Text> : null}
    </>
  );
}
