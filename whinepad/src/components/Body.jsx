import './Body.css';

const Body = (props) => {
    const {children} = props;
    return (
        <div className={`Body`}>
            {children}
        </div>
    );
}

export default Body;