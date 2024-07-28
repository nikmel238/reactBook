import PropTypes from 'prop-types';
import Button from "./Button";
import './Actions.css';

import editImage from './../images/edit.svg';
import deleteImage from './../images/close.svg';

const Actions = ({onAction = () => {}}) => {
    return (
        <span className="Actions">
        <Button
            className='ActionsInfo'
            title="Больше информации"
            onClick={() => onAction('info')}
        >Показать детали</Button>
        <Button
            title="Edit"
            onClick={() => onAction('edit')}
        ><img src={editImage} alt="Редактировать"></img></Button>
        <Button
            tabIndex='0'
            title="Delete"
            onClick={onAction.bind(null, 'delete')}
        ><img src={deleteImage} alt="Удалить"></img></Button>
    </span>
    );
}

Actions.propTypes = {
    onAction: PropTypes.func,
}

export default Actions;