import React from 'react'
import ListingBlocks from '../components/ListingBlocks'
import helpers from '../HelperListing'
const Providers = () => {
  
  return (
    <>
    <h3>Helpers</h3>
    {helpers.map((helper=>{return <ListingBlocks 
    title={helper.title}
    imgUrl={helper.imgUrl}
    loc={helper.loc}
    desc={helper.desc}
    id={helper.id} 
    typeUrl={helper.typeUrl} 
    category={helper.category}/>}))}
    
    </>
  )
}

export default Providers