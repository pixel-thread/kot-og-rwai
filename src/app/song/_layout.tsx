import { Stack } from 'expo-router';
import { FloatingActionButtons } from '~/src/components/Common/FloatingActionButtons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useTextStore } from '~/src/libs/stores/text';
import colors from 'tailwindcss/colors';
import { useColorScheme } from 'nativewind';
import { CustomHeader } from '~/src/components/Common/CustomHeader';
import { useSongs } from '~/src/hooks/song/useSongs';
import { TouchableOpacity, View } from 'react-native';
import { useSongStore } from '~/src/libs/stores/songs';

const HeaderLeft = () => {
  const { song } = useSongs();
  const { favoriteSongs, addFavoriteSong, removeFavoriteSong } = useSongStore();
  const isFavorite = favoriteSongs.includes(song.metadata.number);

  const onPressFavorite = () => {
    if (isFavorite) {
      removeFavoriteSong(song.metadata.number);
    } else {
      addFavoriteSong(song.metadata.number);
    }
  };

  return (
    <View className="flex-row gap-x-4">
      <TouchableOpacity
        onPress={onPressFavorite}
        accessibilityLabel={isFavorite ? 'Remove from favorites' : 'Add to favorites'}>
        <FontAwesome
          name={isFavorite ? 'bookmark' : 'bookmark-o'}
          size={24}
          color={isFavorite ? colors.orange[500] : colors.gray[500]}
        />
      </TouchableOpacity>
    </View>
  );
};

export default function SongLayout() {
  const { colorScheme } = useColorScheme();
  // Consider if isShowFloatingButton is still needed or if buttons are always visible
  const isDarkMode = colorScheme === 'dark';
  const { song, onNextSong, onPreviousSong } = useSongs();
  const { increaseTextSize, decreaseTextSize } = useTextStore();

  return (
    <>
      <View className="flex-1">
        <Stack
          screenOptions={{
            headerShown: true,
            title: `Jingrwai No- ${song.metadata.number.toString()}`,
            header: ({ options }) => (
              <CustomHeader options={options} back headerLeft={<HeaderLeft />} />
            ),
          }}>
          <Stack.Screen name="index" />
        </Stack>
      </View>

      <FloatingActionButtons
        isVisible // Use state here
        buttons={[
          {
            onPress: onPreviousSong,
            icon: (
              <FontAwesome
                color={isDarkMode ? colors.gray[200] : colors.gray[950]}
                name="chevron-left"
                size={20}
              />
            ),
          },
          {
            onPress: decreaseTextSize,
            icon: (
              <FontAwesome
                name="minus"
                size={20}
                color={isDarkMode ? colors.gray[200] : colors.gray[950]}
              />
            ),
          },
          {
            onPress: increaseTextSize,
            icon: (
              <FontAwesome
                color={isDarkMode ? colors.gray[200] : colors.gray[950]}
                name="plus"
                size={20}
              />
            ),
          },
          {
            onPress: onNextSong,
            icon: (
              <FontAwesome
                name="chevron-right"
                size={20}
                color={isDarkMode ? colors.gray[200] : colors.gray[950]}
              />
            ),
          },
        ]}
      />
    </>
  );
}
