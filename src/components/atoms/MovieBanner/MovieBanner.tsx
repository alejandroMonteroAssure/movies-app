import { ActivityIndicator, Image, ImageStyle, StyleProp, StyleSheet, View } from "react-native";
import type { Movie } from "../../../services/domain/Movie";
import { TMDB_IMAGE_BASE_URL } from "@env";
import { useState } from "react";

type MovieProps = {
    movie: Movie;
    width: number;
    height?: number;
    customStyle?: StyleProp<ImageStyle>;
    posterImg?: boolean;
}

const MovieBanner = ({ movie, width, height, customStyle, posterImg }: MovieProps) => {
    const [loading, setLoading] = useState(true);
    const imageType = (posterImg === undefined ? movie.backdropPath : movie.posterPath);
    const imageWidth = width;
    const imageHeight = width*1.5;
    return (
        <>
            {loading && (
                <View
                    style={{
                        position: 'absolute',
                        width: imageWidth,
                        height: imageHeight,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#636363ff',
                    }}
                >
                    <ActivityIndicator size="small" color="#999" />
                </View>
            )}
            <Image
                source={{ uri: `${TMDB_IMAGE_BASE_URL}/original${imageType}` }}
                style={[{
                    width,
                    height: height || width,
                    resizeMode: "cover",
                }, customStyle]}
                onLoadStart={() => setLoading(true)}
                onLoadEnd={() => setLoading(false)}
            />
        </>
    )
}

export default MovieBanner;