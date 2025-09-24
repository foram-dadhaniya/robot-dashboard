import styled from "styled-components";

export const StyledTable = styled.table`
    border-collapse: collapse;
    width: 100%;
    th, td {
        border: 1px solid #ddd;
        padding: 8px;
    }
    th {
        background: #f4f4f4;
        text-align: left;
    }
    tr:hover {
        background: #f9f9f9;
    }
`