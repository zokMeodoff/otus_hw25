import React from 'react'
import './Form.css'

const Form = (props) => (
    <div className='form'>
        <form>
            {props.children}
        </form>
    </div>
);

export default Form;