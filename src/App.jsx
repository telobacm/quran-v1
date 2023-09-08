import { useState, useEffect} from 'react'
import axios from 'axios'

const baseURL = "https://quran-api-gadingnst-two.vercel.app/";

function App() {
  const [surahData, setSurahData] = useState(null);
  const [surahNumber, setSurahNumber] = useState(1);
  const [verse, setVerse] = useState(null);

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
    <div className='mx-auto px-12'>
      <form className='text-center'>
        <label>
          Enter surah number: <input value={surahNumber} type="number" min="1" max="114"  name="surahNumber" onChange={e => setSurahNumber(e.target.value)} />
        </label>
      </form>
      <div className='text-center'>
        <h1 className='font-uthmani text-4xl'>{surahData.name.long}</h1>
        <p className='text-4xl'>{surahData.name.long}</p>
        <p className='text-xl font-poppins'>revelation: {surahData.revelation.arab} - {surahData.revelation.en} - {surahData.revelation.id}</p>
        <form>
          <label className='text-lg'>
              Enter verse number: <input type="number" min="1" defaultValue={1} name="surahNumber" onChange={handleVerse} />
          </label>
        </form>
        {verse !== null && <p>{verse[0].text.arab}</p>}
        <div>
          <div className='grid gap-6'>
            {surahData.verses.map((item, index) => <p className='text-2xl text-right' key={index}>{item.text.arab}</p>)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
