/****************************************************************************
  FileName      [ CurRow.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the CurRow. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import "./css/Row.css";
import React from 'react';
import { renderIntoDocument } from "react-dom/test-utils";


const CurRow = ({ curGuess, rowIdx }) => {
    let letters = curGuess.split('');

    return (
        <div className='Row-container'>
            {/* TODO 3: Row Implementation -- CurRow */}
            
            {/* ↓ Default row, you should modify it. ↓ */}
            <div className='Row-wrapper current'>
                <div id={JSON.stringify(rowIdx) + "-" + "0"} className='Row-wordbox filled'>{letters[0]}</div>
                <div id={JSON.stringify(rowIdx) + "-" + "1"} className='Row-wordbox filled'>{letters[1]}</div>
                <div id={JSON.stringify(rowIdx) + "-" + "2"} className='Row-wordbox filled'>{letters[2]}</div>
                <div id={JSON.stringify(rowIdx) + "-" + "3"} className='Row-wordbox filled'>{letters[3]}</div>
                <div id={JSON.stringify(rowIdx) + "-" + "4"} className='Row-wordbox filled'>{letters[4]}</div>
            </div>
            {/* ↑ Default row, you should modify it. ↑ */}
        </div>
    )
}

export default CurRow;
