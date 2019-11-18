import React, { useReducer, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Search from "./components/Search";
import Movie from "./components/Movie";

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=cee572b2";

const initialState = {
	loading:true,
	movies:[],
	errorMessage:null

};

const reducer = (state, action) => {
	switch (action.type) {
		case "SEARCH_MOVIES_REQUEST":
			return {
				...state,
				loading: true,
				errorMessage: null
			};
		case "SEARCH_MOVIES_SUCCESS":
			return {
				...state,
				loading: false,
				movies: action.payload
			};
		case "SEARCH_MOVIES_FAILURE":
			return {
				...state,
				loading: false,
				errorMessage: action.error
			};
		default:
			return state;
	}
};

const App = () => {
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		fetch(MOVIE_API_URL)
			.then(response => response.json())
			.then(jsonResponse => {
				//console.log(jsonResponse);
				dispatch({
					type: "SEARCH_MOVIES_SUCCESS",
					payload: jsonResponse.Search
				});
				
			});
	}, []);

	const search = searchValue => {
		
		dispatch({
			type: "SEARCH_MOVIES_REQUEST"
		});

		fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=cee572b2`)
			.then(response=>response.json())
			.then(jsonResponse=> {
				//console.log(jsonResponse)
				if(jsonResponse.Response === "True"){
					dispatch({
						type: "SEARCH_MOVIES_SUCCESS",
						payload : jsonResponse.Search
					});

				}else{
					dispatch({
						type: "SEARCH_MOVIES_FAILURE",
						error: jsonResponse.Error
					})
				
				}
			})
	};

	const { movies, errorMessage, loading } = state;
	//console.log(movies);
	return (
		<div className="App">
			<Header text="CINE" />
			<Search search={search} />
			<p className="App-intro">Sharing a few of our favourite movies</p>
			<div className="movies">
				{loading && !errorMessage ? (
					<span>...Loading</span>
				) : errorMessage ? (
					<div className="errorMessage">{errorMessage}</div>
				) : (
					
					movies.map((movie, index) => (
						<Movie movie={movie} key={`${index}-${movie.Title}`}	/>
					))
				)}
			</div>
		</div>
	);
};

export default App;
