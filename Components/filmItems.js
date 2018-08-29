import React from "react"
import {StyleSheet, Text, View, Image, TouchableOpacity} from "react-native"
import { getImageFromApi } from "./API/TMDBApi"

class FilmItems extends React.Component
{
    constructor(props)
    {
        super(props)
        this._films = []
        this._searchText = ""
        this.state = {
            films: [],
            searchText: "",
            isLoading: false
        }
    }


    render()
    {
        const { film, displayDetailForFilm } = this.props

        
        
        return (
            <TouchableOpacity style={styles.main_container} onPress={()=>displayDetailForFilm(film.id)}>
                <View style = {styles.image}>
                    <Image
                        style={styles.image}
                        source={{uri: getImageFromApi(film.poster_path)}}
                        />
                </View>
                <View style= {styles.content}>
                <View style = {styles.header}>
                        <Text style={styles.title_text}>{film.original_title}, {film.title} </Text>
                        <Text style={styles.vote}>{film.vote_average}</Text>
                </View>
                    <View style={styles.descriptionContainer}>
                    
                        <Text style = {styles.description} numberOfLines= {6}>{film.overview}</Text>
                    </View>
                    <View style = {styles.footer}>
                        <Text>{film.release_date}</Text>
                    </View>
                </View>
                
              </TouchableOpacity>
          )
    }
}

const styles = StyleSheet.create({
    main_container: {
        flexDirection: "row",
        height: 200,
        flex: 1,
        padding: 10
      },

    image:
    {
        width: 120,
        height: 180
    },

    title_text: {
        fontWeight: 'bold',
        fontSize: 20,
        flex: 2,
        flexWrap: 'wrap',
        paddingRight: 5
    },
    vote:
    {
        fontWeight: 'bold',
        fontSize: 26,
        color: '#666666'
    },
    content:
    {
        flexDirection:"column",
        flex: 1,
        margin: 5
    },

    header:
    {
        flexDirection: "row",
        flex: 8,
        flexWrap: 'wrap'
    },
    description:
    {
        margin: 5,
        fontStyle: 'italic',
        color: '#666666',
        fontSize: 11
    },
    descriptionContainer:
    {
        flex: 15
    },
    footer:
    {
        margin: 5

    }
})

export default FilmItems