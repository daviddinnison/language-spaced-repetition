import React from 'react';
import { connect } from 'react-redux';


export class Test extends React.Component {

    render() {
      return (
        <div>
          <p>THIS IS THE TEST COMPONENT....</p>
        </div>
      );
    }
  }
  
  const mapStateToProps = state => ({

  });

export default connect()(Test);