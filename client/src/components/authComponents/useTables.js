import React, { useState } from 'react';
import { makeStyles, Table, TableCell, TableHead, TablePagination } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    table: {
        marginTop: theme.spacing(3),
        '& thead th': {
            fontWeight: '600',
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.primary.light,
        },
        '& tbody td': {
            fontWeight: '300',
        },
        '& tbody tr:hover': {
            backgroundColor: '#fffbf2',
            cursor: 'pointer',
        }
    }
}))

export default function useTable(records, headCells) {
    const classes = useStyles();
    const pages = [5, 10, 25]
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(pages[page]);
    const TblContainer = props => (
        <table className={classes.table}>
            {props.children}
        </table>
    )

    const TblHead = () => {
        return (
            <TableHead>
                {
                    headCells.map(headCells => (
                        <TableCell key={headCells.id}>
                            {headCells.label}
                        </TableCell>
                    ))
                }
            </TableHead>
        )
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowPage = (event, newPage) => {
        setRowsPerPage(parseInt(event.target.value, 1));
        setPage(newPage);
    }

    //const recordsAfterPagingAndSorting = () =>{
    //    return Array.from(records).slice(page*rowsPerPage,(page-1)*rowsPerPage)
    //}

    const TblPagination = () => (
        <TablePagination
            component='div'
            page={page}
            count={records.length}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={pages}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowPage}
        />
    )

    return { TblPagination, TblContainer, TblHead }
}

export function useTables(records, headCells) {
    const classes = useStyles();
    const pages = [5, 10, 25]
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(pages[page]);

    const TblContainer = props => (
        <Table className={classes.table}>
            {props.children}
        </Table>
    )

    const TblHead = () => {
        return (
            <TableHead>
                {
                    headCells.map(headCells => (
                        <TableCell key={headCells.id}>
                            {headCells.label}
                        </TableCell>
                    ))
                }
            </TableHead>
        )
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowPage = (event, newPage) => {
        setRowsPerPage(parseInt(event.target.value, 1));
        setPage(newPage);
    }

    //const recordsAfterPagingAndSorting = () =>{
    //    return records.slice(page*rowsPerPage,(page+1)*rowsPerPage);
    //}

    const TblPagination = () => (
        <TablePagination
            component='div'
            page={page}
            count={records.length}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={pages}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowPage}
        />
    )

    return { TblPagination, TblContainer, TblHead }
}
