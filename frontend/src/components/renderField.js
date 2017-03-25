import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  width: 80%;
  margin: auto;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

const Error = styled.span`
  background-color: rgba(214, 66, 66, 0.1);
  border-color: rgba(214, 66, 66, 0.05);
  color: #d64242;
`;

const renderField = ({ input, label, type, meta: { touched, error, invalid, warning } }) => (
  <div className={`form-group ${touched && invalid ? 'has-error' : ''}`}>
    <label  className="control-label">{label}</label>
    <div>
      <StyledInput {...input} className="form-control"  placeholder={label} type={type}/>
       <div className="help-block">
      {touched && ((error && <Error>{error}</Error>) || (warning && <span>{warning}</span>))}
      </div>
    </div>
  </div>
)

export default renderField;
