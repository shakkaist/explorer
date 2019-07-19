import React from 'react';
// import { Badge } from 'reactstrap';
import i18n from 'meteor/universe:i18n';

const T = i18n.createComponent();
export const DenomSymbol = (props) => {
    switch (props.denom){
    case "steak":
        return '🥩';
    default:
        return '🍅';
    }
}


export const ProposalStatusIcon = (props) => {
    switch (props.status){
    case 'Passed':
        return <i className="fas fa-check-circle text-success"></i>;
    case 'Rejected':
        return <i className="fas fa-times-circle text-danger"></i>;
    case 'Removed':
        return <i className="fas fa-trash-alt text-dark"></i>
    case 'DepositPeriod':
        return <i className="fas fa-battery-half text-warning"></i>;
    case 'VotingPeriod':
        return <i className="fas fa-hand-paper text-info"></i>;
    default:
        return <i></i>;
    }
}

export const VoteIcon = (props) => {
    switch (props.vote){
    case 'yes':
        return <i className="fas fa-check text-success"></i>;
    case 'no':
        return <i className="fas fa-times text-danger"></i>;
    case 'abstain':
        return <i className="fas fa-user-slash text-warning"></i>;
    case 'no_with_veto':
        return <i className="fas fa-exclamation-triangle text-info"></i>;
    default:
        return <i></i>;
    }
}

export const TxIcon = (props) => {
    if (props.valid){
        return <span className="text-success text-nowrap"><i className="fas fa-check-circle">Success</i></span>;
    }
    else{
        return <span className="text-danger text-nowrap"><i className="fas fa-times-circle">Failed</i></span>;
    }
}

export const Type = (props) => {
    switch (props.badge){
        case 'cosmos-sdk/MsgSend':
            return <p className="Send">Send</p>
        case "cosmos-sdk/MsgMultiSend":
            return <p>Message Multi Send</p>
            
            // staking
        case "cosmos-sdk/MsgCreateValidator":
            return <p>Message Create Validator</p>
        case "cosmos-sdk/MsgEditValidator":
            return <p>Message Edit Validator</p>
        case "cosmos-sdk/MsgDelegate":
            return <p>Message Delegate</p>
        case "cosmos-sdk/MsgUndelegate":
            return <p>Message Undelegate</p>
        case "cosmos-sdk/MsgBeginRedelegate":
            return <p>Message Begin Redelegate</p>
            
            // gov
        case "cosmos-sdk/MsgSubmitProposal":
            return <p>Message Submit Proposal</p>
        case "cosmos-sdk/MsgDeposit":
            return <p>Message Deposit</p>
        case "cosmos-sdk/MsgVote":
            return <p>Message Vote</p>
            
            // distribution
        case "cosmos-sdk/MsgWithdrawValidatorCommission":
            return <p>Message Withdraw Validator Commission</p>
        case "cosmos-sdk/MsgWithdrawDelegationReward":
            return <p>Message Withdraw Delegation Reward</p>
        case "cosmos-sdk/MsgModifyWithdrawAddress":
            return <p>Message Modify Withdraw Address</p>
    
            // slashing
        case "cosmos-sdk/MsgUnjail":
            return <p>Message Unjail</p>
            
            // ibc
        case "cosmos-sdk/IBCTransferMsg":
            return <p>IBC Transfer Message</p>
        case "cosmos-sdk/IBCReceiveMsg":
            return <p>IBC Receive Message</p>
    
        default:
            return <p className="Send">Send</p>
    }
}