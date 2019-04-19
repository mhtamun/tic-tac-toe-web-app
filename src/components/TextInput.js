import * as React from "react";
import styled from "styled-components";

const Input = styled.input`
	height: 100%;
	width: 100%;
	padding-left: 20px;
    outline: none;
    color: #000;
	font-family: Roboto;
	font-size: 30px;
	background-color: ${props => props.selected ? `#D3D3D3` : `white`};
	
	@media (max-width: 720px) {
	    font-size: 20px;
    }
	
	@media (max-width: 320px) {
	    font-size: 20px;
    }
`;

const TextInput = props => (
    <Input
        name={props.name}
        type={props.type}
        value={props.value}
        placeholder={props.hint}
        selected={props.selected}
        onChange={props.onChange}
    />
);

export default TextInput;
