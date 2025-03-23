import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

// Updated slides data with image URLs
const slides = [
    {
        id: 1,
        image: require('../../assets/getstarted/slide-1.jpg'),
        title: 'Protect Your Health Companion',
        subtitle: 'Elevate Fitness Journey with a Cutting-Edge to Fuel Your Motivation & Crush Your Goals',
    },
    {
        id: 2,
        image: require('../../assets/getstarted/slide-2.jpg'),
        title: 'Build Strength & Confidence',
        subtitle: 'Stay consistent, stay dedicated, and transform yourself every day.',
    },
    {
        id: 3,
        image: require('../../assets/getstarted/slide-3.jpg'),
        title: 'Your Fitness, Your Rules',
        subtitle: 'Workout at your own pace and achieve your dream physique!',
    },
];

const GetStartedScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {/* Image Slider using Swiper */}
            <Swiper
                style={styles.wrapper}
                showsButtons={false}
                autoplay
                autoplayTimeout={3}
                loop
            >
                {slides.map((item) => (
                    <View key={item.id} style={styles.slide}>
                        <Image source={item.image} style={styles.image} />
                        <View style={styles.overlay} />
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.subtitle}>{item.subtitle}</Text>
                        </View>
                    </View>
                ))}
            </Swiper>

            {/* Get Started Button */}
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
                <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    slide: {
        width,
        height,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    overlay: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // Dark overlay effect
    },
    textContainer: {
        position: 'absolute',
        bottom: 160,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#ddd',
        textAlign: 'center',
        marginTop: 10,
    },
    button: {
        backgroundColor: '#ffd300',
        paddingVertical: 15,
        width: width * 0.8,
        borderRadius: 30,
        alignItems: 'center',
        marginBottom: 50,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
});

export default GetStartedScreen;
