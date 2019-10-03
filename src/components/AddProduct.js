import React from 'react'

class AddProduct extends React.Component {
    render() {
        return(
            <span>
               <h1 className="text-center mt-3 text-white">Add new product</h1>
               <form className="form-inline justify-content-center mt-4" onSubmit={(event) => {
                   event.preventDefault();
                   this.props.productAdd(this.price.value, this.name.value, this.description.value);
               }}>
                 <div className="form-group mx-sm-3 mb-2 d-flex ">
                   <input ref={(input) => this.name=input} className="form-control mr-2" placeholder="Name" />
                   <input ref={(input) => this.price=input} className="form-control mr-2" placeholder="Price" />
                   <input ref={(input) => this.description=input} className="form-control " placeholder="Description" />
                   <button type="submit" className="btn btn-primary ml-3">Add product</button>
                 </div>
               </form>
               </span>
        );
    }

}

export default AddProduct
