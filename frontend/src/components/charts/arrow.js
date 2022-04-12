import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

import dayjs from 'dayjs';
import { StoreContext } from '../../store/storeProvider';

import { useStateWithLabel } from '../../helpers/helpers';

import styles from './charts.module.scss';

const duration = require('dayjs/plugin/duration');
const timezone = require('dayjs/plugin/timezone');

dayjs.extend(duration);
dayjs.extend(timezone);
dayjs.tz.setDefault('Europe/Warsaw');

const Arrow = ({ direction }) => (
    <button
        onClick={(e) => {
            handleClickChangeDay(e, direction === 'right' ? 1 : -1);
        }}
        type="button"
        className="uppercase p-2 m-2 flex items-center  max-w-max shadow-sm hover:stroke-current  w-12 h-12"
    >
        <svg
            width="64"
            height="64"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 64 64"
            style={{
                transform: `${direction === 'left' ? 'rotate(180deg)' : 'rotate(0deg)'}`,
            }}
        >
            <g id="g6" transform="matrix(0.12500006,0,0,0.12109381,1.823203,1.4697608)">
                <g id="g4">
                    <path
                        d="M 394.8,222.851 186.065,14.116 c -18.821,-18.821 -51.328,-18.821 -68.438,0 -18.82,18.821 -18.82,49.617 0,68.438 L 290.433,257.07 117.628,429.875 c -18.82,18.821 -18.82,49.618 0,68.438 8.555,8.555 22.242,13.687 34.218,13.687 11.976,0 25.665,-5.132 34.219,-13.688 L 394.8,291.288 c 8.555,-8.555 13.688,-22.242 13.688,-34.219 0,-11.976 -5.133,-25.663 -13.688,-34.218 z M 370.847,267.335 163.823,474.36 c -5.133,5.132 -15.398,5.132 -20.531,0 -5.133,-5.132 -5.133,-15.399 0,-20.531 L 328.074,269.047 c 6.844,-6.844 6.844,-17.109 0,-23.953 L 141.581,60.312 c -5.133,-6.844 -5.133,-15.399 0,-20.531 3.422,-3.422 6.844,-5.132 10.266,-5.132 3.422,0 6.844,1.71 10.266,5.132 l 208.735,208.735 c 3.422,3.422 5.132,6.844 5.132,10.266 -1.711,1.709 -3.422,6.843 -5.133,8.553 z"
                        id="path2"
                        fill="#aaa"
                    />
                </g>
            </g>
        </svg>
    </button>
);

Arrow.propTypes = {
    direction: PropTypes.string.isRequired,
};

export default Arrow;
