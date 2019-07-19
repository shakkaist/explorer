
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, Alert, Spinner } from 'reactstrap';
import { TxIcon, Type } from '../components/Icons.jsx';
import Activities from '../components/Activities.jsx';
import CosmosErrors from '../components/CosmosErrors.jsx';
import TimeAgo from '../components/TimeAgo.jsx';
import numbro from 'numbro';
// import {MsgType} from '../components/MsgType.jsx';

export const TransactionRow = (props) => {
    let tx = props.tx;
    // console.log(tx);
    return <Row className={(tx.code)?"tx-info invalid":"tx-info"}>
        {(!props.blockList)?<Col xs={2} md={1}>{(!tx.tx.value.msg[0].type)?<Type badge />:<Type />}</Col>:''}
        {/* <Col xs={12} lg={7} className="activity">{(tx.tx.value.msg && tx.tx.value.msg.length >0)?tx.tx.value.msg.map((msg,i) => {
            return <Card body key={i}><Activities msg={msg} invalid={(!!tx.code)} tags={tx.tags} /></Card>
        }):''}</Col> */}
        {/* {tx.tx.value.msg[0].type} */}
        {(!props.blockList)?<Col xs={2} md={2}>{(!tx.code)?<TxIcon valid />:<TxIcon />}</Col>:''}

        {(!props.blockList)?<Col xs={2} md={2}>{tx.tx.value.msg[0].value.amount}</Col>:''}

        <Col xs={(!props.blockList)?2:2} md={(!props.blockList)?2:2} className="fee"><i className="material-icons d-lg-none">monetization_on</i> {tx.tx.value.fee.amount?tx.tx.value.fee.amount.map((fee,i) => {
            return <span className="text-nowrap" key={i}>{numbro(fee.amount).format(0,0)}</span>
        }):<span>No fee</span>}</Col>
        {(!props.blockList)?<Col xs={2} md={2}><i className="fas fa-database d-lg-none"></i> <Link to={"/blocks/"+tx.height}>{numbro(tx.height).format("0,0")}</Link></Col>:''}
        <Col xs={(!props.blockList)?{size:6,order:"first"}:{size:12,order:"first"}} md={(!props.blockList)?{size:3, order: "first"}:{size:7, order: "first"}} lg={(!props.blockList)?{size:1,order:"first"}:{size:2,order:"first"}} className="text-truncate"><i className="fas fa-hashtag d-lg-none"></i> <Link to={"/transactions/"+tx.txhash}>{tx.txhash}</Link></Col>
        {(!props.blockList)?<Col xs={2} md={2} className="text-nowrap"><span>{tx.block()?<TimeAgo time={tx.block().time} />:''}</span></Col>:''}
        {(tx.code)?<Col xs={{size:12, order:"last"}} className="error">
            <Alert color="danger">
                <CosmosErrors 
                    code={tx.code}
                    logs={tx.logs}
                    gasWanted={tx.gas_wanted}
                    gasUses={tx.gas_used}
                />
            </Alert>
        </Col>:''}

    </Row>
}
