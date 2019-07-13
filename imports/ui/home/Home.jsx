import React, { Component } from 'react';
import { Badge, Row, Col } from 'reactstrap';
import ChainStatus from './ChainStatusContainer.js';
import Consensus from './ConsensusContainer.js';
import TopValidators from './TopValidatorsContainer.js';
import Chart from './ChartContainer.js';
import ChainStates from '../components/ChainStatesContainer.js'
import { Helmet } from "react-helmet";
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
// import {Router} from 'react-router-dom';
// import { Link } from 'react-router-dom';

export default class Home extends Component{
    constructor(props){
        super(props);
        this.state = {
            chainStopped: false,
        }
    }

    componentDidUpdate(prevProps){
        if (prevProps.consensus != this.props.consensus){
            if (this.props.consensus.latestBlockTime){
                // console.log()
                let lastSync = moment(this.props.consensus.latestBlockTime);
                let current = moment();
                let diff = current.diff(lastSync);
                if (diff > 60000){
                    this.setState({
                        chainStopped:true
                    })
                }
                else{
                    this.setState({
                        chainStopped:false
                    })
                }
            }
        }
    }

    render() {
        return (
        <div id="home">
            <Helmet>
                <title>Colors | Cosmos Explorer by RNS</title>
                <meta name="description" content="Cosmos is a decentralized network of independent parallel blockchains, each powered by BFT consensus algorithms like Tendermint consensus." />
            </Helmet>
            <SideNav
                onSelect={(selected) => {
                    const to = '/' + selected;
                if (location.pathname !== to) {
                    history.push(to);
                }
                }}
            >
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected="home">
                    <NavItem eventKey="home">
                        {/* <NavLink tag={Link} to="/"></NavLink> */}
                        <NavIcon>
                            <i className="fa fa-fw fa-th-large" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Dashboard
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="validators">
                        {/* <NavLink tag={Link} to="/validators"><T>navbar.validators</T></NavLink> */}
                        <NavIcon>
                            <i className="fa fa-fw fa-signal" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Validators
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="blocks">
                        {/* <NavLink tag={Link} to="/blocks"><T>navbar.blocks</T></NavLink> */}
                        <NavIcon>
                            <i className="fa fa-fw fa-cube" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Blocks
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="transactions">
                        {/* <NavLink tag={Link} to="/transactions"><T>navbar.transactions</T></NavLink> */}
                        <NavIcon>
                            <i className="fa fa-fw fa-random" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Transactions
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="proposals">
                        {/* <NavLink tag={Link} to="/proposals"><T>navbar.proposals</T></NavLink> */}
                        <NavIcon>
                            <i className="fa fa-fw fa-list-ul" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Proposals
                        </NavText>
                    </NavItem>
                    <NavItem eventKey="voting-power-distribution">
                        {/* <NavLink tag={Link} to="/voting-power-distribution"><T>navbar.votingPower</T></NavLink> */}
                        <NavIcon>
                            <i className="fa fa-fw fa-bolt" style={{ fontSize: '1.75em' }} />
                        </NavIcon>
                        <NavText>
                            Voting Power
                        </NavText>
                    </NavItem>
                </SideNav.Nav>
            </SideNav>
        
            <Row>
                <Col md={3} xs={12}><h1>{Meteor.settings.public.chainName}</h1></Col>
                <Col md={9} xs={12} className="text-md-right"><ChainStates /></Col>
            </Row>
            {(this.state.chainStopped)?<Card body inverse color="danger">
                            <span><T _purify={false} time={moment(this.props.consensus.latestBlockTime).fromNow(true)}>chainStatus.stopWarning</T></span>             
                        </Card>:''}
            <Row>
                <Col md={6}>
                    <ChainStatus />
                </Col>
                <Col md={6}>
                    <br></br>
                    <Consensus />
                </Col>
            </Row>
            <Row>
                <Col md={6}>
                    <Chart />
                </Col>
                <Col md={6}>
                    <TopValidators />
                </Col>
            </Row>
            </div>
        )
    }

}