﻿{/* Imports */ }
import React, { Component } from 'react';
import{ Redirect } from 'react-router-dom';
import axios from "axios";

{/* Henter nødvendig funksjonalitet fra reactstrap */ }
import { Container, Button, ButtonGroup, ButtonToolbar, Row, Col, Table} from 'reactstrap';
import { isSetAccessorDeclaration } from 'typescript';

{/* Js klassen Handel arver fra superklassen Component */ }
export class Historikk extends Component {

    // Setter displayName til Historikk for eventuelle debugging meldinger
    static displayName = Historikk.name;

    constructor(props) {
        super(props)

        this.state = {
            visAksjer: false,
            visInnskudd: false,
            visHistorikk: false,
            redirect: false,
            aksjeList: [],
            innskuddUttakList: [],
            aksjeKjøpt: {
               }
        }
        this.velgVisningAksjer = this.velgVisningAksjer.bind(this);
        this.velgVisningOverføring = this.velgVisningOverføring.bind(this);
        this.velgHistorikk = this.velgHistorikk.bind(this);
        this.callAksjeKjøpListe = this.callAksjeKjøpListe.bind(this);
        this.callAksjeHistorikk = this.callAksjeHistorikk.bind(this);
        this.callAksjeHistorikk();
        this.callAksjeKjøpListe();
        this.callUttakInntakListe();

    }

    callAksjeHistorikk(){
        const id = "brukerId=" + sessionStorage.getItem('kundeId');
        axios.get('../Transaksjon/HentBrukerTransaksjonHistorikk?' + id)
            .then((response) => {
                console.log(response.data)
                this.setState({
                    AksjeHistorikk: response.data
                })
            })
            .catch(function (feil) {
                console.log(feil + " oioioi");
            })

    }

    sell(ticker, volum){
        sessionStorage.setItem('maxVolum', volum)
		sessionStorage.setItem('tickerSell', ticker)
		this.setState({redirect: true})
	}

    callAksjeKjøpListe() {
        const id = "brukerId=" + sessionStorage.getItem('kundeId');
        axios.get('../Transaksjon/HentBrukerTransaksjoner?' + id)
            .then((response) => {
                console.log(response.data)
                this.setState({
                    aksjeList: response.data
                })
            })
            .catch(function (feil) {
                console.log(feil + " oioioi");
            })
    }

    callUttakInntakListe() {
        const id = "brukerId=" + sessionStorage.getItem('kundeId');
        axios.get('../Transaksjon/HentInnskuddUttak?' + id)
            .then((response) => {
                console.log(response.data);
                this.setState({
                    innskuddUttakList: response.data
                })
            })
            .catch(function (feil) {
                console.log("gikk ikke" + feil);
            });
    }

    velgVisningAksjer() {
        this.setState({
            visAksjer: true,
            visInnskudd: false,
            visHistorikk: false
        });
    }

    velgVisningOverføring() {
        this.setState({
            visAksjer: false,
            visInnskudd: true,
            visHistorikk: false
        });
    }

    velgHistorikk(){
        this.setState({
            visAksjer: false,
            visInnskudd: false,
            visHistorikk: true
        });
    }
    renderRedirect(){
		if(this.state.redirect){
			return <Redirect to='/tickerSell' />
			
		}
	}


    // Funksjon som kontrollerer container noden du står i
    render() {
        let data;
        if (this.state.visAksjer) {
            data = this.state.aksjeList.map((i, key) => {
                return ( 
                    <tr key={key}>
                       <th>{key + 1}</th>
                       <td>{i.ticker}</td>
                       <td>{i.pris}</td>
                       <td>{i.volum}</td>
                       <td><Button color='danger' onClick={this.sell.bind(this, i.ticker, i.volum)}>Selg</Button></td>
                     </tr>
                );
            });
        }
        if (this.state.visInnskudd) {
            data = this.state.innskuddUttakList.map((i, key) => {
                return (
                
                    <tr key={key}>
                        <th>{key + 1}</th>
                        <td>{i.ticker}</td>
                        <td>{i.volum}</td>
                    </tr>
                    );
            });
        }
        if (this.state.visHistorikk) {
            data = this.state.AksjeHistorikk.map((i, key) => {
                return (
                
                    <tr key={key}>
                        <th>{key + 1}</th>
                        <td>{i.ticker}</td>
                        <td>{i.volum}</td>
                        <td>{i.volum * i.pris}</td>
                    </tr>
                    );
            });
        }
        


        // Returnerer html elementene slik at de skrives ut
        return (

            // Div som inneholder html elementene til siden
            <div>
                {this.renderRedirect()}
                {/* Tekst element */}
                <p>Overføringer</p>

                {/* Container som inneholder html elementer */}
                <Container fluid="true">

                    {/* Rad som skalerer på enhet */}
                    <Row fluid="true">

                        {/* Bruker ButtonToolbar for å holde knappe på rekke */}
                        <ButtonToolbar>

                            {/* ButtonGroup sørger for at knappene er samme størrelse */}
                            <ButtonGroup className="mr-2">

                                {/* Knapper, en av de bruker outline og den andre tar primary som farge */}
                                <Button color="primary" sm="1" onClick={this.velgVisningOverføring}>Innskudd/Uttak</Button>
                                <Button color="primary" sm="1" onClick={this.velgVisningAksjer}>Transaksjoner</Button>
                                <Button color="primary" sm="1" onClick={this.velgHistorikk}>Historikk</Button>
                            </ButtonGroup>
                        </ButtonToolbar>  
                    </Row>

                    {/* Rad som skalerer på enhet */}
                    <Row fluid="true">

                        {/* Kolonne som skal ta halve raden */}
                        <Col md="6" pt="3">

                            <h5>Velg Innskudd/Uttak for å se dine innskudd og uttak!</h5>
                            <h5>Velg Transaksjoner for å se dine aksjekjøp og salg!</h5>
                            <Table responsive borderless>
                                {this.state.visInnskudd && <thead><tr><th>#</th><th>Valuta</th><th>Sum</th></tr></thead>}
                                {this.state.visAksjer && <thead><tr><th>#</th><th>Ticker</th><th>Pris</th><th>Volum</th><th>TotalPris</th></tr></thead>}
                                {this.state.visHistorikk && <thead><tr><th>#</th><th>Ticker</th><th>Pris</th><th>Volum</th></tr></thead>}
                                <tbody>
                                    {data}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
      }
    }