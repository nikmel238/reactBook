import { useReducer, useState, useRef } from "react";
import './Excel.css';
import PropTypes from 'prop-types';
import Actions from "./Actions";
import classNames from 'classnames';
import Rating from './Rating';
import Dialog from './Dialog';
import Form from './Form';

let originalData = null;
function reducer(data, action) {
    if (action.type === 'sort') {
      const {column, descending} = action.payload;
      return data.sort((a, b) => {
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
      const {int, edit} = action.payload;
      data[edit.row][edit.column] = int 
        ? parseInt(action.payload.value, 10) : action.payload.value;
    }
    if (action.type === 'delete') {
      data = structuredClone(data);
      data.splice(action.payload.rowidx, 1);
    }
    if (action.type === 'saveForm') {
      Array.from(action.payload.form.current).forEach(
        (input) => (data[action.payload.rowidx][input.id] = input.value),
      );
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
    setTimeout(() => action.payload.onDataChange(data));
    return data;
  }

function Excel({schema, headers, initialData, onDataChange, filter}) {
    const [data, dispatch] = useReducer(reducer, initialData);
    const [sorting, setSorting] = useState({
      column: ``,
      descending: false,
    });
    const [edit, setEdit] = useState(null);
    const [dialog, setDialog] = useState(null);

    const form = useRef(null);

    function sort(e) {
      const column = e.target.dataset.id;
      // столбец "Действия" не подлежит сортировке
      if(!column) {
        return;
      }

      const descending = sorting.column === column && !sorting.descending;
      setSorting({column, descending});
      dispatch({type: 'sort', payload: {column, descending}});
    }

    function showEditor(e) {
      const config = e.target.dataset.schema;
      if (!config || config === `rating`){
        return;
      }
      setEdit({
        row: parseInt(e.target.parentNode.dataset.row, 10),
        column: config,
      });
    }

    function save(e) {
      e.preventDefault();
      const value = e.target.firstChild.value;
      const valueType = schema[e.target.parentNode.dataset.schema].type;
      dispatch({
        type: 'save',
        payload: {
          edit,
          value,
          onDataChange,
          int: valueType === 'year' || valueType === 'rating',
        },
      });
      setEdit(null);
    }

    function handleAction(rowidx, type){
      if (type === `delete`){
        setDialog(
          <Dialog
            modal
            header='Подтвердите удаление'
            confirmLabel='Удалить'
            onAction={(action) => {
              setDialog(null);
              if (action === 'confirm'){
                dispatch({
                  type: 'delete',
                  payload: {
                    rowidx,
                    onDataChange,
                  },
                });
              }
            }}
          >{`Вы действительно хотите удалить '${data[rowidx].name}'`}</Dialog>
        );
      }
      const isEdit = type === 'edit';
      if (type === 'info' || isEdit) {
        const formPrefill = data[rowidx];
        setDialog(
          <Dialog
            modal
            extendedDismiss={!isEdit}
            header={isEdit ? 'Редактировать элемент' : 'Подробная инфомрация'}
            confirmLabel={isEdit ? 'Сохранить' : 'OK'}
            hasCancel={isEdit}
            onAction={(action) => {
              setDialog(null);
              if (isEdit && action === 'confirm') {
                dispatch({
                  type: 'saveForm',
                  payload: {
                    rowidx,
                    onDataChange,
                    form,
                  }
                });
              }
            }}>
            <Form
              ref={form}
              fields={schema}
              initialData={formPrefill}
              readonly={!isEdit}
            />
          </Dialog>,
        );
    }
  }



    return (
      <div className="Excel">
        <table>
          <thead onClick={sort}>
            <tr>
              {Object.keys(schema).map((key) => {
                let {label, show} = schema[key];
                if (!show) {
                  return null;
                }
                if (sorting.column === key) {
                  label += sorting.descending ? ` \u2191` : ` \u2193`;
                }
                return (
                  <th key={key} data-id={key}>
                    {label}
                  </th>
                )
                })}
                <th className="ExcelNotSortable">Действия</th>
            </tr>
          </thead>
          <tbody onDoubleClick={showEditor}>

            {data.map((row, rowidx) => {

              if (filter) {
                const needle = filter.toLowerCase();
                let match = false;
                const fields = Object.keys(schema);
                for (let f = 0; f < fields.length; f++) {
                  if (row[fields[f]].toString().toLowerCase().includes(needle)){
                    match = true;
                  }
                }
                if (!match) {
                  return null;
                }
              }
              
              return (
                <tr key={rowidx} data-row={rowidx}>
                {Object.keys(row).map((cell, columnidx) => {
                  const config = schema[cell];
                  if (!config.show) {
                    return null;
                  }
                  let content = row[cell];
                  if (edit && edit.row === rowidx && edit.column === cell){
                    content = (
                      <form onSubmit={save}>
                        <input type="text" defaultValue={content}/>
                      </form>
                    );
                  } else if (config.type === `rating`) {
                    content = (
                      <Rating 
                        id={cell}
                        readonly key={content}
                        defaultValue={Number(content)}  
                      />
                    )
                  }
                  return (
                    <td 
                      key={columnidx}
                      data-schema={cell}
                      className={classNames({
                        [`schema-${cell}`]: true,
                        ExcelEditable: config.type !== `rating`,
                        ExcelDataLeft: config.align === `left`,
                        ExcelDataRight: config.align === `right`,
                        ExcelDataCenter: config.align !== `left` && config.align !== `right`,
                      })}
                    >{content}</td>
                  );
                })}
                <td>
                  <Actions onAction={handleAction.bind(null, rowidx)}/>
                </td>
              </tr>
              );
            }
            )}
          </tbody>
        </table>
        {dialog}
      </div>
    );
  }

  Excel.propTypes = {
    schema: PropTypes.object,
    initialData: PropTypes.arrayOf(PropTypes.object),
    onDataChange: PropTypes.func,
    filter: PropTypes.string,
  }
 
export default Excel;