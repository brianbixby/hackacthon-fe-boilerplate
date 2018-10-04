import React from 'react';
import { renderIf } from '../../../lib/util.js';

const Tooltip = props => (
    <div className='tooltip'>
        {renderIf(props.message && props.show,
            <section>
                <p> {props.message} </p>
            </section>
        )}
    </div>
);

export default Tooltip;