import React, { Component } from 'react';
import { Spinner, UncontrolledTooltip, Row, Col, Card, CardHeader, CardBody, Progress } from 'reactstrap';
import numbro from 'numbro';
import AccountCopy from '../components/AccountCopy.jsx';
import Delegations from './Delegations.jsx';
import Unbondings from './Unbondings.jsx';
import AccountTransactions from '../components/TransactionsContainer.js';
import ChainStates from '../components/ChainStatesContainer.js'
import { Helmet } from 'react-helmet';
import i18n from 'meteor/universe:i18n';
import SideNav, { NavItem, NavIcon, NavText} from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

const T = i18n.createComponent();
export default class AccountDetails extends Component{
    constructor(props){
        super(props);
        this.state = {
            address: props.match.params.address,
            loading: true,
            accountExists: false,
            available: 0,
            delegated: 0,
            unbonding: 0,
            rewards: 0,
            total: 0,
            price: 0
        }
    };
    state = {
        selected: 'validators',
        expanded: false
    };

    getBalance(){
        Meteor.call('coinStats.getStats', (error, result) => {
            if (result){
                this.setState({
                    price: result.usd
                })
            }
        });
        Meteor.call('accounts.getBalance', this.props.match.params.address, (error, result) => {
            if (error){
                console.warn(error);
                this.setState({
                    loading:false
                })
            }

            if (result){
                // console.log(result);
                if (result.available){
                    this.setState({
                        available: parseFloat(result.available.amount),
                        total: parseFloat(this.state.total)+parseFloat(result.available.amount)
                    })
                }

                if (result.delegations && result.delegations.length > 0){
                    result.delegations.forEach((delegation, i) => {
                        this.setState({
                            delegated: this.state.delegated+parseFloat(delegation.shares),
                            total: this.state.total+parseFloat(delegation.shares)
                        })
                    }, this)
                }

                if (result.unbonding && result.unbonding.length > 0){
                    result.unbonding.forEach((unbond, i) => {
                        unbond.entries.forEach((entry, j) => {
                            this.setState({
                                unbonding: this.state.unbonding+parseFloat(entry.balance),
                                total: this.state.total+parseFloat(entry.balance)
                            })
                            , this})
                    }, this)
                }

                if (result.rewards && result.rewards.length > 0){
                    result.rewards.forEach((reward, i) => {
                        this.setState({
                            rewards: this.state.rewards+parseFloat(reward.amount),
                            total: this.state.total+parseFloat(reward.amount)
                        })
                    }, this)
                }

                this.setState({
                    loading:false,
                    accountExists: true
                })
            }
        })
    }

    componentDidMount(){
        this.getBalance();
    }

    componentDidUpdate(prevProps){
        if (this.props != prevProps){
            this.setState({
                address: this.props.match.params.address,
                loading: true,
                accountExists: false,
                available: 0,
                delegated: 0,
                unbonding: 0,
                rewards: 0,
                total: 0,
                price: 0
            }, () => {
                this.getBalance();
            })
        }
    }

    onSelect = (selected) => {
        this.setState({ selected: selected });
    };

    onToggle = (expanded) => {
        this.setState({ expanded: expanded });
    };

    render(){
        const { expanded, selected } = this.state;
        if (this.state.loading){
            return <div id="account">
                <h1 className="d-none d-lg-block"><T>accounts.accountDetails</T></h1>
                <Spinner type="grow" color="primary" />
            </div>
        }
        else if (this.state.accountExists){
            return (
            <div>
            <div id="account" style={{
                        marginLeft: expanded ? 240 : 64,
                        padding: '15px 20px 0 20px'
                    }}>
                <Helmet>
                    <title>Account Details of {this.state.address} on Color Explorer | Color</title>
                    <meta name="description" content={"Account Details of "+this.state.address+" on Color"} />
                </Helmet>
                <Row>
                    <Col md={3} xs={12}><h1 className="d-none d-lg-block"><T>accounts.accountDetails</T></h1></Col>
                    <Col md={9} xs={12} className="text-md-right"><ChainStates /></Col>
                </Row>
                <h3 className="text-primary"><AccountCopy address={this.state.address} /></h3>
                <Row>
                    <Col><Card>
                        <CardHeader className="backgroundcolor">Balance</CardHeader>
                        <CardBody>
                            <Row className="account-distributions">
                                <Col xs={12}>
                                    <Progress multi>
                                        <Progress bar className="available" value={this.state.available/this.state.total*100} />
                                        <Progress bar className="delegated" value={this.state.delegated/this.state.total*100} />
                                        <Progress bar className="unbonding" value={this.state.unbonding/this.state.total*100} />
                                        <Progress bar className="rewards" value={this.state.rewards/this.state.total*100} />
                                    </Progress>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6} lg={8}>
                                    <Row>
                                        <Col xs={4} className="label text-nowrap"><div className="available infinity" /><T>accounts.available</T></Col>
                                        <Col xs={8} className="value text-right">{numbro(this.state.available/Meteor.settings.public.stakingFraction).format("0,0.0000")}</Col>
                                    </Row>
                                    <Row>
                                        <Col xs={4} className="label text-nowrap"><div className="delegated infinity" /><T>accounts.delegated</T></Col>
                                        <Col xs={8} className="value text-right">{numbro(this.state.delegated/Meteor.settings.public.stakingFraction).format("0,0.0000")}</Col>
                                    </Row>
                                    <Row>
                                        <Col xs={4} className="label text-nowrap"><div className="unbonding infinity" /><T>accounts.unbonding</T></Col>
                                        <Col xs={8} className="value text-right">{numbro(this.state.unbonding/Meteor.settings.public.stakingFraction).format("0,0.0000")}</Col>
                                    </Row>
                                    <Row>
                                        <Col xs={4} className="label text-nowrap"><div className="rewards infinity" /><T>accounts.rewards</T></Col>
                                        <Col xs={8} className="value text-right">{numbro(this.state.rewards/Meteor.settings.public.stakingFraction).format("0,0.0000")}</Col>
                                    </Row>
                                </Col>
                                <Col md={6} lg={4} className="total d-flex flex-column justify-content-end">
                                    <Row>
                                        <Col xs={4} className="label d-flex align-self-end"><div className="infinity" /><T>accounts.total</T></Col>
                                        <Col xs={8} className="value text-right">{numbro(this.state.total/Meteor.settings.public.stakingFraction).format("0,0.0000a")} {Meteor.settings.public.stakingDenom}s</Col>
                                        <Col xs={12} className="dollar-value text-right text-secondary">~{numbro(this.state.total/Meteor.settings.public.stakingFraction*this.state.price).format("$0,0.0000a")} ({numbro(this.state.price).format("$0,0.00")}/ATOM)</Col>
                                    </Row>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card></Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <Delegations address={this.state.address}/>
                    </Col>
                    <Col md={6}>
                        <Unbondings address={this.state.address} />
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <AccountTransactions delegator={this.state.address} limit={100}/>
                    </Col>
                </Row>
            </div>
            <SideNav className="sidenav position-fixed" onSelect={this.onSelect} onToggle={this.onToggle}>
                <SideNav.Toggle />
                <SideNav.Nav selected={selected} defaultSelected="transactions">
                    <NavItem eventKey="dashboard" onClick={ e => this.props.history.push("/") } title="Dashboard">
                        <NavIcon>
                            <i className="fa fa-fw fa-th" style={{ fontSize: '1.5em', color: 'black' }} />
                        </NavIcon>
                        <NavText>
                            Dashboard
                        </NavText>
                        
                    </NavItem>
                    <NavItem eventKey="validators" onClick={ e => this.props.history.push("/validators") } title="Validators">
                        <NavIcon>
                            <i className="fa fa-fw fa-spinner" style={{ fontSize: '1.5em', color: 'black' }} />
                        </NavIcon>
                        <NavText>
                            Validators
                        </NavText>
                        
                    </NavItem>
                    <NavItem eventKey="blocks" onClick={ e => this.props.history.push("/blocks") } title="Blocks">
                        <NavIcon>
                            <i className="fa fa-fw fa-cube" style={{ fontSize: '1.5em', color: 'black' }} />
                        </NavIcon>
                        <NavText>
                            Blocks
                        </NavText>
                        
                    </NavItem>
                    <NavItem eventKey="transactions" onClick={ e => this.props.history.push("/transactions") } title="Transactions">
                        <NavIcon>
                            <i className="fa fa-fw fa-random" style={{ fontSize: '1.5em', color: 'black' }} />
                        </NavIcon>
                        <NavText>
                            Transactions
                        </NavText>
                        
                    </NavItem>
                    <NavItem eventKey="proposals" onClick={ e => this.props.history.push("/proposals") } title="Proposals">
                        <NavIcon>
                            <i className="fa fa-fw fa-edit" style={{ fontSize: '1.5em', color: 'black' }} />
                        </NavIcon>
                        <NavText>
                            Proposals
                        </NavText>
                        
                    </NavItem>
                    <NavItem eventKey="voting-power-distribution" onClick={ e => this.props.history.push("/voting-power-distribution") } title="Voting Power">
                        <NavIcon>
                            <i className="fa fa-fw fa-chart-bar" style={{ fontSize: '1.5em', color: 'black'}} />
                        </NavIcon>
                        <NavText>
                            Voting Power
                        </NavText>
                    </NavItem>
                </SideNav.Nav>
            </SideNav>
            </div>
            )
        }
        else{
            return <div id="account">
                <h1 className="d-none d-lg-block"><T>accounts.accountDetails</T></h1>
                <p><T>acounts.notFound</T></p>
            </div>
        }
    }
}