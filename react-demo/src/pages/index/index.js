import React, { Component } from 'react';
export default class index extends Component {
    push = (p) => this.props.history.push(p)
    render() {
        return (
            <div>
                <h1 onClick={()=>this.push('/button')}>home</h1>
                <img src={require('@/assets/none_resource.png')} alt=""/>
                {/* <img src={img} alt=""/> */}
            </div>
        )
    }
}
