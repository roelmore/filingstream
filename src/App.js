import React, { useState } from 'react';
import { Jumbotron, Table, Container } from 'react-bootstrap';
import axios from 'axios';

function App() {

  const [filings, setFilings] = useState([]);

  const fetchData = async () => {

    let apiCompany = "KEY";
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
    setFilings(response.data.filings)
  }

  return (
    <Container className="p-3">
      <Jumbotron>
      <h1 className="header">FilingStream</h1>
      <h2>Monitor relevant SEC filings.</h2>
  
      </Jumbotron>

    <div className="d-flex justify-content-between">

      <div className="peerDiv card text-center">
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
              <th>10-K</th>
              <th>Filed</th>
            </tr>

          </thead>

        </Table>
      </div>

      <div className="filingsDiv card text-center">
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
                  <th>Company</th>
                  <th>Filing Type</th>
                  <th>Filing Date</th>
                  <th>HTML Doc</th>
                </tr>
                </thead>

        {filings &&
          filings.map((filing, index) => {
            const cleanedDate = new Date(filing.filedAt).toDateString();

            return (
              <>
                <tbody>
                  <tr>
                    <th>{index +1}</th>
                    <th>{filing.ticker}</th>
                    <th>{filing.companyName}</th>
                    <th>{filing.formType}</th>
                    <th>{cleanedDate}</th>
                    <th><a href={filing.linkToFilingDetails}>Filing Details</a></th>
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
