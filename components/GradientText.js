import React from "react";
import { Text } from "react-native";
import MaskedView from "@react-native-community/masked-view";
import LinearGradient from "react-native-linear-gradient";
    
const GradientText = (props) => {
  return (
    <MaskedView maskElement={<Text {...props} />}>
      <LinearGradient
        colors={["#EE9B27", "#E14D28", "#6F84B8"]}
        start={{ x: 0, y: 0.25}}
        end={{ x: 0.5, y: 1 }}
      >
        <Text {...props} style={[props.style, { opacity: 0 }]} />
      </LinearGradient>
    </MaskedView>
  );
};

export default GradientText;