import { Dimensions, View } from "react-native";
import { Movie } from "../../services/domain/Movie";
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React from "react";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import MovieBanner from "../atoms/MovieBanner/MovieBanner";
import { bottomGradientColors, moviesCarrouselStyles, topGradientColors } from "./MoviesCarrousel.styles";
import { CustomText } from "../atoms/CustomText/CustomText";
import { Button } from "../atoms/Button/Button";

type MoviesCarrouselProps = {
    popularMovies: Movie[];
}

export default function MoviesCarrousel({ popularMovies }: MoviesCarrouselProps) {
    const insets = useSafeAreaInsets();
    const ref = React.useRef<ICarouselInstance>(null);
    const width = Dimensions.get('window').width;


    return (
        <View style={{ position: 'relative' }}>
            <LinearGradient
                colors={topGradientColors}
                locations={[0, 0.5, 1]}
                style={moviesCarrouselStyles.topGradientContainer}
            />
            <Carousel
                ref={ref}
                width={width}
                height={430}
                loop
                autoPlay
                autoPlayInterval={5000}
                data={popularMovies}
                onProgressChange={() => {/*TO DO*/ }}
                renderItem={({ index }) => {
                    const movie = popularMovies[index];
                    return <MovieBanner movie={movie} width={width} height={430} />;
                }}
            />
            <LinearGradient
                colors={bottomGradientColors}
                locations={[0, 0.14, 0.52, 1]}
                style={moviesCarrouselStyles.bottomGradientContainer}
            >
                <View style={moviesCarrouselStyles.rowBetween}>
                    <CustomText variant="subtitle">My List</CustomText>
                    <CustomText variant="subtitle">Discover</CustomText>
                </View>

                <View style={moviesCarrouselStyles.buttonsContainer}>
                    <Button title="+ Wishlist" variant="secondary" onPress={() => { }} />
                    <Button title="Details" variant="primary" onPress={() => { }} />
                </View>
            </LinearGradient>
        </View>
    )
}