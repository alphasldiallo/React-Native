import React from "react"
import {View, Text, Button, TextInput, StyleSheet, FlatList, StatusBar, ActivityIndicator, Keyboard} from 'react-native'
import films from './Helpers/filmsData'
import FilmItems from './filmItems'
import {getFilmsFromApiWithSearchedText} from './API/TMDBApi'

class Search extends React.Component
{
    constructor(props)
    {
        super(props)
        this._films = [],
        this._page = 1,
        this.totalPages = 0,
        this._searchText = ""
        this.state = {
            films: [],
            searchText: "",
            isLoading: false
        }
    }
    _searchTextInput (t)
    {
        this.setState({searchText: t})
    }

    _searchInit()
    {
        Keyboard.dismiss()
        this._page = 1,
        this.totalPages = 0,
        this.setState ({
            films: []
        })
        console.log(this._page)
        this._loadFilms(this._page)

    }

    //Initialize the State
    _loadFilms(pageLoad) {
   
        if (this._searchText.length > 0)
        {
            this.setState ({isLoading:true})
            getFilmsFromApiWithSearchedText(this._searchText, pageLoad).then(data => {
                this.page = this._page
                this.totalPages = this.totalPages
                this.setState({ films: this.state.films.concat(data.results), isLoading: false })
            })
        }
    }

    _searchTextInputChange(text)
    {
        this._searchText = text
    }

    _displayLoading ()
    {
        if (this.state.isLoading)
        {
            return (
                <View style={styles.loading_container}>
                  <ActivityIndicator size='large' />
                 
                </View>
              )
        }
    }

    render = function ()
    {
        return (
            <View style={styles.main_container}>
            <StatusBar
                barStyle="dark-content"
                hidden = {true}
            />
            <Text>Search bar</Text>
            <TextInput style={styles.textinput} placeholder='Titre du film' onSubmitEditing = {(() => this._searchInit()) } onChangeText = {(text) => this._searchTextInputChange(text)} 
             multiline = {false} returnKeyType="search" />
            <Button style={{ height: 50 }} title='Rechercher' onPress={() => this._searchInit()}/>
            <FlatList
            data={this.state.films}
            //KeyExtractor define the ID of the item
            keyExtractor = {(item) => item.id.toString()}
            //ES6 way to write: renderItem = {function ({item}) {return <Text>{item.title}</Text>}}
            renderItem = {({item})=> <FilmItems film = {item} />}
            onEndReachedThreshold = {0.5}
            onEndReached = {() => {this._page++;  this._loadFilms(this._page) }}
            />
            {this._displayLoading()}
        </View>
        )
    }
       
}
const styles = StyleSheet.create(
    {
        main_container: {
            flex: 1,
            marginTop: 25
          },
          textinput: {
            marginLeft: 5,
            marginRight: 5,
            height: 50,
            borderColor: '#000000',
            borderWidth: 1
          },
          loading_container: {
            position: 'absolute',
            left: 0,
            right: 0,
            top: 100,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center'
          }
        
    }) 

export default Search