declare module 'react-native-vector-icons/MaterialCommunityIcons' {
  import {ComponentType} from 'react';
  import {TextProps} from 'react-native';

  type MaterialCommunityIconProps = TextProps & {
    name: string;
    size?: number;
    color?: string;
  };

  const MaterialCommunityIcons: ComponentType<MaterialCommunityIconProps>;
  export default MaterialCommunityIcons;
}
