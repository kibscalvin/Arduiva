const MechanicNameRow = ({ selectedMechanic }) => {
    const slideAnim = useRef(new Animated.Value(0)).current;
    const [containerWidth, setContainerWidth] = useState(0);
    const [textWidth, setTextWidth] = useState(0);

    useEffect(() => {
        if (selectedMechanic) {
            Animated.timing(slideAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start();
        }
    }, [selectedMechanic]);

    const slideInterpolate = slideAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, containerWidth - textWidth]
    });

    return (
        <View
            style={styles.mechanicNameRow}
            onLayout={(event) => {
                const { width } = event.nativeEvent.layout;
                setContainerWidth(width);
            }}
        >
            <Animated.Text
                style={{ ...styles.nearestMechanicText, transform: [{ translateX: slideInterpolate }], color: '#86868b', fontSize: 18 }}
                onLayout={(event) => {
                    const { width } = event.nativeEvent.layout;
                    setTextWidth(width);
                }}
            >
                Nearest mechanic
            </Animated.Text>
            {selectedMechanic && (
                <Text style={styles.selectedMechanicText}>
                    {selectedMechanic.name}
                </Text>
            )}
        </View>
    );
};
 export default MechanicNameRow;
