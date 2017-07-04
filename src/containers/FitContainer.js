import React, { Component } from 'react';

import { connect } from 'react-redux';

import { createFit } from '../state/Fits';

import AddFitPromptCard from '../components/app/AddFitPromptCard';
import FitCreateCard from '../components/app/FitCreateCard';
import FitItemSelectCard from '../components/app/FitItemSelectCard';

class FitContainer extends Component {
  render(){
    const { dispatch } = this.props;

    if (this.props.is_selecting){
      return <FitItemSelectCard/>
    } else if (this.props.is_creating){
      return <FitCreateCard/>
    }

    return <AddFitPromptCard onPressHandler={createFit(dispatch)}/>
  }
}

const mapStateToProps = (state, props) => {
  return {
    is_creating: state.fit.form_for ? true : false,
    is_selecting: state.clothing.filter ? true : false,
  }
}

export default connect(mapStateToProps)(FitContainer);
