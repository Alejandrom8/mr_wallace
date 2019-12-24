import React from 'react';

export function AditionalLinks(props){
    return(
        props.links.map((link) => (
            <link rel={link.rel} href={link.href} />
        ))
    );
}

export function makeYourJob(links){
    if(links){
        return <AditionalLinks links={links} />
    }
}


