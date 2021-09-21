const form = document.querySelector('#form');
const searchInput = document.querySelector('#search');
const songsContainer = document.querySelector('#songs-container');
const prevAndNextContainer = document.querySelector('#prev-and-next-container');
const apiAristURL = `https://www.vagalume.com.br`
const apiSongURL = `https://api.vagalume.com.br`;
// https://api.lyrics.ovh/suggest/linkin%20park
// console.log({ form, searchInput, songsContainer, prevAndNextContainer });

// https://www.vagalume.com.br/linkin-park/index.js
// https://api.vagalume.com.br/search.php?art=linkin-park&mus=In The End"
// https://api.vagalume.com.br/search.php?art=linkin-park&mus=Numb"

/*
"toplyrics": {
      "item": [
        {
          "id": "3ade68b6g145ceda3",
          "desc": "In The End",
          "url": "/linkin-park/in-the-end.html"
        },
*/

const fetchSongs = async artist => {
	// fetch artist
	const response = await fetch(`${apiAristURL}/${artist}/index.js`)
	const artistJSON = await response.json();

	// fetch song name
	const songName = artistJSON.artist.toplyrics.item[0].desc;
	console.log(songName)
	
	// fetch song lyric
	const responseSong = await fetch(`${apiSongURL}/search.php?art=${artist}&mus=${songName}`)
	const songLyric = await responseSong.json();
	console.log(songLyric)
}

form.addEventListener('submit', event => {
	event.preventDefault()

	const searchArtist = searchInput.value.trim().toLowerCase()
	if(!searchArtist){
		songsContainer.innerHTML = `<li class="warning-message">Por favor, digite um termo válido!</li>`
		return
	}

	fetchSongs(searchArtist);

	// console.log(searchTerm);
});