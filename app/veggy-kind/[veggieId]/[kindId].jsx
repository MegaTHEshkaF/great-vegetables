import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams  } from 'expo-router';

import { VEGGIES } from "@/constants/Veggies"

const VeggyKind = () => {
    const { kindId } = useLocalSearchParams ();
    // console.log(kindId);

    // Находим сорт по id
    const kind = VEGGIES.find(
        (item) => item.id === Number(kindId)
    );
    if (!kind) {
        return <Text>Овощ не найден.</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.name}>{kind.name}</Text>
            <Text style={styles.noInfo}>Информации пока нет</Text>
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
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
    },
    noInfo: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 10,
        color: 'gray',
    },
});