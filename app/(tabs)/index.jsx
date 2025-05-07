import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

import { useRegion } from '@/hooks/RegionContext';
import { VEGGIE_TYPES } from '@/constants/VeggieTypes';
const sortedVeggies = VEGGIE_TYPES.sort((a, b) => a.name.localeCompare(b.name));

const App = () => {
    const { selectedRegion } = useRegion();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Текущая область: {selectedRegion}</Text>
            <FlatList
                data={sortedVeggies}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => (
                <Link 
                    href={`/veggy-kind/${item.id}`}
                    style={styles.item}
                >
                    <Image source={item.img} style={styles.image} />
                    <Text style={styles.name}>{item.name}</Text>
                </Link>
                )}
            />
        </View>
    )
}

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f5f5f5',
    },
    item: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        marginBottom: 15,
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 18,
        marginBottom: 20,
    },
});