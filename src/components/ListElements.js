import React from 'react'

class ListElements extends React.Component {
    render() {
        return(
            <div className="container mt-5">
            <table className="table">
              <thead>
                <tr>
                  <th className="text-center">#</th>
                  <th className="text-center">Name</th>
                  <th className="text-center">Description</th>
                  <th className="text-center">Price</th>
                  <th className="text-center ">Owner</th>
                  <th className="font-weight-bolder text-white"> Buy Product</th>
                </tr>
              </thead>
              <tbody>

              {this.props.items.map((item) => {
                  return(
                  <tr key={item.id.toString()}>
                    <th className="text-center">{item.id.toString()}</th>
                    <td className="text-center">{item.name}</td>
                    <td className="text-center">{item.description}</td>
                    <td className="text-center">{item.price.toString()} ETH</td>
                    <td className="text-center">{item.owner}</td>
                    <td className="ml-auto">
                    {item.isBought
                        ? null
                        : <button type="button" className="btn btn-primary buttonBuy mr-auto ml-auto mt-0" onClick={(e) => this.props.buyProduct(item.id.toNumber(), item.price.toNumber())}>Buy</button> }
                    </td>
                  </tr>
              );
              })}


              </tbody>
            </table>

            </div>
        );
    }

}

export default ListElements
