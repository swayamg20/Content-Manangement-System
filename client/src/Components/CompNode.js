import React from 'react'
import {Card} from 'react-bootstrap'
export default function CompNode(props) {
  return (
        <Card>
            <Card.Body>
                <strong>updatedBy</strong>:{props.updatedBy}<br/>
                <strong>Competition Name</strong>: {props.comp}<br/>
                <strong>Category</strong>: {props.category}<br/>
                <strong>subCategory</strong>: {props.subCategory}<br/>
                <strong>Prize Money </strong>: {props.prize}<br/>
                <strong>Content </strong>: {props.content}<br/>
            </Card.Body>
        </Card> 
    )
}
