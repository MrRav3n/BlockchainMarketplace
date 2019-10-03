import React from 'react'

class Navbar extends React.Component {
    render() {
        return(
            <nav className="navbar navbar-dark bg-dark text-white">
            <div className="container">
                <a className="navbar-brand" href="#">Modern marketplace</a>
                <span className="text-white ml-auto">
                Your account: {this.props.account}
                </span>
                </div>
            </nav>
        );
    }

}

export default Navbar
