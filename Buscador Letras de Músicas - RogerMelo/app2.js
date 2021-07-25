const form = document.querySelector('#form');
const searchInput = document.querySelector('#search');
const songsContainer = document.querySelector('#songs-container');
const prevAndNextContainer = document.querySelector('#prev-and-next-container');
// https://api.lyrics.ovh/suggest/linkin%20park
// console.log({ form, searchInput, songsContainer, prevAndNextContainer });

const fetchSongs = async artist => {
	
}

form.addEventListener('submit', event => {
	event.preventDefault()

	const searchArtist = searchInput.value.trim().toLowerCase()
	if(!searchArtist){
		songsContainer.innerHTML = `<li class="warning-message">Por favor, digite um termo válido!</li>`
		return
	}

	fetchSongs(searchArtist);
});