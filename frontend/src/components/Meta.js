import React from 'react'
import {Helmet} from 'react-helmet'
const Meta = ({title,description,keywords}) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
        </Helmet>
    )
}


Meta.defaultProps={
    title:"Welcome to Shop@Ease",
    description:'we sell the best products at reasonable rates',
    keywords:'electronics buyelectronics',
    
}
export default Meta
