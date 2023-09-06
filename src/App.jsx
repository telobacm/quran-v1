import { useState, useEffect} from 'react'
import axios from 'axios'
import './App.css'

const baseURL = "https://quran-api-gadingnst-two.vercel.app/";

function App() {
  const [surahData, setSurahData] = useState(null);
  const [surahNumber, setSurahNumber] = useState(1);
  const [verse, setVerse] = useState(1);

  useEffect(() => {
    surahNumber !== '' && axios.get(baseURL+'surah/'+surahNumber).then((response) => {
      setSurahData(response.data.data);
    });
  }, [surahNumber]);

  if (!surahData) return null;

  function handleVerse(e) {
    console.log(surahData.verses.some(item => item.number.inSurah === parseInt(e.target.value)))
    surahData.verses.some(item => item.number.inSurah === parseInt(e.target.value)) ? setVerse(surahData.verses.filter((item) => item.number.inSurah === parseInt(e.target.value))) : console.log('verse number invalid')
  }

  return (
    <>
      <form>
        <label>
          Enter surah number: <input value={surahNumber} type="number" min="1" max="114"  name="surahNumber" onChange={e => setSurahNumber(e.target.value)} />
        </label>
      </form>
    <div>
      <h1>{surahData.name.long}</h1>
      <p>revelation: {surahData.revelation.arab} - {surahData.revelation.en} - {surahData.revelation.id}</p>
      <form>
        <label>
            Enter verse number: <input type="number" min="1" defaultValue={1} name="surahNumber" onChange={handleVerse} />
        </label>
      </form>
      {verse !== null && <p>{verse[0].text.arab}</p>}
      {/* <div>
        {surahData.verses.map((item, index) => <li key={index}>{item.text.arab}</li>)}
      </div> */}
    </div>
    </>
  )
}

export default App
