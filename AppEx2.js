import React, {useState, useEffect} from 'react';
import { FlatList, StatusBar, Text, TextInput, View} from 'react-native';

let originalData = [];

const App = () => {
    const [myData, setMyData] = useState([]);

    fetch("https://mysafeinfo.com/api/data?list=bestnovels&format=json&case=default")
        .then((response) => {
            return response.json();
        })
        .then((myJson) => {
            if(originalData.length<1) {
                setMyData(myJson);
                originalData = myJson;
            }
        })

    useEffect(() => {
        fetch('https://mysafeinfo.com/api/data?list=bestnovels&format=json&case=default')
            .then((response) => {
                return response.json();
            })
            .then((myJson) => {
                console.log(myJson);
            });
    }, []);

    const FilterData = (text) => {
        if(text!=='') {
            let myFilteredData = originalData.filter((item) =>
                item.Title.includes(text));
            setMyData(myFilteredData);
        }
        else {
            setMyData(originalData);
        }
    }

    const renderItem = ({item, index}) => {
        return (
            <View>
                <Text style={{textAlign:'center', borderWidth:1}}>{item.Title}</Text>
            </View>
        );
    };
//textAlign:
    return (
        <View>
            <StatusBar/>
            <Text style={
                {textAlign:'center',
                fontSize:25,
                backgroundColor: 'blue',
                fontWeight: 'bold'}
            }>The Greatest Books of All Time</Text>
            <Text>Search:</Text>
            <TextInput style={{borderWidth:1}} onChangeText={(text)=>{FilterData(text)}}/>
            <FlatList data={myData} renderItem={renderItem} />
        </View>
    );
}

export default App;