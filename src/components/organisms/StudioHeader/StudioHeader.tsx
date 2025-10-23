import { ActivityIndicator, Animated, Dimensions, Image, View } from "react-native";
import { Studio } from "../../../services/domain/Studio"
import { IconButton } from "../../atoms/IconButton/IconButton";
import { bottomGradientColorsDarkMode, bottomGradientColorsLightMode, studioHeaderStyles, topGradientColors } from "./StudioHeader.styles";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../constants/colors";
import LinearGradient from "react-native-linear-gradient";
import { TMDB_IMAGE_BASE_URL } from "@env";
import { useEffect, useState } from "react";
import { imageFallback } from "../../constants/miscelanous";

type StudioHeaderProps = {
    studioInfo: Studio;
    scrollY: Animated.Value;
    theme: 'light' | 'dark';
}

export default function StudioHeader({ studioInfo, scrollY, theme }: StudioHeaderProps) {
    const navigation = useNavigation();
    const { height } = Dimensions.get('window');
    const logoUri = studioInfo.logoPath
        ? `${TMDB_IMAGE_BASE_URL}/w500${studioInfo?.logoPath}`
        : imageFallback;
    const [ratio, setRatio] = useState<number | undefined>(undefined);
    const [loadingStudioImage, setLoadingStudioImage] = useState(false);


    const HEADER_MAX_HEIGHT = height * 0.6;
    const HEADER_MIN_HEIGHT = 105;
    const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

    const headerHeight = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
        extrapolate: 'clamp',
    });

    const logoOpacity = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        outputRange: [1, 0.3, 0],
        extrapolate: 'clamp',
    });

    const textOpacity = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
        outputRange: [0, 0.3, 1],
        extrapolate: 'clamp',
    });

    const logoScale = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [1, 0.7],
        extrapolate: 'clamp',
    });

    const gradientOpacity = scrollY.interpolate({
        inputRange: [0, HEADER_SCROLL_DISTANCE],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });

    const screenW = Dimensions.get('window').width;


    const isTooDark = (color: string) => {
        let hex = color.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
        return luminance < 128;
    };

    useEffect(() => {
        let alive = true;
        Image.getSize(
            logoUri,
            (width, height) => alive && setRatio(width / height),
            () => alive && setRatio(undefined),
        );
        return () => {
            alive = false;
        };
    }, [logoUri]);

    return (
        <>
            <IconButton
                icon="arrow-back"
                onPress={() => navigation.goBack()}
                style={studioHeaderStyles.backBtn}
                color={colors.white}
            />
            <Animated.View
                style={[
                    studioHeaderStyles.hero,
                    {
                        backgroundColor: studioInfo.color,
                        height: headerHeight,
                    },
                ]}
            >
                <LinearGradient
                    colors={topGradientColors}
                    locations={[0, 0.5, 1]}
                    style={studioHeaderStyles.topGradientContainer}
                />
                <Animated.Image
                    source={{
                        uri: logoUri,
                    }}
                    style={[
                        {
                            width: screenW * 0.6,
                            aspectRatio: ratio ?? 2.5,
                            resizeMode: 'contain',
                            opacity: logoOpacity,
                            transform: [{ scale: logoScale }],
                        },
                    ]}
                    resizeMode="contain"
                    onLoadStart={() => setLoadingStudioImage(true)}
                    onLoadEnd={() => setLoadingStudioImage(false)}
                />
                {loadingStudioImage && (
                    <View
                        style={{
                            width: screenW * 0.6,
                            aspectRatio: ratio ?? 2.5,
                            position: 'absolute',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <ActivityIndicator size="small" color="#999" />
                    </View>
                )}
                <Animated.View
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 60,
                        opacity: gradientOpacity,
                    }}
                >
                    <LinearGradient
                        colors={
                            theme === 'dark'
                                ? bottomGradientColorsDarkMode
                                : bottomGradientColorsLightMode
                        }
                        locations={[0, 0.35, 0.65, 0.7]}
                        style={{ flex: 1 }}
                    />
                </Animated.View>
                <Animated.Text
                    style={{
                        position: 'absolute',
                        bottom: 20,
                        fontSize: 22,
                        color: isTooDark(studioInfo.color) ? 'white' : 'black',
                        fontWeight: 'bold',
                        opacity: textOpacity,
                    }}
                >
                    {studioInfo.name}
                </Animated.Text>
            </Animated.View>
        </>
    )
};
