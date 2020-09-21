import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Graph from './Components/Graph'
import useFetch from './hooks/useFetch'
import Navbar from './Components/Navbar'
import TableData from './Components/Table'
import Pagination from './Components/Pagination'

function App() {
    const [Currentpage, setCurrentPage] = useState(1)
    const [CurrentData, setCurrentData] = useState([])
    const [indexing, setIndexing] = useState([])
    const [CurrentX, setCurrentX] = useState([])
    const [CurrentYmass, setCurrentYmass] = useState([])
    const [CurrentYHeight, setCurrentYHeight] = useState([])

    window.onbeforeunload = function () {
        localStorage.clear();
    }

    const url = Currentpage && `https://swapi.dev/api/people/?page=${Currentpage}`
    const { data: dataPerson, status } = useFetch(url, Currentpage)

    useEffect(() => {
        let cache = JSON.parse(localStorage.getItem(Currentpage))
        if (cache) {
            setIndexing(cache)
        }
    }, [Currentpage, CurrentData])

    useEffect(() => {
        if (dataPerson.results) {
            setCurrentData(dataPerson.results)
        }
    }, [dataPerson])
    useEffect(() => {
        if (indexing.length > 1) {
            let personName = []
            let personDatabaseMass = []
            let personDatabaseHeight = []
            indexing.forEach(data => {
                console.log(data);
                personName.push(data.name)
                personDatabaseMass.push(data.mass)
                personDatabaseHeight.push(data.height)
            })
            setCurrentX(personName)
            setCurrentYmass(personDatabaseMass)
            setCurrentYHeight(personDatabaseHeight)
        } else if (CurrentData.length > 1) {
            let personName = []
            let personDatabaseMass = []
            let personDatabaseHeight = []
            CurrentData.forEach(data => {
                console.log(data);
                personName.push(data.name)
                personDatabaseMass.push(data.mass)
                personDatabaseHeight.push(data.height)
            })
            setCurrentX(personName)
            setCurrentYmass(personDatabaseMass)
            setCurrentYHeight(personDatabaseHeight)
        }
    }, [CurrentData, indexing])

    console.log(CurrentYmass, CurrentYHeight);

    var massData = {
        label: 'Mass of Character (kg)',
        data: CurrentYmass,
        backgroundColor: 'rgba(0, 99, 132, 0.6)',
        borderColor: 'rgba(0, 99, 132, 1)',
        yAxisID: "y-axis-mass"
    };

    var heightData = {
        label: 'Height Data of Character(m)',
        data: CurrentYHeight,
        backgroundColor: 'rgba(99, 132, 0, 0.6)',
        borderColor: 'rgba(99, 132, 0, 1)',
        yAxisID: "y-axis-height"
    };

    var chartData = {
        labels: CurrentX,
        datasets: [massData, heightData]
    };

    var chartOptions = {
        scales: {
            xAxes: [{
                barPercentage: 1,
                categoryPercentage: 0.8
            }],
            yAxes: [{
                id: "y-axis-mass"
            }, {
                id: "y-axis-height"
            }]
        }
    };



    if (CurrentData.length === 0) {
        return (
            <div>
                <Navbar />
                <h1 className="d-flex justify-content-center mt-5">{status}</h1>
            </div>
        )
    }

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    return (
        <div className="App" >
            <Navbar />
            <div className="container mt-5">
                <Graph
                    legendDisplay={true}
                    titleDisplay={true}
                    chartData={chartData}
                    chartOption={chartOptions}
                />
                <table className="table table-striped table-dark mt-1">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Height</th>
                            <th scope="col">Mass</th>
                            <th scope="col">Hair_color</th>
                            <th scope="col">Skin_color</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            indexing.length === 0 ? CurrentData.map((personalData, index) => { return <TableData key={index} dataPerson={personalData} /> }) : indexing.map((personalData, index) => { return <TableData key={index} dataPerson={personalData} /> })
                        }
                    </tbody>
                </table>
                <footer className="d-flex justify-content-between">
                    <hr />
                    <Pagination paginate={paginate} />
                </footer>
            </div>
        </div>
    );
}



export default App;