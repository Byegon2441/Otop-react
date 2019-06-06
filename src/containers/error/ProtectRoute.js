import React from "react";
import Header from "../../components/Header";

const NotFound = (props) => {
    let {text} = props
    return (
        <div>
            <Header />
            <div className="container col-md-8 text-center">
                <h1 className="mt-5" style={{fontSize: 120}}>401 </h1>
                <h2 className="mb-4">Protect Route </h2>
                <p className="title mb-5">ไม่ได้รับอนุญาติให้เข้าใช้งาน</p>
            </div>
        </div>
    )
}

  

export default NotFound;