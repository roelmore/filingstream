import React, { useState } from 'react';
import { Jumbotron, Table, Container } from 'react-bootstrap';
import axios from 'axios';

function App() {

  const [filings, setFilings] = useState([]);
  const apiData = JSON.stringify({"query":{"query_string":{"query":"ticker:KEY AND formType:\"10-Q\""}},"from":"0","size":"3","sort":[{"filedAt":{"order":"desc"}}]});
  const config = {
    method: 'post',
    url: 'https://api.sec-api.io',
    headers: {
      'Authorization': '5e1a8deffe93173bf6b3632c8af36d5a0c978f1c7537b6d6a26a327aa3530428',
      'Content-Type': 'application/json'
    },
    data: apiData
  }

  const fetchData = async () => {
    const response = await axios(config)
    console.log(response.data.filings)
    setFilings(response.data.filings)
  }




  // let currentPeer = 'KEY';
  // const [peerFilings, setPeerFilings] = useState([]);
  // const peerFilingsData = JSON.stringify({"query":{"query_string":{"query":"ticker:KEY AND formType:\"10-Q\""}},"from":"0","size":"3","sort":[{"filedAt":{"order":"desc"}}]});
  // const peerFilingsConfig = {
  //   method: 'post',
  //   url: 'https://api.sec-api.io',
  //   headers: {
  //     'Authorization': '5e1a8deffe93173bf6b3632c8af36d5a0c978f1c7537b6d6a26a327aa3530428',
  //     'Content-Type': 'application/json'
  //   },
  //   data: peerFilingsData
  // }

  const fetchPeerData = async () => {
    const peerResponse = await axios(peerFilingsConfig)
    console.log(peerResponse.data.peerFilings)
    setPeerFilings(peerResponse.data.peerFilings)
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
            <button className="fetch-button" onClick={fetchPeerData}>Fetch Data</button>
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
