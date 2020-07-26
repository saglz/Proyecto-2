const APIKEY = "vcZZ9afZZzKY6qX9q4US8wITbdxp9wPG";
//you will need to get your own API KEY
//
document.addEventListener("DOMContentLoaded", init);

function init() {
    document.getElementById("btnSearch").addEventListener("click", ev => {
        ev.preventDefault(); //to stop the page load
        let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=12&q=`;
        let str = "dogs"; /* document.getElementById("search").value.trim(); */
        url = url.concat(str);
        console.log(url);
        fetch(url).then(response => response.json()).then(content => {
                //data, pagination, meta
                console.log(content.data);
                console.log("META", content.meta);
                try {
                    for (var i = 0; i < 12; i++) {
                        let img = document.createElement('img');
                        img.src = content.data[i].images.original.url;
                        img.alt = content.data[i].title;

                        let out = document.getElementById('out');
                        out.appendChild(img);
                    }
                } catch (error) {
                    /* console.error(error); */
                    alert(error);
                    console.log(error);
                }
            })
            .catch(err => {
                console.error(err);
            });
    });
}