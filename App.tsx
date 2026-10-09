import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

type Album = {
  id: string;
  title: string;
  artist: string;
  year: number;
  genre: string;
  rating: number;
};

const genres: string[] = [
  'Alternative',
  'Blues',
  'Classical',
  'Country',
  'Electronic',
  'Hip Hop',
  'Jazz',
  'Metal',
  'Pop',
  'R&B',
  'Reggae',
  'Rock',
  'Soundtrack',
  'Soul',
  'Other',
];

const MIN_TEXT_LENGTH = 2;
const MAX_TITLE_LENGTH = 50;
const MAX_ARTIST_LENGTH = 50;
const MIN_YEAR = 1900;
const MAX_RATING = 5;

export default function App() {
  const [title, setTitle] = useState<string>('');
  const [artist, setArtist] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [genre, setGenre] = useState<string>('');
  const [rating, setRating] = useState<string>('');
  const [albums, setAlbums] = useState<Album[]>([]);

  const validateForm = (): boolean => {
    const trimmedTitle = title.trim();
    const trimmedArtist = artist.trim();

    if (!trimmedTitle) {
      Alert.alert('Validation Error', 'Please enter an album title.');
      return false;
    }

    if (
      trimmedTitle.length < MIN_TEXT_LENGTH ||
      trimmedTitle.length > MAX_TITLE_LENGTH
    ) {
      Alert.alert(
        'Validation Error',
        `Album title must contain between ${MIN_TEXT_LENGTH} and ${MAX_TITLE_LENGTH} characters.`
      );
      return false;
    }

    if (!trimmedArtist) {
      Alert.alert('Validation Error', 'Please enter an artist name.');
      return false;
    }

    if (
      trimmedArtist.length < MIN_TEXT_LENGTH ||
      trimmedArtist.length > MAX_ARTIST_LENGTH
    ) {
      Alert.alert(
        'Validation Error',
        `Artist name must contain between ${MIN_TEXT_LENGTH} and ${MAX_ARTIST_LENGTH} characters.`
      );
      return false;
    }

    if (!year.trim()) {
      Alert.alert('Validation Error', 'Please enter an album release year.');
      return false;
    }

    if (!/^\d+$/.test(year.trim())) {
      Alert.alert('Validation Error', 'Album year must be a whole number.');
      return false;
    }

    const numericYear = Number(year.trim());
    const currentYear = new Date().getFullYear();

    if (numericYear < MIN_YEAR || numericYear > currentYear) {
      Alert.alert(
        'Validation Error',
        `Album year must be between ${MIN_YEAR} and ${currentYear}.`
      );
      return false;
    }

    if (!genre || !genres.includes(genre)) {
      Alert.alert('Validation Error', 'Please select a valid genre.');
      return false;
    }

    if (!rating.trim()) {
      Alert.alert('Validation Error', 'Please enter a rating.');
      return false;
    }

    if (!/^[1-5]$/.test(rating.trim())) {
      Alert.alert(
        'Validation Error',
        `Rating must be a whole number between 1 and ${MAX_RATING}.`
      );
      return false;
    }

    return true;
  };

  const handleSave = () => {
    if (!validateForm()) {
      return;
    }

    const newAlbum: Album = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      title: title.trim(),
      artist: artist.trim(),
      year: Number(year.trim()),
      genre,
      rating: Number(rating.trim()),
    };

    setAlbums((previousAlbums) => [...previousAlbums, newAlbum]);

    setTitle('');
    setArtist('');
    setYear('');
    setGenre('');
    setRating('');

    Keyboard.dismiss();
    Alert.alert('Success', 'Album added to your favourites!');
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      'Delete Album',
      'Are you sure you want to remove this album?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setAlbums((currentAlbums) =>
              currentAlbums.filter((album) => album.id !== id)
            );
          },
        },
      ]
    );
  };

  const renderAlbum = ({ item }: { item: Album }) => (
    <View style={styles.albumCard}>
      <View style={styles.albumInformation}>
        <Text style={styles.albumTitle}>{item.title}</Text>
        <Text style={styles.albumArtist}>{item.artist}</Text>
        <Text style={styles.albumDetail}>Year: {item.year}</Text>
        <Text style={styles.albumDetail}>Genre: {item.genre}</Text>
        <Text style={styles.albumDetail}>Rating: {item.rating}/5</Text>
      </View>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDelete(item.id)}
        accessibilityRole="button"
        accessibilityLabel={`Delete ${item.title}`}
      >
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.heading}>My Album Collection</Text>

      <Text style={styles.label}>Album Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter album title"
        value={title}
        onChangeText={setTitle}
        maxLength={MAX_TITLE_LENGTH}
        returnKeyType="next"
      />

      <Text style={styles.label}>Artist</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter artist name"
        value={artist}
        onChangeText={setArtist}
        maxLength={MAX_ARTIST_LENGTH}
        returnKeyType="next"
      />

      <Text style={styles.label}>Year</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter release year"
        value={year}
        onChangeText={setYear}
        keyboardType="number-pad"
        maxLength={4}
        returnKeyType="next"
      />

      <Text style={styles.label}>Genre</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={genre}
          onValueChange={(itemValue: string) => setGenre(itemValue)}
        >
          <Picker.Item label="Select a genre..." value="" />
          {genres.map((g) => (
            <Picker.Item key={g} label={g} value={g} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Rating</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter rating from 1 to 5"
        value={rating}
        onChangeText={setRating}
        keyboardType="number-pad"
        maxLength={1}
        returnKeyType="done"
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={handleSave}
        accessibilityRole="button"
      >
        <Text style={styles.addButtonText}>Add to Favourites</Text>
      </TouchableOpacity>

      <Text style={styles.collectionHeading}>
        My Favourite Albums ({albums.length})
      </Text>

      <FlatList
        data={albums}
        keyExtractor={(item) => item.id}
        renderItem={renderAlbum}
        scrollEnabled={false}
        ListEmptyComponent={
          <Text style={styles.emptyMessage}>
            No albums have been added yet.
          </Text>
        }
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 20,
    paddingTop: 50,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#222222',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 4,
    color: '#333333',
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#222222',
  },
  pickerContainer: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 4,
  },
  addButton: {
    backgroundColor: '#2e7d32',
    borderRadius: 6,
    paddingVertical: 12,
    marginTop: 15,
    marginBottom: 20,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  collectionHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#222222',
  },
  albumCard: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#dddddd',
  },
  albumInformation: {
    marginBottom: 10,
  },
  albumTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#222222',
  },
  albumArtist: {
    fontSize: 16,
    color: '#555555',
    marginBottom: 6,
  },
  albumDetail: {
    fontSize: 14,
    color: '#444444',
    marginTop: 2,
  },
  deleteButton: {
    backgroundColor: '#c62828',
    borderRadius: 6,
    paddingVertical: 10,
  },
  deleteButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#777777',
    marginTop: 20,
    fontStyle: 'italic',
  },
});