import styled from "styled-components";
import { Form, FloatingLabel } from 'react-bootstrap';

export const AuthPage = styled.div`
    width: 500px;
    padding: 2.5rem;
    background: var(--light-color);
    margin: auto;
    box-shadow: 0 3px 3px rgba(0, 0, 0, 0.025);
`

export const LogoImg = styled.div`
    background: var(--light-color);
    padding: 6px;
    border-radius: 50%;
    width: max-content;
    margin: 0 auto;
`
export const CustomFloatingLabel = styled(FloatingLabel)`
  > label {
    padding-left: 0 !important;
  }
`;

export const CustomFormControl = styled((Form.Control))`
    padding-left: 4px !important;
    background: unset;
    border-width: 0 0 1px 0;
    border-radius: 0;
    &:focus{
        background-color: unset;
        border-color: var(--secondary-color);
        box-shadow: unset;
    }
`

export const Button = styled.button`
    background-color: var(--primary-color);
    width: 100%;
    border-radius: 0.375rem;
`