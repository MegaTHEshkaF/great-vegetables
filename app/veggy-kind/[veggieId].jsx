import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import { Link, useLocalSearchParams  } from 'expo-router';

import { useRegion } from '@/hooks/RegionContext';

import { VEGGIE_TYPES } from "@/constants/VeggieTypes";
import { VEGGIES } from "@/constants/Veggies"

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

const VeggyKind = () => {
    const { selectedRegion } = useRegion();
    const colorScheme = useColorScheme();

    const { veggieId } = useLocalSearchParams ();
    // console.log(veggieId);

    // Находим овощ по id
    const veggie = VEGGIE_TYPES.find(item => item.id === Number(veggieId));
    if (!veggie) {
        return <Text>Овощ не найден.</Text>;
    }

    const filteredVeggies = VEGGIES.filter(
        (item) => item.type === veggie.name && item.regions.includes(selectedRegion)
    );

    return (
        <View style={styles.container}>
            {/* <Stack.Screen options={{ title: `${veggie.name}: доступные сорта` }} /> */}
            <Image source={veggie.img} style={styles.image} />
            <Text style={styles.name}>{veggie.name}</Text>

            <Text style={styles.header}>{selectedRegion}: доступные сорта</Text>
            <FlatList
                data={filteredVeggies}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Link href={`/veggy-kind/${veggieId}/${item.id}`} style={styles.link}>
                    <Text style={{
                        fontSize: 18,
                        color: Colors[colorScheme ?? 'light'].tint
                    }}>{item.name}</Text>
                    </Link>
                )}
            />
        </View>
    )
}

export default VeggyKind;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    image: {
        width: 100,
        height: 100,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    link: {
        marginVertical: 5,
    },
});