import React, { useState } from 'react';
import { Jumbotron, Table, Container } from 'react-bootstrap';
import axios from 'axios';

function App() {

  const [peers, setPeers] = useState([]);
  let results = [];
  const fetchData = async () => {

    let banks = ["KEY", "CFG", "CMA", "FITB", "HBAN"];


    for (let i = 0; i < banks.length; i++) {

    
      let apiCompany = banks[i];
      let apiFilingType = '10-Q';
      let apiSize = 3;
      const apiData = JSON.stringify({"query":{"query_string":{"query":"ticker:" + apiCompany + " AND formType:\"" + apiFilingType + "\""}},"from":"0","size":"" + apiSize + "","sort":[{"filedAt":{"order":"desc"}}]});
      const config = {
        method: 'post',
        url: 'https://api.sec-api.io',
        headers: {
          'Authorization': 'fcce3b6505193d35f86d546c3aad6680072f421218789bb3d8daee6a2fda257f',
          'Content-Type': 'application/json'
        },
        data: apiData
      }
      const response = await axios(config)
      console.log(response.data)
      results.push([response.data.filings[0].ticker, 
                    response.data.filings[0].linkToFilingDetails,
                    response.data.filings[0].filedAt,
                    response.data.filings[1].linkToFilingDetails,
                    response.data.filings[1].filedAt,
                    response.data.filings[2].linkToFilingDetails,
                    response.data.filings[2].filedAt])
    }
    console.log(results);
    setPeers(results);

  }


  return (
    <Container className="p-3">
      <Jumbotron>
      <h1 className="header">FilingStream</h1>
      <h2>Monitor relevant SEC filings.</h2>
      <h5>Currently configured to pull the 3 most recent 10-Qs for KEY, CFG, CMA, FITB, and HBAN.</h5>
  
      </Jumbotron>

    <div className="d-flex justify-content-between">

      <div className="peerDiv w-100 card text-center">
        <div className="card-header">Recent Peer Filings
          <div>
            <button className="fetch-button" onClick={fetchData}>Fetch Data</button>
          </div>
        </div>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Ticker</th>
              <th>10-Q</th>
              <th>Filed</th>
              <th>10-Q</th>
              <th>Filed</th>
              <th>10-Q</th>
              <th>Filed</th>
            </tr>

          </thead>
          {peers &&
             peers.map((filing, index) => {
               const q1Date = new Date(filing.[2]).toLocaleDateString();
               const q2Date = new Date(filing.[4]).toLocaleDateString();
               const q3Date = new Date(filing.[6]).toLocaleDateString();



               return (
                 <>
                 <tbody>
                   <tr>
                     <th>{index + 1}</th>
                     <th>{filing[0]}</th>
                     <th><a href={filing[1]}>Filing Details</a></th>
                     <th>{q1Date}</th>
                     <th><a href={filing[3]}>Filing Details</a></th>
                     <th>{q2Date}</th>
                     <th><a href={filing[5]}>Filing Details</a></th>
                     <th>{q3Date}</th>
                   </tr>
                 </tbody>
                </>
               )
            }
            )

            }


        </Table>
      </div>
    </div>
   
    </Container>
  )
      }

export default App;
