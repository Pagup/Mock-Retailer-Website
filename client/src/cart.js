import React, {useState, useEffect} from "react";
import {flags} from './App.js';

export var Cart = {};

function ChangeInnerHTML(id, replacement)
{
	const elem = document.getElementById(id);
	elem.innerHTML = replacement;
}

function CartItemsNumber()
{
	let ret = 0;
	
	Object.entries(Cart).forEach(([key, [num, val]]) => ret += num); 
	
	return ret;
}


export function AddToCart(name, price)
{
	if(!Cart[name])
	{
	Cart[name] = [0, price];
	}
	
	Cart[name].[0]++;
	
	flags.numberOfCartItems = CartItemsNumber();
	
	
	ChangeInnerHTML("cart", flags.numberOfCartItems);
	
	console.log(flags.numberOfCartItems);
	console.log(Cart);
}

export function RemoveFromCart(name)
{
	if(!Cart[name])
	{
	console.log("Error! Cannot remove nothing from cart!");	
	}
	else if(Cart[name][0] === 1)
	{
	delete Cart[name];	
	}
	else
	{
	Cart[name][0]--;	
	}

	flags.numberOfCartItems = CartItemsNumber();

	ChangeInnerHTML("cart", flags.numberOfCartItems);
}

function CartListButton(specifier, name, price)
{
	if(specifier === "add")
	{
	AddToCart(name, price);
	}
	else
	{
	RemoveFromCart(name);	
	}

	let valueReplace = 0;

	if(typeof Cart[name] != "undefined")
	{
	valueReplace = Cart[name][0];
	}
	else
	{
		
	}	
	
	
	ChangeInnerHTML(("item-" + name), valueReplace);
}

export function CartPage(props)
{
	const state = props.flags.websiteState;
	
	if(state === "Cart") 
	{
		
		let cartItems = [];
		
		
		Object.entries(Cart).forEach( ([key, [num, price]]) => 
			cartItems.push(
			<li className="list-group-item d-flex justify-content-between align-items-center gx-5" id={key + "-holder"}>
				<span className="cart-list-piece">{key}</span>
				<span className="cart-list-piece">${price}</span>
				<span style={{width: "50px"}}><span className="badge bg-primary rounded-pill" id={"item-" + key}>{num}</span></span>
					<div className="btn-group" role="group" aria-label="Basic example">
					<button type="button" class="btn btn-danger btn-sm cart-page-btn" onClick={ () => { CartListButton("sub", key, price) } }>-</button>
					<button type="button" class="btn btn-primary btn-sm cart-page-btn" onClick={ () => { CartListButton("add", key, price) } }>+</button>
					</div>
			</li>) ); 
			
		
	return(
	<ul className="list-group cart-list">
		<li className="list-group-item d-flex justify-content-between align-items-center" style={{"font-size": "25px"}}>
		Your Cart
		<span className="badge bg-primary rounded-pill" id="cart">{CartItemsNumber()}</span>
		</li>
		{cartItems}
		<li className="list-group-item d-flex justify-content-between align-items-center" style={{"font-size": "25px"}}>
		Total Price
		<span>{}</span>
		</li>
	</ul>);
	}
		
	return null;	
}




export default CartItemsNumber;