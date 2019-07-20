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
            return <p className="MultiSend">Message Multi Send</p>
            
            // staking
        case "cosmos-sdk/MsgCreateValidator":
            return <p className="Withdraw">Create Validator</p>
        case "cosmos-sdk/MsgEditValidator":
            return <p className="Withdraw">Edit Validator</p>
        case "cosmos-sdk/MsgDelegate":
            return <p className="Delegate">Delegate</p>
        case "cosmos-sdk/MsgUndelegate":
            return <p className="Delegate">Undelegate</p>
        case "cosmos-sdk/MsgBeginRedelegate":
            return <p className="Delegate">Redelegate</p>
            
            // gov
        case "cosmos-sdk/MsgSubmitProposal":
            return <p className="Send">Submit Proposal</p>
        case "cosmos-sdk/MsgDeposit":
            return <p className="Send">Deposit</p>
        case "cosmos-sdk/MsgVote":
            return <p className="Send">Vote</p>
            
            // distribution
        case "cosmos-sdk/MsgWithdrawValidatorCommission":
            return <p className="Withdraw">Withdraw Commission</p>
        case "cosmos-sdk/MsgWithdrawDelegationReward":
            return <p className="Withdraw">Withdraw</p>
        case "cosmos-sdk/MsgModifyWithdrawAddress":
            return <p className="Withdraw">Modify Withdraw Address</p>
    
            // slashing
        case "cosmos-sdk/MsgUnjail":
            return <p className="Delegate">Unjail</p>
            
            // ibc
        case "cosmos-sdk/IBCTransferMsg":
            return <p className="Delegate">IBC Transfer</p>
        case "cosmos-sdk/IBCReceiveMsg":
            return <p className="Send">IBC Receive</p>
    
        default:
            return <p className="Send">Send</p>
    }
}