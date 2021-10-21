import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {useEffect, useRef, useState} from "react";


function App() {

    const [rep, setRep] = useState([]);
    const [loader, setLoader] = useState(true);
    const [page, setPage] = useState(1);
    const [lastel, setLastel] =useState(null)

    const observer = new IntersectionObserver(
        entries => {
            if (entries[0].isIntersecting) {
                console.log('page increment')
                setPage(page+1)
                setLoader(true)
            }
        }
    );

    function fetchData() {
        axios({
            method: 'GET',
            url: 'https://api.github.com/search/repositories',
            params: {
                q: `javascript`,
                sort: 'stars',
                order: 'desc',
                page: page,
            }
        }).then((res) => {
            setRep([...rep,...res.data.items])
            setLoader(false)
        }).catch((err) => console.log(err))
    }


    useEffect(() => {
        setTimeout(() => {
            fetchData()
        }, 0)

    }, [page])

    useEffect(() => {

        if(lastel){observer.observe(lastel)}
        return ()=>{ if(lastel){observer.unobserve(lastel)}}
    }
        ,[lastel])


    return (
        <div className="App">
            {/*{loader && <img src={logo}>}*/}
            {loader ? <img className="App-logo" src={logo}/> :
                <table className="table">
                    <tbody className="thead">
                    <tr className="thead">
                        <td>Name</td>
                        <td>url</td>
                        <td>owner</td>
                        <td>forks</td>
                        <td>open issues</td>
                    </tr>
                    {rep.map((el) => <tr ref={setLastel} className="tbodey">
                        <td>{el.name}</td>
                        <td>{el.url}</td>
                        <td>{el.owner.login}</td>
                        <td>{el.forks}</td>
                        <td>{el.open_issues}</td>

                    </tr>)}
                    </tbody>
                </table>
            }
        </div>
    );
}

export default App;
