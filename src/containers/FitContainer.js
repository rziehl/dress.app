import React, { Component } from 'react';

import { connect } from 'react-redux';

import { createNewFit } from '../actions/FitActions';

import AddFitPromptCard from '../components/app/AddFitPromptCard';
import FitCreateContainer from './FitCreateContainer';
import FitItemSelectCard from '../components/app/FitItemSelectCard';

class FitContainer extends Component {
  render(){
    if (this.props.is_selecting){
      return <FitItemSelectCard/>
    } else if (this.props.is_creating){
      return <FitCreateContainer/>
    }

    return <AddFitPromptCard onPressHandler={this.props.onAddFit}/>
  }
}

const mapStateToProps = (state, props) => {
  return {
    is_creating: state.fits.current ? true : false,
    is_selecting: state.clothes.filter ? true : false,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddFit: () => { dispatch(createNewFit()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FitContainer);
