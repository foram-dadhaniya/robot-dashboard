import React, { useCallback, useEffect, useMemo } from 'react'
import { useTable, useSortBy, useGlobalFilter, useFilters } from 'react-table'
import { StyledTable } from './RobotList.styles';
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { deleteRobot, fetchRobotId, fetchRobots } from './robot.slice';
import { useNavigate } from 'react-router-dom';

export const RobotList = () => {
  const dispatch = useDispatch();
  const navigate =useNavigate();
  const { data:robots, loading, error } = useSelector((state) => state.robots);
  useEffect(() => {
    dispatch(fetchRobots());
  }, [dispatch])

  const GlobalColumnFilter = useCallback( ({filter, setFilter}) => {
    return (
        <input
            value={filter || ""}
            onChange={(e) => setFilter(e.target.value || undefined)}
            placeholder='Search'
            style={{width:"100%", padding:"4px"}}
        ></input>
    )
  }, [])

  const ColumnFilter = useCallback(({ column: {filter, setFilter}}) => {
    return (
        <input
            value={filter || ""}
            onChange={(e) => setFilter(e.target.value || undefined)}
            placeholder='Search'
        ></input>
    )
  }, [])
 
  const columns = useMemo(() => [
    {Header: "ID", accessor: 'id', Filter: ColumnFilter},
    {Header: "Robot Name", accessor: 'robotName', Filter: ColumnFilter},
    {Header: "Owner Name", accessor: 'ownerName', Filter: ColumnFilter},
    {Header: "Location", accessor: 'location', Filter: ColumnFilter},
    {Header: "Last Active", accessor: 'lastActive', Filter: ColumnFilter},
    {Header: "Firmware Version", accessor: 'firmwareVersion', Filter: ColumnFilter},
    {Header: "Actions", Cell: ({row}) => {
        const id = row.original.id;
        return(
            <div style={{ display: "flex", gap: "10px" }}>
            <FaEye
              style={{ cursor: "pointer", color: "#40738d" }}
              onClick={() => {
                dispatch(fetchRobotId(id));
                navigate(`/robot/${id}`);
            }}
            />
            <FaEdit
              style={{ cursor: "pointer", color: "#40738d" }}
              onClick={() => {
                dispatch(fetchRobotId(id));
                navigate(`/robot/${id}/edit`);
              }}
            />
            <FaTrash
              style={{ cursor: "pointer", color: "#40738d" }}
              onClick={() => dispatch(deleteRobot(id))}
            />
          </div>
        )
        
}}
], [dispatch, navigate])  
  const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, state, setGlobalFilter} = useTable(
    {
        columns, data: robots,
        getRowId: (row) => row.id,
    }, useGlobalFilter, useFilters, useSortBy);

  const {globalFilter} = state;  
  if (loading) return <p>Loading robots...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
         <GlobalColumnFilter filter={globalFilter} setFilter={setGlobalFilter} />
    <StyledTable {...getTableProps()}>
        <thead>
            {headerGroups.map((hg) => { 
                const {key, ...restHgProps} = hg.getHeaderGroupProps();
                return(
                    <tr key={key} {...restHgProps}>
                    {hg.headers.map((col) => {
                        const { key: colKey, ...restColProps } = col.getHeaderProps(col.getSortByToggleProps());
                        return(
                        <th key={colKey} {...restColProps}>
                            <div className='d-flex justify-content-between'>
                                <span>{col.render("Header")}</span>
                                <span className='sort-icons'>
                                    <span className={col.isSorted && !col.isSortedDesc ? "active" : ""}>▼</span>
                                    <span className={col.isSorted && col.isSortedDesc ? "active" : ""}>▲</span>
                                </span>
                            </div>
                            {col.canFilter ? col.render("Filter") : null }
                        </th>
                    )
                    })}
                </tr>
                )
        })}
        </thead>
        <tbody {...getTableBodyProps()}>
            {rows.map(row => {
                prepareRow(row);
                const { key, ...restRowProps } = row.getRowProps()
                return(
                    <tr key={key} {...restRowProps}>
                        {row.cells.map(cell => {
                            const { key, ...restCellProps } = cell.getCellProps()
                            return(
                            <td key={key} {...restCellProps}>{cell.render("Cell")}</td>
                        )
                        })}
                    </tr>
                )
            })}
        </tbody>
    </StyledTable>
    </>
  )
}
