import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Row, Col } from 'reactstrap';
import HeaderRecord from './HeaderRecord.jsx';
import Blocks from '/imports/ui/blocks/ListContainer.js'
import { LoadMore } from '../components/LoadMore.jsx';
import { Route, Switch } from 'react-router-dom';
import Sidebar from "react-sidebar";
import Block from './BlockContainer.js';
import ChainStates from '../components/ChainStatesContainer.js'
import { Helmet } from 'react-helmet';
import i18n from 'meteor/universe:i18n';
import SideNav, { NavItem, NavIcon, NavText} from '@trendmicro/react-sidenav';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

const T = i18n.createComponent();
export default class BlocksTable extends Component {
    constructor(props){
        super(props);
        this.state = {
            limit: Meteor.settings.public.initialPageSize,
            sidebarOpen: (props.location.pathname.split("/blocks/").length == 2)
        };

        this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
    };
    state = {
        selected: 'blocks',
        expanded: false
    };

    isBottom(el) {
        return el.getBoundingClientRect().bottom <= window.innerHeight;
    }
      
    componentDidMount() {
        document.addEventListener('scroll', this.trackScrolling);
    }
    
    componentWillUnmount() {
        document.removeEventListener('scroll', this.trackScrolling);
    }
    
    trackScrolling = () => {
        const wrappedElement = document.getElementById('block-table');
        if (this.isBottom(wrappedElement)) {
            // console.log('header bottom reached');
            document.removeEventListener('scroll', this.trackScrolling);
            this.setState({loadmore:true});
            this.setState({
                limit: this.state.limit+10
            }, (err, result) => {
                if (!err){
                    document.addEventListener('scroll', this.trackScrolling);
                }
                if (result){
                    this.setState({loadmore:false});
                }
            })
        }
    };

    componentDidUpdate(prevProps){
        if (this.props.location.pathname != prevProps.location.pathname){
            this.setState({
                sidebarOpen: (this.props.location.pathname.split("/blocks/").length == 2)
            })
        }
    };

    onSetSidebarOpen(open) {
        // console.log(open);
        this.setState({ sidebarOpen: open }, (error, result) =>{
            let timer = Meteor.setTimeout(() => {
                if (!open){
                    this.props.history.push('/blocks');
                }
                Meteor.clearTimeout(timer);
            },500)
        }); 
    };

    onSelect = (selected) => {
        this.setState({ selected: selected });
    };

    onToggle = (expanded) => {
        this.setState({ expanded: expanded });
    };

    render(){
        const { expanded, selected } = this.state;
        return (
        <div>
            <div style={{
                        marginLeft: expanded ? 240 : 64,
                        padding: '15px 20px 0 20px'
                    }}>
            <Helmet>
                <title>Latest Blocks on Color Explorer | Color</title>
                <meta name="description" content="Latest blocks committed by validators on Cosmos Hub" />
            </Helmet>
            <Row>
                <Col md={3} xs={12}><h1 className="d-none d-lg-block"><T>blocks.latestBlocks</T></h1></Col>
                <Col md={9} xs={12} className="text-md-right"><ChainStates /></Col>
            </Row>
            <Switch>
                <Route path="/blocks/:blockId" render={(props)=> <Sidebar 
                    sidebar={<Block {...props} />}
                    open={this.state.sidebarOpen}
                    onSetOpen={this.onSetSidebarOpen}
                    styles={{ sidebar: { 
                        background: "white", 
                        position: "fixed",
                        width: '85%',
                        zIndex: 4
                    }, overlay:{
                        zIndex: 3
                    } }}
                >
                </Sidebar>} />
            </Switch>
            <Container fluid id="block-table">
                <HeaderRecord />
                <Blocks limit={this.state.limit} />
            </Container>
            <LoadMore show={this.state.loadmore} />
            </div>
            <SideNav className="sidenav" onSelect={this.onSelect} onToggle={this.onToggle}>
                <SideNav.Toggle />
                <SideNav.Nav selected={selected} defaultSelected="blocks">
                    <NavItem eventKey="dashboard" onClick={ e => this.props.history.push("/") }>
                        <NavIcon>
                            <i className="fa fa-fw fa-th-large" style={{ fontSize: '1.75em', color: 'black' }} />
                        </NavIcon>
                        <NavText>
                            Dashboard
                        </NavText>
                        
                    </NavItem>
                    <NavItem eventKey="validators" onClick={ e => this.props.history.push("/validators") }>
                        <NavIcon>
                            <i className="fa fa-fw fa-signal" style={{ fontSize: '1.75em', color: 'black' }} />
                        </NavIcon>
                        <NavText>
                            Validators
                        </NavText>
                        
                    </NavItem>
                    <NavItem eventKey="blocks" onClick={ e => this.props.history.push("/blocks") }>
                        <NavIcon>
                            <i className="fa fa-fw fa-cube" style={{ fontSize: '1.75em', color: 'black' }} />
                        </NavIcon>
                        <NavText>
                            Blocks
                        </NavText>
                        
                    </NavItem>
                    <NavItem eventKey="transactions" onClick={ e => this.props.history.push("/transactions") }>
                        <NavIcon>
                            <i className="fa fa-fw fa-random" style={{ fontSize: '1.75em', color: 'black' }} />
                        </NavIcon>
                        <NavText>
                            Transactions
                        </NavText>
                        
                    </NavItem>
                    <NavItem eventKey="proposals" onClick={ e => this.props.history.push("/proposals") }>
                        <NavIcon>
                            <i className="fa fa-fw fa-list-ul" style={{ fontSize: '1.75em', color: 'black' }} />
                        </NavIcon>
                        <NavText>
                            Proposals
                        </NavText>
                        
                    </NavItem>
                    <NavItem eventKey="voting-power-distribution" onClick={ e => this.props.history.push("/voting-power-distribution") }>
                        <NavIcon>
                            <i className="fa fa-fw fa-bolt" style={{ fontSize: '1.75em', color: 'black'}} />
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
}
