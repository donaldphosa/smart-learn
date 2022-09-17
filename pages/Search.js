import { Pressable, StyleSheet, Text, View, Image, TextInput, ScrollView } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { FlatGrid } from 'react-native-super-grid';
import { useState } from 'react';
import RangeSlider, { Slider } from 'react-native-range-slider-expo';




const Search = ({navigation}) => {
  const [data,setData] = useState([{category:'Design',status:true},{category:'Painting',status:true},{category:'Coding',status:false},{category:'Music',status:false},{category:'Visual identity',status:false},{category:'Mathematics',status:false}])
  const [duration,setDuration] = useState([
    {time:'3-8',status:true},
    {time:'8-14',status:true},
    {time:'14-20',status:false},
    {time:'20-24',status:false},
    {time:'24-30',status:false},
   ])
   const [filter,setFilter] = useState(false)
  const [initial,setInitial] = useState(100)
  const [toValue,setToValue] = useState(2000)
  if(filter){
    return(
      <Results navigation={navigation} setFilter={setFilter}/>
    );
  }
  return (
    <SafeAreaProvider>
    <SafeAreaView>
    
        <View style={styles.container}>
          <View style={styles.content}>
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
              <Pressable onPress={()=>setFilter(true)}>
                <Ionicons name="close" size={24} color="#1F1F39" /> 
              </Pressable>
              <Text style={{fontSize:18,fontWeight:'bold',color:'#1F1F39'}}>Search Filter</Text>
              <Text></Text>
            </View>
            <Text style={{color:'#1F1F39',fontSize:16,fontWeight:'600',marginVertical:18}}>Categories</Text>
            <FlatGrid
                  itemDimension={90}
                  data={data}
                  renderItem={({ item }) => (<Pressable onPress={()=>{
                    
                    setData(data.map((dat)=>{
                      return dat.category === item.category?{...dat,status:!dat.status}:dat
                    }))
                    return
                  }}><View style={[styles.category,item.status?{backgroundColor:'#3D5CFF'}:{}]}>
                    <Text style={{color: item.status?'#ffffff':'#858597',fontSize:12}}>{item.category}</Text>
                    </View></Pressable>)}
                />
            <View>
           
                </View>
                <View>
                  <Text style={{color:'#1F1F39',fontSize:16,fontWeight:'700'}}>Price</Text>
                  <View style={{flexDirection: 'row'}}>
                      <RangeSlider min={0} max={3000}
                            fromValueOnChange={(value)=>{setInitial(value)}}
                            toValueOnChange={(value)=>{setToValue(value)}}
                            initialFromValue={initial}
                            initialToValue={toValue}
                            step={100}
                            barHeight={5}
                            inRangeBarColor={'#3D5CFF'}
                            knobSize={15}
                        /> 
                          </View>
                      <Text style={{color:'#1F1F39',fontSize:16,fontWeight:'700'}}>Duration</Text>
                      <FlatGrid
                  itemDimension={80}
                  data={duration}
                  renderItem={({ item }) => (<Pressable onPress={()=>{
                    
                    setDuration(duration.map((dat)=>{
                      return dat.time === item.time?{...dat,status:!dat.status}:dat
                    }))
                    return
                  }}><View style={[styles.category,item.status?{backgroundColor:'#3D5CFF'}:{}]}>
                    <Text style={{color: item.status?'#ffffff':'#858597',fontSize:12}}>{item.time} Hours</Text>
                    </View></Pressable>)}
                />
                <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
                  <Pressable onPress={()=>setFilter(true)} style={styles.clearBtn}>
                    <Text style={{color:'#3D5CFF',fontSize:16,fontWeight:'700'}}>Clear</Text>
                  </Pressable>
                  <Pressable onPress={()=>setFilter(true)} style={styles.applyBtn}>
                    <Text style={{color:'#ffffff',fontSize:16,fontWeight:'700'}}>Apply Filter</Text>
                  </Pressable>
                </View>
                </View>
                </ScrollView>
          </View>   
        </View>
        
    </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default Search


const Results = ({setFilter,navigation}) =>{
  const [data,setData] = useState([{category:'Design',status:true},{category:'Painting',status:true},{category:'Coding',status:false},{category:'Music',status:false}])
  return (
  <SafeAreaProvider>
    <SafeAreaView>
        <View style={[styles.container,{backgroundColor:'#ffffff',paddingHorizontal:10}]}>
          
          <View style={styles.search}>
            <Ionicons name="search" size={18} color="#B8B8D2" />
            <TextInput style={styles.searchField} placeholder='Find Course'/>
            <Pressable onPress={()=>setFilter(false)}>
              <Image style={{width:21,height:21}} source={require('../assets/images/Vector.png')} />
            </Pressable>
          </View>
          <Text style={{color:'#1F1F39',fontSize:18,fontWeight:'600',marginVertical:18}}>Results</Text>
          <View style={styles.filters}>
          <FlatGrid
                  itemDimension={60}
                  data={data}
                  renderItem={({ item }) => (<Pressable onPress={()=>{
                    
                    setData(data.map((dat)=>{
                      return dat.category === item.category?{...dat,status:!dat.status}:dat
                    }))
                    return
                  }}><View style={[styles.category,item.status?{backgroundColor:'#3D5CFF'}:{}]}>
                    <Text style={{color: item.status?'#ffffff':'#858597',fontSize:12}}>{item.category}</Text>
                    </View></Pressable>)}
                />
            </View> 
          <View style={{height:'60%',marginTop:10}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Courses navigation={navigation}/>
            <Courses navigation={navigation}/>
            <Courses navigation={navigation}/>
            <Courses navigation={navigation}/>
            <Courses navigation={navigation}/>
            <Courses navigation={navigation}/>
          </ScrollView>
        </View>       
        </View>
    </SafeAreaView>
  </SafeAreaProvider>
  )
}

const Courses = ({navigation}) =>{
  return(
    <Pressable onPress={()=>{navigation.navigate('CourseView')}} style={styles.CourseContainer}>
      <View style={styles.imageContainer}>
        <Image resizeMode='cover' style={styles.image} source={{uri:'https://th.bing.com/th/id/OIP.voawJ6Ch_K82x42SBSmJQQHaHb?pid=ImgDet&w=150&h=151&c=7'}}/>
      </View>
        <View style={styles.courseDetails}>
          <Text style={{color:'#1F1F39',fontSize:14,fontWeight:'700'}}>React v.16.0.5</Text>
          <View style={styles.writer}>
          <Ionicons name="person" size={12} color="#B8B8D2" />
          <Text style={{color:'#B8B8D2',fontSize:14,fontWeight:'400',marginLeft:3}}>Shake Spear</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={{color:'#3D5CFF',fontSize:16,fontWeight:'bold'}}>$190</Text>
            <Text style={{backgroundColor:'#FFEBF0',color:'#FF6905',fontSize:14,marginLeft:5,padding:2,borderRadius:20}}>16 hours</Text>
          </View>
        </View>
        <Text></Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container:{
    width:'100%',
    height:'100%',
    backgroundColor:'#1F1F39'
  },
  content:{
    width:'100%',
    position:'absolute',
    bottom:0,
    height:'85%',
    backgroundColor:'#ffffff',
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    padding:10
  },
  header:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'
  },
  category:{
    padding:8,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#F4F3FD',
    borderRadius:10
  },
  profilePic:{
    borderRadius:100,
    alignItems:'center'
  },
  header:{
    width:'100%',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    marginTop:"5%"
  },
  search:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginTop:15,
    backgroundColor:'#F4F3FD',
    width:'100%',
    height:48,
    padding:14,
    borderRadius:10
  },
  searchField:{
    width:'70%',
    color:'#B8B8D2'
  },
  filters:{
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'space-between',
    width:'80%'
  },
  filterCont:{
    alignItems:'center',
    justifyContent:'center',
    width:73,
    height:28,
    borderRadius:100
  },
  text:{
    color:'#858597',
    fontSize:14
  },
  CourseContainer:{
    width:'100%',
    height:100,
    backgroundColor:'#ffffff',
    marginBottom:15,
    borderRadius:15,
    shadowOpacity: 1,
    shadowColor:'gray',
    elevation: 5,
    flexDirection:'row',
    alignItems:'center',
    padding:10,
    justifyContent:'space-between'
  },
  image:{
    width:'110%',
    height:'110%',
  },
  imageContainer:{
    width:70,
    height:70,
    borderRadius:10,
    overflow:'hidden'
  },
  courseDetails:{
    width:'60%',
    
  },
  writer:{
    flexDirection:'row',
    alignItems:'center',
    marginVertical:3
  },
  priceContainer:{
    flexDirection:'row',
    alignItems:'center'
  },
  clearBtn:{
    borderColor:'#3D5CFF',
    borderWidth:1,
    paddingHorizontal:28,
    paddingVertical:14,
    borderRadius:15
  },
  applyBtn:{
    backgroundColor:'#3D5CFF',
    paddingHorizontal:72,
    paddingVertical:14,
    borderRadius:15
  }
})