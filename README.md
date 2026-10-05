# Vuorolaskuri

Näyttää vuorolistan perusteella, millä rivillä ja missä työvuorossa olet minä tahansa päivänä.

## Käyttöönotto (GitHub Pages)
1. Luo uusi repo, esim. `vuorolaskuri`.
2. Lataa repoon (puhelimella: Add file → Upload files) kaikki tämän kansion tiedostot: `index.html`, `sw.js`, `manifest.json`, `icon-192.png`, `icon-512.png` ja `vuorolista.pdf`.
3. Avaa Settings → Pages → Branch: `main`, kansio `/ (root)` → Save.
4. Avaa osoite `https://<käyttäjä>.github.io/vuorolaskuri/` puhelimella ja valitse "Lisää kotivalikkoon".

## Kun vuorolista muuttuu
Korvaa repossa `vuorolista.pdf` uudella PDF:llä samalla nimellä. Mitään muuta ei tarvitse muuttaa.
Sovellus lukee PDF:n otsikosta jakson päivät ja rivien nimet, ja etsii sinun rivisi nimen perusteella (oletus Rintani, ja kenen tahansa nimimerkin voi kirjoittaa asetuksiin).

## Laskusääntö
Rivi siirtyy yhden eteenpäin jokaisen jakson (21 pv) vaihtuessa, ja viimeisen rivin jälkeen palataan riville 1.
Poissaolomerkintöjä (p-o) ei huomioida, joten näkyviin tulee aina rivin perusvuoro.
Rivit, joilla ei ole yhtään vuoroa, ovat heittojaksoja, ja niiden päivät näytetään H-päivinä.
