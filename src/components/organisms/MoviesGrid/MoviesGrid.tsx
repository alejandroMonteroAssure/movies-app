import { Dimensions, FlatList, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Movie } from "../../../services/domain/Movie";
import { moviesGridStyles } from "./MoviesGrid.styles";
import MovieBanner from "../../atoms/MovieBanner/MovieBanner";
import { RootStackParamList } from "../../../navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type MoviesGridProps = {
    movies: Movie[];
};

type HomeScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    'Home'
>;

export default function MoviesGrid({ movies }: MoviesGridProps) {
    const navigation = useNavigation<HomeScreenNavigationProp>();
    const screenW = Dimensions.get('window').width;



    const H_PADDING = 16;
    const GUTTER = 12;
    const CELL_W = (screenW - H_PADDING * 2 - GUTTER) / 2;
    return (
        <FlatList
            data={movies}
            keyExtractor={movie => String(movie.id)}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={moviesGridStyles.gridContentContainer}
            columnWrapperStyle={moviesGridStyles.columnWrapper}
            renderItem={({ item }) => (
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate('Details', {
                            itemId: item.id,
                            movie: item,
                        })
                    }
                >
                    <MovieBanner
                        movie={item}
                        width={CELL_W}
                        height={CELL_W * 1.5}
                        posterImg
                    />
                </TouchableOpacity>
            )}
            removeClippedSubviews={false}
            windowSize={10}
            initialNumToRender={20}
            maxToRenderPerBatch={12}
            updateCellsBatchingPeriod={50}
            scrollEnabled={false}
        />
    )
}