import React from "react";

export const TokenComponent = () => {
    const token = localStorage.getItem("token");

    return(
        <>
            {token ?
                <div>Estas en una vista privada</div>
            :   <div>Estas en una vista publica</div>
            }
        </>
    );
};

   