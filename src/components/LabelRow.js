import React, { Component } from 'react'
import { Label } from 'react-bootstrap'

class LabelRow extends Component {

    render() {
        const { label, content, data } = this.props;
        return (
            <div className="row">
                <div className="col-md-2 text-right">
                    <Label bsStyle="info">{label}</Label>
                </div>
                <div className="col-md-10 text-left">
                    {content} &nbsp; {data}
                </div>
            </div>
        )
    }

}

export default LabelRow