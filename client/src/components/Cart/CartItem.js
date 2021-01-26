import React from 'react'

export default function CartItem({ item, value }) {
    const { _id, title, selectedFile, price, total, count } = item;
    const { increament, decreament, removeItem } = value;
    return (
        <div className="row my-2 text-center text-capitalize">
            <div className="col-10 mx-auto col-lg-2">
                <img src={selectedFile} style={{ width: "5rem", height: "5rem" }} className="container-fluid" alt="product" />
            </div>
            <div className="col-10 mx-auto col-lg-2">
                <span className="d-lg-none">Product : </span>{title}
            </div>
            <div className="col-10 mx-auto col-lg-2">
                <span className="d-lg-none">Price : </span>{price}
            </div>
            <div className="col-10 mx-auto col-lg-2 my-2 my-lg-0">
                <div className="d-flex justify-content-center">
                    <div>
                        <span className="btn btn-black mx-1" onClick={() => decreament(_id)}>
                            -
                        </span>
                        <span className="btn btn-black mx-1">
                            {count}
                        </span>
                        <span className="btn btn-black mx-1" onClick={() => increament(_id)}>
                            +
                        </span>
                    </div>
                </div>
            </div>
            <div className="col-10 mx-auto col-lg-2">
                <div className="cart-icon" onClick={() => removeItem(_id)}>
                    <i className="fas fas-trash" />
                </div>

            </div>
            <div className="col-10 mx-auto col-lg-2">
                <strong>Item total : {total}</strong>

            </div>

        </div>
    )
}
