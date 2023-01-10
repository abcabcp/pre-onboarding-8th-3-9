import { useCallback, useEffect, useState } from 'react';

import { SearchResultType } from './interface/SearchResultType';
import './assets/reset.scss';
import './assets/app.scss';

function App() {
  const [focus, setFocus] = useState(false);
  const [keword, setKeword] = useState('');
  const [searchResult, setSearchResult] = useState<SearchResultType[]>();
  //TODO: best practice...?
  const onSearch = useCallback(() => {
    fetch(`${process.env.REACT_APP_SERVER_URL}?q=${keword}`)
      .then((response) => response.json())
      .then((data) => setSearchResult(data))
      .then(() => console.info('calling api'));
  }, [keword]);

  useEffect(() => {
    if (!keword.trim()) return;
    onSearch();
  }, [keword]);

  return (
    <div className="App">
      <div className="main-contents">
        <h1 className="title">{`국내 모든 임상시험 검색하고\n온라인으로 참여하기`}</h1>
        <div className={!keword ? 'search-contents' : 'search-contents focus'}>
          <input
            type="text"
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            value={keword}
            onChange={(e) => setKeword(e.target.value)}
            className="search-input"
            placeholder={!focus ? '질환명을 입력해 주세요' : ''}
          />
          <button className="search-cancle" />
          <button onClick={() => onSearch()} className="search-handler" />
        </div>
      </div>
      {focus && (
        <div className="keword-contents">
          <p>추천 검색어</p>
          {!searchResult && <p>검색어 없음</p>}
          {searchResult && (
            <ul>
              {searchResult.map((result) => (
                <li key={result.sickCd}>
                  {result.sickNm.split(keword)[0]}
                  <strong>{keword}</strong>
                  {result.sickNm.split(keword)[1]}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
