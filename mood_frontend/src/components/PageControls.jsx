import s from "./PageControls.module.css";

function PageControls({page, pageView, setPage}) {
    return (
        <div className={`${s.arrowContainer} ${s.top}`}>
            {page > 1 ? <button onClick={() => setPage(page-1)}>&lt;</button> : <button>&lt;</button>}
            <p>{page}</p>
            {page < pageView.last_page ? <button onClick={() => setPage(page+1)}>&gt;</button> : <button>&gt;</button>}   
        </div>
    );
}

export default PageControls;