import React, {useState} from "react";
import './bookmark.css';

//import text1 from './text1.png'
//import text2 from './text2.png'
import jame from './jame.png'
//import yoda from './yoda.png'

import bookmarkSV from "../../service/bookmarkSV";
import {useEffect} from "react";

const url = "https://images.unsplash.com/photo-1561037404-61cd46aa615b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"

const Bookmark = () => {
    const[obj,setObj] = useState<any[]>([]);
    const petArr=() =>{
        return(
            bookmarkSV.fetchbookmark()
                .then(name => {
                    setObj(name)
                })
        )
    }
    useEffect(()=>{
        petArr().then()
    },[])
    /*
    const petName = obj.map(item=>(<span>{item.PetName}</span>))
    const petPic = obj.map(item=>(<span>{item.petPicUrl}</span>))
    const petUrl = obj.map(item=>(<span>{item.id}</span>))
    */
    return (
        <html>
        <head>
            <title>Bookmark</title>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Prompt&display=swap');
            </style>
        </head>
        <body className="bookmark-body">
            <div className="bookmark-container">
                <div className="bookmark">
                    Bookmark
                </div>
                <div className="row-pe" id="BookmarkPet">
                    {obj.map((value) => {
                        return <a href={'./'+value.id}>
                            <div className="col-pet">
                                <img src={url} alt={value.petPicUrl} className="pet-img"/> <strong>{value.PetName}</strong>
                            </div>
                        </a>
                    })}
                </div>
            </div>
        </body>
        </html>
    )
}

export default Bookmark;
/*
<a href='./petUrl1'>
    <div className="col-pet">
        <img src={text1} alt={text1} className="pet-img" height="130"/> <br/> <strong>text</strong>
    </div>
</a>
<a href='./petUrl2'>
    <div className="col-pet">
        <img src={jame} alt={jame} className="pet-img" height="130"/> <br/> <strong>Jame</strong>
    </div>
</a>
<a href='./petUrl3'>
    <div className="col-pet">
        <img src={yoda} alt={yoda} className="pet-img" height="130"/> <br/> <strong>Yoda</strong>
    </div>
</a>
<a href='./petUrl4'>
    <div className="col-pet">
        <img src={text2} alt={text2} className="pet-img" height="130"/> <br/> <strong>text</strong>
    </div>
</a>*/