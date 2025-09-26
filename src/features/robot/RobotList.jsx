import React, { useCallback, useEffect, useMemo } from 'react'
import { useTable, useSortBy, useGlobalFilter, useFilters } from 'react-table'
import { StyledTable, GlobalSearch, ColumnSearch, Action } from './RobotList.styles';
import { FaEye, FaEdit, FaTrash, FaCaretUp, FaCaretDown } from "react-icons/fa";
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
        <GlobalSearch
            value={filter || ""}
            onChange={(e) => setFilter(e.target.value || undefined)}
            placeholder='Search'
        ></GlobalSearch>
    )
  }, [])

  const ColumnFilter = useCallback(({ column: {filter, setFilter}}) => {
    return (
        <ColumnSearch
            value={filter || ""}
            onChange={(e) => setFilter(e.target.value || undefined)}
            placeholder='Search'
        ></ColumnSearch>
    )
  }, [])
 
  const columns = useMemo(() => [
    {Header: "ID", accessor: 'id', Filter: ColumnFilter, disableSortBy: true},
    {Header: "Robot Name", accessor: 'robotName', Filter: ColumnFilter},
    {Header: "Owner Name", accessor: 'ownerName', Filter: ColumnFilter},
    {Header: "Location", accessor: 'location', Filter: ColumnFilter},
    {Header: "Last Active", accessor: 'lastActive', Filter: ColumnFilter},
    {Header: "Firmware Version", accessor: 'firmwareVersion', Filter: ColumnFilter},
    {Header: "Actions", disableSortBy: true, Cell: ({row}) => {
        const id = row.original.id;
        return(
            <Action>
            <FaEye
              onClick={() => {
                dispatch(fetchRobotId(id));
                navigate(`/robot/${id}`);
            }}
            />
            <FaEdit
              onClick={() => {
                dispatch(fetchRobotId(id));
                navigate(`/robot/${id}/edit`);
              }}
            />
            <FaTrash
              onClick={() => dispatch(deleteRobot(id))}
            />
          </Action>
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
    <div className='card'>
      <div className='card-header'>
        <h5 className='mb-0'>Robots</h5>
      </div>
      <div className='card-body'>
        <GlobalColumnFilter filter={globalFilter} setFilter={setGlobalFilter} />
        <StyledTable {...getTableProps()}>
            <thead>
                {headerGroups.map((hg) => { 
                    const {key, ...restHgProps} = hg.getHeaderGroupProps();
                    return(
                        <tr key={key} {...restHgProps}>
                        {hg.headers.map((col) => {
                            const { key: colKey, ...restColProps } = col.getHeaderProps();
                            return(
                            <th key={colKey} {...restColProps}>
                                <div>
                                    <div {...col.getSortByToggleProps()} className='d-flex justify-content-between' >
                                      <div>{col.render("Header")}</div>
                                      {!col.disableSortBy && (
                                           <div className="sort-icons">
                                        <span className={col.isSorted && !col.isSortedDesc ? "active" : ""}>
                                          <FaCaretUp />
                                        </span>
                                        <span className={col.isSorted && col.isSortedDesc ? "active" : ""}>
                                          <FaCaretDown />
                                        </span>
                                      </div>
                                      )}
                                    </div>
                                </div>
                                <div>
                                  {col.canFilter ? col.render("Filter") : null }
                                </div>
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
      </div>
        
    </div>
  )
}
