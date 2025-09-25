import styled from "styled-components";

export const StyledTable = styled.table`
    border-collapse: collapse;
    width: 100%;
    font-size: 14px;
    th, td {
        border-bottom: 1px solid #ddd;
        padding: 8px;
    }
    th {
        text-align: left;
        vertical-align: sub;
    }
    tr{
        &:last-child td{
            border-bottom: unset;
        }
    }
    tr:hover {
        background: #f9f9f9;
    }
    .sort-icons span {
    color: #aaa;       
    cursor: pointer;
    font-size: 16px;   
    }

    .sort-icons span.active {
    color: var(--primary-color);      
    }
`

export const GlobalSearch = styled.input`
   background: unset;
    border: 1px solid #d1d1d1;
    border-radius: 5px;
    height: 35px;
    padding: 10px;
    width: 500px;
    margin-bottom: 10px;
`

export const ColumnSearch = styled.input`
   background: unset;
    border: 1px solid #d1d1d1;
    border-radius: 5px;
    height: 35px;
    margin-bottom: 10px;
    padding: 10px;
    &:focus{
        outline: none;
    }
`

export const Action = styled.div`
    display: flex;
    gap: 10px;
    svg{
        color: var(--primary-color);
        cursor: "pointer"
    }
`