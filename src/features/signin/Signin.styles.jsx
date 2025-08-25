import styled from "styled-components";
import { Form, FloatingLabel } from 'react-bootstrap';

export const AuthPage = styled.div`
    width: 500px;
    padding: 2.5rem;
    background: var(--light-color);
`

export const Logo = styled.div`
    background: var(--primary-color);
    padding: 10px;
    border-radius: 50%;
    width: max-content;
    margin: 0 auto 1rem auto;
`
export const CustomFormControl = styled((Form.Control))`
    padding: 0.5rem;
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
    background-color: var(--secondary-color);
    width: 100%;
    border-radius: 0.375rem;
`