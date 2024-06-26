import { useReducer, useState } from "react";
import './Excel.css';

let originalData = null;
function reducer(data, action) {
    if (action.type === 'sort') {
      const {column, descending} = action.payload;
      return structuredClone(data).sort((a, b) => {
        if (a[column] === b[column]) {
          return 0;
        }
        return descending
          ? a[column] < b[column]
            ? 1
            : -1
          : a[column] > b[column]
            ? 1
            : -1;
      });
    }
    if (action.type === 'save') {
      data[action.payload.edit.row][action.payload.edit.column] =
        action.payload.value;
      return data;
    }
    if (action.type === 'startSearching') {
      originalData = data;
      return originalData;
    }
    if (action.type === 'doneSearching') {
      return originalData;
    }
    if (action.type === 'search') {
      return originalData.filter((row) => {
        return (
          row[action.payload.column]
            .toString()
            .toLowerCase()
            .indexOf(action.payload.needle.toLowerCase()) > -1
        );
      });
    }
  }

function Excel({headers, initialData}) {
    const [data, dispatch] = useReducer(reducer, initialData);
    const [sorting, setSorting] = useState({
      column: null,
      descending: false,
    });
    const [edit, setEdit] = useState(null);
    const [search, setSearch] = useState(false);

    function sort(e) {
      const column = e.target.cellIndex;
      const descending = sorting.column === column && !sorting.descending;
      setSorting({column, descending});
      dispatch({type: 'sort', payload: {column, descending}});
    }

    function showEditor(e) {
      setEdit({
        row: parseInt(e.target.parentNode.dataset.row, 10),
        column: e.target.cellIndex,
      });
    }

    function save(e) {
      e.preventDefault();
      const value = e.target.firstChild.value;
      dispatch({
        type: 'save',
        payload: {
          edit,
          value,
        },
      });
      setEdit(null);
    }

    function toggleSearch() {
      if (!search) {
        dispatch({
          type: 'startSearching',
        });
      } else {
        dispatch({
          type: 'doneSearching',
        });
      }
      setSearch(!search);
    }

    function filter(e) {
      const needle = e.target.value;
      const column = e.target.dataset.idx;
      dispatch({
        type: 'search',
        payload: {needle, column},
      });
      setEdit(null);
    }

    const searchRow = !search ? null : (
      <tr onChange={filter}>
        {headers.map((_, idx) => (
          <td key={idx}>
            <input type="text" data-idx={idx} />
          </td>
        ))}
      </tr>
    );

    return (
      <div className="Excel">
        {/* <div className="toolbar">
          <button onClick={toggleSearch}>
            {search ? 'Hide search' : 'Show search'}
          </button>
        </div> */}
        <table>
          <thead onClick={sort}>
            <tr>
              {headers.map((title, idx) => {
                if (sorting.column === idx) {
                  title += sorting.descending ? ' \u2191' : ' \u2193';
                }
                return <th key={idx}>{title}</th>;
              })}
            </tr>
          </thead>
          <tbody onDoubleClick={showEditor}>
            {searchRow}
            {data.map((row, rowidx) => (
              <tr key={rowidx} data-row={rowidx}>
                {row.map((cell, columnidx) => {
                  if (
                    edit &&
                    edit.row === rowidx &&
                    edit.column === columnidx
                  ) {
                    cell = (
                      <form onSubmit={save}>
                        <input type="text" defaultValue={cell} />
                      </form>
                    );
                  }
                  return <td key={columnidx}>{cell}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  export default Excel;