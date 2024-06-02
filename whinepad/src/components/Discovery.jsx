import Excel from "./Excel";
import Logo from "./Logo";

function Discovery() {
    return (
        <div>
            <h2>Excel</h2>
            <Excel headers={[`Name`, `Year`]} initialData={[[`Charles`, `1859`], [`Antoine`, `1943`]]}/>
            <Logo />
        </div>
    );
}

export default Discovery;