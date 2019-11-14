import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import Search from "./components/Search";
import Movie from "./components/Movie";

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=cee572b2";

const App = () => {
	const [loading, setLoading] = useState(true);
	const [movies, setMovies] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);

	useEffect(() => {
		fetch(MOVIE_API_URL)
			.then(response => response.json())
			.then(jsonResponse => {
				console.log(jsonResponse);
				setMovies(jsonResponse.Search);
				setLoading(false);
			});
	}, []);

	const search = searchValue => {
		setLoading(true);
		setErrorMessage(null);

		fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=cee572b2`)
			.then(response=>response.json())
			.then(jsonResponse=> {
				if(jsonResponse == "True"){
					setMovies(jsonResponse.Search)
				}else{
					setErrorMessage(jsonResponse.Error)
					setLoading(false)
				}
			})
	};

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
