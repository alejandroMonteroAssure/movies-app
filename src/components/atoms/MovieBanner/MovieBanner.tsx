import { Image, ImageStyle, StyleProp } from "react-native";
import type { Movie } from "../../../services/domain/Movie";
import { TMDB_IMAGE_BASE_URL } from "@env";

type MovieProps = {
    movie: Movie;
    width: number;
    height?: number;
    customStyle?: StyleProp<ImageStyle>;
    type?: boolean;
}

const MovieBanner = ({ movie, width, height, customStyle, type  }: MovieProps) => {
    const imageType = (type === undefined ? movie.backdropPath : movie.posterPath);
    return (
        <Image
            source={{ uri: `${TMDB_IMAGE_BASE_URL}/original${imageType}` }}
            style={[{
                width,
                height: height || width,
                resizeMode: "cover",
            }, customStyle]}
        />
    )
}

export default MovieBanner;