import React from 'react';


function Header({children}){

    return(
        //Conteúdo HTML - puxando pela propriedade(s)
        <h1>{children}</h1>
    );
}

export default Header;