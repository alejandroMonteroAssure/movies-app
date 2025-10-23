import { ActivityIndicator, Image, TouchableOpacity, View } from "react-native";
import { Studio } from "../../../services/domain/Studio";
import { TMDB_IMAGE_BASE_URL } from "@env";
import { imageFallback } from "../../constants/miscelanous";
import { studioItemStyles } from "./StudioItem.styles";
import { useState } from "react";
import { colors } from "../../constants/colors";

type StudioItem = {
    onPress: () => void;
    studio: Studio;
}

export default function StudioItem({onPress, studio}: StudioItem) {

    const [isLoadingImage, setIsLoadingImage] = useState(true);

    return (
        <TouchableOpacity
            onPress={onPress}
            style={{ marginRight: 18 }}
        >
            <View
                style={[studioItemStyles.studioContainer, {backgroundColor: studio.color,}]}
            >
                {isLoadingImage && (
                    <ActivityIndicator size="small" color={colors.white} />
                )}
                <Image
                    source={{
                        uri: studio.logoPath
                            ? `${TMDB_IMAGE_BASE_URL}/w185${studio.logoPath}`
                            : imageFallback,
                    }}
                    style={studioItemStyles.studioImage}
                    resizeMode="contain"
                    onLoadStart={() => setIsLoadingImage(true)}
                    onLoadEnd={() => setIsLoadingImage(false)}
                />
            </View>
        </TouchableOpacity>
    )
}